import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000,
});

export const apiReport = axios.create({
    baseURL: import.meta.env.VITE_QUEUE_SYSTEM_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000,
})
