import { createAsyncThunk } from '@reduxjs/toolkit';
import { dictionaryApi } from '@/services/api/dictionary';
import {
  DictionaryState,
  EditWordFormData,
  WordCategory,
} from '@/lib/types/dictionary';
import { ApiError, handleApiError, serializeError } from '@/lib/utils/error';
import { incrementTotalCount, decrementTotalCount } from './dictionarySlice';
import { WORDS_PER_PAGE } from '@/lib/constants/dashboard';

export const fetchCategories = createAsyncThunk(
  'dictionary/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await dictionaryApi.getCategories();
    } catch (error) {
      handleApiError(error as ApiError);
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
      handleApiError(error as ApiError);
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
      handleApiError(error as ApiError);
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
      const apiError = error as ApiError;
      if (apiError.response?.status !== 409) {
        dispatch(decrementTotalCount());
      }
      handleApiError(apiError);
      return rejectWithValue(serializeError(apiError));
    }
  }
);

export const deleteWord = createAsyncThunk(
  'dictionary/deleteWord',
  async (wordId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await dictionaryApi.deleteWord(wordId);
      dispatch(decrementTotalCount());
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.response?.status !== 404) {
        dispatch(incrementTotalCount());
      }
      handleApiError(apiError);
      return rejectWithValue(serializeError(apiError));
    }
  }
);

export const editWord = createAsyncThunk(
  'dictionary/editWord',
  async (
    { wordId, wordData }: { wordId: string; wordData: EditWordFormData },
    { rejectWithValue }
  ) => {
    try {
      return await dictionaryApi.editWord(wordId, wordData);
    } catch (error) {
      handleApiError(error as ApiError);
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);

export const createWord = createAsyncThunk(
  'dictionary/createWord',
  async (
    wordData: {
      en: string;
      ua: string;
      category: WordCategory;
      isIrregular?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      return await dictionaryApi.createWord(wordData);
    } catch (error) {
      handleApiError(error as ApiError);
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);
