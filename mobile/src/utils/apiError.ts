import axios from 'axios';

/**
 * Normalizes Axios and unknown errors into a user-friendly message.
 */
export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }

    if (error.message === 'Network Error') {
      return 'Unable to reach the server. Check your connection and try again.';
    }

    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please try again.';
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};
