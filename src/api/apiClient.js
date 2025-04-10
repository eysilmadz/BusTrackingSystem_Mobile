import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.60.97:8080/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Sadece korunan endpoint’ler için token ekledim
apiClient.interceptors.request.use(
    async (config) => {
        const protectedEndpoints = ['/auth/me']; // Korunan API’ler
        const needsAuth = protectedEndpoints.some((endpoint) => config.url?.includes(endpoint));
        if (needsAuth) {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
