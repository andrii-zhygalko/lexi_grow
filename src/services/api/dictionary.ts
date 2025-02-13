import { fetchWithRetry } from '@/lib/utils/api';
import {
  WordCategory,
  WordsResponse,
  WordResponse,
} from '@/lib/types/dictionary';
import { baseURL } from './config';

interface GetWordsParams {
  keyword?: string;
  category?: WordCategory;
  isIrregular?: boolean;
  page?: number;
  limit?: number;
}

export const dictionaryApi = {
  getCategories: async (): Promise<WordCategory[]> => {
    return fetchWithRetry<WordCategory[]>(`${baseURL}/words/categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  getWords: async ({
    keyword = '',
    category,
    isIrregular,
    page = 1,
    limit = 7,
  }: GetWordsParams = {}): Promise<WordsResponse> => {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.append('keyword', keyword.trim());
    }
    if (category) {
      params.append('category', category);
    }
    if (typeof isIrregular === 'boolean') {
      params.append('isIrregular', String(isIrregular));
    }
    params.append('page', String(page));
    params.append('limit', String(limit));

    return fetchWithRetry<WordsResponse>(
      `${baseURL}/words/own?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  },

  getStatistics: async (): Promise<{ totalCount: number }> => {
    return fetchWithRetry<{ totalCount: number }>(
      `${baseURL}/words/statistics`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  },

  getAllWords: async ({
    keyword = '',
    category,
    isIrregular,
    page = 1,
    limit = 7,
  }: GetWordsParams = {}): Promise<WordsResponse> => {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.append('keyword', keyword.trim());
    }
    if (category) {
      params.append('category', category);
    }
    if (typeof isIrregular === 'boolean') {
      params.append('isIrregular', String(isIrregular));
    }
    params.append('page', String(page));
    params.append('limit', String(limit));

    return fetchWithRetry<WordsResponse>(
      `${baseURL}/words/all?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  },

  addWord: async (wordId: string) => {
    return fetchWithRetry<WordResponse>(`/words/add/${wordId}`, {
      method: 'POST',
    });
  },

  deleteWord: async (wordId: string) => {
    return fetchWithRetry<{ message: string; id: string }>(
      `${baseURL}/words/delete/${wordId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  },
};
