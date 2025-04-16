import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Vehicles from '../views/Vehicles.vue';
import EmailConfirmation from '@/views/EmailConfirmation.vue';

// vues liées au compte
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
  {
    path: '/account',
    component: AccountLayout,
    children: [
      { path: '', redirect: '/account/reservations' },
      { path: 'reservations', component: Reservations },
      { path: 'profile', component: Profile },
      { path: 'infos', component: Infos },
    ],
    // Ajouter un meta marqueur pour protéger la route
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard global pour détecter les routes protégées
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Vérifier si un token existe

  // Bloquer les routes protégées (requiresAuth) si l'utilisateur n'est pas connecté
  if (to.meta.requiresAuth && !isAuthenticated) {
    alert('Accès interdit. Veuillez vous connecter.');
    next('/login'); // Rediriger vers la page de connexion
  } else {
    next(); // Continuer la navigation
  }
});

export default router;