<template>
  <div class="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
    <img
      src="/voiturelogin.jpg"
      alt="Image de fond"
      class="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
    />
    <div class="relative z-10 bg-[#1f1f1f] bg-opacity-80 p-10 rounded-4xl w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-white my-15">Connexion</h1>
      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            placeholder="exemple@mail.com"
            class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af7f]"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="Votre mot de passe"
            class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af7f]"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full py-2 bg-[#d4af7f] hover:bg-[#c49f70] text-white font-semibold rounded-lg transition duration-200"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>