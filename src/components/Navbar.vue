<template>
  <div class="absolute top-10 left-10 right-10 flex justify-between items-center z-20">
    <RouterLink to="/" class="text-5xl font-bold text-white">
      <h1>Elite Loc</h1>
    </RouterLink>
    <nav class="flex gap-6">
      <!-- liens accessibles à tous -->
      <RouterLink to="/vehicles" class="text-white font-bold text-lg px-5 py-2 hover:text-[#C8AD7F]">Véhicules</RouterLink>
      <RouterLink v-if="!isAuthenticated" to="/register" class="text-white font-bold text-lg px-5 py-2 rounded-full bg-[#C8AD7F] hover:opacity-90">S'identifier</RouterLink>

      <!-- pour les utilisateurs connectés -->
      <div v-if="isAuthenticated" class="flex gap-6">
        <RouterLink to="/account" class="text-[#C8AD7F] hover:text-white font-bold text-lg px-5 py-2 hover:bg-[#C8AD7F90] rounded-full hover:opacity-90 transition-all duration-400">
          Mon Compte
        </RouterLink>
      </div>

      <!-- Bouton Déconnexion -->
      <button
          v-if="isAuthenticated"
          @click="logout"
          class="text-red-600 hover:text-white font-bold text-lg px-5 py-2 rounded-full hover:bg-red-600 cursor-pointer transition-all duration-400"
      >
        Déconnexion
      </button>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { isAuthenticated, logout } from '@/store/auth'; // Importer l'état partagé et la fonction logout
import { ref } from 'vue';

const router = useRouter();

const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token'); // Récupérer le token
    if (!token) return;

    await fetch('http://localhost:3000/utilisateurs/deconnexion', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    logout(); // Utiliser l'état global pour gérer la déconnexion

    router.push('/'); // Rediriger vers la page d'accueil
    alert('Vous êtes déconnecté avec succès.');
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
    alert('Une erreur est survenue lors de la déconnexion. Veuillez réessayer.');
  }
};
</script>