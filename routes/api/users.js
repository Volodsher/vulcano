const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const connectDBMySQL = require('../../config/dbMySQL');
const { v4: uuidv4 } = require('uuid');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('user_login', 'login is required').notEmpty(),
  check('user_email', 'Please include a valid email').isEmail(),
  check(
    'user_pass',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_login, user_email, user_pass } = req.body;

    connectDBMySQL.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }

      const checkUserQuery =
        'SELECT 1 FROM users WHERE user_login = ? OR user_email = ? LIMIT 1';
      connection.query(
        checkUserQuery,
        [user_login, user_email],
        (err, rows) => {
          if (err) {
            console.error(err);
            connection.release();
            return res.status(500).json({ error: 'Database error' });
          }

          if (rows.length > 0) {
            connection.release();
            return res.status(400).json({
              errors: [{ msg: 'User with such login or email already exists' }],
            });
          }

          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              console.error(err);
              connection.release();
              return res.status(500).json({ error: 'Server error' });
            }

            bcrypt.hash(user_pass, salt, (err, hashedPassword) => {
              if (err) {
                console.error(err);
                connection.release();
                return res.status(500).json({ error: 'Server error' });
              }

              const id = uuidv4();
              const user_registered = new Date().toJSON().slice(0, 10);
              console.log(user_registered);

              const insertUserQuery =
                'INSERT INTO users(id, user_login, user_email, user_pass, user_registered) VALUES (?, ?, ?, ?, ?)';
              connection.query(
                insertUserQuery,
                [id, user_login, user_email, hashedPassword, user_registered],
                (err, results) => {
                  connection.release();

                  if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Database error' });
                  }

                  const payload = {
                    user: {
                      id: id,
                    },
                  };

                  jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    { expiresIn: 36000 },
                    (err, token) => {
                      if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Server error' });
                      }

                      res.json({ token });
                    }
                  );
                }
              );
            });
          });
        }
      );
    });
  }
);

module.exports = router;
