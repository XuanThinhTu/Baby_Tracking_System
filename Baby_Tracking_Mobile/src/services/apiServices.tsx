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


const cancelTokenSource = axios.CancelToken.source();

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (axios.isCancel(error)) {
            console.log("Request cancelled:", error.message);
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            console.log("Token expired. Redirecting to login...");
            // TODO: Thực hiện refresh token nếu có API refresh
        }

        console.log(error)

        return Promise.reject(error.response?.data || "Something went wrong");
    }
);

// GET Request
export const getRequest = async (endpoint: string, params = {}, headers = {}) => {
    return (await apiClient.get(endpoint, { params, headers, cancelToken: cancelTokenSource.token })).data;
};

// POST Request
export const postRequest = async (endpoint: string, data = {}, headers = {}) => {
    return (await apiClient.post(endpoint, data, { headers, cancelToken: cancelTokenSource.token })).data;
};
// PUT Request
export const putRequest = async (endpoint: string, data = {}, headers = {}) => {
    return (await apiClient.put(endpoint, data, { headers, cancelToken: cancelTokenSource.token })).data;
};

// DELETE Request
export const deleteRequest = async (endpoint: string, headers = {}) => {
    return (await apiClient.delete(endpoint, { cancelToken: cancelTokenSource.token })).data;
};

export default apiClient;
