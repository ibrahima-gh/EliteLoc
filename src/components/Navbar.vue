<template>
  <div class="absolute top-10 left-10 right-10 flex justify-between items-center z-20">
    <RouterLink to="/" class="flex items-center">
      <img src="/logo.jpg" alt="Logo" class="h-12"> <
    </RouterLink>
    <nav class="flex gap-6">
      <RouterLink to="/vehicles" class="text-white font-bold text-lg px-5 py-2 hover:text-[#C8AD7F]">Véhicules</RouterLink>
      <RouterLink to="/register" class="text-white font-bold text-lg px-5 py-2 rounded-full bg-[#C8AD7F] hover:opacity-90">S'identifier</RouterLink>
    </nav>
      </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>