<template>
  <div class="min-h-screen bg-black text-white">
    <main class="px-8 py-12 max-w-[1400px] mx-auto">
      <div class="mb-8">
        <div class="relative max-w-3xl mx-auto mb-6">
          <input 
            type="text" 
            class="w-full py-4 px-6 pr-16 rounded-full bg-zinc-900 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Rechercher un véhicule..." 
          />
          <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <div class="text-center">
          <button class="bg-zinc-900 hover:bg-zinc-800 px-6 py-3 rounded-full font-bold shadow-md flex items-center gap-2 mx-auto" @click="toggleFilters">
            Filtres
            <span :class="showFilters ? 'border-b-[6px] border-white' : 'border-t-[6px] border-white'" class="w-0 h-0 border-x-[6px] border-x-transparent transition-all"></span>
          </button>

          <transition name="fade-slide">
            <div v-if="showFilters" class="bg-zinc-900 rounded-xl p-6 mt-4 shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 class="text-blue-500 text-lg font-semibold mb-3">Marque</h3>
                <div class="flex flex-wrap gap-2">
                  <label v-for="brand in brands" :key="brand" class="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full cursor-pointer hover:bg-zinc-700">
                    <input type="checkbox" :value="brand" class="hidden" />
                    <span class="w-4 h-4 border-2 border-zinc-600 rounded-sm bg-transparent"></span>
                    {{ brand }}
                  </label>
                </div>
              </div>

              <div>
                <h3 class="text-blue-500 text-lg font-semibold mb-3">Prix</h3>
                <div class="flex flex-col gap-3">
                  <input type="range" min="0" max="500" step="10" v-model="priceRange" class="w-full h-2 rounded bg-zinc-800 appearance-none" />
                  <span class="text-center font-bold text-blue-500">{{ priceRange }}€/jour</span>
                </div>
              </div>

              <div>
                <h3 class="text-blue-500 text-lg font-semibold mb-3">Type</h3>
                <div class="flex flex-wrap gap-2">
                  <label v-for="type in vehicleTypes" :key="type" class="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full cursor-pointer hover:bg-zinc-700">
                    <input type="checkbox" :value="type" class="hidden" />
                    <span class="w-4 h-4 border-2 border-zinc-600 rounded-sm bg-transparent"></span>
                    {{ type }}
                  </label>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="flex justify-between items-center mb-6">
        <p class="text-sm text-zinc-400">{{ filteredVehicles.length }} résultats</p>
        <select class="bg-zinc-900 text-white border-none px-4 py-2 rounded-full">
          <option>Trier par: Pertinence</option>
          <option>Prix croissant</option>
          <option>Prix décroissant</option>
          <option>Année récente</option>
        </select>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="vehicle in filteredVehicles" :key="vehicle.id" class="bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-blue-500/20 hover:-translate-y-2 transition-transform relative">
          <div v-if="vehicle.promotion" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">Promo</div>
          <img :src="vehicle.image" :alt="vehicle.model" class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" />
          <div class="p-5">
            <span class="text-white text-sm font-semibold block mb-1">{{ vehicle.brand }}</span>
            <p class="text-lg font-bold text-white mb-2">{{ vehicle.model }} {{ vehicle.year }}</p>
            <div class="flex justify-between text-sm text-zinc-400 mb-3">
              <span class="flex items-center gap-1">⛽ {{ vehicle.fuel }}</span>
              <span class="flex items-center gap-1">🔄 {{ vehicle.transmission }}</span>
              <span class="flex items-center gap-1">👥 {{ vehicle.seats }} places</span>
            </div>
            <div class="flex justify-between items-center mb-3">
              <span class="text-xl font-bold text-blue-500">{{ vehicle.price }}€<small class="text-sm font-normal">/jour</small></span>
              <span v-if="vehicle.oldPrice" class="line-through text-zinc-500">{{ vehicle.oldPrice }}€</span>
            </div>
            <button class="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-full font-semibold text-white transition">Louer</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showFilters = ref(false);
const priceRange = ref(200);

const brands = ['Peugeot', 'Renault', 'BMW', 'Audi', 'Mercedes', 'Volkswagen'];
const vehicleTypes = ['Berline', 'SUV', 'Citadine', 'Sportive', 'Break', 'Utilitaire'];

const vehicles = [
  { id: 1, brand: 'Peugeot', model: '208 GT LINE', year: '2020', price: 89, fuel: 'Essence', transmission: 'Automatique', seats: 5, image: '/peugeot.png' },
  { id: 2, brand: 'BMW', model: 'Série 3', year: '2021', price: 129, fuel: 'Diesel', transmission: 'Automatique', seats: 5, image: '/bmw.png' },
  { id: 3, brand: 'Audi', model: 'A4', year: '2022', price: 149, oldPrice: 169, promotion: true, fuel: 'Essence', transmission: 'Automatique', seats: 5, image: '/audi.png' },
  { id: 4, brand: 'Renault', model: 'Clio', year: '2020', price: 69, fuel: 'Essence', transmission: 'Manuelle', seats: 5, image: '/renault.png' },
  { id: 5, brand: 'Mercedes', model: 'Classe A', year: '2021', price: 139, fuel: 'Essence', transmission: 'Automatique', seats: 5, image: '/mercedes.png' },
  { id: 6, brand: 'Volkswagen', model: 'Golf', year: '2022', price: 99, fuel: 'Hybride', transmission: 'Automatique', seats: 5, image: '/volkswagen.png' },
];

const filteredVehicles = computed(() => {
  return vehicles.filter(vehicle => vehicle.price <= priceRange.value);
});

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};
</script>