<template>
  <div id="user">
    <div class="content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card card-default">
              <div class="card-header">Create Bank Account</div>
              <div class="card-body">
                <form @submit.prevent="add">
                  <div class="form-group">
                    <label for="BankAccount">Bank Account</label>
                    <input type="text" name="BankAccount" id="BankAccount" class="form-control"
                      v-model="account.bankAccountNumber">
                  </div>
                  <div class="form-group">
                    <input class="form-control" type="text" id="userState" :placeholder="accountState" readonly>
                  </div>
                  <div class="form-group">
                    <label for="money">Money</label>
                    <input type="number" name="money" id="money" class="form-control"
                      v-model.number="account.money">
                  </div>
                  <button type="submit" class="btn btn-primary">Add Fund</button>
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
import { checkAccount, addFund } from '../../helper/employee.js'
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
  name: 'AddFund',
  data () {
    return {
      account: {
        bankAccountNumber: '',
        money: ''
      },
      accountState: 'Check Account',
      checkAccount: '',
      errors: null
    }
  },
  watch: {
    'account.bankAccountNumber': function (newVal, oldVal) {
      this.accountState = 'Waiting...'
      if (newVal === '') {
        this.accountState = 'Check Account'
      } else {
        this.debouncedGetAnswer()
      }
    }
  },
  created () {
    var vm = this
    this.debouncedGetAnswer = debounce(function () {
      return vm.getAccountState()
    }, 500)
  },
  methods: {
    getAccountState () {
      checkAccount({
        accountNumber: this.account.bankAccountNumber
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            if (res.data.msg === 'NOTEXIST') {
              this.accountState = "This account isn't exist"
              this.checkAccount = false
            }
            if (res.data.msg === 'DISABLE') {
              this.accountState = 'This account no longer avaiable'
              this.checkAccount = false
            }
            if (res.data.msg === 'OK') {
              this.accountState = 'This account avaiable'
              this.checkAccount = true
            }
          }
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    add () {
      this.errors = null
      const constraints = this.getConstraints()
      const errors = validate(this.$data.account, constraints)
      if (errors || this.checkAccount === false) {
        this.errors = errors
        if (this.checkAccount === false) {
          this.errors = {
            BankAccount: ["This bank account isn't exist"]
          }
        }
      } else {
        addFund({
          bankAccountNumber: this.account.bankAccountNumber,
          money: this.account.money
        })
          .then(res => {
            if (res.status === 202) {
              alert('Success')
              this.$router.push('/')
            } else {
              if (res.status === 200) {
                alert('Fail')
                this.$router.push('/')
              }
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
        bankAccountNumber: {
          presence: true,
          length: {
            minimum: 3,
            message: 'Must be at least 3 numbers long'
          }
        },
        money: {
          presence: true,
          numericality: true
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
