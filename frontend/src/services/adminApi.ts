import axios from 'axios';
import { Product, Order, User, OrderStatus, ProductFormData, UserFormData } from '../types/admin';

const API_URL = process.env.REACT_APP_API_URL;

// Products API
export const fetchProducts = async (token: string): Promise<Product[]> => {
  console.log('Fetching products for admin...');
  const response = await axios.get(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Products response:', response.data);
  return response.data.products || response.data;
};

export const createProduct = async (token: string, productData: ProductFormData): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products`, productData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateProduct = async (token: string, id: string, productData: Partial<ProductFormData>): Promise<Product> => {
  const response = await axios.put(`${API_URL}/products/${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteProduct = async (token: string, id: string): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Orders API
export const fetchOrders = async (token: string): Promise<Order[]> => {
  console.log('Fetching orders for admin...');
  const response = await axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Orders response:', response.data);
  return response.data.orders || response.data;
};

export const updateOrderStatus = async (token: string, id: string, status: OrderStatus): Promise<Order> => {
  const response = await axios.patch(`${API_URL}/orders/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.order || response.data;
};

// Users API
export const fetchUsers = async (token: string): Promise<User[]> => {
  console.log('Fetching users for admin...');
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Users response:', response.data);
  return response.data.users || response.data;
};

export const updateUser = async (token: string, id: string, userData: Partial<UserFormData>): Promise<User> => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.user || response.data;
};

export const deleteUser = async (token: string, id: string): Promise<void> => {
  await axios.delete(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};