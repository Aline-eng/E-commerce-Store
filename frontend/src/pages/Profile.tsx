import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });
  const { showToast } = useToast();

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderAPI.getOrders(user?.email);
      setOrders(data);
    } catch (error) {
      showToast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    showToast('Profile updated successfully!', 'success');
    setEditMode(false);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-black">
      <div className="container px-4 mx-auto max-w-6xl">
        {/* Header */}
        <div className="p-8 mb-8 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-2xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-24 h-24 text-4xl font-black text-white bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 dark:text-black rounded-2xl">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="mb-1 text-3xl font-black text-gray-900 dark:text-white">{user?.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                {user?.role === 'admin' && (
                  <span className="inline-block px-3 py-1 mt-2 text-xs font-bold text-white bg-black rounded-full dark:bg-white dark:text-black">
                    ADMIN
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={logout}
              className="px-6 py-3 font-semibold text-white transition-all bg-red-500 rounded-xl hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-semibold rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-semibold rounded-xl transition-all ${
              activeTab === 'orders'
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 font-semibold rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Content */}
        {activeTab === 'profile' && (
          <div className="p-8 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Personal Information</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 text-sm font-semibold text-black transition-all bg-gray-200 dark:bg-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!editMode}
                  className="w-full px-4 py-3 text-gray-900 transition-all bg-gray-100 border-2 border-transparent rounded-xl dark:bg-gray-800 dark:text-white disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!editMode}
                  className="w-full px-4 py-3 text-gray-900 transition-all bg-gray-100 border-2 border-transparent rounded-xl dark:bg-gray-800 dark:text-white disabled:opacity-60"
                />
              </div>
            </div>

            {editMode && (
              <button
                onClick={handleSave}
                className="px-6 py-3 mt-6 font-bold text-white transition-all bg-black rounded-xl hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Save Changes
              </button>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900 dark:text-white">{orders.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900 dark:text-white">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Wishlist Items</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900 dark:text-white">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reviews</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="p-8 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-2xl">
            <h2 className="mb-6 text-2xl font-black text-gray-900 dark:text-white">Order History</h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="loading-spinner"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="py-12 text-center">
                <p className="mb-4 text-gray-600 dark:text-gray-400">No orders yet</p>
                <Link to="/products" className="btn-primary">Start Shopping</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">Order #{order.orderId}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <span className="px-4 py-2 text-sm font-bold text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-full">
                        {order.status || 'Completed'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                      <p className="text-2xl font-black text-gray-900 dark:text-white">${order.totalAmount?.toFixed(2) || '0.00'}</p>
                      <Link to={`/orders/${order._id}`} className="text-sm font-semibold text-black dark:text-white hover:underline">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-8 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-2xl">
            <h2 className="mb-6 text-2xl font-black text-gray-900 dark:text-white">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Change Password</h3>
                <button className="px-6 py-3 font-semibold text-white transition-all bg-black rounded-xl hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Update Password
                </button>
              </div>
              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <h3 className="mb-3 text-lg font-bold text-red-600">Danger Zone</h3>
                <button className="px-6 py-3 font-semibold text-white transition-all bg-red-500 rounded-xl hover:bg-red-600">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
