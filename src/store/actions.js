export default {
    logout: () => {
        state.session.accessToken = null,
        state.session.refreshToken = null,
        state.session.loggedIn = null,
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('refreshToken')
    }
}