const express = require("express");
const axios = require("axios");
const router = express.Router();

const OFFICE_LAT = 11.2407917;  // Perambalur
const OFFICE_LNG =  78.8382692;

// Simulated thresholds
const TEMP_THRESHOLD = 38; // °C
const AQI_THRESHOLD = 150; // AQI
const NOISE_THRESHOLD = 85; // dB

router.get("/safety-alert", async (req, res) => {
  try {
    // Replace with actual API or sensor data
    const airRes = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${OFFICE_LAT}&lon=${OFFICE_LNG}&appid=9b336faf19551fd85f4efe5309432a92`);
    const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${OFFICE_LAT}&lon=${OFFICE_LNG}&appid=9b336faf19551fd85f4efe5309432a92&units=metric`);

    const aqi = airRes.data.list[0].main.aqi * 50; // Approximation
    const temp = weatherRes.data.main.temp;

    const alerts = [];

    if (temp > TEMP_THRESHOLD) {
      alerts.push("⚠️ High temperature detected in office!");
    }
    if (aqi > AQI_THRESHOLD) {
      alerts.push("⚠️ Poor air quality detected!");
    }
    else{
        alerts.push("no other cautious situations found in the enviroinment")
    }

    res.json({ alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching safety data" });
  }
});

module.exports = router;
