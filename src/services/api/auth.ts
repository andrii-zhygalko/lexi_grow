import { api } from './config';
import Cookies from 'js-cookie';
import type { AuthResponse, AuthCredentials } from '@/lib/types/auth';

export const authService = {
  async signup(data: AuthCredentials) {
    const response = await api.post<AuthResponse>('/users/signup', data);
    this.setToken(response.data.token);
    return response.data;
  },

  async signin(data: Omit<AuthCredentials, 'name'>) {
    const response = await api.post<AuthResponse>('/users/signin', data);
    this.setToken(response.data.token);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get<AuthResponse>('/users/current');
    return response.data;
  },

  async signout() {
    await api.post('/users/signout');
    this.removeToken();
  },

  getToken() {
    const localToken = localStorage.getItem('token');
    const cookieToken = Cookies.get('token');

    if (localToken !== cookieToken) {
      this.removeToken();
      return null;
    }

    return localToken;
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
    Cookies.set('token', token, {
      expires: 7,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
  },

  removeToken() {
    localStorage.removeItem('token');
    Cookies.remove('token', { path: '/' });
  },
};
