import { ref } from 'vue';
import axiosInstance from '@/utils/axiosInstance';

const isAuthenticated = ref(!!localStorage.getItem('token'));

const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/utilisateurs/connexion', credentials);
        const token = response.data.token;

        // stocke le token dans le localStorage et mets à jour l'état
        localStorage.setItem('token', token);
        isAuthenticated.value = true;

        return response.data.user; // retourner l'utilisateur connecté
    } catch (err) {
        console.error("Erreur de connexion :", err);
        throw err;
    }
};

const logout = () => {
    isAuthenticated.value = false; // mets à jour l'état
    localStorage.removeItem('token'); // supp le token
};

export { isAuthenticated, login, logout };