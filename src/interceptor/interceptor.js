import axios from 'axios'
import router from '../router'
import { store } from '../../../sms-microapp/src/store/store'

export default () => {
    axios.defaults.baseURL = process.env.VUE_APP_ENDPOINT_PYTHON_URL
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    axios.interceptors.request.use(config => {
        store.commit('setLoading', true)
        const accessToken = sessionStorage.getItem('accessToken')
        const refreshToken = sessionStorage.getItem('refreshToken')

        if (accessToken && !config.url.includes('login') && !config.url.includes('refresh')) {
            config.headers.Authorization = 'Bearer ' + accessToken
        } else if(refreshToken && config.url.includes('refresh')) {
            config.headers.Authorization = 'Bearer ' + refreshToken
        }
        return config
    }, error => {
        Promise.reject(error)
    })

    axios.interceptors.response.use(response => {
        store.commit('setLoading', false)
        return response
    }, err => {
        if (err.response && [400, 401, 403, 404, 422].filter(entry => entry === err.response.status) !== (null || undefined)) {
            console.info('IF')
            router.push('/test')
        // } else if (err.response && err.response.status === 404) {
        //     router.push('/')
        } else {
            // Promise.reject(err) // this does not work
            // throw err // This work
            console.log('else')
            router.push('/')
            // Promise.reject(err)
        }
    })
}