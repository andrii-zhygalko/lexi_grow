import { fetchWithRetry } from '@/lib/utils/api';
import {
  WordCategory,
  WordsResponse,
  WordResponse,
  EditWordFormData,
  GetWordsParams,
} from '@/lib/types/dictionary';
import { authService } from './auth';

export const dictionaryApi = {
  getCategories: async (): Promise<WordCategory[]> => {
    return fetchWithRetry<WordCategory[]>('/words/categories', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
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

    return fetchWithRetry<WordsResponse>(`/words/own?${params.toString()}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
  },

  getStatistics: async (): Promise<{ totalCount: number }> => {
    return fetchWithRetry<{ totalCount: number }>('/words/statistics', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
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

    return fetchWithRetry<WordsResponse>(`/words/all?${params.toString()}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
  },

  addWord: async (wordId: string) => {
    return fetchWithRetry<WordResponse>(`/words/add/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
  },

  deleteWord: async (wordId: string) => {
    return fetchWithRetry<{ message: string; id: string }>(
      `/words/delete/${wordId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      }
    );
  },

  editWord: async (wordId: string, wordData: EditWordFormData) => {
    return fetchWithRetry<WordResponse>(`/words/edit/${wordId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(wordData),
    });
  },

  createWord: async (wordData: {
    en: string;
    ua: string;
    category: WordCategory;
    isIrregular?: boolean;
  }) => {
    return fetchWithRetry<WordResponse>('/words/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(wordData),
    });
  },
};
