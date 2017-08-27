import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'js-cookie'
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
    IsSelectHospital () {
      if (cookie.get('hospital')) {
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
    SelectHospital (state, hospital) {
      cookie.set('hospital', hospital, { expires: 1 })
    },
    Login (state, auth) {
      localStorage.setItem('auth', auth)
    },
    Logout (state) {
      localStorage.removeItem('auth')
      cookie.remove('hospital')
    }
  }
})
