<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">
      <router-link to="/"><img src="../assets/logoMain.png" alt="BV" style="width: 100px; height: 50px"></router-link>
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#" v-for="item in mainMenu" :key="item.title" router
          :to="item.link" exact>{{item.title}}</b-nav-item>
        <template v-if="typeMenu === 1">
          <b-nav-item href="#" v-for="item in userMenu" :key="item.title" router
          :to="item.link">{{item.title}}</b-nav-item>
        </template>
        <template v-if="typeMenu === 2">
          <b-nav-item href="#" v-for="item in employeeMenu" :key="item.title" router
          :to="item.link">{{item.title}}</b-nav-item>
        </template>
        <template v-if="typeMenu === 3">
          <b-nav-item href="#" v-for="item in ceoMenu" :key="item.title" router
          :to="item.link">{{item.title}}</b-nav-item>
        </template>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">VI</b-dropdown-item>
        </b-nav-item-dropdown>
        <template v-if="user !== null">
          <b-nav-item-dropdown v-bind:text="user.name" right>
            <b-dropdown-item href="#" v-for="item in optionMenu" :key="item.title"
            :to="item.link">{{item.title}}</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
        <template v-else>
            <b-nav-item router
            :to="LoginInMenu[0].link">{{LoginInMenu[0].title}}</b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <!-- navbar-1.vue -->
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      sideNav: false,
      mainMenu: [
        { icon: 'home', title: 'Home', link: '/' },
        { icon: 'person', title: 'About', link: '/about' }
      ],
      userMenu: [
        { icon: 'face', title: 'List Bank Account', link: '/user/listbankaccount' }
      ],
      employeeMenu: [
        { icon: 'lock_open', title: 'Create User', link: '/employee/createuser' },
        { icon: 'lock_open', title: 'Create Bank Account', link: '/employee/createbankaccount' },
        { icon: 'lock_open', title: 'Add Fund', link: '/employee/addfund' }
      ],
      ceoMenu: [
        { icon: 'lock_open', title: 'Fund Detail', link: '/ceo/funddetail' }
      ],
      LoginInMenu: [
        { icon: 'person', title: 'Login', link: '/login' }
      ],
      LoginOutMenu: [
        { icon: 'person', title: 'Logout', link: '/logout' }
      ],
      optionMenu: [
        { icon: 'person', title: 'Profile', link: '/profile' }
      ]
    }
  },
  computed: {
    typeMenu () {
      return this.$store.state.type
    },
    user () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  },
  props: []
}
</script>
