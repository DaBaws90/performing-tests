import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default () => {
  // This can be replaced / extended once the storeConfiguration method is called, or pass as argument the desired states config
  const state = {
    session: {
      loggedIn: false,
      accessToken: null,
      refreshToken: null,
      globalexport: 0,
    },
    sessionData: {}, // Contains domainid, domainname, userid, etc
    loading: false
  }

  return {
    state,
    mutations,
    getters,
    actions
  }
}