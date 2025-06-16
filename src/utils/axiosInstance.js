import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://eliteloc-backend.vercel.app',
    timeout: 5000,
});

export default axiosInstance;