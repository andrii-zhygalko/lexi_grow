import { showError } from './toast';

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
  config?: {
    url?: string;
  };
};

export type SerializedError = {
  message: string;
  status?: number;
  url?: string;
};

export function serializeError(error: ApiError): SerializedError {
  return {
    message: getErrorMessage(error),
    status: error.response?.status,
    url: error.config?.url,
  };
}

export function handleApiError(error: ApiError, customMessage?: string) {
  const errorMessage = getErrorMessage(error);
  showError(customMessage || errorMessage);
  return errorMessage;
}

export function getErrorMessage(error: ApiError): string {
  if (error.response?.status === 401) {
    if (error.config?.url?.endsWith('/users/signin')) {
      return 'Email or password is incorrect';
    }
    return 'Session expired. Please log in again.';
  }

  if (
    error.response?.status === 409 &&
    error.config?.url?.includes('/words/add')
  ) {
    return 'Word already exists in your dictionary';
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  switch (error.response?.status) {
    case 400:
      return 'Invalid form data, please check your input';
    case 404:
      return 'Service is currently unavailable';
    case 409:
      if (error.config?.url?.includes('/words/add')) {
        return 'Word already exists in your dictionary';
      }
      if (error.config?.url?.includes('/users')) {
        return 'This email already exists';
      }
      if (error.response?.data?.message) {
        return error.response.data.message;
      }
      return 'A conflict occurred with existing data';
    case 500:
      return 'Something went wrong, please try again';
    default:
      return error.message || 'Something went wrong';
  }
}
