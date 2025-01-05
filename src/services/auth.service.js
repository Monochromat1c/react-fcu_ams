import { API_URL, handleResponse, handleError } from './config';

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const confirmLogout = (callback) => {
  return new Promise((resolve) => {
    if (callback) {
      callback(() => {
        localStorage.removeItem('token');
        resolve(true);
      });
    } else {
      localStorage.removeItem('token');
      resolve(true);
    }
  });
}; 