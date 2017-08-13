import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

// Make vue aware of Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    user: { email: '' }
  },
  getters: {
    IsLogin () {
      if (Cookies.get('uid')) {
        return true
      } else {
        return false
      }
    },
    GetUID () {
      if (Cookies.get('uid')) {
        return Cookies.get('uid')
      } else {
        return null
      }
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    Login (state, user) {
      state.user = user
      Cookies.remove('uid')
      Cookies.set('uid', 2255412, { expires: 1 })
    },
    Logout (state) {
      state.user = []
      Cookies.remove('uid')
    }
  }
})
