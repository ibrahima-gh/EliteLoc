<template>
  <div class="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
    <img
        src="/voiturelogin.jpg"
        alt="Image de fond"
        class="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
    />
    <div class="relative z-10 bg-[#1f1f1f] bg-opacity-80 p-10 rounded-4xl w-full max-w-md">
      <h2 class="text-3xl font-bold text-center text-white mb-15">Inscription</h2>

      <form @submit.prevent="handleRegister" class="grid gap-6">
        <div class="flex gap-4">
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-300 mb-1">Prénom</label>
            <input
                type="text"
                v-model="prenom"
                placeholder="Votre prénom..."
                class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white"
            />
          </div>
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-300 mb-1">Nom</label>
            <input
                type="text"
                v-model="nom"
                placeholder="Votre nom..."
                class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Adresse email</label>
          <input
              type="email"
              v-model="email"
              placeholder="exemple@mail.com"
              class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
          <input
              type="password"
              v-model="password"
              placeholder="Entrez un mot de passe..."
              class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white"
          />
        </div>
        <div>
          <button
              type="submit"
              class="w-full py-2 bg-[#d4af7f] hover:bg-[#c49f70] text-white font-semibold rounded-lg transition duration-200"
          >
            S’inscrire
          </button>
        </div>
      </form>

      <p v-if="errorMessage" class="text-red-400 text-center mt-4">{{ errorMessage }}</p>

      <p class="text-gray-400 text-sm text-center mt-6">
        Déjà un compte ?
        <router-link to="/login" class="text-[#d4af7f] hover:underline ml-1">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import axiosInstance from '@/utils/axiosInstance';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const nom = ref('');
const email = ref('');
const prenom = ref('');
const password = ref('');
const telephone = ref('');

const handleRegister = async () => {
  try {
    const response = await axiosInstance.post('/register', {
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      mot_de_passe: password.value,
      telephone: telephone.value,
    });

    if (response.status === 201) {
      alert('Inscription réussie. Veuillez vérifier votre email pour valider votre compte.');
      router.push('/login');
    }
  } catch (error) {
    console.error('Erreur lors de l’inscription :', error);
  }
};
</script>