const jwt = require('jsonwebtoken');
const config = require('config');

// export default function (req, res, next) {
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, athorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // console.log(req.user);
    req.user = decoded.user;
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
