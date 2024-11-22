const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

router.use(bodyParser.json());
router.use(cors());

router.post('/send-email', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mahmoud.lassoued@esen.tn',
      pass: 'vrtn dvxq wluk atuw'
    }
  });

  const mailOptions = {
    from: 'ahmedsidimohammed78@gmail.com',
    to: 'ai7731907@gmail.com',
    subject: 'New Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send('Error sending email');
    } else {
      res.status(200).send('Email sent successfully');
    }
  });
});

module.exports = router;