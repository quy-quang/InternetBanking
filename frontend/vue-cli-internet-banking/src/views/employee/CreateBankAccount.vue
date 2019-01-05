<template>
  <div id="user">
    <div class="content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card card-default">
              <div class="card-header">Create Bank Account</div>
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
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" class="form-control"
                      v-model="user.name">
                  </div>
                  <button type="submit" class="btn btn-primary">Create Bank Account</button>
                </form>
                <div class="bankAccountNumber">
                  Your Bank Account Number: {{bankAccountNumber}}
                </div>
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
import { checkUsername, createBankAccount } from '../../helper/employee.js'
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
  name: 'CreateBankAccount',
  data () {
    return {
      user: {
        username: '',
        name: ''
      },
      userState: 'Check Username',
      checkUser: '',
      errors: null,
      bankAccountNumber: ''
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
            this.userState = "This username isn't exist"
            this.checkUser = false
          } else {
            this.userState = 'This username is exist'
            this.checkUser = true
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
            Username: ["This username isn't exist"]
          }
        }
      } else {
        createBankAccount({
          username: this.user.username,
          name: this.user.name
        })
          .then(res => {
            if (res.status === 201) {
              alert('Successed')
              this.bankAccountNumber = res.data.accountId
            } else {
              alert('Failed')
            }
          })
          .catch(errors => {
            alert('Failed')
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
        name: {
          presence: true,
          length: {
            minimum: 1,
            message: 'can not be blank'
          }
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
