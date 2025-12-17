import React, { useState, useEffect } from 'react';
import { Order } from '../../types/admin';
import { fetchOrders, updateOrderStatus } from '../../services/adminApi';
import OrdersManagement from '../../components/admin/OrdersManagement';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      if (!token) return;
      
      const ordersData = await fetchOrders(token);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: any) => {
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      if (!token) return;
      
      const updatedOrder = await updateOrderStatus(token, id, status);
      setOrders(orders.map(o => o._id === id ? updatedOrder : o));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <OrdersManagement orders={orders} onUpdateOrderStatus={handleUpdateOrderStatus} />;
};

export default AdminOrders;