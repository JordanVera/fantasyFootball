import axios from 'axios';

const API_URL = 'http://localhost:5555/api/users';

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = (_) => localStorage.removeItem('user');

const getUsers = async (_) => {
  const response = await axios.get(`${API_URL}/all`);

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getUsers,
};

export default authService;
