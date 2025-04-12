    const express = require("express");
    const sqlite3 = require("sqlite3").verbose();

    const router = express.Router();
    const db = new sqlite3.Database("corporatedatabase.db");

    // Create users table if not exists
    db.run(
    `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )`
    );

    // Signup API (without hashing)
    router.post("/signup", (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.run(
        "INSERT INTO user (username, password, role) VALUES (?, ?, ?)",
        [username, password, role],
        function (err) {
        if (err) {
            return res.status(500).json({ error: "User already exists or DB error" });
        }
        res.status(201).json({ message: "User registered successfully", userId: this.lastID });
        }
    );
    });

    module.exports = router;
