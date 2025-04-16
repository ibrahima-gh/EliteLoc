<template>
  <Navbar/>
  <RouterView/>
</template>

<script>
  import { RouterView } from 'vue-router';
  import Navbar from './components/Navbar.vue';

  export default {
  components: {
  Navbar,
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