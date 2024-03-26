import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
const API_URL = import.meta.env.VITE_REACT_API_URL;
export const authService = {
    login: async (userFormData) => {
        try {
            const response = await axios.post(
                `${API_URL}/auth/login`,
                {
                    username: userFormData.username,
                    password: userFormData.password,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                localStorage.setItem(
                    import.meta.env.VITE_ACCESS_TOKEN_NAME,
                    response.data.accessToken
                );
            }
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, error: error.message };
        }
    },
    register: async (userFormData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                username: userFormData.username,
                email: userFormData.email,
                password: userFormData.password,
            });
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, error: error.message };
        }
    },
    verify: async () => {
        if (localStorage[import.meta.env.VITE_ACCESS_TOKEN_NAME]) {
            setAuthToken(localStorage[import.meta.env.VITE_ACCESS_TOKEN_NAME]);
        }
        try {
            const response = await axios.get(`${API_URL}/auth/verify`);
            return response.data;
        } catch (error) {
            return authService.refreshAccessToken();
        }
    },
    refreshAccessToken: async () => {
        try {
            const response = await axios.post(
                `${API_URL}/auth/refreshToken`,
                {},
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                localStorage.setItem(
                    import.meta.env.VITE_ACCESS_TOKEN_NAME,
                    response.data.accessToken
                );
            }
            return response.data;
        } catch (error) {
            localStorage.removeItem(import.meta.env.VITE_ACCESS_TOKEN_NAME);
            setAuthToken(null);
            return { success: false, error: error.response.data };
        }
    },
};
