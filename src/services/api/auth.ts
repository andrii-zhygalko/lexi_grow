import { api } from './config';
import { ApiError, handleApiError } from '@/lib/utils/error';
import Cookies from 'js-cookie';

interface AuthResponse {
  email: string;
  name: string;
  token: string;
}

interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}

export const authService = {
  async signup(data: AuthCredentials) {
    try {
      const response = await api.post<AuthResponse>('/users/signup', data);
      this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as ApiError));
    }
  },

  async signin(data: Omit<AuthCredentials, 'name'>) {
    try {
      const response = await api.post<AuthResponse>('/users/signin', data);
      this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as ApiError));
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get<AuthResponse>('/users/current');
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiError);
    }
  },

  async signout() {
    try {
      await api.post('/users/signout');
      this.removeToken();
    } catch (error) {
      throw new Error(handleApiError(error as ApiError));
    }
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
