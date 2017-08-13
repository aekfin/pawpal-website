import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

// Make vue aware of Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    auth: {
      status: false,
      user: { email: '' }
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    Login (state, user) {
      state.auth.status = true
      state.auth.user = user
      Cookies.remove('uid')
      Cookies.set('uid', 2255412, { expires: 1 })
    },
    Logout (state) {
      state.auth.status = false
      state.auth.user = []
      console.log('Do')
      Cookies.remove('uid')
    }
  }
})
