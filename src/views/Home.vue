<template>
  <div class="text-white">
    <header class="relative h-[50vh] overflow-hidden">
      <div class="absolute top-5 left-5 right-5 flex justify-between items-center z-20">
        <h1 class="text-5xl font-bold text-white drop-shadow-lg font-poppins uppercase tracking-widest animate-fade-in">Elite Loc</h1>
        <nav class="flex gap-6">
          <a href="/vehicles" class="text-white font-bold text-lg px-5 py-2 rounded-full bg-neutral-900 shadow-md hover:bg-gray-700 hover:scale-110 transition-all border-2 border-gray-700">Véhicules</a>
          <a href="/login" class="text-white font-bold text-lg px-5 py-2 rounded-full bg-[#C8AD7F] hover:opacity-90">S'identifier</a>
        </nav>
      </div>
      <div class="w-full">
        <img src="/bentley.png" alt="">
      </div>
    </header>

    <main class="p-5">
      <input type="text" placeholder="Rechercher..."
             class="block mx-auto mb-6 px-4 py-2 w-[300px] rounded-full border-none bg-neutral-900 text-white shadow-md text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div class="bg-neutral-900 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:translate-x-2 hover:shadow-xl" v-for="n in 6" :key="n">
          <img src="/peugeot.png" alt="Peugeot 208 GT LINE" class="w-full h-[150px] object-cover" />
          <div class="p-4 text-center">
            <span class="text-sm font-bold text-white">PEUGEOT</span>
            <p class="text-sm text-gray-400 my-2">208 GT LINE 2020</p>
            <button class="bg-green-800 text-white px-4 py-2 rounded-full text-sm">Louer</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>