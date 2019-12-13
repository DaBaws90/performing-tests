export default {
    loggedIn: (state) => state.session.loggedIn,
    accessToken: (state) => state.session.accessToken,
    refreshToken: (state) => state.session.refreshToken,
    loading: (state) => state.session.loading
}