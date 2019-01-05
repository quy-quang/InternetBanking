<template>
  <div id="user">
    <div class="content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card card-default">
              <div class="card-header">Create User</div>
              <div class="card-body">
                <form @submit.prevent="create">
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" class="form-control"
                      v-model="user.username">
                  </div>
                  <div class="form-group">
                    <input class="form-control" type="text" id="userState" :placeholder="userState" readonly>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" class="form-control"
                    v-model="user.password">
                    <small class="text-muted">Must contain a capital, lowercase, and number</small>
                  </div>
                  <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" class="form-control"
                    v-model="user.confirmPassword">
                    <small class="text-muted">Comfirm password must be same at password</small>
                  </div>
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" class="form-control"
                      v-model="user.name">
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" class="form-control"
                      v-model="user.email">
                  </div>
                  <button type="submit" class="btn btn-primary">Create User</button>
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
      </div>
    </div>
  </div>
</template>
<script>

import validate from 'validate.js'
import { checkUsername, createUser } from '../../helper/employee.js'
// Function debounce
function debounce (func, wait) {
  var timeout
  return function () {
    var context = this
    var args = arguments
    var executeFunction = function () {
      timeout = null
      func.apply(context, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(executeFunction, wait)
  }
}
export default {
  name: 'CreateUser',
  data () {
    return {
      user: {
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: ''
      },
      userState: 'Check Username',
      checkUser: '',
      errors: null
    }
  },
  watch: {
    'user.username': function (newVal, oldVal) {
      this.userState = 'Waiting...'
      if (newVal === '') {
        this.userState = 'Check Username'
      } else {
        this.debouncedGetAnswer()
      }
    }
  },
  created () {
    var vm = this
    this.debouncedGetAnswer = debounce(function () {
      return vm.getUserState()
    }, 500)
  },
  methods: {
    getUserState () {
      checkUsername({
        username: this.user.username
      })
        .then(res => {
          if (res.status === 200) {
            this.userState = 'You can use this username'
            this.checkUser = true
          } else {
            this.userState = 'This username is already exist'
            this.checkUser = false
          }
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    create () {
      this.errors = null
      const constraints = this.getConstraints()
      const errors = validate(this.$data.user, constraints)
      if (errors || this.checkUser === false) {
        this.errors = errors
        if (this.checkUser === false) {
          this.errors = {
            Username: ['This username is already in use']
          }
        }
      } else {
        createUser({
          username: this.user.username,
          password: this.user.password,
          name: this.user.name,
          email: this.user.email
        })
          .then(res => {
            alert('Create successed')
            this.$router.push('/')
          })
          .catch(errors => {
            console.log(errors)
          })
      }
    },
    getConstraints () {
      return {
        username: {
          presence: true,
          length: {
            minimum: 3,
            message: 'Must be at least 3 numbers long'
          }
        },
        password: {
          presence: true,
          format: {
            pattern: '^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z].{8,15}$',
            message: 'Must include at least one upper case letter, one lower case letter, and one numeric digit.'
          },
          length: {
            minimum: 8,
            maximun: 15,
            message: 'Must be at least 8 characters long and less than 15 characters'
          }
        },
        confirmPassword: {
          presence: true,
          equality: {
            attribute: 'password',
            message: 'Passwords do not match',
            comparator: (v1, v2) => {
              return v1 === v2
            }
          }
        },
        name: {
          presence: true
        },
        email: {
          presence: true,
          email: true
        }
      }
    }
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
