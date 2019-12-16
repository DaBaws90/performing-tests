export default {
    logout: ({commit}) => {
        commit('setSession', {}),
        commit('setSessionData', {})
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('refreshToken')
    }
}