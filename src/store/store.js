import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex({
  state: {
    session: {
      loggedIn: false,
      accessToken: null,
      refreshToken: null
    },
    loading: false
  },
  getters: {
    loggedIn: () => state.session.loggedIn,
    accessToken: () => state.session.accessToken,
    refreshToken: () => state.session.refreshToken,
    loading: () => state.session.loading
  },
  mutations: {
    setLoggedIn: (state, value) => state.session.loggedIn = value,
    setToken: (state, value) => state.session.accessToken = value,
    setRefreshToken: (state, value) => state.session.refreshToken = value,
    setLoading: (state, value) => state.loading = value
  },
  actions: {
    logout: () => {
      state.session.accessToken = null,
      state.session.refreshToken = null,
      state.session.loggedIn = null,
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refreshToken')
    }
  }
})