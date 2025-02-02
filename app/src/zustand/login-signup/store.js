import { create } from "zustand";
import { fetchChatOfChatterOrGroup, fetchWhatsappChatter, fetchWhatsappContacts, getProfilePicture, sessionActiveorNot } from "../zustand/cloud/cloud.action";

const chatterStore = create((set)=> ({
    //initialization
    data: null,
    contacts: {},
    loading: false,
    error: null,

    //actions
    fetchChatters: async () => {
        set({ loading: true, error: null });
        try {
            const response = "demo";
            console.log('fetchChatters', response);
            
            set({ data: response, loading: false });
            return response; // Return the response
        } catch (error) {
            set({ error: error?.message, loading: false });
            throw error; // Rethrow the error to be handled in the calling function
        }
    },
}));

export default chatterStore;