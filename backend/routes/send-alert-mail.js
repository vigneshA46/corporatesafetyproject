const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const router = express.Router();
const db = new sqlite3.Database("./corporatedatabase.db");

// Replace with your mail service config (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rajapriya3103@gmail.com',         // use env in prod
    pass: 'xzlz qcsz qxds ebpu',
  },
});

router.post('/send-alert-mail', async (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(400).json({ error: "Subject and message are required" });
  }

  // Get all user emails from the database
  db.all(`SELECT username FROM user`, async (err, rows) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const emails = rows.map(row => row.username).filter(email => email.includes('@'));

    if (emails.length === 0) {
      return res.status(404).json({ error: "No valid email addresses found" });
    }

    try {
      const mailPromises = emails.map(email =>
        transporter.sendMail({
          from: '"Safety System" <your-email@gmail.com>',
          to: email,
          subject,
          text: message,
        })
      );

      await Promise.all(mailPromises);

      res.json({ message: "Alert emails sent successfully", count: emails.length });
    } catch (mailErr) {
      console.error("Mail Error:", mailErr);
      res.status(500).json({ error: "Failed to send emails" });
    }
  });
});

module.exports = router;
