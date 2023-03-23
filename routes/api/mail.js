const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('config');
const { validationResult, check } = require('express-validator');

// for mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.get('mailUser'),
    pass: config.get('mailPass'),
  },
});

let mailOptions = {
  from: 'hello@example.com',
  to: 'volodsher@gmail.com',
  subject: 'Subject',
  message: 'Email content',
};

router.post(
  '/',
  check('name').not().isEmpty(),
  check('email').isEmail().normalizeEmail().withMessage('Not an email'),
  check('message').not().isEmpty().trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    mailOptions = {
      ...mailOptions,
      subject: `New message from ${req.body.name}  to Vulcano.top`,
      message: `
      \nName: ${req.body.name}.
      \nEmail: ${req.body.email}.
      \nMassage: ${req.body.message}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log('Email sent');
        res.send('You just sent a mail!');
      }
    });
  }
);

module.exports = router;
