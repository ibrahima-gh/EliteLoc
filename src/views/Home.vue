<template>
  <div class="text-white">
    <img class="w-full opacity-65" src="/bentley.png" alt="">
    <main class="flex m-10 gap-5">
      <div class="gap-5 flex flex-col">
        <h2 class="text-2xl font-bold">Vehicules en tendances</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          <vehicles
            v-for="vehicle in filteredVehicles" 
            :key="vehicle.id_voiture" 
            :image="vehicle.image" 
            :title="vehicle.marque" 
            :model="vehicle.modele"
            :primaryColor="''"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Vehicles from '../components/Vehicles.vue'
import axios from 'axios'
const vehicles = ref([])
const filteredVehicles = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/voitures/tendance')
    vehicles.value = response.data
    filteredVehicles.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures :', error)
  }
})
</script>
