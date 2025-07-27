const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// 🔐 Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expect token format: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded user in req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// 🛡️ Middleware to enforce role-based access
exports.requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: `Access denied: ${role} role required` });
  }
  next();
};

// Middleware to block access for users whose status is not 'active'
exports.requireActiveUser = async (req, res, next) => {
  try {
    console.log('DEBUG req.user:', req.user);
    const user = await User.findById(req.user.id);
    console.log('DEBUG DB user:', user);
    if (!user || user.status !== 'active') {
      return res.status(403).json({ message: 'Account not active or verification incomplete.' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Failed to verify user status.' });
  }
};
