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
import MoneyTransfer from './views/user/MoneyTransfer.vue'
import Profile from './views/Profile.vue'
import User from './views/user/User.vue'
import Contact from './views/user/Contact.vue'
import NewContact from './views/user/NewContact.vue'
import VerifyOTP from './views/user/VerifyOTP.vue'
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
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/user',
      component: User,
      meta: {
        requiresUserAuth: true
      },
      children: [
        {
          path: '',
          name: 'ListBankAccount',
          component: ListBankAccount
        },
        {
          path: 'historyaccount',
          name: 'HistoryAccount',
          component: HistoryAccount
        },
        {
          path: 'closeaccount',
          name: 'CloseAccount',
          component: CloseAccount
        },
        {
          path: 'moneytransfer',
          name: 'MoneyTransfer',
          component: MoneyTransfer
        },
        {
          path: 'accountdetail/:id',
          name: 'AccountDetail',
          component: AccountDetail
        },
        {
          path: 'verifyotp',
          name: 'VerifyOTP',
          component: VerifyOTP
        }
      ]
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {
        requiresUserAuth: true
      }
    },
    {
      path: '/contact/new',
      name: 'NewContact',
      component: NewContact,
      meta: {
        requiresUserAuth: true
      }
    },
    {
      path: '/employee/createuser',
      name: 'createuser',
      component: CreateUser,
      meta: {
        requiresEmployeeAuth: true
      }
    },
    {
      path: '/employee/createbankaccount',
      name: 'createbankaccount',
      component: CreateBankAccount,
      meta: {
        requiresEmployeeAuth: true
      }
    },
    {
      path: '/employee/addfund',
      name: 'addfund',
      component: AddFund,
      meta: {
        requiresEmployeeAuth: true
      }
    },
    {
      path: '/ceo/FundDetail',
      name: 'funddetail',
      component: FundDetail,
      meta: {
        requiresCEOAuth: true
      }
    }
  ]
})
