<template>
  <div class="justify-content-center login row">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">login</div>
        <div class="card-body">
          <form @submit.prevent="authenticate">
            <div class="form-group row">
              <label for="userName"></label>
              <input
                type="text"
                v-model="form.username"
                class="form-control"
                placeholder="User Name"
              >
            </div>
            <div class="form-group row">
              <label for="password"></label>
              <input
                type="password"
                v-model="form.password"
                class="form-control"
                placeholder="Password"
              >
            </div>
            <div class="form-group row">
              <input type="submit" value="Login">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../helper/auth'
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      error: null
    }
  },
  methods: {
    authenticate () {
      this.$store.dispatch('login')
      login(this.$data.form)
        .then(res => {
          this.$store.commit('loginSuccess', res)
          this.$router.push({ path: '/' })
        })
        .catch(error => {
          console.log(error)
          this.$store.commit('loginFailed', { error })
        })
    }
  }
}
</script>
