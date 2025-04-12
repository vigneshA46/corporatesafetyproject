const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
router.use(express.json());

const db = new sqlite3.Database("./corporatedatabase.db");

db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      message TEXT NOT NULL
    )
  `);

  router.get('/getreport', (req, res) => {
    const query = 'SELECT email, message FROM reports';
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error retrieving reports:', err.message);
        return res.status(500).json({ error: 'Failed to fetch reports' });
      }
  
      res.json(rows);
    });
  });

  module.exports = router;