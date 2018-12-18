import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import About from './views/About.vue'
import FundDetail from './views/ceo/FundDetail.vue'
import AddFund from './views/employee/AddFund.vue'
import CreateBankAccount from './views/employee/CreateBankAccount.vue'
import CreateUser from './views/employee/CreateUser.vue'
import AccountDetail from './views/user/AccountDetail.vue'
import CloseAccount from './views/user/CloseAccount.vue'
import HistoryAccount from './views/user/HistoryAccount.vue'
import ListBankAccount from './views/user/ListBankAccount.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/listbankaccount',
      name: 'listbankaccount',
      component: ListBankAccount
    },
    {
      path: '/user/historyaccount',
      name: 'historyaccount',
      component: HistoryAccount
    },
    {
      path: '/user/closeaccount',
      name: 'closeaccount',
      component: CloseAccount
    },
    {
      path: '/user/accountdetail',
      name: 'accountdetail',
      component: AccountDetail
    },
    {
      path: '/employee/createuser',
      name: 'createuser',
      component: CreateUser
    },
    {
      path: '/employee/createbankaccount',
      name: 'createbankaccount',
      component: CreateBankAccount
    },
    {
      path: '/employee/addfund',
      name: 'addfund',
      component: AddFund
    },
    {
      path: '/ceo/FundDetail',
      name: 'funddetail',
      component: FundDetail
    }
  ]
})
