import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Vehicles from '../views/Vehicles.vue';
import EmailConfirmation from '@/views/EmailConfirmation.vue';
import Admin from '../views/Admin.vue';

import AccountLayout from '../views/account/AccountLayout.vue'
import Reservations from '../views/account/Reservations.vue'
import Profile from '../views/account/Profile.vue'
import Infos from '../views/account/Infos.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/vehicles', component: Vehicles },
  { path: '/email-confirmation', component: EmailConfirmation },
  { path: '/admin', component: Admin },
  {
    path: '/account',
    component: AccountLayout,
    children: [
      { path: '', redirect: '/account/profile' },
      { path: 'reservations', component: Reservations },
      { path: 'profile', component: Profile },
      { path: 'infos', component: Infos },
    ],
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    alert('Accès interdit. Veuillez vous connecter.');
    next('/login');
  } else {
    next();
  }
});

export default router;