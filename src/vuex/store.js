import Vue from 'vue'
import Vuex from 'vuex'

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
    }
  }
})
