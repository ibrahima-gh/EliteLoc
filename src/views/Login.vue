<template>
  <div class="min-h-screen bg-cover bg-center flex items-center justify-center relative">
  <img class="w-full h-full absolute top-0" src="/voiturelogin.jpg" alt="">

    <div class="bg-[#2e2e2e] bg-opacity-90 rounded-xl p-10 w-full max-w-md shadow-xl z-10">
      <h2 class="text-center text-white text-2xl font-semibold mb-6">Connexion</h2>
      <form class="space-y-5">
        <div>
          <label class="block text-gray-300 mb-1">Adresse email</label>
          <input
            type="email"
            placeholder="Entrez votre adresse e-mail"
            class="w-full px-4 py-2 rounded-md bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold transition"
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1">Mot de passe</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            class="w-full px-4 py-2 rounded-md bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold transition"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-[#d4af7f] hover:bg-[#c29e6e] text-white font-semibold py-2 rounded-md transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
</script>