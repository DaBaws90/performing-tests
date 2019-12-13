export default {
    setLoggedIn: (state, value) => state.session.loggedIn = value,
    setToken: (state, value) => state.session.accessToken = value,
    setRefreshToken: (state, value) => state.session.refreshToken = value,
    setLoading: (state, value) => state.loading = value
}