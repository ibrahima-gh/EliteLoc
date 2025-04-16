<template>
  <div class="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
    <img
      src="/voiturelogin.jpg"
      alt="Image de fond"
      class="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
    />

    <div class="relative z-10 bg-[#1f1f1f] bg-opacity-80 p-10 rounded-4xl w-full max-w-md">
      <h2 class="text-3xl font-bold text-center text-white my-15">Inscription</h2>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Nom</label>
          <input
            type="text"
            v-model="name"
            placeholder="Entrez votre nom"
            class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af7f]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Adresse email</label>
          <input
            type="email"
            v-model="email"
            placeholder="Entrez votre adresse e-mail"
            class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af7f]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
          <input
            type="password"
            v-model="password"
            placeholder="Entrez votre mot de passe"
            class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af7f]"
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
      <p class="text-gray-400 text-sm text-center mt-6">
        Déjà un compte ?
        <router-link to="/login" class="text-[#d4af7f] hover:underline ml-1">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

const handleRegister = () => {
  console.log('Inscription avec', name.value, email.value, password.value)
}
</script>