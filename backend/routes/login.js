const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();
router.use(express.json());
const db = new sqlite3.Database("./corporatedatabase.db");

// Allowed roles and their respective dashboard pages
const rolePages = {
    associate: "associate",
    manager: "manager",
    executive: "executive",
    admin: "admin"
};

// Login Route
router.post("/", (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ error: "Username, password, and role are required" });
    }

    // Convert role to lowercase for case-insensitive comparison
    const normalizedRole = role.toLowerCase();

    // Check if role is valid
    if (!rolePages[normalizedRole]) {
        return res.status(400).json({ error: "Invalid role selected" });
    }

    // Query to check if user exists with the given username, password, and role
    const query = "SELECT * FROM user WHERE username = ? AND password = ? AND LOWER(role) = LOWER(?)";

    db.get(query, [username, password, role], (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        if (!user) {
            return res.status(401).json({ error: "Invalid username, password, or role" });
        }

        // If user exists, authenticate and redirect to appropriate dashboard
        res.json({
            message: "Login successful",
            role: normalizedRole,
            redirectTo: rolePages[normalizedRole]
        });
    });
});

module.exports = router;
