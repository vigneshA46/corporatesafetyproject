const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
require("dotenv").config(); // make sure you have a .env file with SECRET_KEY

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

const SECRET_KEY = process.env.SECRET_KEY; // should be in your .env file

// Login Route
router.post("/", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: "Username, password, and role are required" });
  }

  const normalizedRole = role.toLowerCase();

  if (!rolePages[normalizedRole]) {
    return res.status(400).json({ error: "Invalid role selected" });
  }

  const query = "SELECT * FROM user WHERE username = ? AND password = ? AND LOWER(role) = LOWER(?)";

  db.get(query, [username, password, role], (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid username, password, or role" });
    }

    // Create JWT token with user id and role
    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "2h" }
    );
    console.log(user.id);

    res.json({
      message: "Login successful",
      token,
      role: normalizedRole,
      userid: user.id,
      redirectTo: rolePages[normalizedRole],
    });
  });
});

module.exports = router;
