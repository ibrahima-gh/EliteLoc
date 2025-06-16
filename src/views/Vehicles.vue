<template>
  <div class="text-white">
    <img class="w-full opacity-65" src="/bentley.png" alt="">
    <main class=" m-10 grid grid-cols-1 lg:grid-cols-5 gap-5">
   
      <section class="col-span-5">
        <div class="relative max-w-xl mx-auto mb-8 -mt-16">
          <input 
            v-model="searchQuery"
            type="text" 
            class="w-full py-4 px-6 pr-16 rounded-full bg-neutral-900 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF7F]" 
            placeholder="Rechercher un véhicule..." >
          <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-gold-600 hover:bg-gold-700 w-12 h-12 rounded-full flex items-center justify-center transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <div class="flex justify-between items-center mb-6">
          <p class="text-xs text-neutral-400"> Nous possédons {{ filteredVehicles.length }} véhicules</p>
          <div class="flex gap-10 text-xs md:text-base">
            <div class="flex items-center gap-2">
              <span class="size-2 md:size-4 rounded-full bg-[#046C4E] z-50"></span><p>: disponible</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="size-2 md:size-4 rounded-full bg-[#7B1E22] z-50"></span><p>: reservé</p>
            </div>
          </div>
        </div>
      </section>

      
      <section class="col-span-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <vehicles
            v-for="vehicle in filteredVehicles" 
            :id="vehicle.id_voiture" 
            :image="vehicle.url_img" 
            :title="vehicle.marque" 
            :model="vehicle.modele"
            :primaryColor="vehicle.disponibilite ? undefined : '#7B1E22'"
          ></vehicles>

        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

import axiosInstance from '@/utils/axiosInstance';

import Vehicles from '../components/Vehicles.vue'
const vehicles = ref([])
const filteredVehicles = ref([])
const searchQuery = ref('');


onMounted(async () => {
  try {
    const response = await axiosInstance.get('/cars')
    vehicles.value = response.data
    filteredVehicles.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures :', error)
  }
})

watch(searchQuery, (newValue) => {
  filteredVehicles.value = vehicles.value.filter(vehicle =>
    vehicle.marque.toLowerCase().includes(newValue.toLowerCase()) ||
    vehicle.modele.toLowerCase().includes(newValue.toLowerCase())
  );
});
</script>