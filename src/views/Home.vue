<template>
  <div class="text-white">
    <img class="w-full opacity-65" src="/bentley.png" alt="">
    <main class="flex m-10 gap-5">
      <div class="gap-5 flex flex-col">
        <h2 class="text-2xl font-bold">Vehicules en tendances</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          <vehicles
            v-for="vehicle in filteredVehicles"
            :id="vehicle.id_voiture"
            :key="vehicle.id_voiture" 
            :image="vehicle.url_img" 
            :title="vehicle.marque" 
            :model="vehicle.modele"
            :primaryColor="''"
          />
        </div>
      </div>
    </main>
  </div>
  
  
  <section class="bg-[#0a0a0a] text-white w-full p-10 rounded-2xl shadow-2xl border border-[#d4af7f]/20">
    <div class="flex flex-col md:flex-row justify-between items-center mb-8">
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-bold">Avis des clients</h2>
        <div class="flex items-center gap-2">
          <p class="text-sm text-gray-400">Certifié par</p>
          <a href="https://www.trustauto.com" target="_blank" class="group">
            <span class="text-[#d4af7f] font-semibold group-hover:underline">TrustAuto</span>
            <img src="/trust.png" alt="Logo TrustAuto" class="w-6 h-6 ml-2 inline-block align-middle rounded-full shadow-md transition-transform group-hover:scale-110">
          </a>
        </div>
      </div>
      <div class="mt-4 md:mt-0">
        <span class="text-sm bg-[#d4af7f]/10 text-[#d4af7f] px-3 py-1 rounded-full italic border border-[#d4af7f]/20">
          + de {{ reviews.length }} avis clients
        </span>
      </div>
    </div>

    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div v-for="review in reviews" :key="review.id" class="bg-[#111111] p-6 rounded-xl border border-[#d4af7f]/10 hover:border-[#d4af7f]/30 transition-all hover:shadow-lg hover:shadow-[#d4af7f]/5">
        <div class="flex gap-1 text-[#d4af7f] mb-3">
          <i class="fas fa-star" v-for="n in review.note" :key="n"></i>
        </div>
        <p class="italic text-gray-300 mb-4">"{{ review.message }}"</p>
        <div class="flex justify-between items-center pt-3 border-t border-[#d4af7f]/10">
          <span class="text-sm text-[#d4af7f] font-medium">– {{ review.auteur }}</span>
          <span class="text-xs text-gray-500">{{ new Date().toLocaleDateString() }}</span>
        </div>
      </div>
    </div>

 
    <form @submit.prevent="addReview" class="bg-[#111111] p-6 rounded-xl border border-[#d4af7f]/10">
      <h3 class="text-lg font-semibold mb-4 text-[#d4af7f]">Laisser un avis</h3>
      
      <div class="mb-4">
        <label class="block text-sm text-gray-400 mb-1">Votre prénom</label>
        <input v-model="newReview.auteur" type="text" placeholder="Ex: Jean" 
               class="w-full p-3 rounded bg-[#0a0a0a] text-white placeholder-gray-600 outline-none border border-gray-800 focus:border-[#d4af7f]/50 transition">
      </div>
      
      <div class="mb-4">
        <label class="block text-sm text-gray-400 mb-1">Votre avis</label>
        <textarea v-model="newReview.message" placeholder="Dites-nous ce que vous pensez..." 
                 class="w-full p-3 rounded bg-[#0a0a0a] text-white placeholder-gray-600 outline-none border border-gray-800 focus:border-[#d4af7f]/50 transition min-h-[100px]"></textarea>
      </div>
      
      <div class="mb-6">
        <label class="block text-sm text-gray-400 mb-1">Note</label>
        <select v-model="newReview.note" 
                class="w-full p-3 rounded bg-[#0a0a0a] text-white outline-none border border-gray-800 focus:border-[#d4af7f]/50 transition appearance-none">
          <option v-for="n in 5" :key="n" :value="n">{{ n }} étoile{{ n > 1 ? 's' : '' }}</option>
        </select>
      </div>
      
      <button type="submit" 
              class="w-full bg-[#d4af7f] hover:bg-[#d4af7f]/90 text-black font-semibold px-6 py-3 rounded transition flex items-center justify-center gap-2">
        <i class="fas fa-paper-plane"></i>
        Envoyer mon avis
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Vehicles from '../components/Vehicles.vue'
import axios from 'axios'

const vehicles = ref([])
const filteredVehicles = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/cars/tendance')
    vehicles.value = response.data
    filteredVehicles.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures :', error)
  }
})

const reviews = ref([
  { id: 1, auteur: 'Sarah B.', message: 'Super service, je recommande vivement ! Le véhicule était en parfait état, exactement comme décrit.', note: 5 },
  { id: 2, auteur: 'Léo M.', message: 'Livraison rapide et voiture en parfait état. Le processus d\'achat était très simple et transparent.', note: 4 },
  { id: 3, auteur: 'Nadia R.', message: 'Bon rapport qualité/prix, à refaire ! L\'équipe est très professionnelle et à l\'écoute.', note: 5 }
])

const newReview = ref({
  auteur: '',
  message: '',
  note: 5
})

const addReview = () => {
  if (newReview.value.auteur && newReview.value.message && newReview.value.note) {
    reviews.value.unshift({
      id: Date.now(),
      auteur: newReview.value.auteur,
      message: newReview.value.message,
      note: newReview.value.note,
      date: new Date().toISOString()
    })
    newReview.value = {
      auteur: '',
      message: '',
      note: 5
    }
    
    
    const button = document.querySelector('button[type="submit"]')
    button.innerHTML = '<i class="fas fa-check"></i> Merci pour votre avis !'
    button.classList.add('bg-green-600', 'hover:bg-green-700')
    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer mon avis'
      button.classList.remove('bg-green-600', 'hover:bg-green-700')
    }, 3000)
  }
}
</script>