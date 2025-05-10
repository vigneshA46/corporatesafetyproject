const axios = require("axios");
const xml2js = require("xml2js");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();
const db = new sqlite3.Database("./corporatedatabase.db");

const OFFICE_LAT = 11.2333;  // Perambalur
const OFFICE_LNG = 78.8833;

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function isWorkingHours() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour <= 18;
  }

router.post("/disaster-alert", async (req, res) => {
  try {
    const xml = await axios.get("https://www.gdacs.org/xml/rss.xml");
    const parsed = await xml2js.parseStringPromise(xml.data);
    const disasters = parsed.rss.channel[0].item;

    const nearbyDisasters = disasters.filter(d => {
      const lat = parseFloat(d["geo:lat"]?.[0]);
      const lon = parseFloat(d["geo:long"]?.[0]);

      if (!lat || !lon) return false;
      const distance = getDistanceFromLatLonInKm(lat, lon, OFFICE_LAT, OFFICE_LNG);
      return distance <= 300;
    });

    if (nearbyDisasters.length === 0) {
      return res.json({ message: "✅ No disaster near office (within 300 km)" });
    }

    // Check employees
    db.all(`SELECT userId, latitude, longitude FROM location ORDER BY timestamp DESC`, [], (err, rows) => {
      if (err) return res.status(500).json({ error: "DB error" });

      const latest = {};
      for (const row of rows) {
        if (!latest[row.userId]) latest[row.userId] = row;
      }

      const alerts = [];
      for (const userId in latest) {
        const { latitude, longitude } = latest[userId];
        const distance = getDistanceFromLatLonInKm(latitude, longitude, OFFICE_LAT, OFFICE_LNG);
        if (distance < 0.1) {
          alerts.push({ userId, alert: "🔴 URGENT: You are inside office during disaster!" });
        } else {
          alerts.push({ userId, alert: "🟡 Notice: Disaster near office. Stay alert." });
        }
      }

      res.json({ disasterFound: true, nearbyDisasters: nearbyDisasters.length, alerts });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing disaster data" });
  }
});


// Check office leave route
router.post("/check-office-leave", (req, res) => {
  if (!isWorkingHours()) return res.json({ message: "Outside working hours." });

  const query = `SELECT userId, latitude, longitude FROM location ORDER BY timestamp DESC`;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });

    const latest = {};
    for (const row of rows) {
      if (!latest[row.userId]) latest[row.userId] = row;
    }

    const notifications = [];

    // Check if employees are inside the office during working hours
    for (const userId in latest) {
      const { latitude, longitude } = latest[userId];
      const distance = getDistanceFromLatLonInKm(latitude, longitude, OFFICE_LAT, OFFICE_LNG);

      if (distance > 0.1) {
        notifications.push({
          userId,
          message: `🚨 ALERT: Employee ${userId} left office during working hours.`
        });
      }
    }

    res.json({ notifications });
  });
});

module.exports = router;
