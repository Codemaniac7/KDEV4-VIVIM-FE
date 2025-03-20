import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const boardAPI = {
  getPosts: async (projectId) => {
    try {
      const response = await axios.get(
        `${API_URL}/projects/${projectId}/posts`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getPost: async (projectId, postId) => {
    try {
      const response = await axios.get(
        `${API_URL}/projects/${projectId}/posts/${postId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createPost: async (projectId, postData) => {
    try {
      const response = await axios.post(
        `${API_URL}/projects/${projectId}/posts`,
        postData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updatePost: async (projectId, postId, postData) => {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${projectId}/posts/${postId}`,
        postData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deletePost: async (projectId, postId) => {
    try {
      await axios.delete(`${API_URL}/projects/${projectId}/posts/${postId}`);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addComment: async (projectId, postId, commentData) => {
    try {
      const response = await axios.post(
        `${API_URL}/projects/${projectId}/posts/${postId}/comments`,
        commentData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateComment: async (projectId, postId, commentId, commentData) => {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${projectId}/posts/${postId}/comments/${commentId}`,
        commentData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteComment: async (projectId, postId, commentId) => {
    try {
      await axios.delete(
        `${API_URL}/projects/${projectId}/posts/${postId}/comments/${commentId}`
      );
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  answerQuestion: async (projectId, postId, questionId, answerData) => {
    try {
      const response = await axios.post(
        `${API_URL}/projects/${projectId}/posts/${postId}/questions/${questionId}/answers`,
        answerData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default boardAPI;
