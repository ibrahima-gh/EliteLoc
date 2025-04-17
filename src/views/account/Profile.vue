<template>
    <div>
      <h1 class="text-2xl font-bold text-[#d4af7f] mb-4">Mon profil</h1>
      <p class="text-gray-400 mb-6">Informations personnelles :</p>
      <ul class="space-y-2 text-sm text-gray-300" v-if="user">
        <li><span class="font-semibold text-white">Nom :</span> {{ user.nom }}</li>
        <li><span class="font-semibold text-white">Prénom :</span> {{ user.prenom }}</li>
        <li><span class="font-semibold text-white">Email :</span> {{ user.email }}</li>
        <li><span class="font-semibold text-white">Téléphone :</span> {{ user.telephone }}</li>
        <li><span class="font-semibold text-white">Adresse :</span> {{ user.adresse }}</li>
      </ul>
    </div>
  </template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

const user = ref<any>(null)

onMounted(async () => {
  const email = localStorage.getItem('email')
  if (email) {
    try {
      const response = await axios.get(`http://localhost:3000/api/utilisateurs/email/${email}`)
      user.value = response.data
    } catch (error) {
      console.error('Erreur lors du chargement des infos utilisateur', error)
    }
  }
})
</script>