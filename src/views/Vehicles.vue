<template>
    <div class="vehicles-page">
      <main class="main-content">
        <div class="search-container">
          <div class="search-bar-container">
            <input 
              type="text" 
              class="search-bar expanded" 
              placeholder="Rechercher un véhicule..." 
            />
            <button class="search-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
  
          <div class="filters-container">
            <button class="filter-toggle" @click="toggleFilters">
              Filtres <span :class="{'arrow-down': !showFilters, 'arrow-up': showFilters}"></span>
            </button>
            
            <transition name="fade-slide">
              <div class="filters" v-if="showFilters">
                <div class="filter-group">
                  <h3 class="filter-title">Marque</h3>
                  <div class="filter-options">
                    <label v-for="brand in brands" :key="brand" class="filter-option">
                      <input type="checkbox" :value="brand">
                      <span class="checkmark"></span>
                      {{ brand }}
                    </label>
                  </div>
                </div>
  
                <div class="filter-group">
                  <h3 class="filter-title">Prix</h3>
                  <div class="price-range">
                    <input type="range" min="0" max="500" step="10" v-model="priceRange" class="slider">
                    <span class="price-value">{{ priceRange }}€/jour</span>
                  </div>
                </div>
  
                <div class="filter-group">
                  <h3 class="filter-title">Type</h3>
                  <div class="filter-options">
                    <label v-for="type in vehicleTypes" :key="type" class="filter-option">
                      <input type="checkbox" :value="type">
                      <span class="checkmark"></span>
                      {{ type }}
                    </label>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
  
        <div class="results-info">
          <p class="results-count">{{ filteredVehicles.length }} résultats</p>
          <select class="sort-select">
            <option>Trier par: Pertinence</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Année récente</option>
          </select>
        </div>
  
        <div class="cars-grid">
          <div class="car-card" v-for="vehicle in filteredVehicles" :key="vehicle.id">
            <div class="car-badge" v-if="vehicle.promotion">Promo</div>
            <img :src="vehicle.image" :alt="vehicle.model" />
            <div class="car-info">
              <span class="brand">{{ vehicle.brand }}</span>
              <p class="model">{{ vehicle.model }} {{ vehicle.year }}</p>
              <div class="car-details">
                <span class="detail"><i class="icon">⛽</i> {{ vehicle.fuel }}</span>
                <span class="detail"><i class="icon">🔄</i> {{ vehicle.transmission }}</span>
                <span class="detail"><i class="icon">👥</i> {{ vehicle.seats }} places</span>
              </div>
              <div class="price-container">
                <span class="price">{{ vehicle.price }}€<small>/jour</small></span>
                <span class="old-price" v-if="vehicle.oldPrice">{{ vehicle.oldPrice }}€</span>
              </div>
              <button class="rent-btn">Louer</button>
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