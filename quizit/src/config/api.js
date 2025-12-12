export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login`,
  signup: `${API_BASE_URL}/auth/signup`,
  quiz: `${API_BASE_URL}/quiz`,
  categories: `${API_BASE_URL}/categories`,
};