import axios from "axios";
import token from "../utils/token";

export const API_BASE_URL = 'http://localhost:8000';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        const tokenData = token.getToken('token');
        if (tokenData) {
            config.headers.Authorization = `Bearer ${tokenData}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            token.removeToken('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)
