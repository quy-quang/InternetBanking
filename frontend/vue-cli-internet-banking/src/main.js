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

Vue.use(BootstrapVue)
Vue.use(VueAxios, Axios)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const requiresUserAuth = to.matched.some(record => record.meta.requiresUserAuth)
  const requiresEmployeeAuth = to.matched.some(record => record.meta.requiresEmployeeAuth)
  const requiresCEOAuth = to.matched.some(record => record.meta.requiresCEOAuth)
  const currentUser = store.state.currentUser

  // if (requiresAuth && !currentUser) {
  //   next('/login')
  // } else if (to.path === '/login' && currentUser) {
  //   next('/')
  // } else {
  //   next()
  // }
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

new Vue({
  router,
  store,
  render: h => h(App) // Render file App.vue
}).$mount('#app')
