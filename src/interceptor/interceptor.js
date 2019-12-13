import axios from 'axios'
import router from '../router'

export default (store) => {
    axios.defaults.baseURL = process.env.VUE_APP_PYTHON_ENDPOINT
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    axios.interceptors.request.use(config => {
        store.commit('setLoading', true)
        // const accessToken = sessionStorage.getItem('accessToken')
        // const refreshToken = sessionStorage.getItem('refreshToken')
        const accessToken = store.getters.accessToken
        const refreshToken = store.getters.refreshToken

        if (accessToken && !config.url.includes('login') && !config.url.includes('refresh')) {
            config.headers.Authorization = 'Bearer ' + accessToken
        } else if(refreshToken && config.url.includes('refresh')) {
            config.headers.Authorization = 'Bearer ' + refreshToken
        }
        return config
    }, error => {
        store.commit('setLoading', false)
        return Promise.reject(error)
    })

    axios.interceptors.response.use(response => {
        store.commit('setLoading', false)
        return response
    }, err => {
        store.commit('setLoading', false)
        if (err.response && (err.response.status === 403 || err.response.status === 422)) {
            store.commit('setLoggedIn', false)
            router.push('/')
        } else if (err.response && err.response.status === 401) {
            if (!err.response.config.url.includes('refresh')) {
                (async () => {
                  try {
                    let response = await axios.get('refresh')
                    store.commit('setToken', response.data.access_token)
                    store.commit('setRefreshToken', response.data.refresh_token)
                    return axios(err.config)
                  } catch (error) {
                    return Promise.reject(error)
                  }
                })()
              } else {
                store.commit('setLoggedIn', false)
                router.push('/')
              }        
        } else {
            return Promise.reject(err)
        }
    })
}