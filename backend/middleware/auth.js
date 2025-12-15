const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      console.log('❌ User not found for token');
      return res.status(401).json({ error: 'User not found' });
    }

    console.log(`✅ Authenticated user: ${user.email} (${user._id})`);
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.log('❌ Token validation error:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;
