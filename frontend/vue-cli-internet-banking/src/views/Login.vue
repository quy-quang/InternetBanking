<template>
  <div class="justify-content-center login row">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <form @submit.prevent="authenticate" action="login">
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
              <input type="submit" value="Login" class="btn btn-primary">
            </div>
          </form>
          <div class="errors" v-if="errors">
            <ul>
              <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                <strong>{{fieldName}}</strong> {{fieldsError.join('.\n')}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validate from 'validate.js'
import { login, verifyCaptcha } from '../helper/auth'
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: '',
        token: ''
      },
      errors: null
    }
  },
  methods: {
    authenticate () {
      this.errors = null
      const constraints = this.getConstraints()
      const errors = validate(this.$data.form, constraints)
      if (errors) {
        this.errors = errors
      } else {
        verifyCaptcha({
          token: this.form.token
        })
          .then(res => {
            if (res.status === 200) {
              this.$store.dispatch('login')
              login({
                username: this.form.username,
                password: this.form.password
              })
                .then(res => {
                  if (res.status === 201) {
                    this.$store.commit('loginSuccess', res.data)
                    this.$router.push({ path: '/' })
                  }
                })
                .catch(error => {
                  this.$store.commit('loginFailed', { error })
                  this.callback()
                  this.errors = {
                    'Login Fail': ['Username or Password is incorrect']
                  }
                })
            }
          })
          .catch(errors => {
            console.log(errors)
          })
      }
    },
    callback () {
      // eslint-disable-next-line
      grecaptcha.execute('6Lf4L4YUAAAAANQnOtH0QlYnE_KMH3wRmhXbLbrs', { action: '' })
        .then(token => {
          this.form.token = token
        })
    },
    getConstraints () {
      return {
        username: {
          presence: true,
          length: {
            minimum: 1,
            message: 'username cannot be blank'
          }
        },
        password: {
          presence: true,
          length: {
            minimum: 1,
            message: 'password cannot be blank'
          }
        }
      }
    }
  },
  mounted () {
    // eslint-disable-next-line
    grecaptcha.ready(this.callback)
  }
}
</script>
<style>
.errors{
  background: lightcoral;
  border-radius: 5px;
  padding: 21px 0px 2px 0px;
  margin-top: 20px;
}
</style>
