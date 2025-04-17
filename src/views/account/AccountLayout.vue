<template>
  <div class="min-h-screen flex bg-black text-white">
    <aside class="w-1/4 fixed h-full bg-[#1f1f1f] shadow-md flex flex-col justify-center px-6 py-10 space-y-4">
      <router-link to="/account/reservations" class="block hover:text-[#d4af7f]">Mes réservations</router-link>
      <router-link to="/account/profile" class="block hover:text-[#d4af7f]">Mon profil</router-link>
      <router-link to="/account/infos" class="block hover:text-[#d4af7f]">Mes données</router-link>
    </aside>
    <main class="ml-[25%] p-8 w-full">
      <router-view />
    </main>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const shouldShowFooter = route.path !== '/account/infos';
</script>