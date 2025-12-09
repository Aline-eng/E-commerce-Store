import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const register = async (name: string, email: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
  return data;
};

export const logout = async (refreshToken: string) => {
  await api.post('/auth/logout', { refreshToken });
};

export const getProfile = async () => {
  const { data } = await api.get('/auth/profile');
  return data;
};

export const updateProfile = async (name: string, avatar?: string) => {
  const { data } = await api.put('/auth/profile', { name, avatar });
  return data;
};

export const requestPasswordReset = async (email: string) => {
  const { data } = await axios.post(`${API_URL}/auth/password-reset-request`, { email });
  return data;
};

export const resetPassword = async (token: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/auth/password-reset`, { token, password });
  return data;
};

export default api;
