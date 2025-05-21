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
        <div class="text-center mb-8">
          <button class="bg-neutral-900 hover:bg-neutral-800 px-6 py-3 rounded-full font-bold shadow-md flex items-center gap-2 mx-auto transition" @click="toggleFilters">
            Filtres
            <span :class="showFilters ? 'rotate-180' : ''" class="transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <transition name="fade">
            <div v-if="showFilters" class="bg-neutral-900 rounded-xl p-6 mt-4 shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div>
                <h3 class="text-[#d4af7f] text-lg font-semibold mb-3">Marque</h3>
                <div class="flex flex-wrap gap-2">
                  <label v-for="brand in brands" :key="brand" class="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-700 transition">
                    <input type="checkbox" :value="brand" class="hidden" />
                    <span class="w-4 h-4 border-2 border-neutral-600 rounded-sm bg-transparent transition-all hover:bg-[#d4af7f]"></span>
                    {{ brand }}
                  </label>
                </div>
              </div>
              <div>
                <h3 class="text-[#d4af7f] text-lg font-semibold mb-3">Prix</h3>
                <div class="flex flex-col gap-3">
                  <input type="range" min="0" max="500" step="10" v-model="priceRange" class="w-full h-2 rounded bg-neutral-800 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#d4af7f]" />
                  <span class="text-center font-bold text-[#d4af7f]">{{ priceRange }}€/jour</span>
                </div>
              </div>
              <div>
                <h3 class="text-[#d4af7f] text-lg font-semibold mb-3">Type</h3>
                <div class="flex flex-wrap gap-2">
                  <label v-for="type in vehicleTypes" :key="type" class="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-700 transition">
                    <input type="checkbox" :value="type" class="hidden" />
                    <span class="w-4 h-4 border-2 border-neutral-600 rounded-sm bg-transparent transition-all hover:bg-[#d4af7f]"></span>
                    {{ type }}
                  </label>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="flex justify-between items-center mb-6">
          <p class="text-sm text-neutral-400"> Nous possédons {{ filteredVehicles.length }} véhicules</p>
          <div class="flex gap-10">
            <div class="flex items-center gap-2">
              <span class="size-4 rounded-full bg-[#046C4E] z-50"></span><p>: disponible</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="size-4 rounded-full bg-[#7B1E22] z-50"></span><p>: non disponible</p>
            </div>
          </div>
          <select class="bg-neutral-900 text-white border-none px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF7F]">
            <option>Trier par: Pertinence</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Année récente</option>
          </select>
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
import axios from 'axios'

import Vehicles from '../components/Vehicles.vue'
const vehicles = ref([])
const filteredVehicles = ref([])
const showFilters = ref(false)
const priceRange = ref(200)

const brands = ['Peugeot', 'BMW', 'Audi', 'Mercedes', 'Renault', 'Volkswagen']
const vehicleTypes = ['Berline', 'SUV', 'Citadine', 'Sportive', 'Break']
const searchQuery = ref('');

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/cars')
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>