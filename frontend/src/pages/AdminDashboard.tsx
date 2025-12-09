import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(data);
      setStats({ products: data.length, orders: 0, users: 0, revenue: 0 });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="loading-spinner"></div></div>;
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-black">
      <div className="container px-4 mx-auto">
        <h1 className="mb-8 text-4xl font-black text-gray-900 dark:text-white">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <div className="p-6 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.products}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg dark:bg-blue-900">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.orders}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg dark:bg-green-900">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">{stats.users}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg dark:bg-purple-900">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">${stats.revenue}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg dark:bg-yellow-900">
                <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-xl">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-950">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">Product</th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">Category</th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">Price</th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">Stock</th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {products.map((product: any) => (
                  <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-950">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={product.image} alt={product.name} className="object-cover w-12 h-12 rounded-lg" />
                        <span className="ml-3 font-medium text-gray-900 dark:text-white">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{product.category}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">${product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">⭐ {product.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
