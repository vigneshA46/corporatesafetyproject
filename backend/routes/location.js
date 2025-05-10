const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
const db = new sqlite3.Database("./corporatedatabase.db");

router.use(express.json());

router.post("/location", (req, res) => {
  const { userId, latitude, longitude } = req.body;

  if (!userId || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `INSERT INTO location (userId, latitude, longitude) VALUES (?, ?, ?)`;

  db.run(query, [userId, latitude, longitude], function (err) {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to store location" });
    }

    res.json({ message: "Location stored successfully" });
  });
});

module.exports = router;
