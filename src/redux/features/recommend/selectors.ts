import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

const selectRecommend = (state: RootState) => state.recommend;

export const selectRecommendStatus = createSelector(
  [selectRecommend],
  (recommend) => recommend.status
);

export const selectRecommendCategories = createSelector(
  [selectRecommend],
  (recommend) => recommend.categories
);

export const selectRecommendFilters = createSelector(
  [selectRecommend],
  (recommend) => recommend.filters
);

export const selectRecommendWords = createSelector(
  [selectRecommend],
  (recommend) => recommend.words
);

export const selectRecommendPaginationData = createSelector(
  [selectRecommendWords],
  (words) => ({
    page: words.page,
    totalPages: words.totalPages,
    hasWords: words.results.length > 0,
  })
);
