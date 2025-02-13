import { createAsyncThunk } from '@reduxjs/toolkit';
import { dictionaryApi } from '@/services/api/dictionary';
import { RecommendState } from '@/lib/types/recommend';
import { ApiError, serializeError } from '@/lib/utils/error';
import { WORDS_PER_PAGE } from '@/lib/constants/dashboard';

export const fetchWords = createAsyncThunk(
  'recommend/fetchWords',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { recommend: RecommendState };
      const { keyword, category, isIrregular, page } = state.recommend.filters;

      return await dictionaryApi.getAllWords({
        keyword,
        category: category || undefined,
        isIrregular: isIrregular || undefined,
        page,
        limit: WORDS_PER_PAGE,
      });
    } catch (error) {
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'recommend/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await dictionaryApi.getCategories();
    } catch (error) {
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);
