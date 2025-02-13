import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DictionaryState, WordCategory } from '@/lib/types/dictionary';
import { fetchCategories, fetchWords, fetchStatistics } from './operations';
import { WORDS_PER_PAGE } from '@/lib/constants/dashboard';

type FilterValue = string | number | boolean | WordCategory | null;

const initialState: DictionaryState = {
  categories: [],
  filters: {
    keyword: '',
    category: null,
    isIrregular: null,
    page: 1,
  },
  words: {
    results: [],
    totalPages: 0,
    page: 1,
    perPage: WORDS_PER_PAGE,
  },
  status: 'idle',
  error: null,
  statistics: {
    totalCount: 0,
  },
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        key: keyof DictionaryState['filters'];
        value: FilterValue;
      }>
    ) => {
      const { key, value } = action.payload;
      (state.filters[key] as FilterValue) = value;
      if (key !== 'page') {
        state.filters.page = 1;
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchWords.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.words = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      });
  },
});

export const { setFilter, resetFilters } = dictionarySlice.actions;
export default dictionarySlice.reducer;
