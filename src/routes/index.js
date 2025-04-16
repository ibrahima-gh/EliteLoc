import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Vehicles from '../views/Vehicles.vue';
import Account from '../views/Account.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/vehicles', component: Vehicles },
  { path: '/account', component: Account },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;