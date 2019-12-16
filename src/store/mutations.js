export default {
    setLoggedIn: (state, value) => state.session.loggedIn = value,
    setToken: (state, value) => {
      state.session.accessToken = value
      sessionStorage.setItem('accessToken', value)
      let base64Url = value.split('.')[1]
      let base64 = base64Url.replace('-', '+').replace('_', '/')
      let claims = JSON.parse(window.atob(base64))
      let sessionData = JSON.parse(claims.sessionData)
      state.sessionData = sessionData
      state.session.loggedIn = true
    },
    setRefreshToken: (state, value) => {
        state.session.refreshToken = value,
        sessionStorage.setItem('refreshToken', value)
    },
    setLoading: (state, value) => state.loading = value,
    setDomainId: (state, value) => state.idDomain = value,
    setGlobalExport: (state, value) => {
        state.session.globalexport = value
        sessionStorage.setItem('globalExport', value)
    },
    setSession: (state, value) => state.session = value,
    setSessionData: (state, value) => state.sessionData = value
}