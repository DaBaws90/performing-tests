// import Vue from 'vue'
import axios from 'axios'
import interceptorsSetup from '../interceptor/interceptor'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfiguration from '../store/storeConfiguration'

const localVue = createLocalVue()
localVue.prototype.$http = axios

localVue.use(Vuex)
const storeConfig = storeConfiguration()
const store = new Vuex.Store(storeConfig)
interceptorsSetup(store)

export default {
    localVue,
    store,
    getUsers: async () => {
        return axios.get('https://jsonplaceholder.typicode.com/todos/1')
    },
    login: async () => {
        return localVue.prototype.$http.post('http://localhost:5000/login', { username: 'iubago', userpassword: 'c7auWK31gFnqITWdiOgVh51IiKYBHhlemgAFMrJ33Yk='})
    },
    dummyRequest: async () => {
        return localVue.prototype.$http.get('dummy-url')
    }
}

// export const login = async() => {
//     return axios.post('http://localhost:5000/login', { username: 'iubago', userpassword: 'c7auWK31gFnqITWdiOgVh51IiKYBHhlemgAFMrJ33Yk='}).then(resp => resp).catch(e => Promise.reject(e))
// }