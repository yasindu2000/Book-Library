import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  //initial state
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  signup: async (username, email, password) => {
    set({
      isLoading: true,
      message: null,
    });

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
        error: error.response.data.message || "Error signing up",
      });

      throw error;
    }
  },

  login: async(email, password) =>{
    set({
        isLoading: true,
        message: null,
        error: null,
    })

    try {

        const response = await axios.post(`${API_URL}/login` , {
            email,
            password,
        })

        const {user, message} = response.data;

        set({
            user,
            isLoading:false,
            message
        })
        return {user, message}
        
    } catch (error) {
        set({
          isLoading: false,
          error: error.response.data.message || "Error slogging in",
        });
  
        throw error;
      }
  },

  fetchUser : async ()=>{
    set({fetchingUser: true, error:null});

    try {
        
        const response = await axios.get(`${API_URL}/fetch-user`);

        set({
            user: response.data.user , fetchingUser: false,
        })
    } catch (error) {
        set({
          fetchingUser: false,
          error: null,
          user: null,
        });
  
        throw error;
      }
  }
}));
