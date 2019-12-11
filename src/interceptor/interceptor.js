import axios from 'axios'
import router from '../router'

export default () => {
    axios.defaults.baseURL = process.env.VUE_APP_ENDPOINT_PYTHON_URL
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    axios.interceptors.request.use(config => {
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
        return response
    }, errorResponse => {
        Promise.reject(errorResponse)
    })
}