import { WordCategory, WordResponse } from './dictionary';

export interface RecommendState {
  categories: WordCategory[];
  filters: {
    keyword: string;
    category: WordCategory | null;
    isIrregular: boolean | null;
    page: number;
  };
  words: {
    results: WordResponse[];
    totalPages: number;
    page: number;
    perPage: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
