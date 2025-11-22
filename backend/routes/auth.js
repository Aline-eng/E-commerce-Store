const express = require('express');
const router = express.Router();

// Mock authentication for demo
router.post('/login', (req, res) => {
  // In a real app, you would validate credentials and return JWT
  res.json({ 
    message: 'Login successful', 
    user: { 
      id: 1, 
      name: 'Demo User', 
      email: req.body.email 
    } 
  });
});

module.exports = router;