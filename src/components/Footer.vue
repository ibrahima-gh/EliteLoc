<template>
    <footer class="bg-neutral-900 text-gray-300 pt-10 pb-5 px-5">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4 text-white">Nos réseaux</h3>
            <div class="flex flex-wrap gap-4">
              <a 
                v-for="social in socials" 
                :key="social.name" 
                :href="social.link" 
                target="_blank"
                class="flex flex-col items-center group"
              >
                <div class="w-12 h-12 rounded-full border-2 border-gray-600 overflow-hidden p-1 group-hover:border-[#C8AD7F] transition">
                  <img 
                    :src="social.icon" 
                    :alt="social.name" 
                    class="w-full h-full object-cover rounded-full"
                  >
                </div>
                <span class="mt-2 text-sm group-hover:text-white transition">{{ social.name }}</span>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4 text-white">Contact</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3 hover:text-white transition">
                <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                  ✉
                </div>
                <a href="mailto:contact@eliteloc.com">contact@eliteloc.com</a>
              </div>
              <div class="flex items-center gap-3 hover:text-white transition">
                <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                  📞
                </div>
                <a href="tel:+33123456789">+33 1 23 45 67 89</a>
              </div>
              <div class="flex items-center gap-3 hover:text-white transition">
                <div class="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                  🌐
                </div>
                <a href="https://www.eliteloc.com" target="_blank">www.eliteloc.com</a>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4 text-white">Notre agence</h3>
            <div class="relative h-48 rounded-lg overflow-hidden border border-gray-700">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9999999999995!2d2.2944813156746826!3d48.85884497928744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d8778e6b1f%3A0x2d8e6b1f0e6b1f0e!2sTour%20Eiffel!5e0!3m2!1sen!2sfr!4v1616161616161!5m2!1sen!2sfr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
              ></iframe>
              <div class="absolute top-0">
                <div class="relative">
                  <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <img 
                      src="/agency.jpg" 
                      alt="Agence EliteLoc" 
                      class="w-12 h-12 rounded-full border-2 border-green-500"
                    >
                  </div>
                  <div class="absolute -bottom-2 -right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                    OPEN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-5 border-t border-gray-800 text-center text-sm text-gray-500">
          © 2025 EliteLoc. Tous droits réservés.
        </div>
      </div>
    </footer>
</template>
<script setup>
const socials = [
  { name: 'Instagram', link: 'https://www.instagram.com', icon: '/insta.jpg' },
  { name: 'Facebook', link: 'https://www.facebook.com', icon: '/facebook.png' },
  { name: 'TikTok', link: 'https://www.tiktok.com', icon: '/tiktok.png' },
  { name: 'Snapchat', link: 'https://www.Snapchat.com', icon: '/image.png' },
];
</script>