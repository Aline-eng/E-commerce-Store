import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);
  const [promoError, setPromoError] = useState('');

  const handleCheckout = async () => {
    if (state.items.length === 0) {
      setError('Cart is empty');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const orderData = {
        items: state.items,
        totalAmount: total,
        customer: 'Guest',
      };
      await orderAPI.createOrder(orderData as any);
      clearCart();
      alert('Order placed successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const promoCodes: {[key: string]: number} = {
    'SAVE10': 0.10,
    'SAVE20': 0.20,
    'WELCOME': 0.15,
    'FIRST': 0.25
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    const upperCode = promoCode.toUpperCase();
    if (promoCodes[upperCode]) {
      setAppliedPromo({ code: upperCode, discount: promoCodes[upperCode] });
      setPromoError('');
      alert(`Promo code "${upperCode}" applied! ${(promoCodes[upperCode] * 100)}% discount`);
    } else {
      setPromoError('Invalid promo code');
      setAppliedPromo(null);
    }
  };

  const subtotal = state.items.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);
  const promoDiscount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const deliveryFee = subtotal > 100 ? 0 : 15;
  const total = subtotal - promoDiscount + deliveryFee;

  return (
    <div className="container px-4 py-12 mx-auto">
      {/* Breadcrumb */}
      <div className="flex gap-2 mb-8 text-gray-600">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span>Cart</span>
      </div>

      <h1 className="mb-8 text-4xl font-black text-gray-900 dark:text-white">YOUR CART</h1>

      {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

      {state.items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-4 text-gray-500 dark:text-gray-400">Your cart is empty</p>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart items */}
          <div className="space-y-4 lg:col-span-2">
            {state.items.map((item: any) => (
              <div key={item.product._id} className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-800">
                {/* Image */}
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="flex-shrink-0 object-cover w-24 h-24 rounded-lg"
                />

                {/* Details */}
                <div className="flex-grow">
                  <h3 className="mb-2 font-bold text-gray-900 dark:text-white">{item.product.name}</h3>
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{item.product.category}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">${item.product.price.toFixed(2)}</p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full dark:bg-gray-800">
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="text-lg font-bold text-gray-900 dark:text-white hover:text-gray-600"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="text-lg font-bold text-gray-900 dark:text-white hover:text-gray-600"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="p-6 space-y-4 bg-white border border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h3>

              <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-500">
                    <span>Promo ({appliedPromo.code})</span>
                    <span className="font-semibold">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">Free delivery on orders over $100</p>
                )}
              </div>

              <div className="flex justify-between pt-4 text-xl font-bold border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Promo code */}
              <div className="mt-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add promo code"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError('');
                    }}
                    className="input-field"
                  />
                  <button onClick={handleApplyPromo} className="px-6 btn-primary">Apply</button>
                </div>
                {promoError && <p className="mt-2 text-xs text-red-500">{promoError}</p>}
                {appliedPromo && <p className="mt-2 text-xs text-green-500">✓ Promo code applied successfully!</p>}
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <p className="font-semibold">Try: SAVE10, SAVE20, WELCOME, FIRST</p>
                </div>
              </div>

              {/* Checkout button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full mt-6 btn-primary"
              >
                {loading ? 'Processing...' : 'Go to Checkout →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;