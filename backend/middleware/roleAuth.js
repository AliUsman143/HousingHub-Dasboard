const jwt = require('jsonwebtoken');
const User = require('../models/User');

const roleAuth = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).send({ error: 'Please authenticate' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

      if (!user) {
        return res.status(401).send({ error: 'Please authenticate' });
      }

      if (user.role !== requiredRole) {
        return res.status(403).send({ error: 'Access denied' });
      }

      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Please authenticate' });
    }
  };
};

module.exports = roleAuth;