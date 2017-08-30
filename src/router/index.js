import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import VueResource from 'vue-resource'

import LandingPage from '@/components/'
import LoginPage from '@/components/Login.vue'

import guestRoute from './guest.js'
import doctorRoute from './doctor.js'

Vue.use(Router)
Vue.use(VueResource)

var router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'LandingPage', component: LandingPage },
    { path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('auth')) {
          next('/logout')
        } else {
          next()
        }
      }
    },
    { path: '/logout',
      beforeEnter: (to, from, next) => {
        store.commit('Logout')
        Vue.http.get('/api/logout/').then(response => {
          next('/login')
          window.location.reload()
        }, response => {
          console.log(response)
        })
      }
    },
    guestRoute,
    doctorRoute
  ]
})

export default router
