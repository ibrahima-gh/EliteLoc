<template>
  <div class="text-white">
    <img class="w-full opacity-65" src="/bentley.png" alt="">
    <main class="p-5 grid grid-cols-1 lg:grid-cols-5 gap-5">
   
      <section class="lg:col-span-5">
        <div class="relative max-w-3xl mx-auto mb-8">
          <input 
            type="text" 
            class="w-full py-4 px-6 pr-16 rounded-full bg-neutral-900 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-500" 
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
      <h3 class="text-silver-500 text-lg font-semibold mb-3">Marque</h3>
      <div class="flex flex-wrap gap-2">
        <label v-for="brand in brands" :key="brand" class="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-700 transition">
          <input type="checkbox" :value="brand" class="hidden" />
          <span class="w-4 h-4 border-2 border-neutral-600 rounded-sm bg-transparent transition-all hover:bg-silver-500"></span>
          {{ brand }}
        </label>
      </div>
    </div>

    <div>
      <h3 class="text-silver-500 text-lg font-semibold mb-3">Prix</h3>
      <div class="flex flex-col gap-3">
        <input type="range" min="0" max="500" step="10" v-model="priceRange" class="w-full h-2 rounded bg-neutral-800 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white" />
        <span class="text-center font-bold text-silver-500">{{ priceRange }}€/jour</span>
      </div>
    </div>

    <div>
      <h3 class="text-silver-500 text-lg font-semibold mb-3">Type</h3>
      <div class="flex flex-wrap gap-2">
        <label v-for="type in vehicleTypes" :key="type" class="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-700 transition">
          <input type="checkbox" :value="type" class="hidden" />
          <span class="w-4 h-4 border-2 border-neutral-600 rounded-sm bg-transparent transition-all hover:bg-silver-500"></span>
          {{ type }}
        </label>
      </div>
    </div>
  </div>
</transition>

        </div>

        <div class="flex justify-between items-center mb-6">
          <p class="text-sm text-neutral-400">{{ filteredVehicles.length }} résultats</p>
          <select class="bg-neutral-900 text-white border-none px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500">
           <option>Trier par: Pertinence</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Année récente</option>
          </select>
        </div>
      </section>

      
      <section class="lg:col-span-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div 
            class="bg-neutral-900 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:translate-y-2 hover:shadow-xl" 
            v-for="vehicle in filteredVehicles" 
            :key="vehicle.id_voiture"
          >
            <div class="relative">
              <img :src="vehicle.image" :alt="vehicle.modele" class="w-full h-[180px] object-cover" />
              <span v-if="!vehicle.disponibilite" class="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                Indisponible
              </span>
            </div>
            <div class="p-4">
              <span class="text-sm font-bold text-white">{{ vehicle.marque }}</span>
              <p class="text-sm text-neutral-400 my-2">{{ vehicle.modele }}</p>
              
              <div class="flex justify-between text-xs text-neutral-500 mb-4">
                <span>{{ vehicle.type }}</span>
                <span>{{ vehicle.immatriculation }}</span>
              </div>
              
              <button 
                class="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:from-yellow-700 hover:to-yellow-600 transition-all shadow-md"
                :disabled="!vehicle.disponibilite"
                :class="{'opacity-50 cursor-not-allowed': !vehicle.disponibilite}"
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

 
    <footer class="bg-neutral-900 text-gray-300 pt-10 pb-5 px-5">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4 text-white">Nos réseaux</h3>
            <div class="flex flex-wrap gap-4">
              <a v-for="social in socials" :key="social.name" :href="social.link" target="_blank" class="flex flex-col items-center group">
                <div class="w-12 h-12 rounded-full border-2 border-gray-600 overflow-hidden p-1 group-hover:border-green-500 transition">
                  <img :src="social.icon" :alt="social.name" class="w-full h-full object-cover rounded-full">
                </div>
                <span class="mt-2 text-sm group-hover:text-white transition">{{ social.name }}</span>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4 text-white">Contact</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3 hover:text-white transition">
                <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shrink-0">✉</div>
                <a href="mailto:contact@eliteloc.com">contact@eliteloc.com</a>
              </div>
              <div class="flex items-center gap-3 hover:text-white transition">
                <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shrink-0">📞</div>
                <a href="tel:+33123456789">+33 1 23 45 67 89</a>
              </div>
              <div class="flex items-center gap-3 hover:text-white transition">
                <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shrink-0">🌐</div>
                <a href="https://www.eliteloc.com" target="_blank">www.eliteloc.com</a>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4 text-white">Notre agence</h3>
            <div class="relative h-48 rounded-lg overflow-hidden border border-gray-700">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9999999999995!2d2.2944813156746826!3d48.85884497928744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d8778e6b1f%3A0x2d8e6b1f0e6b1f0e!2sTour%20Eiffel!5e0!3m2!1sen!2sfr!4v1616161616161!5m2!1sen!2sfr" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy">
              </iframe>
              <div class="absolute bottom-4 right-4">
                <div class="relative">
                  <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl p-1">
                    <img src="/agency.jpg" alt="Agence EliteLoc" class="w-full h-full object-cover rounded-full border-2 border-green-500">
                  </div>
                  <div class="absolute -bottom-2 -right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">OPEN</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-5 border-t border-gray-800 text-center text-sm text-gray-500">
          © 2025 EliteLoc. Tous droits réservés.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const vehicles = ref([])
const filteredVehicles = ref([])
const showFilters = ref(false)
const priceRange = ref(200)

const brands = ['Peugeot', 'BMW', 'Audi', 'Mercedes', 'Renault', 'Volkswagen']
const vehicleTypes = ['Berline', 'SUV', 'Citadine', 'Sportive', 'Break']
const socials = [
  { name: 'Instagram', link: 'https://www.instagram.com', icon: '/insta.jpg' },
  { name: 'Facebook', link: 'https://www.facebook.com', icon: '/facebook.png' },
  { name: 'TikTok', link: 'https://www.tiktok.com', icon: '/tiktok.png' },
  { name: 'Snapchat', link: 'https://www.Snapchat.com', icon: '/image.png' },
]

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/voitures')
    vehicles.value = response.data
    filteredVehicles.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures :', error)
  }
})
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