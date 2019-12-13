import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default () => {
  // This can be replaced / extended once the storeConfiguration method is called
  const state = {
    session: {
      loggedIn: false,
      accessToken: null,
      refreshToken: null
    },
    loading: false
  }

  return {
    state,
    mutations,
    getters,
    actions
  }
}