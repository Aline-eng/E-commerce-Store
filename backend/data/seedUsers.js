const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await User.deleteMany({ email: { $in: ['admin@shop.co', 'customer@shop.co'] } });
    
    const admin = new User({
      name: 'Admin User',
      email: 'admin@shop.co',
      password: 'admin123',
      role: 'admin',
      isVerified: true
    });
    await admin.save();
    
    const customer = new User({
      name: 'John Customer',
      email: 'customer@shop.co',
      password: 'customer123',
      role: 'customer',
      isVerified: true
    });
    await customer.save();
    
    console.log('Test users created successfully!');
    console.log('Admin - Email: admin@shop.co, Password: admin123');
    console.log('Customer - Email: customer@shop.co, Password: customer123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
