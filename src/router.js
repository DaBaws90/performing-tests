import Vue from 'vue'
import Router from 'vue-router'
import TestComponent from './views/TestComponent'
import Login from './views/Login'

Vue.use(Router)

const routes = [
  {
    path: '/test',
    name: 'test',
    component: TestComponent
  },
  {
    path: '/',
    name: 'login',
    component: Login
  }
]

export default new Router({
  routes
})