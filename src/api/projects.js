import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const projectsAPI = {
  getProjects: async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getProject: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await axios.post(`${API_URL}/projects`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateProject: async (id, projectData) => {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${id}`,
        projectData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteProject: async (id) => {
    try {
      await axios.delete(`${API_URL}/projects/${id}`);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getProjectChecklist: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${id}/checklist`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateChecklistItem: async (projectId, itemId, itemData) => {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${projectId}/checklist/${itemId}`,
        itemData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default projectsAPI;
