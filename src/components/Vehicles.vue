<template>
  <div class="relative text-white border-5 border-[#262629] rounded-[20px] overflow-hidden hover:scale-105 transition-transform duration-500">
      <img class="w-full max-w-full max-h-full" :src="image" :alt="title">
      <div class="absolute bottom-0 bg-gradient-to-t from-black via-black to-transparent h-30 w-full"></div>
      <div class="z-20 absolute bottom-0 left-0 flex w-full flex-col p-8">
              <p class="text-xl">{{ title }}</p>
              <p class="opacity-50 mt-">{{ model }}</p>
      </div>
      <span class="absolute top-0 z-50 size-5 rounded-full m-5 animate-ping" :style="{ backgroundColor: primaryColor }"></span>
      <span class="absolute top-0 z-50 size-5 rounded-full m-5 " :style="{ backgroundColor: primaryColor }"></span>
      <button class="absolute bottom-0 right-0 px-4 py-2 m-8 bg-[#C8AD7F] text-white rounded-full text-md hover:opacity-90 cursor-pointer z-50">
           réserver
      </button>
  </div>
</template>

<script setup>
defineProps({
image: {
  type: String,
  required: true
},
title: {
  type: String,
  required: true
},
model: {
  type: String,
  required: true
},
primaryColor: {
  type: String,
  default: '#046C4E'
}
});
</script>