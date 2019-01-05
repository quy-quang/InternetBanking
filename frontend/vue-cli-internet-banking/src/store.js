import Vue from 'vue'
import Vuex from 'vuex'
import { getLocalAccount, getLocalUser } from './helper/auth'
import { getAccountDetail } from './helper/user'
Vue.use(Vuex)
const user = getLocalUser()
var type = 0
if (!user) {
  type = 0
} else {
  type = user.type
}
const account = getLocalAccount()

export default new Vuex.Store({
  state: {
    currentUser: user,
    isLoggedIn: !!user,
    loading: false,
    auth_error: null,
    type: type,
    listAccount: [],
    currentAccount: account,
    refreshToken: null,
    accessToken: null,
    accessTokenExp: null,
    transactionId: null
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
    },
    accessTokenExp (state) {
      return state.accessTokenExp
    },
    accessToken (state) {
      return state.accessToken
    },
    refreshToken (state) {
      return state.refreshToken
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
      state.currentUser = Object.assign({}, payload.user)
      state.refreshToken = payload.refresh_token
      state.accessToken = payload.access_token
      state.accessTokenExp = Date.now() + 600000
      localStorage.setItem('user', JSON.stringify(state.currentUser))
      state.type = state.currentUser.type
    },
    loginFailed (state, payload) {
      state.loading = false
      state.auth_error = payload.error
    },
    logout (state) {
      localStorage.removeItem('user')
      state.isLoggedIn = false
      state.listAccount = []
      state.currentUser = null
      state.accessToken = null
      state.refreshToken = null
      state.accessTokenExp = null
      state.type = 0
      state.currentAccount = null
    },
    getListSuccess (state, payload) {
      state.listAccount = payload.accountList
      state.loading = false
    },
    getAccountDetail (state, payload) {
      state.currentAccount = payload.AccountDetail
      localStorage.setItem('account', JSON.stringify(state.currentAccount))
      state.loading = false
    },
    addContact (state, payload) {
      var checker = false
      for (var i = 0; i < state.currentUser.contactList.length; i++) {
        if (state.currentUser.contactList[i].accountNumber === payload.accountNumber) {
          state.currentUser.contactList[i].name = payload.name
          checker = true
        }
      }
      if (checker === false) {
        state.currentUser.contactList.push(payload)
      }
    },
    accessToken (state, payload) {
      state.accessToken = payload
      state.accessTokenExp = Date.now() + 600000
    },
    transactionid (state, payload) {
      state.transactionId = payload
    }
  },
  actions: {
    login (context) {
      context.commit('login')
    },
    loading (context) {
      context.commit('loading')
    },
    loadAccountDetail (context, payload) {
      getAccountDetail(payload)
        .then(res => {
          context.commit('getAccountDetail', res)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addContact (context, payload) {
      context.commit('addContact', payload)
    }
  }
})
