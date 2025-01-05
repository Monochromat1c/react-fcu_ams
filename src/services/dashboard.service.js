import { API_URL, handleResponse, handleError } from './config';

export const getDashboardStats = async (token) => {
  try {
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getRecentActivities = async (token) => {
  try {
    const response = await fetch(`${API_URL}/dashboard/activities`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}; 