<template>
  <Navbar/>
  <RouterView/>
  <Footer/>
</template>

<script>
  import { RouterView } from 'vue-router';
  import Navbar from './components/Navbar.vue';
  import Footer from "./components/Footer.vue";

  export default {
  components: {
  Navbar,
  Footer,
},
  data() {
  return {
  isAuthenticated: false,
};
},
  created() {
  this.isAuthenticated = !!localStorage.getItem('token');
},
};
</script>