import Vue from 'vue'
import Vuex from 'vuex'
import { getLocalUser } from './helper/auth'
Vue.use(Vuex)
const user = getLocalUser()
var type = 0
if (!user) {
  type = 0
} else {
  type = user.type
}

export default new Vuex.Store({
  state: {
    currentUser: user,
    isLoggedIn: !!user,
    loading: false,
    auth_error: null,
    type: type,
    listAccount: []
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
    typeUser (state) {
      return state.type
    }
  },
  mutations: {
    login (state) {
      state.loading = true
      state.auth_error = null
    },
    loading (state) {
      state.loading = true
    },
    loginSuccess (state, payload) {
      state.auth_error = null
      state.isLoggedIn = true
      state.loading = false
      state.currentUser = Object.assign({}, payload.user,
        {
          access_token: payload.access_token,
          refresh_token: payload.refresh_token
        })
      localStorage.setItem('user', JSON.stringify(state.currentUser))
      state.type = state.currentUser.type
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
    },
    getListSuccess (state, payload) {
      state.listAccount = payload.accountList
      state.loading = false
    }

  },
  actions: {
    login (context) {
      context.commit('login')
    },
    loading (context) {
      context.commit('loading')
    }
  }
})
