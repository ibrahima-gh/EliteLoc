<template>
  <!-- <div class="vehicles-page">
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
  </div> -->

<vehicles class="mt-30"/>
</template>
<script setup>
import vehicles from '../components/Vehicles.vue';
</script>