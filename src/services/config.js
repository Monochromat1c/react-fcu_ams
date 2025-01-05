const getApiUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    console.error('API URL not configured. Please check your environment variables.');
    return '/api'; // Fallback to relative path which works with same-domain deployments
  }
  return apiUrl;
};

export const API_URL = getApiUrl();

export const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  return data;
};

export const handleError = (error) => {
  if (error.message === 'Failed to fetch') {
    throw new Error('Unable to connect to server. Please check your internet connection.');
  }
  throw error;
}; 