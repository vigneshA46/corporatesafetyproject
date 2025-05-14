const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const sqlite3 = require("sqlite3").verbose();

// SQLite DB connection
const db = new sqlite3.Database("./corporatedatabase.db");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rajapriya3103@gmail.com",      // your admin or system email
    pass: "xzlz qcsz qxds ebpu",         // use Gmail App Password or secure key
  },
});

// API: POST /send-sos-mail
router.post("/send-sos-mail", (req, res) => {
  const { subject, message, id } = req.body;

  if (!subject || !message || !id) {
    return res.status(400).json({ error: "Subject, message, and user ID are required" });
  }

  // Get user's email (username) by ID
  const userQuery = "SELECT username FROM user WHERE id = ?";
  db.get(userQuery, [id], (err, row) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    const userEmail = row.username;

    // Compose email to admin
    const mailOptions = {
  from: '"NuroAI SOS Alert" <rajapriya3103@gmail.com>',
  to: "2752004madhu@gmail.com",  // admin
  subject: `SOS Alert from Employee ID: ${id}`,
  text: `SOS Message from ${userEmail} (User ID: ${id}):\n\n${message}`,
};

    // Send email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Mail error:", err);
        return res.status(500).json({ error: "Failed to send email" });
      }

      console.log("SOS email sent:", info.response);
      return res.status(200).json({ success: true, message: "SOS email sent successfully" });
    });
  });
});

module.exports = router;
