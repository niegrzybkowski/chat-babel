import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Notifications from 'notiwind'
import App from './App.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

createApp(App)
  .use(router)
  .use(Notifications)
  .mount('#app')
