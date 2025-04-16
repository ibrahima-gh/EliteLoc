import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // L'URL de ton API backend
    timeout: 5000,
});

export default axiosInstance;