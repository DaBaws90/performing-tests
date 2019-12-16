export default {
    loggedIn: (state) => state.session.loggedIn,
    accessToken: (state) => state.session.accessToken,
    refreshToken: (state) => state.session.refreshToken,
    loading: (state) => state.session.loading,
    session: (state) => state.session,
    sessionData: (state) => state.sessionData,
    domainId: (state) => state.sessionData.domainid,
    globalExport: (state) => state.session.globalexport,
    userId: (state) => state.sessionData.userid,
    role: (state) => state.sessionData.role,
    domainName: (state) => state.sessionData.domainName,
    username: (state) => state.sessionData.username,
    isSuperAdmin: (state) => state.sessionData.role === 3,
    isAdmin: (state) => state.sessionData.role === 2,
    isSupervisor: (state) => state.sessionData.role === -1,
    isNormal: (state) => state.sessionData.role === 2
}