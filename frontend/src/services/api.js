import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor for JWT
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    register: (userData) => api.post('/users/register', userData),
    loginWithPassword: (credentials) => api.post('/users/login/password', credentials),
    sendOtp: (phoneNumber) => api.post(`/users/login/send-otp?phoneNumber=${phoneNumber}`),
    verifyOtp: (otpData) => api.post('/users/login/verify-otp', otpData),
    sendEmailOtp: (email) => api.post(`/users/login/email-otp?email=${encodeURIComponent(email)}`),
    verifyEmailOtp: (data) => api.post('/users/verify/email-otp', data),
    forgotPassword: (email) => api.post(`/users/forgot-password?email=${encodeURIComponent(email)}`),
    resetPassword: (token, newPassword) => api.post(`/users/reset-password?token=${token}&newPassword=${newPassword}`),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (profileData) => api.patch('/users/profile', profileData),
    deleteProfile: (softDelete = true) => api.delete(`/users/delete?softDelete=${softDelete}`),
    // New profile-based address endpoints (recommended)
    getAddresses: () => api.get('/users/profile/addresses'),
    addAddress: (addressData) => api.post('/users/profile/addresses', addressData),
    updateAddress: (addressId, addressData) => api.put(`/users/profile/addresses/${addressId}`, addressData),
    deleteAddress: (addressId) => api.delete(`/users/profile/addresses/${addressId}`),
};

export const placeApi = {
    search: (query) => api.get(`/places/search?query=${encodeURIComponent(query)}`),
    getByCity: (city) => api.get(`/places/city/${city}`),
    getByState: (state) => api.get(`/places/state/${state}`),
    getAll: () => api.get('/places'),
};

export const restaurantApi = {
    searchRestaurants: (source, destination) => api.get('/restaurants/search', { params: { source, destination } }),
    getNearbyRestaurants: (latitude, longitude, maxDistanceKm = 50) => api.get('/restaurants/nearby', { params: { latitude, longitude, maxDistanceKm } }),
    getRestaurantById: (id) => api.get(`/restaurants/${id}`),
};

export default api;
