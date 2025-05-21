<template>
  <Navbar/>
  <RouterView/>
  <Footer/>
</template>

<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from "./components/Footer.vue";

const isAuthenticated = ref(!!localStorage.getItem('user_id'));
</script>