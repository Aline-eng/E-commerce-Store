import React, { useEffect, useCallback, useState } from 'react';
import { getOrders, orderAPI } from '../services/api';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        // Call API to update order status
        await orderAPI.updateOrder(orderId, { status: 'cancelled' });

        // Update local state
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: 'cancelled' } : order
        ));
        alert('Order cancelled successfully');
      } catch (error: any) {
        console.error('Error cancelling order:', error);
        const errorMessage = error.response?.data?.message || 'Failed to cancel order. Please try again.';
        alert(errorMessage);
      }
    }
  };

  const handleTrackOrder = (orderId: string) => {
    alert(`Tracking order ${orderId}...\nStatus: In Transit\nExpected Delivery: 3-5 business days`);
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-16 mx-auto text-center">
        <p className="mb-4 text-red-600 dark:text-red-400">{error}</p>
        <button onClick={loadOrders} className="btn-primary">Try Again</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-black">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">My Orders</h1>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>

        {orders.length === 0 ? (
          <div className="py-16 text-center bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-2xl">
            <svg className="w-24 h-24 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="mb-4 text-xl text-gray-500 dark:text-gray-400">No orders yet</p>
            <Link to="/products" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: Order) => (
              <div key={order._id} className="p-6 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-2xl">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 pb-6 mb-6 border-b border-gray-200 dark:border-gray-800 md:flex-row md:items-center">
                  <div>
                    <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 text-sm font-bold text-white rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-6">
                  <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Order Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item: OrderItem, index: number) => (
                      <div key={item.id || index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg dark:bg-gray-700">
                            <span className="text-2xl">📦</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">${((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total & Actions */}
                <div className="flex flex-col justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-800 md:flex-row md:items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">${(order.totalAmount ?? 0).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    {order.status.toLowerCase() !== 'cancelled' && order.status.toLowerCase() !== 'completed' && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="px-6 py-3 font-semibold text-red-600 transition-all bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-xl hover:bg-red-200 dark:hover:bg-red-800"
                      >
                        Cancel Order
                      </button>
                    )}
                    {order.status.toLowerCase() !== 'cancelled' && (
                      <button
                        onClick={() => handleTrackOrder(order._id)}
                        className="px-6 py-3 font-semibold text-white transition-all bg-black dark:bg-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200"
                      >
                        Track Order
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                      className="px-6 py-3 font-semibold text-gray-700 transition-all bg-gray-200 dark:bg-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      {selectedOrder === order._id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedOrder === order._id && (
                  <div className="p-4 mt-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <h5 className="mb-3 font-bold text-gray-900 dark:text-white">Shipping Information</h5>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p><span className="font-semibold">Address:</span> 123 Main St, City, State 12345</p>
                      <p><span className="font-semibold">Phone:</span> +1 (555) 123-4567</p>
                      <p><span className="font-semibold">Email:</span> customer@example.com</p>
                      <p><span className="font-semibold">Payment Method:</span> Credit Card ending in 4242</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;