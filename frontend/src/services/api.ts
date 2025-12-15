import axios from 'axios';

// Use environment variable for API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('🔧 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error(`❌ API Error:`, {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      config: error.config
    });
    
    if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
      throw new Error('Cannot connect to backend server. Please check if the server is running.');
    }
    
    if (error.response?.status === 401) {
      throw new Error('Authentication required');
    }
    
    if (error.response?.status === 404) {
      throw new Error('API endpoint not found');
    }
    
    if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    throw error;
  }
);

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

// Test backend connection
export const testBackendConnection = async () => {
  try {
    console.log('🔧 Testing backend connection to:', API_BASE_URL);
    const response = await api.get('/health');
    console.log('✅ Backend connection successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Backend connection test failed:', error);
    if (error.response) {
      throw new Error(`Backend responded with ${error.response.status}: ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response from backend server. Check if the server is running.');
    } else {
      throw new Error(`Backend connection error: ${error.message}`);
    }
  }
};

// Unified API functions
export const productAPI = {
  getProducts: async (params?: any) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProduct: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

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

  updateOrder: async (id: string, updateData: any) => {
    const response = await api.patch(`/orders/${id}`, updateData);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }
};

// Legacy exports for components
export const getProducts = async () => {
  try {
    console.log('🔄 Fetching products from:', `${API_BASE_URL}/products`);
    const data = await productAPI.getAllProducts();
    console.log('📦 Products data received:', data);
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data && data.products && Array.isArray(data.products)) {
      return data.products;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn('⚠️ Unexpected products response format:', data);
      return [];
    }
  } catch (error: any) {
    console.error('❌ Error in getProducts:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  return await productAPI.getProductById(id);
};

export const getOrders = async () => {
  return await orderAPI.getAllOrders();
};