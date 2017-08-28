import Vue from 'vue'
import Vuex from 'vuex'
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
      if (localStorage.getItem('hospital')) {
        return true
      } else {
        return false
      }
    },
    GetUser () {
      if (localStorage.getItem('auth')) {
        return JSON.parse(localStorage.getItem('auth'))
      } else {
        return null
      }
    },
    GetHospital () {
      if (localStorage.getItem('hospital')) {
        return JSON.parse(localStorage.getItem('hospital'))
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
      localStorage.setItem('hospital', JSON.stringify(hospital))
    },
    Login (state, auth) {
      localStorage.setItem('auth', JSON.stringify(auth))
    },
    Logout (state) {
      localStorage.removeItem('auth')
      localStorage.removeItem('hospital')
    }
  }
})
