const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
router.use(express.json());
const db = new sqlite3.Database("./corporatedatabase.db");

router.get('/user/:id', (req, res) => {
    const employeeId = req.params.id;

    const query = `SELECT * FROM user WHERE id = ?`;
    db.get(query, [employeeId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(row);
    });
});


module.exports = router