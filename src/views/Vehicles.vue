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

<<<<<<< HEAD
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
=======
      <div class="cars-grid">
        <div class="car-card" v-for="vehicle in filteredVehicles" :key="vehicle.id_voiture">
  <img :src="vehicle.image" :alt="vehicle.modele" />
  <div class="car-info">
    <span class="brand">{{ vehicle.marque }}</span>
    <p class="model">{{ vehicle.modele }}</p>
    <div class="car-details">
      <span class="detail">Type: {{ vehicle.type }}</span>
      <span class="detail">Immatriculation: {{ vehicle.immatriculation }}</span>
      <span class="detail">Disponible: {{ vehicle.disponibilite ? 'Oui' : 'Non' }}</span>
    </div>
  </div>
</div>

>>>>>>> 3097c3d (Implementation de la route voiture dans la vue vehicles.vue)
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const vehicles = ref([])
const filteredVehicles = ref([]) // pour conserver ta logique existante

<<<<<<< HEAD
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
=======
// Récupération des voitures à l'initialisation
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
.vehicles-page {
  min-height: 100vh;
  background: #000;
  color: #ffffff;
}

.hero {
  position: relative;
  height: 30vh;
  overflow: hidden;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/image.png') no-repeat center center/cover;
}

.hero-content {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 10px 20px;
  border-radius: 20px; /* Forme arrondie */
  background: #1e1e1e; /* Fond sombre */
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* Ombre légère */
}

.nav-link:hover {
  background: #444; /* Fond plus clair au survol */
  transform: scale(1.1); /* Agrandissement au survol */
  color: #ddd;
}

.nav-link.rounded {
  border: 2px solid #444; /* Bordure sombre */
}

.nav-link.active {
  background: #007bff;
  color: white;
}

.main-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.search-container {
  margin-bottom: 2rem;
}

.search-bar-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto 1.5rem;
}

.search-bar {
  display: block;
  width: 100%;
  padding: 15px 25px;
  border-radius: 30px;
  border: none;
  background: #1e1e1e;
  color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  font-size: 1.1rem;
  transition: all 0.3s ease;
  padding-right: 60px;
}

.search-bar:focus {
  outline: none;
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.7);
}

.search-btn {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: #007bff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: #0056b3;
  transform: translateY(-50%) scale(1.05);
}

.search-btn svg {
  width: 20px;
  height: 20px;
  stroke: white;
}

.filter-toggle {
  background: #1e1e1e;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.filter-toggle:hover {
  background: #2e2e2e;
  transform: translateY(-2px);
}

.arrow-down, .arrow-up {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  transition: all 0.3s ease;
}

.arrow-down {
  border-top: 6px solid white;
}

.arrow-up {
  border-bottom: 6px solid white;
}

.filters {
  background: #1e1e1e;
  border-radius: 15px;
  padding: 20px;
  margin-top: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.filter-group {
  margin-bottom: 15px;
}

.filter-title {
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: #007bff;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  background: #2e2e2e;
  border-radius: 20px;
  transition: all 0.2s ease;
}

.filter-option:hover {
  background: #3e3e3e;
}

.filter-option input {
  display: none;
}

.checkmark {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #555;
  border-radius: 3px;
  margin-right: 8px;
  position: relative;
}

.filter-option input:checked + .checkmark {
  background: #007bff;
  border-color: #007bff;
}

.price-range {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.slider {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #2e2e2e;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.price-value {
  font-weight: bold;
  text-align: center;
  color: #007bff;
}

.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.results-count {
  font-size: 0.9rem;
  color: #aaa;
}

.sort-select {
  background: #1e1e1e;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
}

.cars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.car-card {
  background: #1e1e1e;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.car-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 123, 255, 0.2);
}

.car-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4757;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 1;
}

.car-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.car-card:hover img {
  transform: scale(1.05);
}

.car-info {
  padding: 20px;
}

.brand {
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  display: block;
  margin-bottom: 5px;
}

.model {
  font-size: 1.2rem;
  color: #ffffff;
  margin: 5px 0 10px;
  font-weight: 600;
}

.car-details {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  font-size: 0.8rem;
  color: #aaa;
}

.detail {
  display: flex;
  align-items: center;
  gap: 5px;
}

.price-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
}

.price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffffff;
}

.price small {
  font-size: 0.8rem;
  color: #aaa;
}

.old-price {
  font-size: 0.9rem;
  color: #aaa;
  text-decoration: line-through;
}

.rent-btn {
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.rent-btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }
  
  .hero-content {
    flex-direction: column;
    gap: 15px;
  }
  
  .nav {
    width: 100%;
    justify-content: center;
  }
}
</style>
>>>>>>> 3097c3d (Implementation de la route voiture dans la vue vehicles.vue)
