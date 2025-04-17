<template>
  <div class="relative text-white border-5 border-[#262629] rounded-[20px] overflow-hidden hover:scale-105 transition-transform duration-500">
      <img class="w-full max-w-full max-h-full" :src="image" :alt="title">
      <div class="absolute bottom-0 bg-gradient-to-t from-black via-black to-transparent h-30 w-full"></div>
      <div class="z-20 absolute bottom-0 left-0 flex w-full flex-col p-8">
              <p class="text-xl">{{ title }}</p>
              <p class="opacity-50 mt-">{{ model }}</p>
      </div>
      <span class="absolute top-0 z-50 size-5 rounded-full m-5 animate-ping" :style="{ backgroundColor: primaryColor }"></span>
      <span class="absolute top-0 z-50 size-5 rounded-full m-5 " :style="{ backgroundColor: primaryColor }"></span>
      <slot name="reserve-button">
      <button
        @click="openPopup"
        class="absolute bottom-0 right-0 px-4 py-2 m-8 bg-[#C8AD7F] text-white rounded-full text-md hover:opacity-90 cursor-pointer z-50"
      >
        réserver
      </button>
    </slot>
  </div>
  <div v-if="showPopup" class="fixed z-100 top-0 left-0 w-full h-full bg-black/90 flex justify-center items-center" @click.self="closePopup">
      <div class="flex relative justify-between w-1/2 bg-black rounded-[50px] border-[#262629] border-8 overflow-hidden">
        <img class="w-full max-w-full max-h-full " :src="image" :alt="title">
        <div class="absolute bottom-0 bg-gradient-to-t from-black via-black to-transparent h-50 w-full"></div>
        <div class="flex absolute bottom-0 w-full justify-between items-center p-8">
          <div class="">
            <h3 class="text-2xl font-bold">{{ title }}</h3>
            <p class="text-sm text-gray-600">{{ model }}</p>
          </div>
          <div class="">
            <label for="startDate" class="block text-sm font-semibold">Date de début:</label>
            <input type="date" id="startDate" :min="today" v-model="startDate" class="mt-2 p-2 border border-gray-300 rounded-lg w-full text-white" />

            <label for="endDate" class="block text-sm font-semibold mt-4">Date de fin:</label>
            <input type="date" id="endDate" :min="startDate" v-model="endDate" class="mt-2 p-2 border border-gray-300 rounded-lg w-full" />
          </div>
          <button @click="createLocation" class="bg-[#a88b5c] hover:bg-[#046C4E] h-15 text-white rounded-3xl py-2 px-4 transition cursor-pointer flex items-center"><img class="h-4 invert" src="/car_rent.png" alt=""></button>
        </div>
        <button @click="closePopup" class="bg-[#7B1E22] absolute right-8 top-8 text-white rounded-lg py-2 px-4 hover:bg-[#a88b5c] transition cursor-pointer">X</button>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showPopup = ref(false);
const today = new Date().toISOString().split('T')[0];
const startDate = ref(today);
const endDate = ref(today);
const openPopup = () => {
  showPopup.value = true;
};
const closePopup = () => {
  showPopup.value = false;
};
const createLocation = async () => {
  const email = localStorage.getItem('email');
  if (!email) {
    alert('Vous devez être connecté pour réserver.');
    window.location.href = '/register';
    return;
  }

  if (!startDate.value || !endDate.value) {
    alert('Veuillez sélectionner une date de début et de fin.');
    return;
  }
  if (startDate.value > endDate.value) {
    alert("La date de début ne peut pas être après la date de fin.");
    return;
  }

  try {
    const utilisateurResponse = await fetch(`http://localhost:3000/api/utilisateurs/email/${email}`);
    const utilisateurData = await utilisateurResponse.json();
    const id_utilisateur = utilisateurData.id_utilisateur;


    const response = await fetch('http://localhost:3000/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date_debut: startDate.value,
        date_fin: endDate.value,
        id_utilisateur,
        id_voiture
      })
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Une erreur est survenue.");
      return;
    }

    alert("Réservation créée avec succès !");
    closePopup();
  } catch (error) {
    console.error("Erreur pendant la réservation :", error);
    alert("Erreur lors de la création de la location.");
  }
};
const { image, title, model, primaryColor, id: id_voiture } = defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  model: { type: String, required: true },
  primaryColor: { type: String, default: '#046C4E' },
  id: { type: Number, required: true }
});
</script>