import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Get auth config
const getAuthConfig = () => {
    const userInfo = localStorage.getItem('userInfo');
    const user = userInfo ? JSON.parse(userInfo) : null;

    return {
        headers: {
            'Content-Type': 'application/json',
            ...(user?.token && { Authorization: `Bearer ${user.token}` }),
        },
    };
};

// Product APIs
export const productAPI = {
    getAll: (params) => axios.get(`${API_URL}/products`, { params }),
    getById: (id) => axios.get(`${API_URL}/products/${id}`),
    create: (productData) => axios.post(`${API_URL}/products`, productData, getAuthConfig()),
    update: (id, productData) => axios.put(`${API_URL}/products/${id}`, productData, getAuthConfig()),
    delete: (id) => axios.delete(`${API_URL}/products/${id}`, getAuthConfig()),
    getCategories: () => axios.get(`${API_URL}/products/categories/all`),
};

// Order APIs
export const orderAPI = {
    create: (orderData) => axios.post(`${API_URL}/orders`, orderData, getAuthConfig()),
    getMyOrders: () => axios.get(`${API_URL}/orders/myorders`, getAuthConfig()),
    getById: (id) => axios.get(`${API_URL}/orders/${id}`, getAuthConfig()),
    getAll: () => axios.get(`${API_URL}/orders`, getAuthConfig()),
    updateToPaid: (id, paymentResult) =>
        axios.put(`${API_URL}/orders/${id}/pay`, paymentResult, getAuthConfig()),
    updateStatus: (id, status) =>
        axios.put(`${API_URL}/orders/${id}/status`, { status }, getAuthConfig()),
};

// Custom Order APIs
export const customOrderAPI = {
    create: (orderData) => axios.post(`${API_URL}/custom-orders`, orderData, getAuthConfig()),
    getMyOrders: () => axios.get(`${API_URL}/custom-orders/my-orders`, getAuthConfig()),
    getById: (id) => axios.get(`${API_URL}/custom-orders/${id}`, getAuthConfig()),
    getAll: () => axios.get(`${API_URL}/custom-orders`, getAuthConfig()),
    update: (id, orderData) =>
        axios.put(`${API_URL}/custom-orders/${id}`, orderData, getAuthConfig()),
    delete: (id) => axios.delete(`${API_URL}/custom-orders/${id}`, getAuthConfig()),
};

// Auth APIs
export const authAPI = {
    login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
    register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
    getProfile: () => axios.get(`${API_URL}/auth/profile`, getAuthConfig()),
    updateProfile: (userData) => axios.put(`${API_URL}/auth/profile`, userData, getAuthConfig()),
};
