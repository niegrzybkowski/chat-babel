import { createApp } from 'vue'
import App from './App.vue'
import store from './modules/store'
import router from './modules/router'
import localizations from './assets/localizations.json' assert {type: 'json'};

const app = createApp(App)

app.use(store)
  .use(router)
  .mount('#app')

app.config.globalProperties.default_language = "en"
app.config.globalProperties.localizations = localizations