import { api } from '@/services/api/config';
import type { AxiosRequestConfig } from 'axios';

export const RETRY_CONFIG = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
};

export async function fetchWithRetry<T>(
  url: string,
  options?: RequestInit,
  config = RETRY_CONFIG
): Promise<T> {
  let attempt = 1;
  let delay = config.initialDelay;

  while (attempt <= config.maxAttempts) {
    try {
      const headers = options?.headers
        ? Object.fromEntries(
            options.headers instanceof Headers
              ? Array.from(options.headers.entries())
              : Object.entries(options.headers)
          )
        : undefined;

      const axiosConfig: AxiosRequestConfig = {
        url,
        method: options?.method || 'GET',
        data: options?.body,
        headers,
      };

      const response = await api.request(axiosConfig);
      return response.data;
    } catch (error) {
      if (attempt === config.maxAttempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * config.backoffFactor, config.maxDelay);
      attempt++;
    }
  }

  throw new Error('Max retry attempts reached');
}
