const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
router.use(express.json());
const db = new sqlite3.Database("./corporatedatabase.db");

router.get('/dashboarddata', async (req, res) => {
  try {
    // 1. Get total reports
    const totalResult = await new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as total FROM reports', (err, row) => {
        if (err) reject(err);
        else resolve(row.total);
      });
    });

    // 2. Get number of employees by role (from the "user" table)
    const employeeRoles = await new Promise((resolve, reject) => {
      db.all('SELECT role, COUNT(*) as count FROM user GROUP BY role', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // 3. Get last 5 reports
    const recentReports = await new Promise((resolve, reject) => {
      db.all(`
        SELECT email AS username, message
        FROM reports
        ORDER BY rowid DESC
        LIMIT 5
      `, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // Final response
    res.json({
      totalReports: totalResult,
      employeesByRole: employeeRoles, // Updated field to represent employees by role
      recentReports
    });

  } catch (err) {
    console.error('Dashboard API error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;