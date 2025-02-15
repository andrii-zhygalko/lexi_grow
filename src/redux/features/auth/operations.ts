import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/api/auth';
import { SignupCredentials, SigninCredentials } from '../../../lib/types/auth';

export const signup = createAsyncThunk(
  'users/signup',
  async (credentials: SignupCredentials) => {
    return await authService.signup(credentials);
  }
);

export const signin = createAsyncThunk(
  'users/signin',
  async (credentials: SigninCredentials) => {
    return await authService.signin(credentials);
  }
);

export const getCurrentUser = createAsyncThunk(
  'users/getCurrentUser',
  async () => {
    return await authService.getCurrentUser();
  }
);

export const signout = createAsyncThunk('auth/signout', async () => {
  await authService.signout();
});
