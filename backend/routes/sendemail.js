// server.js or routes/email.js (based on your project structure)
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST /send-email
router.post('/sendemail', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rajapriya3103@gmail.com',        // Your Gmail address
        pass: 'xzlz qcsz qxds ebpu',           // Use an App Password (recommended)
      },
    });

    // Define the mail options
    const mailOptions = {
      from: 'rajapriya3103@gmail.com',
      to,
      subject,
      text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
