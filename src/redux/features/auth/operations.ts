import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/api/auth';
import { SignupCredentials, SigninCredentials } from './types';

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: SignupCredentials) => {
    return await authService.signup(credentials);
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (credentials: SigninCredentials) => {
    return await authService.signin(credentials);
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    return await authService.getCurrentUser();
  }
);

export const signout = createAsyncThunk('auth/signout', async () => {
  await authService.signout();
});
