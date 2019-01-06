import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueLodash from 'vue-lodash'
// import { getToken } from './helper/auth.js'

const options = { name: 'lodash' }

Vue.use(BootstrapVue)
Vue.use(VueAxios, Axios)
Vue.use(VueLodash, options)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const requiresUserAuth = to.matched.some(record => record.meta.requiresUserAuth)
  const requiresEmployeeAuth = to.matched.some(record => record.meta.requiresEmployeeAuth)
  const requiresCEOAuth = to.matched.some(record => record.meta.requiresCEOAuth)
  const currentUser = store.state.currentUser
  if (!currentUser && (requiresCEOAuth || requiresEmployeeAuth || requiresUserAuth)) {
    next('/login')
  } else if ((requiresUserAuth && currentUser.type !== 1) ||
      (requiresEmployeeAuth && currentUser.type !== 2) ||
      (requiresCEOAuth && currentUser.type !== 3)) {
    next('/login')
  } else if (to.path === '/login' && currentUser) {
    next('/')
  } else {
    next()
  }
})
function getAccessToken () {
  // if the current store token expires soon
  var accessToken = null
  if (store.getters.accessTokenExp <= (Date.now() + 60000)) {
    var instance = Axios.create({
      baseURL: 'http://localhost:3000/',
      timeout: 1000
    })
    accessToken = instance.post('/getAccessTokenFromRefreshToken', {
      refreshToken: store.getters.refreshToken
    })
      .then(res => {
        console.log(res)
        store.commit('accessToken', res.data.access_token)
        return res.data.access_token
      })
    return accessToken
  }
  return store.getters.accessToken
}

Axios.interceptors.request.use(async function (config) {
  // If not one of these specific pages that doesn't need a token, use method to get the current token or request a new one.  Otherwise, use current token (possibly none)
  if (!config.url.includes('login') && !config.url.includes('verifyCaptcha')) {
    config.headers['x-access-token'] = await getAccessToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

Axios.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    store.commit('logout')
    router.push('/login')
  }
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App) // Render file App.vue
}).$mount('#app')
