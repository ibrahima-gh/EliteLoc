import { ref } from 'vue';

// état d'authentification global
const isAuthenticated = ref(!!localStorage.getItem('token'));

// fonctions pour modifier l'état global
const login = () => {
    isAuthenticated.value = true; // modifie l'état après connexion
};

const logout = () => {
    isAuthenticated.value = false; // modifie l'état après déconnexion
    localStorage.removeItem('token'); // supprime le token
};

export { isAuthenticated, login, logout };