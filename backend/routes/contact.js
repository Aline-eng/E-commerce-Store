const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const contactController = require('../controllers/contactController');

// Submit contact form (public)
router.post('/', contactController.submitContact);

// Get all contacts (admin only)
router.get('/', auth, contactController.getContacts);

// Reply to contact (admin only)
router.post('/:id/reply', auth, contactController.replyContact);

// Update contact status (admin only)
router.patch('/:id/status', auth, contactController.updateContactStatus);

module.exports = router;