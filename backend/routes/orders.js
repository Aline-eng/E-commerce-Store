const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

// Create new order
router.post('/', auth, orderController.createOrder);

// Get user's orders
router.get('/', auth, orderController.getUserOrders);

// Get order statistics (Admin only)
router.get('/stats', auth, orderController.getOrderStats);

// Get single order
router.get('/:id', auth, orderController.getOrder);

// Update order status (Admin only)
router.patch('/:id/status', auth, orderController.updateOrderStatus);

// Cancel order
router.patch('/:id/cancel', auth, orderController.cancelOrder);

module.exports = router;