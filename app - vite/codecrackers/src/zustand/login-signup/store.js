import { create } from "zustand";
import { getUserProfile, signIn, signUp, verifyOtp } from "./action";

const signuporloginStore = create((set)=> ({
    //initialization
    data: null,
    loading: false,
    error: null,

    //actions
    signInUser: async (userForm) => {
        set({ loading: true, error: null });
        try {
            const response = await signIn(userForm);
            console.log('signInUser', response);
            
            set({ data: response, loading: false });
            return response; // Return the response
        } catch (error) {
            console.error('SignIn Error:', error);
            set({ error: error?.message, loading: false });
            throw error; // Rethrow the error to be handled in the calling function
        }
    },
    signUpUser: async (userForm) => {
        set({ loading: true, error: null });
        try {
            const response = await signUp(userForm);
            console.log('signUpUser', response);
            
            set({ data: response, loading: false });
            return response; // Return the response
        } catch (error) {
            console.error('signUpUser Error:', error);
            set({ error: error?.message, loading: false });
            throw error; // Rethrow the error to be handled in the calling function
        }
    },
    getUserProfile: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getUserProfile();
            console.log('getUserProfile', response);
            
            set({ data: response, loading: false });
            return response; // Return the response
        } catch (error) {
            console.error('getUserProfile Error:', error);
            set({ error: error?.message, loading: false });
            throw error; // Rethrow the error to be handled in the calling function
        }
    },
    verifyOtp: async (otpData) => {
        console.log('otpData', otpData);
        
        set({ loading: true, error: null });
        try {
            const response = await verifyOtp(otpData);
            console.log('signUpUser', response);
            
            set({ data: response, loading: false });
            return response; // Return the response
        } catch (error) {
            console.error('signUpUser Error:', error);
            set({ error: error?.message, loading: false });
            throw error; // Rethrow the error to be handled in the calling function
        }
    },
}));

export default signuporloginStore;