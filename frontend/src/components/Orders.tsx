import React, { useEffect, useCallback, useState } from 'react';
import { orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

interface OrderItem {
  _id?: string;
  product: {
    _id: string;
    name: string;
    image: string;
    category: string;
  };
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface OrderProgress {
  current: string;
  progress: number;
  steps: Array<{
    status: string;
    completed: boolean;
    active: boolean;
  }>;
}

interface Order {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  };
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  shippingMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  progress?: OrderProgress;
  canCancel?: boolean;
  canReturn?: boolean;
  statusHistory?: Array<{
    status: string;
    timestamp: string;
    note: string;
  }>;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const loadOrders = useCallback(async () => {
    if (!isAuthenticated) {
      setError('Please login to view orders');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await orderAPI.getOrders();
      setOrders(response.orders || response); // Handle both new and old API responses
    } catch (err: any) {
      console.error('Orders loading error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await orderAPI.cancelOrder(orderId);
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: 'cancelled' } : order
        ));
        showToast('Order cancelled successfully', 'success');
      } catch (error: any) {
        showToast(error.response?.data?.message || 'Failed to cancel order', 'error');
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
                    <p className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                      Order #{order.orderId || order._id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {order.estimatedDelivery && (
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-2 text-sm font-bold text-white rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                    {order.trackingNumber && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {order.progress && (
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      {order.progress.steps.map((step, index) => (
                        <div key={step.status} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            step.completed ? 'bg-green-500 text-white' : 
                            step.active ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {step.completed ? '✓' : index + 1}
                          </div>
                          <span className="mt-1 text-xs text-gray-600 capitalize dark:text-gray-400">
                            {step.status}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 transition-all duration-300 bg-blue-500 rounded-full" 
                        style={{ width: `${order.progress.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Items */}
                <div className="mb-6">
                  <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Order Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item: OrderItem, index: number) => (
                      <div key={item._id || item.product?._id || index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center gap-4">
                          <img 
                            src={item.image || item.product?.image || '/placeholder.jpg'} 
                            alt={item.name || item.product?.name}
                            className="object-cover w-16 h-16 rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/64x64?text=Product';
                            }}
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {item.name || item.product?.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Qty: {item.quantity}
                              {item.size && ` • Size: ${item.size}`}
                              {item.color && ` • Color: ${item.color}`}
                            </p>
                            {item.product?.category && (
                              <span className="inline-block px-2 py-1 mt-1 text-xs bg-gray-200 rounded dark:bg-gray-700">
                                {item.product.category}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total & Actions */}
                <div className="flex flex-col justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-800 md:flex-row md:items-center">
                  <div className="space-y-2">
                    {order.pricing ? (
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                          <span>Subtotal:</span>
                          <span>${order.pricing.subtotal.toFixed(2)}</span>
                        </div>
                        {order.pricing.tax > 0 && (
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Tax:</span>
                            <span>${order.pricing.tax.toFixed(2)}</span>
                          </div>
                        )}
                        {order.pricing.shipping > 0 && (
                          <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Shipping:</span>
                            <span>${order.pricing.shipping.toFixed(2)}</span>
                          </div>
                        )}
                        {order.pricing.discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>-${order.pricing.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 text-lg font-bold text-gray-900 border-t border-gray-200 dark:border-gray-700 dark:text-white">
                          <span>Total:</span>
                          <span>${order.pricing.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                          ${(order as any).totalAmount ? (order as any).totalAmount.toFixed(2) : '0.00'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {(order.canCancel !== false && ['pending', 'confirmed'].includes(order.status.toLowerCase())) && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="px-6 py-3 font-semibold text-red-600 transition-all bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-xl hover:bg-red-200 dark:hover:bg-red-800"
                      >
                        Cancel Order
                      </button>
                    )}
                    {!['cancelled', 'refunded'].includes(order.status.toLowerCase()) && (
                      <button
                        onClick={() => handleTrackOrder(order._id)}
                        className="px-6 py-3 font-semibold text-white transition-all bg-black dark:bg-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200"
                      >
                        {order.trackingNumber ? 'Track Package' : 'Track Order'}
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                      className="px-6 py-3 font-semibold text-gray-700 transition-all bg-gray-200 dark:bg-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      {selectedOrder === order._id ? 'Hide Details' : 'View Details'}
                    </button>
                    {order.status.toLowerCase() === 'delivered' && order.canReturn !== false && (
                      <button
                        onClick={() => alert('Return process initiated. You will receive return instructions via email.')}
                        className="px-6 py-3 font-semibold text-blue-600 transition-all bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800"
                      >
                        Return Item
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedOrder === order._id && (
                  <div className="p-6 mt-6 space-y-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    {/* Shipping Information */}
                    <div>
                      <h5 className="mb-3 font-bold text-gray-900 dark:text-white">Shipping Information</h5>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p><span className="font-semibold">Name:</span> {order.customer.name}</p>
                        <p><span className="font-semibold">Email:</span> {order.customer.email}</p>
                        {order.customer.phone && (
                          <p><span className="font-semibold">Phone:</span> {order.customer.phone}</p>
                        )}
                        <p><span className="font-semibold">Address:</span> 
                          {order.customer.address.street}, {order.customer.address.city}, 
                          {order.customer.address.state} {order.customer.address.zipCode}, 
                          {order.customer.address.country}
                        </p>
                      </div>
                    </div>
                    
                    {/* Order Details */}
                    <div>
                      <h5 className="mb-3 font-bold text-gray-900 dark:text-white">Order Details</h5>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
                        <p><span className="font-semibold">Shipping Method:</span> {order.shippingMethod}</p>
                        <p><span className="font-semibold">Payment Status:</span> 
                          <span className={`ml-1 px-2 py-1 rounded text-xs ${
                            order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.paymentStatus.toUpperCase()}
                          </span>
                        </p>
                        {order.notes && (
                          <p><span className="font-semibold">Notes:</span> {order.notes}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Status History */}
                    {order.statusHistory && order.statusHistory.length > 0 && (
                      <div>
                        <h5 className="mb-3 font-bold text-gray-900 dark:text-white">Order Timeline</h5>
                        <div className="space-y-3">
                          {order.statusHistory.map((history, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                              <div className="text-sm">
                                <p className="font-semibold text-gray-900 capitalize dark:text-white">
                                  {history.status}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">{history.note}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(history.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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