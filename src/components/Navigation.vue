<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="nav-link" href="/">
      <span class="mx-3 mark lead">
        Chat Babel
      </span>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item" v-if="accessToken != ''">
          <a class="nav-link" href="/rooms">Rooms</a>
        </li>
        <li class="nav-item" v-if="accessToken != ''">
          <a class="nav-link" href="/" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
    <span class="navbar-text me-4">
      <strong>{{ username }}</strong>
    </span>
    <select class="form-select me-5" style="width: fit-content;" @change="onLanguageChange($event)" v-model="language">
      <option value="en">English</option>
      <option value="pl">Polish</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
    </select>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    methods: {
      logout() {
        localStorage.setItem('accessToken', '');
        this.$store.commit('accessToken', '');
        localStorage.setItem('username', '');
        this.$store.commit('username', '');
      },
      onLanguageChange(event) {
        const newLanguage = event.target.value;
        localStorage.setItem('language', newLanguage);
        this.$store.commit('updateLanguage', newLanguage);
      }
    },
    computed: {
      ...mapState([
        'accessToken',
        'username',
        'language'
      ])
    }
  }
</script>
