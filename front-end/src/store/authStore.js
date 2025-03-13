import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    //initial state
    user: null,
    isLoading:false,
    error: null,
    message: null,
    fetchingUser: true,


    signup: async(username, email, password)=>{
       
        set({
            isLoading:true,
            message:null
        })

        try {
            
        } catch (error) {
            
        }
    }


}))