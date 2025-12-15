const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  size: String,
  color: String
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: true
    },
    phone: String,
    address: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'USA'
      }
    }
  },
  items: {
    type: [orderItemSchema],
    required: true,
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: 'Order must have at least one item'
    }
  },
  pricing: {
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      default: 0
    },
    shipping: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending',
    index: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    default: 'Credit Card'
  },
  shippingMethod: {
    type: String,
    default: 'Standard Shipping'
  },
  trackingNumber: String,
  estimatedDelivery: Date,
  deliveredAt: Date,
  notes: String,
  statusHistory: [{
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String
  }]
}, {
  timestamps: true
});

// Generate order ID and manage status history
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Generate unique order ID
    if (!this.orderId) {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substr(2, 5);
      this.orderId = `ORD${timestamp}${random}`.toUpperCase();
    }
    
    // Add initial status to history
    this.statusHistory = [{
      status: this.status,
      timestamp: new Date(),
      note: 'Order created'
    }];
    
    // Set estimated delivery (7 days from now)
    this.estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  } else if (this.isModified('status')) {
    // Add status change to history
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
      note: `Status changed to ${this.status}`
    });
    
    // Set delivered date if status is delivered
    if (this.status === 'delivered' && !this.deliveredAt) {
      this.deliveredAt = new Date();
    }
  }
  
  next();
});

// Add methods for order management
orderSchema.methods.canBeCancelled = function() {
  return ['pending', 'confirmed'].includes(this.status);
};

orderSchema.methods.canBeReturned = function() {
  return this.status === 'delivered' && 
         this.deliveredAt && 
         (Date.now() - this.deliveredAt.getTime()) < (30 * 24 * 60 * 60 * 1000); // 30 days
};

orderSchema.methods.getStatusProgress = function() {
  const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
  const currentIndex = statuses.indexOf(this.status);
  return {
    current: this.status,
    progress: currentIndex >= 0 ? ((currentIndex + 1) / statuses.length) * 100 : 0,
    steps: statuses.map((status, index) => ({
      status,
      completed: index <= currentIndex,
      active: index === currentIndex
    }))
  };
};

// Add indexes for performance
orderSchema.index({ 'customer.email': 1, createdAt: -1 });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ orderId: 1 });

module.exports = mongoose.model('Order', orderSchema);