import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import interceptorsSetup from './interceptor/interceptor'

import storeConfiguration from './store/storeConfiguration'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.prototype.$http = axios
interceptorsSetup()

Vue.use(Vuex)
const storeConfig = storeConfiguration()
const store = new Vuex.Store(storeConfig)

new Vue({
  router,
  store,
  beforeCreate () {
    if (!sessionStorage.getItem('accessToken')) {
      router.push('/')
    }
  },
  render: h => h(App),
}).$mount('#app')
