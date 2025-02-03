type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
};

export function getErrorMessage(error: ApiError): string {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  switch (error.response?.status) {
    case 400:
      return 'Invalid form data, please check your input';
    case 401:
      return 'Email or password is incorrect';
    case 404:
      return 'Service is currently unavailable';
    case 409:
      return 'Email already exists';
    case 500:
      return 'Server error, please try again later';
    default:
      return error.message || 'Something went wrong';
  }
}
