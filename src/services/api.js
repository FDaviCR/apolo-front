import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5600',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para injetar o Token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hefesto_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para capturar erros 401 (Não autorizado/Token expirado ou inválido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('hefesto_token');
      localStorage.removeItem('hefesto_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
