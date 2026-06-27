import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT authorization token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (name, email, password) => {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

export const todoService = {
  getAll: async () => {
    const response = await api.get('/api/todos');
    return response.data;
  },
  create: async (todoData) => {
    const response = await api.post('/api/todos', todoData);
    return response.data;
  },
  update: async (id, todoData) => {
    const response = await api.put(`/api/todos/${id}`, todoData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/api/todos/${id}`);
    return response.data;
  },
  patchStatus: async (id, status) => {
    const response = await api.patch(`/api/todos/${id}/status`, { status });
    return response.data;
  },
};

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/api/dashboard');
    return response.data;
  },
};

export default api;
