import axios from 'axios';

import { API_HOST_URL } from '@env';

const apiClient = axios.create({
    baseURL: API_HOST_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


export const setAuthToken = (token: string) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

export const getRequest = async (endpoint: string, params = {}) => {
    try {
        const response = await apiClient.get(endpoint, { params });
        return response.data;
    } catch (error) {
        const err = error as any;
        console.error('GET Error:', err.response?.data || err.message);
        throw error;
    }
};

export const postRequest = async (endpoint: string, data = {}) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        const err = error as any;
        console.error('GET Error:', err.response?.data || err.message);
        throw error;
    }
};

export const putRequest = async (endpoint: string, data = {}) => {
    try {
        const response = await apiClient.put(endpoint, data);
        return response.data;
    } catch (error) {
        const err = error as any;
        console.error('GET Error:', err.response?.data || err.message);
        throw error;
    }
};

export const deleteRequest = async (endpoint: string) => {
    try {
        const response = await apiClient.delete(endpoint);
        return response.data;
    } catch (error) {
        const err = error as any;
        console.error('GET Error:', err.response?.data || err.message);
        throw error;
    }
};

export default apiClient;
