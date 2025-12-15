import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardOverview from '../components/admin/DashboardOverview';
import ProductsManagement from '../components/admin/ProductsManagement';
import OrdersManagement from '../components/admin/OrdersManagement';
import UsersManagement from '../components/admin/UsersManagement';
import { AdminSection, DashboardStats, Product, Order, User } from '../types/admin';
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchOrders, updateOrderStatus, fetchUsers, updateUser, deleteUser } from '../services/adminApi';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchAllData();
  }, [user, navigate]);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const [productsData, ordersData, usersData] = await Promise.all([
        fetchProducts(token),
        fetchOrders(token),
        fetchUsers(token),
      ]);

      setProducts(productsData);
      setOrders(ordersData);
      setUsers(usersData);

      const totalRevenue = ordersData.reduce((sum, order) => sum + order.totalAmount, 0);
      setStats({
        products: productsData.length,
        orders: ordersData.length,
        users: usersData.length,
        revenue: totalRevenue,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData: any) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const newProduct = await createProduct(token, productData);
    setProducts([...products, newProduct]);
    setStats(prev => ({ ...prev, products: prev.products + 1 }));
  };

  const handleEditProduct = async (id: string, productData: any) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const updatedProduct = await updateProduct(token, id, productData);
    setProducts(products.map(p => p._id === id ? updatedProduct : p));
  };

  const handleDeleteProduct = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    await deleteProduct(token, id);
    setProducts(products.filter(p => p._id !== id));
    setStats(prev => ({ ...prev, products: prev.products - 1 }));
  };

  const handleUpdateOrderStatus = async (id: string, status: any) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const updatedOrder = await updateOrderStatus(token, id, status);
    setOrders(orders.map(o => o._id === id ? updatedOrder : o));
  };

  const handleEditUser = async (id: string, userData: any) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const updatedUser = await updateUser(token, id, userData);
    setUsers(users.map(u => u._id === id ? updatedUser : u));
  };

  const handleDeleteUser = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    await deleteUser(token, id);
    setUsers(users.filter(u => u._id !== id));
    setStats(prev => ({ ...prev, users: prev.users - 1 }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 ml-64">
        <div className="p-8">
          {activeSection === 'dashboard' && <DashboardOverview stats={stats} />}
          
          {activeSection === 'products' && (
            <ProductsManagement
              products={products}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}
          
          {activeSection === 'orders' && (
            <OrdersManagement
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}
          
          {activeSection === 'users' && (
            <UsersManagement
              users={users}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          )}
          
          {activeSection === 'settings' && (
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Settings</h2>
              <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 rounded-xl p-6">
                <p className="text-gray-600 dark:text-gray-400">Settings section coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;