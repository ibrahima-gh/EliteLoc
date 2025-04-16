<template>
  <div class="text-white">
    <img class="w-full opacity-85" src="/bentley.png" alt="">
    <main class="p-5">
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
    <aside>

    </aside>
  </div>
</template>