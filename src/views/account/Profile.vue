<template>
  <div>
    <h1 class="text-2xl font-bold text-[#d4af7f] mb-4">Mon profil</h1>
    <p class="text-gray-400 mb-6">Informations personnelles :</p>
    <div v-if="loading" class="text-white">Chargement...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <ul v-else class="space-y-2 text-sm text-gray-300">
      <li><span class="font-semibold text-white">Nom :</span> {{ user.nom }}</li>
      <li><span class="font-semibold text-white">Prénom :</span> {{ user.prenom }}</li>
      <li><span class="font-semibold text-white">Email :</span> {{ user.email }}</li>
      <li><span class="font-semibold text-white">Téléphone :</span> {{ user.telephone }}</li>
      <li><span class="font-semibold text-white">Adresse :</span> {{ user.adresse }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/utils/axiosInstance';

// Variables réactives
const user = ref({});
const loading = ref(true);
const error = ref(null);

// récupérer les données utilisateur au montage du composant
const fetchUserData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const token = localStorage.getItem('token'); // Récupération du token depuis le localStorage
    if (!token) {
      error.value = "Vous devez être connecté.";
      return;
    }

    // Requête API avec le token
    const { data } = await axiosInstance.get('/utilisateurs/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    user.value = data;
  } catch (err) {
    console.error("Erreur lors de la récupération des données utilisateur :", err);
    error.value = "Impossible de charger vos informations.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUserData); // Appeler la fonction lors du montage du composant
</script>