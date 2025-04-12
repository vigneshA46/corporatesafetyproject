const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database("./corporatedatabase.db");

router.use(express.json()); // Ensure JSON parsing

router.put("/updateuser", (req, res) => {
    const { id, username, password, role } = req.body;

    if (!id || !username || !password || !role) {
        return res.status(400).json({ message: "Must provide all credentials" });
    }

    const query = `UPDATE user SET username=?, password=?, role=? WHERE id=?`;

    db.run(query, [username, password, role, id], function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully" });
    });
});

module.exports = router;
