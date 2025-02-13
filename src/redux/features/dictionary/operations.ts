import { createAsyncThunk } from '@reduxjs/toolkit';
import { dictionaryApi } from '@/services/api/dictionary';
import { DictionaryState } from '@/lib/types/dictionary';
import { ApiError, serializeError } from '@/lib/utils/error';
import {
  incrementTotalCount,
  decrementTotalCount,
} from '@/redux/features/dictionary/dictionarySlice';

const WORDS_PER_PAGE = 7;

export const fetchCategories = createAsyncThunk(
  'dictionary/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await dictionaryApi.getCategories();
    } catch (error) {
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);

export const fetchWords = createAsyncThunk(
  'dictionary/fetchWords',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { dictionary: DictionaryState };
      const { keyword, category, isIrregular, page } = state.dictionary.filters;

      return await dictionaryApi.getWords({
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

export const fetchStatistics = createAsyncThunk(
  'dictionary/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      return await dictionaryApi.getStatistics();
    } catch (error) {
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);

export const addWordToDictionary = createAsyncThunk(
  'dictionary/addWord',
  async (wordId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await dictionaryApi.addWord(wordId);
      dispatch(incrementTotalCount());
      return response;
    } catch (error) {
      if ((error as ApiError).response?.status !== 409) {
        dispatch(decrementTotalCount());
      }
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);
