import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";


axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

 

  signup: async (username, email, password) => {
    set({ isLoading: true, message: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
      });

      set({
        user: response.data.user,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error signing up.",
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, message: null, error: null });
  
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
  
      const { user, message } = response.data;
  
      if (!user || !user._id) {
        throw new Error("Invalid user data from API");
      }
  
      set({
        user,
        isLoading: false,
        message,
      });
  
      return { user, message };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
  
      throw error;
    }
  },
  

  fetchUser: async () => {
    set({ fetchingUser: true, error: null });
  
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      set({ user: storedUser, fetchingUser: false });
      return;
    }
  
    try {
      const response = await axios.get(`${API_URL}/fetch-user`);
      set({ user: response.data.user, fetchingUser: false });
    } catch (error) {
      set({ error: null, fetchingUser: false, user: null });
    }
  },
  

  logout: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/logout`); 
  
      set({
        message: response.data.message,
        isLoading: false,
        user: null, 
        error: null,
      });
  
      return { message: response.data.message };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging out",
        isLoading: false,
      });
  
      throw error;
    }
  },
  
}));