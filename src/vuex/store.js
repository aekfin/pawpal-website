import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

// Make vue aware of Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    user: { email: '' },
    errorLogin: null
  },
  getters: {
    IsLogin () {
      if (localStorage.getItem('auth')) {
        return true
      } else {
        return false
      }
    },
    GetUID () {
      if (localStorage.getItem('auth')) {
        return localStorage.getItem('auth')
      } else {
        return null
      }
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    Login (state, auth) {
      localStorage.setItem('auth', auth.email)
    },
    Logout (state) {
      state.user = []
      localStorage.removeItem('auth')
      window.location.reload()
      return true
    }
  }
})
