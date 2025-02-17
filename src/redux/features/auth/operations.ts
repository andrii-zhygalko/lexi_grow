import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/api/auth';
import { SignupCredentials, SigninCredentials } from '@/lib/types/auth';
import { ApiError, handleApiError, serializeError } from '@/lib/utils/error';

export const signup = createAsyncThunk(
  'users/signup',
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.signup(credentials);
      return response;
    } catch (error) {
      handleApiError(error as ApiError);
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);

export const signin = createAsyncThunk(
  'users/signin',
  async (credentials: SigninCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.signin(credentials);
      return response;
    } catch (error) {
      handleApiError(error as ApiError);
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'users/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response;
    } catch (error) {
      handleApiError(error as ApiError);
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);

export const signout = createAsyncThunk(
  'auth/signout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.signout();
    } catch (error) {
      handleApiError(error as ApiError);
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);
