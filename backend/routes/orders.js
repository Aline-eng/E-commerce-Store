const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    let filter = {};
    
    if (email) {
      filter['customer.email'] = email;
    }
    
    const orders = await Order.find(filter)
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.patch('/:id', async (req, res) => {
  try {
    console.log(`[Orders API] PATCH request to update order: ${req.params.id}`);
    console.log(`[Orders API] New status: ${req.body.status}`);

    // First, find the order to check current status
    const existingOrder = await Order.findById(req.params.id);
    if (!existingOrder) {
      console.log(`[Orders API] Order with ID ${req.params.id} not found.`);
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validate status transition for cancellation
    if (req.body.status === 'cancelled') {
      if (existingOrder.status === 'cancelled') {
        return res.status(400).json({ message: 'Order is already cancelled' });
      }
      if (existingOrder.status === 'completed' || existingOrder.status === 'delivered') {
        return res.status(400).json({ message: 'Cannot cancel a completed or delivered order' });
      }
    }

    // Update the order
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('items.product');

    console.log(`[Orders API] Order ${order._id} updated to status: ${order.status}`);
    res.json(order);
  } catch (error) {
    console.error(`[Orders API] Error updating order ${req.params.id}:`, error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;