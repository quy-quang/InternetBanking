import Vue from 'vue'
import Vuex from 'vuex'
import { getLocalUser } from './helper/auth'
Vue.use(Vuex)
const user = getLocalUser()

export default new Vuex.Store({
  state: {
    currentUser: user,
    isLoggedIn: !!user,
    loading: false,
    auth_error: null,
    typeUser: user.type,
    customer: []
  },
  getters: {
    isLoading (state) {
      return state.loading
    },
    currentUser (state) {
      return state.currentUser
    },
    authError (state) {
      return state.auth_error
    },
    customer (state) {
      return state.customer
    },
    typeUser (state) {
      return state.typeUser
    }
  },
  mutations: {
    login (state) {
      state.loading = true
      state.auth_error = null
    },
    loginSuccess (state, payload) {
      state.auth_error = null
      state.isLoggedIn = true
      state.loading = false
      state.typeUser = state.currentUser.type
      state.currentUser = Object.assign({}, payload.user,
        {
          access_token: payload.access_token,
          refresh_token: payload.refresh_token
        })
      localStorage.setItem('user', JSON.stringify(state.currentUser))
    },
    loginFailed (state, payload) {
      state.loadinng = false
      state.auth_error = payload.error
    },
    logout (state) {
      localStorage.removeItem('user')
      state.isLoggedIn = false
      state.currentUser = null
      state.type = 0
    }
  },
  actions: {
    login (context) {
      context.commit('login')
    }
  }
})
