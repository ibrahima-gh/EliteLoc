<template>
    <div class="min-h-screen flex bg-black text-white">
      <!-- Sidebar -->
      <aside class="w-64 bg-[#1f1f1f] shadow-md flex flex-col justify-center px-6 py-10 space-y-4">
        <h2 class="text-xl font-bold text-[#d4af7f] mb-6 text-center">Mon compte</h2>
        <router-link to="/account/reservations" class="block hover:text-[#d4af7f]">Mes réservations</router-link>
        <router-link to="/account/profile" class="block hover:text-[#d4af7f]">Mon profil</router-link>
        <router-link to="/account/infos" class="block hover:text-[#d4af7f]">Mes données</router-link>
        <button class="mt-6 w-full bg-red-700 hover:bg-red-600 py-2 rounded text-white">Se déconnecter</button>
      </aside>
  
      <!-- Contenu -->
      <main class="flex-1 p-8">
        <router-view />
      </main>
    </div>
  </template>