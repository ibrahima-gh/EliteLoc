import { ref } from 'vue';
const isAuthenticated = ref(!!localStorage.getItem('token'));

const login = () => {
    isAuthenticated.value = true;
};

const logout = () => {
    isAuthenticated.value = false;
    localStorage.removeItem('token');
    localStorage.removeItem('email');
};

export { isAuthenticated, login, logout };