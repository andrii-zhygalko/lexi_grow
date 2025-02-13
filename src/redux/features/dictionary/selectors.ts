import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

const selectDictionary = (state: RootState) => state.dictionary;

export const selectDictionaryStatus = createSelector(
  [selectDictionary],
  (dictionary) => dictionary.status
);

export const selectCategories = createSelector(
  [selectDictionary],
  (dictionary) => dictionary.categories
);

export const selectFilters = createSelector(
  [selectDictionary],
  (dictionary) => dictionary.filters
);

export const selectWords = createSelector(
  [selectDictionary],
  (dictionary) => dictionary.words
);

export const selectPaginationData = createSelector([selectWords], (words) => ({
  page: words.page,
  totalPages: words.totalPages,
  hasWords: words.results.length > 0,
}));

export const selectStatistics = createSelector(
  [selectDictionary],
  (dictionary) => dictionary.statistics
);
