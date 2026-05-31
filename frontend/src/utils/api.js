import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://noor-crochets-xy6dgovgt-navjotsinghsaini718-8773s-projects.vercel.app/api';

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
    createDirect: (orderData) => axios.post(`${API_URL}/orders/direct`, orderData, getAuthConfig()),
    getMyOrders: () => axios.get(`${API_URL}/orders/myorders`, getAuthConfig()),
    getById: (id) => axios.get(`${API_URL}/orders/${id}`, getAuthConfig()),
    getByNumber: (orderNumber) => axios.get(`${API_URL}/orders/number/${orderNumber}`, getAuthConfig()),
    getAll: () => axios.get(`${API_URL}/orders`, getAuthConfig()),
    updateToPaid: (id, paymentResult) =>
        axios.put(`${API_URL}/orders/${id}/pay`, paymentResult, getAuthConfig()),
    updateStatus: (id, status, note) =>
        axios.put(`${API_URL}/orders/${id}/status`, { status, note }, getAuthConfig()),
    cancel: (id, reason) =>
        axios.put(`${API_URL}/orders/${id}/cancel`, { reason }, getAuthConfig()),
};

// Cart APIs
export const cartAPI = {
    get: () => axios.get(`${API_URL}/cart`, getAuthConfig()),
    add: (item) => axios.post(`${API_URL}/cart/add`, item, getAuthConfig()),
    update: (item) => axios.put(`${API_URL}/cart/update`, item, getAuthConfig()),
    remove: (item) => axios.delete(`${API_URL}/cart/remove`, {
        ...getAuthConfig(),
        data: item
    }),
    clear: () => axios.delete(`${API_URL}/cart/clear`, getAuthConfig()),
    sync: (items) => axios.post(`${API_URL}/cart/sync`, { items }, getAuthConfig()),
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
