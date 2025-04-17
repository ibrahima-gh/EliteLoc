<template>
    <div>
      <h1 class="text-2xl font-bold text-[#d4af7f] mb-4">Mes réservations</h1>
      <p class="text-gray-400 mb-6">Toute mes reservations :</p>
  
      <div class="grid gap-6">
        <div v-for="location in locations" :key="location.id_location" class="bg-[#1f1f1f] p-5 rounded-xl max-w-md">
          <div class="max-w-xl ">
          <Vehicles
              :image="location.voiture_image"
              :title="location.voiture_modele"
              :model="location.voiture_marque"
              :id="location.id_voiture"
              :primaryColor="''"
          >
            <template #reserve-button>.</template>
          </Vehicles>
          </div>
          <p class="text-sm text-gray-400 mt-2">Du {{ formatDate(location.date_debut) }} au {{ formatDate(location.date_fin) }}</p>
          <span class="inline-block mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded-full">Confirmée</span>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Vehicles from '@/components/Vehicles.vue'

const locations = ref([])

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}:${month}:${year}`;
}

onMounted(async () => {
  const email = localStorage.getItem('email')
  if (!email) return

  try {
    const userRes = await axios.get(`http://localhost:3000/api/utilisateurs/email/${email}`)
    const id_utilisateur = userRes.data.id_utilisateur

    const res = await axios.get(`http://localhost:3000/api/locations/utilisateur/${id_utilisateur}`)
    locations.value = res.data
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error)
  }
})
</script>