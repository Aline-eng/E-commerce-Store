const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    console.log('📦 Creating order with data:', JSON.stringify(req.body, null, 2));
    console.log('👤 User ID:', req.userId);
    
    const { items, customer, pricing, paymentMethod, shippingMethod, notes } = req.body;
    
    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log('❌ Validation failed: No items');
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }
    
    if (!customer || !customer.name || !customer.email) {
      console.log('❌ Validation failed: Missing customer info');
      return res.status(400).json({ message: 'Customer information is required' });
    }
    
    // Ensure user exists
    if (!req.userId) {
      console.log('❌ No user ID in request');
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Validate and enrich order items
    const enrichedItems = [];
    let calculatedSubtotal = 0;
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product ${item.product} not found` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}` 
        });
      }
      
      const enrichedItem = {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
        size: item.size || null,
        color: item.color || null
      };
      
      enrichedItems.push(enrichedItem);
      calculatedSubtotal += product.price * item.quantity;
    }
    
    // Calculate pricing
    const tax = calculatedSubtotal * 0.08; // 8% tax
    const shipping = calculatedSubtotal > 100 ? 0 : 15; // Free shipping over $100
    const discount = pricing?.discount || 0;
    const total = calculatedSubtotal + tax + shipping - discount;
    
    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create order
    const order = new Order({
      orderId,
      user: req.userId,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: {
          street: customer.address?.street || '123 Main St',
          city: customer.address?.city || 'New York',
          state: customer.address?.state || 'NY',
          zipCode: customer.address?.zipCode || '10001',
          country: customer.address?.country || 'USA'
        }
      },
      items: enrichedItems,
      pricing: {
        subtotal: calculatedSubtotal,
        tax: tax,
        shipping: shipping,
        discount: discount,
        total: total
      },
      paymentMethod: paymentMethod || 'Credit Card',
      shippingMethod: shippingMethod || 'Standard Shipping',
      notes: notes || ''
    });
    
    await order.save();
    
    // Update product stock
    for (const item of enrichedItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }
    
    // Populate the order for response
    await order.populate('items.product');
    
    res.status(201).json({
      message: 'Order created successfully',
      order: order,
      orderId: order.orderId
    });
    
  } catch (error) {
    console.error('❌ Create order error:', error);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Failed to create order', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    console.log('📋 Getting orders for user:', req.user.email, 'Role:', req.user.role);
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    
    let filter = {};
    
    // Role-based filtering
    if (req.user.role === 'admin') {
      console.log('👑 Admin user - showing all orders');
      // Admin can see all orders or filter by email
      if (req.query.email) {
        filter['customer.email'] = req.query.email;
      }
    } else {
      console.log('👤 Regular user - showing user orders only');
      // Regular users see only their orders
      filter.user = req.userId;
    }
    
    console.log('🔍 Order filter:', filter);
    
    // Status filter
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    const orders = await Order.find(filter)
      .populate('items.product', 'name image category')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Order.countDocuments(filter);
    
    console.log(`📊 Found ${orders.length} orders out of ${total} total`);
    
    // Add progress information to each order
    const ordersWithProgress = orders.map(order => ({
      ...order.toObject(),
      progress: order.getStatusProgress(),
      canCancel: order.canBeCancelled(),
      canReturn: order.canBeReturned()
    }));
    
    console.log('✅ Sending orders response');
    res.json({
      orders: ordersWithProgress,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
    
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name image category description')
      .populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check authorization
    if (req.user.role !== 'admin' && order.user._id.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const orderWithProgress = {
      ...order.toObject(),
      progress: order.getStatusProgress(),
      canCancel: order.canBeCancelled(),
      canReturn: order.canBeReturned()
    };
    
    res.json(orderWithProgress);
    
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { status, trackingNumber, notes } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Validate status transition
    const validTransitions = {
      'pending': ['confirmed', 'cancelled'],
      'confirmed': ['processing', 'cancelled'],
      'processing': ['shipped', 'cancelled'],
      'shipped': ['delivered'],
      'delivered': ['refunded'],
      'cancelled': [],
      'refunded': []
    };
    
    if (!validTransitions[order.status].includes(status)) {
      return res.status(400).json({ 
        message: `Cannot change status from ${order.status} to ${status}` 
      });
    }
    
    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (notes) order.notes = notes;
    
    await order.save();
    await order.populate('items.product');
    
    res.json({
      message: 'Order status updated successfully',
      order: order
    });
    
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check authorization
    if (req.user.role !== 'admin' && order.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Check if order can be cancelled
    if (!order.canBeCancelled()) {
      return res.status(400).json({ 
        message: `Cannot cancel order with status: ${order.status}` 
      });
    }
    
    order.status = 'cancelled';
    await order.save();
    
    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
    }
    
    await order.populate('items.product');
    
    res.json({
      message: 'Order cancelled successfully',
      order: order
    });
    
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get order statistics (Admin only)
exports.getOrderStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$pricing.total' }
        }
      }
    ]);
    
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'shipped'] } } },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);
    
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      stats: stats,
      summary: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        averageOrderValue: totalRevenue[0]?.total / totalOrders || 0
      },
      recentOrders
    });
    
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({ message: error.message });
  }
};