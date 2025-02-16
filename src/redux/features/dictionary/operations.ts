import { createAsyncThunk } from '@reduxjs/toolkit';
import { dictionaryApi } from '@/services/api/dictionary';
import {
  DictionaryState,
  EditWordFormData,
  WordCategory,
} from '@/lib/types/dictionary';
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

export const deleteWord = createAsyncThunk(
  'dictionary/deleteWord',
  async (wordId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await dictionaryApi.deleteWord(wordId);
      dispatch(decrementTotalCount());
      return response;
    } catch (error) {
      if ((error as ApiError).response?.status !== 404) {
        dispatch(incrementTotalCount());
      }
      return rejectWithValue(serializeError(error as ApiError));
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
      const response = await dictionaryApi.editWord(wordId, wordData);
      return response;
    } catch (error) {
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
      const data = await dictionaryApi.createWord(wordData);
      return data;
    } catch (error) {
      return rejectWithValue(serializeError(error as ApiError));
    }
  }
);
