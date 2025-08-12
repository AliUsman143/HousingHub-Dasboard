// backend/middleware/roleAuth.js
const jwt = require('jsonwebtoken');
const UserSign = require('../models/usersign');

const roleAuth = (requiredRole = null) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ error: 'Please authenticate' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserSign.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ error: 'Please authenticate' });
      }

      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).json({ error: 'Access denied' });
      }

      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(401).json({ error: 'Please authenticate' });
    }
  };
};

module.exports = roleAuth;
