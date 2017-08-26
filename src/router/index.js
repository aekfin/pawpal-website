import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import VueResource from 'vue-resource'
import Cookie from 'js-cookie'

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
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/logout',
      beforeEnter: (to, from, next) => {
        store.commit('Logout')
        Vue.http.post('/api/logout/', {}, {headers: {'X-CSRFToken': Cookie.get('csrftoken')}}).then(response => {
          console.log(response)
          window.location.reload()
          next('/login')
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
