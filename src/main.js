import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store/store'

import interceptorsSetup from './interceptor/interceptor'

Vue.config.productionTip = false
Vue.prototype.$http = axios

interceptorsSetup()

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
