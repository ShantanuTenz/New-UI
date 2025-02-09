import axios from 'axios';
import { API_URL } from '../../utils/api';

export const signUp = async (userFormData) => {
    try {
        const res = await axios.post(`${API_URL}/code/signup`, userFormData);
        console.log('signUp', res);
        return res;
    } catch (error) {
        console.error('Error while signUp', error);
    }
};

export const signIn = async (userFormData) => {
    try {
        const res = await axios.post(`${API_URL}/code/signin`, userFormData);
        console.log('signIn', res);
        return res;
    } catch (error) {
        console.error('Error while sign in', error);
    }
};

export const getUserProfile = async (userFormData) => {
    try {
        const res = await axios.get(`${API_URL}/student/profile`);
        console.log('getUserProfile', res);
        return res;
    } catch (error) {
        console.error('Error while signUp', error);
    }
};

export const verifyOtp = async (object) => {
    try {
        const res = await axios.post(`${API_URL}/code/verify?email=${object?.email}&otp=${object?.otpString}`);
        console.log('getUserProfile', res);
        return res;
    } catch (error) {
        console.error('Error while signUp', error);
    }
};
