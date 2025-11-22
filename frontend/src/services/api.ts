import axios from 'axios';
//import { Product } from '../context/CartContext';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface OrderData {
  customer: {
    name: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  items: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

// Unified API functions that work with both old and new components
export const productAPI = {
  // For new components
  getProducts: async (params?: {
    category?: string;
    featured?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProduct: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // For old components (legacy support)
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
};

export const orderAPI = {
  // For new components
  createOrder: async (orderData: OrderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getOrders: async (email?: string) => {
    const response = await api.get('/orders', { params: { email } });
    return response.data;
  },

  getOrder: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // For old components (legacy support)
  getAllOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

// Legacy exports for components that use the old structure
export const getProducts = async () => {
  try {
    const data = await productAPI.getAllProducts();
    console.log('API Response:', data); // Debug log
    // Handle both response formats
    return data.products || data || [];
  } catch (error) {
    console.error('Error in getProducts:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  return await productAPI.getProductById(id);
};

export const getOrders = async () => {
  return await orderAPI.getAllOrders();
};

// // Add this to see what's happening with API calls
// api.interceptors.request.use((config) => {
//   console.log(`🔄 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
//   return config;
// });

// api.interceptors.response.use(
//   (response) => {
//     console.log(`✅ Response from ${response.config.url}:`, response.data);
//     return response;
//   },
//   (error) => {
//     console.error(`❌ Error from ${error.config?.url}:`, error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );