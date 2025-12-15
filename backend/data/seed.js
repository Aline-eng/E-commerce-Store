const mongoose = require('mongoose');
const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 25,
    featured: true,
    rating: 4.5
  },
  {
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health monitoring",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 15,
    featured: true,
    rating: 4.3
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes for athletes",
    price: 79.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 30,
    featured: false,
    rating: 4.7
  },
  {
    name: "Coffee Maker",
    description: "Automatic coffee maker with timer",
    price: 49.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    stock: 20,
    featured: true,
    rating: 4.2
  },
  {
    name: "Backpack",
    description: "Durable backpack for travel and work",
    price: 39.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: 40,
    featured: false,
    rating: 4.4
  },
  {
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness",
    price: 29.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    stock: 35,
    featured: false,
    rating: 4.1
  },
  // Additional products for related products functionality
  {
    name: "Gaming Mouse",
    description: "High-precision gaming mouse with RGB lighting",
    price: 59.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    stock: 18,
    featured: false,
    rating: 4.6
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
    stock: 12,
    featured: true,
    rating: 4.8
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather wallet with RFID protection",
    price: 45.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: 22,
    featured: false,
    rating: 4.3
  },
  {
    name: "Sunglasses",
    description: "UV protection sunglasses with polarized lenses",
    price: 89.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    stock: 28,
    featured: false,
    rating: 4.4
  },
  {
    name: "Blender",
    description: "High-speed blender for smoothies and soups",
    price: 79.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500",
    stock: 16,
    featured: true,
    rating: 4.5
  },
  {
    name: "Throw Pillow Set",
    description: "Decorative throw pillows for home decor",
    price: 34.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    stock: 25,
    featured: false,
    rating: 4.2
  },
  {
    name: "Fitness Tracker",
    description: "Advanced fitness tracker with heart rate monitor",
    price: 149.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500",
    stock: 20,
    featured: true,
    rating: 4.4
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat for all fitness levels",
    price: 39.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    stock: 35,
    featured: false,
    rating: 4.6
  },
  {
    name: "Dumbbell Set",
    description: "Adjustable dumbbell set for home workouts",
    price: 199.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    stock: 10,
    featured: true,
    rating: 4.7
  },
  {
    name: "Water Bottle",
    description: "Insulated stainless steel water bottle",
    price: 24.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    stock: 40,
    featured: false,
    rating: 4.3
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample products added to database');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();