<template>
  <Navigation/>
  <div class="p-5 mt-5">
    <router-view/>
  </div>
</template>

<script>
  import Navigation from './components/Navigation.vue'

  export default {
    created() {
      const storedToken = localStorage.getItem('accessToken');
      this.$store.commit('updateAccessToken', storedToken);
      const storedUsername = localStorage.getItem('username');
      this.$store.commit('updateUsername', storedUsername);
      const storedLanguage = localStorage.getItem('language');
      this.$store.commit('updateLanguage', storedLanguage ? storedLanguage : 'en');
    },
    components: {
      Navigation
    }
  }
</script>
