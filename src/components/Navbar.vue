<template>
  <div class="absolute top-5 w-full px-5 flex justify-between items-center z-20">
    <RouterLink 
      to="/" 
      class="text-5xl font-bold text-white transition-all duration-500 hover:scale-105"
    >
      <img 
        class="w-10 md:w-20" 
        src="/logo.jpg" 
        alt="Logo Luxury Cars"
      >
    </RouterLink>
    <nav class="flex sm:gap-6 items-center">
      <RouterLink 
        to="/vehicles" 
        class="text-white font-bold md:text-lg px-5 py-2 hover:text-[#C8AD7F] transition-all duration-300 relative group"
      >
        Véhicules
      </RouterLink>
      
      <RouterLink 
        v-if="!isAuthenticated" 
        to="/register" 
        class="text-white hidden sm:block font-bold md:text-lg px-5 py-2 rounded-full bg-[#C8AD7F] hover:bg-[#C8AD7F]/90 hover:shadow-lg hover:shadow-[#C8AD7F]/30 transition-all duration-300 transform hover:-translate-y-1"
      >
        S'identifier
      </RouterLink>
      <RouterLink 
        v-if="!isAuthenticated" 
        to="/register" 
        class="text-white block sm:hidden font-bold md:text-lg px-5 py-2 rounded-full bg-[#C8AD7F] hover:bg-[#C8AD7F]/90 hover:shadow-lg hover:shadow-[#C8AD7F]/30 transition-all duration-300 transform hover:-translate-y-1"
      >
                <svg class="size-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      </RouterLink>
      
      <div v-if="isAuthenticated" class="flex gap-6 items-center">
        <RouterLink 
          to="/account" 
          class="text-[#C8AD7F] hover:text-white font-bold text-xs md:text-lg px-5 py-2 hover:bg-[#C8AD7F90] rounded-full hover:opacity-90 transition-all duration-400 relative overflow-hidden group"
        >
          <span class="relative z-10">Mon Compte</span>
          <span class="absolute inset-0 bg-[#C8AD7F] rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
        </RouterLink>
      </div>
      
      <button
        v-if="isAuthenticated"
        @click="handleLogout"
        class="text-red-500 hover:text-white font-bold text-lg px-5 py-2 rounded-full hover:bg-red-600 cursor-pointer transition-all duration-400 hover:shadow-red-500/20 hover:shadow-md flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Déconnexion
      </button>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { isAuthenticated, logout } from '@/store/auth';
import { ref } from 'vue';

const router = useRouter();

const handleLogout = async () => {
  try {
    await fetch('http://localhost:3000/login', {
      method: 'POST'
    });

    logout();
    router.push('/');
    
    // Notification plus stylée
    const toast = document.createElement('div');
    toast.className = 'fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in';
    toast.textContent = 'Vous êtes déconnecté avec succès';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
    
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
    
    const toast = document.createElement('div');
    toast.className = 'fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in';
    toast.textContent = 'Erreur lors de la déconnexion';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
};
</script>