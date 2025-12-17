import React, { useState, useEffect } from 'react';
import { DashboardStats } from '../../types/admin';
import { fetchProducts, fetchOrders, fetchUsers } from '../../services/adminApi';
import DashboardOverview from '../../components/admin/DashboardOverview';

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({ products: 0, orders: 0, users: 0, revenue: 0 });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const [productsData, ordersData, usersData] = await Promise.all([
        fetchProducts(token).catch(() => []),
        fetchOrders(token).catch(() => []),
        fetchUsers(token).catch(() => []),
      ]);

      const products = Array.isArray(productsData) ? productsData : [];
      const orders = Array.isArray(ordersData) ? ordersData : [];
      const users = Array.isArray(usersData) ? usersData : [];

      const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.pricing?.total || order.totalAmount || 0), 0);
      setStats({
        products: products.length,
        orders: orders.length,
        users: users.length,
        revenue: totalRevenue,
      });
    } catch (error) {
      setError('Failed to load admin data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button 
          onClick={fetchAllData}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <DashboardOverview stats={stats} />;
};

export default AdminDashboard;