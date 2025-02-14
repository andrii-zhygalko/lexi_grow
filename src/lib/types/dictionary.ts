export interface WordResponse {
  _id: string;
  en: string;
  ua: string;
  category: WordCategory;
  isIrregular?: boolean | undefined;
  owner: string;
  progress: number;
}

export interface WordsResponse {
  results: WordResponse[];
  totalPages: number;
  page: number;
  perPage: number;
}
export interface EditWordData {
  en: string;
  ua: string;
  category: WordCategory;
  isIrregular: boolean | undefined;
}

export type WordCategory =
  | 'verb'
  | 'participle'
  | 'noun'
  | 'adjective'
  | 'pronoun'
  | 'numerals'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'phrasal verb'
  | 'functional phrase';

export interface DictionaryState {
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
  statistics: {
    totalCount: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface WordsTableProps {
  words: WordResponse[];
  isLoading: boolean;
}

export interface FiltersProps {
  categories: WordCategory[];
  filters: DictionaryState['filters'];
  isLoading: boolean;
  onFilterChange: (filters: Partial<DictionaryState['filters']>) => void;
}

export interface WordsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export interface WordsParams {
  keyword?: string;
  category?: WordCategory;
  isIrregular?: boolean;
  page?: number;
  limit?: number;
}
