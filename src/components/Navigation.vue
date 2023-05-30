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
          <a class="nav-link" href="/login"> {{ current_localization.login }}</a>
        </li>
        <li class="nav-item" v-if="accessToken != ''">
          <a class="nav-link" href="/rooms">{{ current_localization.rooms }}</a>
        </li>
        <li class="nav-item" v-if="accessToken != ''">
          <a class="nav-link" href="/" @click="logout">{{ current_localization.logout }}</a>
        </li>
      </ul>
    </div>
    <span class="navbar-text me-4">
      <strong>{{ username }}</strong>
    </span>
    <select class="form-select me-5" style="width: fit-content;" @change="onLanguageChange($event)" v-model="language">
      <option value="en">English ({{current_localization.en_lang}}) </option>
      <option value="pl">Polski ({{current_localization.pl_lang}}) </option>
      <option value="es">Español ({{current_localization.es_lang}}) </option>
      <option value="fr">Français ({{current_localization.fr_lang}}) </option>
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
      ]),
      current_localization() {
        if (!this.localizations[this.$store.state.language]){
          return this.localizations[this.default_language]
        }
        return this.localizations[this.$store.state.language]
       }
    }
  }
</script>
