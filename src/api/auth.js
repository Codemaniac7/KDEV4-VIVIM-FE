import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const authAPI = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default authAPI;
