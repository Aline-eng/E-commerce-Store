import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    }
  });

  const handleCheckout = async () => {
    if (state.items.length === 0) {
      alert('🛒 Your cart is empty');
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.address.street) {
      alert('📝 Please fill in all required customer information');
      return;
    }

    try {
      setLoading(true);
      
      const orderData = {
        customer: customerInfo,
        items: state.items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: state.total
      };

      console.log('Sending order data:', orderData); // Debug log
      
      const result = await orderAPI.createOrder(orderData);
      console.log('Order created:', result); // Debug log
      
      clearCart();
      alert('🎉 Order placed successfully! Check your orders page.');
      
      // Reset form
      setCustomerInfo({
        name: '',
        email: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'United States'
        }
      });
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert(`❌ ${err.response?.data?.message || 'Failed to place order. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to your cart to get started</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">Review your items and proceed to checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-soft border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Cart Items ({state.items.reduce((total, item) => total + item.quantity, 0)})
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {state.items.map(item => (
                <div key={item.product._id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-primary-600 font-bold text-lg mt-1">
                        ${item.product.price}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {item.product.category}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-colors text-gray-600 hover:text-gray-900"
                          disabled={loading}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="w-8 text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-colors text-gray-600 hover:text-gray-900"
                          disabled={loading}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-20">
                        <div className="font-semibold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        disabled={loading}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checkout Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-soft border border-gray-200 sticky top-24">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Order Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(state.total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${(state.total * 1.1).toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900">Customer Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main St"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    value={customerInfo.address.street}
                    onChange={(e) => setCustomerInfo({
                      ...customerInfo, 
                      address: {...customerInfo.address, street: e.target.value}
                    })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="New York"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      value={customerInfo.address.city}
                      onChange={(e) => setCustomerInfo({
                        ...customerInfo, 
                        address: {...customerInfo.address, city: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      placeholder="NY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      value={customerInfo.address.state}
                      onChange={(e) => setCustomerInfo({
                        ...customerInfo, 
                        address: {...customerInfo.address, state: e.target.value}
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      placeholder="10001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      value={customerInfo.address.zipCode}
                      onChange={(e) => setCustomerInfo({
                        ...customerInfo, 
                        address: {...customerInfo.address, zipCode: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      value={customerInfo.address.country}
                      onChange={(e) => setCustomerInfo({
                        ...customerInfo, 
                        address: {...customerInfo.address, country: e.target.value}
                      })}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading || !customerInfo.name || !customerInfo.email || !customerInfo.address.street}
                className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Complete Order - ${(state.total * 1.1).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Continue Shopping */}
              <Link
                to="/"
                className="block text-center text-primary-600 hover:text-primary-700 font-medium py-2 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;