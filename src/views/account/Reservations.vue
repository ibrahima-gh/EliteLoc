<template>
    <div>
      <h1 class="text-2xl font-bold text-[#d4af7f] mb-4">Mes réservations</h1>
      <p class="text-gray-400 mb-6">Voici la liste de vos réservations en cours :</p>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 3" :key="n" class="bg-[#1f1f1f] p-5 rounded-lg shadow-md hover:shadow-xl transition">
          <img src="/peugeot.png" alt="voiture" class="w-full h-40 object-cover rounded mb-3" />
          <h3 class="text-lg font-bold text-white">208 GT LINE 2020</h3>
          <p class="text-sm text-gray-400">Du 10 au 13 Mai 2025</p>
          <span class="inline-block mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded-full">Confirmée</span>
        </div>
      </div>
    </div>
  </template>