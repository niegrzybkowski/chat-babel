import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Rooms from '../components/Rooms.vue'
import Chat from '../components/Chat.vue'
import store from './store'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/rooms', component: Rooms },
  { path: '/chat/:roomname', component: Chat },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach(async (to, from) => {
  if (store.state.accessToken == '' && to.path == '/rooms') {
    return '/'
  }
})

export default router;
