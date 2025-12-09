import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');

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

  const subtotal = state.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="container px-4 py-12 mx-auto">
      {/* Breadcrumb */}
      <div className="flex gap-2 mb-8 text-gray-600">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span>Cart</span>
      </div>

      <h1 className="mb-8 text-4xl font-black">YOUR CART</h1>

      {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

      {state.items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="mb-4 text-gray-500">Your cart is empty</p>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart items */}
          <div className="space-y-4 lg:col-span-2">
            {state.items.map((item: any) => (
              <div key={item._id} className="flex items-start gap-4 p-4 card">
                {/* Image */}
                <div className="flex items-center justify-center flex-shrink-0 w-24 h-24 bg-gray-200 rounded">
                  <span className="text-2xl text-gray-400">📸</span>
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <h3 className="mb-2 font-bold">{item.name}</h3>
                  <p className="mb-4 text-sm text-gray-600">Size: Large | Color: White</p>
                  <p className="text-lg font-bold">${item.price}</p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="text-lg font-bold hover:text-gray-600"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="text-lg font-bold hover:text-gray-600"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="btn-danger"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="p-6 space-y-4 card">
              <h3 className="text-lg font-bold">Order Summary</h3>

              <div className="pt-4 space-y-3 border-t">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Discount (-20%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee}</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 text-xl font-bold border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Promo code */}
              <div className="flex gap-2 mt-6">
                <input
                  type="text"
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="input-field"
                />
                <button className="px-6 btn-primary">Apply</button>
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