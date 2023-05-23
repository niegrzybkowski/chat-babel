import { createStore } from 'vuex'

const store = createStore({
  state: {
    accessToken: '',
    username: '',
    language: 'en'
  },
  mutations: {
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    updateUsername: (state, username) => {
      state.username = username;
    },
    updateLanguage: (state, language) => {
      state.language = language;
    }
  }
})

export default store;
