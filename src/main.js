import { createApp } from 'vue'
import App from './App.vue'
import store from './modules/store'
import router from './modules/router'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
