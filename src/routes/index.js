import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Vehicles from '../views/Vehicles.vue'

// Import des vues liées au compte
import AccountLayout from '../views/account/AccountLayout.vue'
import Reservations from '../views/account/Reservations.vue'
import Profile from '../views/account/Profile.vue'
import Infos from '../views/account/Infos.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/vehicles', component: Vehicles },
  {
    path: '/account',
    component: AccountLayout,
    children: [
      { path: '', redirect: '/account/reservations' },
      { path: 'reservations', component: Reservations },
      { path: 'profile', component: Profile },
      { path: 'infos', component: Infos },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router