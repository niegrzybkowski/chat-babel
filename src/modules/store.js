import { createStore } from 'vuex'

const store = createStore({
  state: {
    accessToken: '',
    username: ''
  },
  mutations: {
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    updateUsername: (state, username) => {
      state.username = username;
    },
    logout: state => {
      state.accessToken = ''
      state.username = ''
    }
  }
})

export default store;
