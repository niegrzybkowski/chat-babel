import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Rooms from '../components/Rooms.vue'
import Chat from '../components/Chat.vue'
import store from './store'

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/rooms', component: Rooms, name: 'rooms' },
  { path: '/rooms/:roomname', component: Chat, name: 'chat' },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach(async (to, from) => {
  console.log(to);
  if (store.state.accessToken == '' && (to.name == 'rooms' || to.name == 'chat') || !to.name) {
    return '/';
  }
})

export default router;
