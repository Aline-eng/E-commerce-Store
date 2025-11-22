import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Products
export const getProducts = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/products`);
  return data.products; // Return just the products array
};

export const getProductById = async (id: string) => {
  const { data } = await axios.get(`${API_BASE_URL}/products/${id}`);
  return data;
};

// Orders
export const getOrders = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/orders`);
  return data;
};

export const orderAPI = {
  createOrder: async (orderData: any) => {
    const { data } = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return data;
  },
  getOrders: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/orders`);
    return data;
  },
  getOrderById: async (id: string) => {
    const { data } = await axios.get(`${API_BASE_URL}/orders/${id}`);
    return data;
  },
};

// Auth (if needed)
export const authAPI = {
  login: async (email: string, password: string) => {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return data;
  },
  register: async (userData: any) => {
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return data;
  },
};