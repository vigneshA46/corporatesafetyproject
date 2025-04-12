const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
router.use(express.json());
const db = new sqlite3.Database("./corporatedatabase.db", (err) => {
    if (err) {
      console.error('Error opening database:', err);
    } else {
      console.log('Connected to SQLite database.');
  
      // Create 'reports' table if it doesn't exist
      db.run(`
        CREATE TABLE IF NOT EXISTS reports (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }
});

// POST /api/report - save a report
router.post('/report', (req, res) => {
    const { email, message } = req.body;
  
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }
  
    const query = `INSERT INTO reports (email, message) VALUES (?, ?)`;
    db.run(query, [email, message], function (err) {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.status(201).json({
        success: true,
        message: 'Report submitted successfully',
        reportId: this.lastID,
      });
    });
  });

  module.exports = router;

      