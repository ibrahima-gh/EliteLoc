import { ref } from 'vue';
import axiosInstance from '@/utils/axiosInstance';

const isAuthenticated = ref(!!localStorage.getItem('user_id'));

const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/login', credentials);
        const userId = response.data.user.id;

        localStorage.setItem('user_id', userId);
        isAuthenticated.value = true;

        return response.data.user;
    } catch (err) {
        console.error("Erreur de connexion :", err);
        throw err;
    }
};

const logout = () => {
    isAuthenticated.value = false;
    localStorage.removeItem('user_id');
};

export { isAuthenticated, login, logout };