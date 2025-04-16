<template>
    <div>
      <h1 class="text-2xl font-bold text-[#d4af7f] mb-4">Mes données</h1>
      <p class="text-gray-400 mb-6">Modifier vos informations :</p>
  
      <form class="space-y-4 max-w-md">
        <div>
          <label class="block text-sm text-gray-300 mb-1">Adresse e-mail</label>
          <input type="email" placeholder="nouveau@mail.com" class="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 text-white" />
        </div>
        <div>
          <label class="block text-sm text-gray-300 mb-1">Mot de passe</label>
          <input type="password" placeholder="********" class="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 text-white" />
        </div>
        <button type="submit" class="bg-[#d4af7f] hover:bg-[#c49f70] text-black font-semibold py-2 px-4 rounded transition">
          Enregistrer
        </button>
      </form>
    </div>
  </template>