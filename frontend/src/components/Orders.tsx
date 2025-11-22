import React, { useEffect, useCallback, useState } from 'react';
import { getOrders } from '../services/api';

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

  if (loading) return <div className="py-8 text-center">Loading orders...</div>;
  if (error) return <div className="py-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order: Order) => (
            <div key={order._id} className="p-6 bg-white border rounded-lg shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded text-white ${
                  order.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}>
                  {order.status}
                </span>
              </div>

              <h4 className="mb-4 font-semibold">Order Items</h4>
              <div className="space-y-3">
                {order.items.map((item: OrderItem) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 mt-4 border-t">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold">${(order.totalAmount ?? 0).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;