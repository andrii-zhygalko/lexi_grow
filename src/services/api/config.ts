import axios from 'axios';

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
