<template>
  <div class="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
    <img
      src="/voiturelogin.jpg"
      alt="Image de fond"
      class="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
    />
    <div class="relative z-10 bg-[#1f1f1f] bg-opacity-80 p-10 rounded-4xl w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-white mb-15">Connexion</h1>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Adresse e-mail</label>
          <input
              id="email"
              type="email"
              v-model="email"
              placeholder="exemple@mail.com"
              class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
          <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Votre mot de passe"
              class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white"
          />
        </div>
        <div>
          <button
              type="submit"
              class="w-full py-2 bg-[#d4af7f] hover:bg-[#c49f70] text-white font-semibold rounded-lg transition cursor-pointer"
          >
            Se connecter
          </button>
        </div>
      </form>
      <p v-if="errorMessage" class="text-red-400 text-center mt-4">{{ errorMessage }}</p>
      <p class="text-gray-400 text-sm text-center mt-6">
        Pas encore de compte ?
        <router-link to="/register" class="text-[#d4af7f] hover:underline ml-1">S’inscrire</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import axiosInstance from '@/utils/axiosInstance';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/store/auth'; 

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    const response = await axiosInstance.post('/login', {
      email: email.value,
      password: password.value,
    });

    if (response.data.user) {
      localStorage.setItem('user_id', response.data.user.id);
      localStorage.setItem('user_email', response.data.user.email);
      login();

      alert('Connexion réussie.');
      router.push('/account/profile');
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    errorMessage.value = error.response?.data?.message || 'Email ou mot de passe incorrect.';
  }
};

</script>