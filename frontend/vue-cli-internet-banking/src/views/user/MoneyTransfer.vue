<template>
  <div class="transferbalance">
    <form @submit.prevent ="transferNow">
      <div class="form-group">
        <label for="bankAccountNumber">Bank Account Number</label>
        <input type="number" name="bankAccountNumber" id="bankAccountNumber" class="form-control" v-model="transfer.receiveAccount">
      </div>
      <div class="form-group">
        <label for="accountHolder">Account Holder</label>
        <input class="form-control" type="text" id="accountHolder" :placeholder="accountHolder" readonly>
      </div>
      <div class="form-group">
        <label for="money">Money</label>
        <input type="number" name="money" id="money" class="form-control" v-model.number="transfer.money">
        <small class="text-muted">Currency: VND</small>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea class="form-control" id="message" rows="3" v-model="transfer.message"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Transfer</button>
    </form>
    <div class="errors" v-if="errors">
      <ul>
        <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
          <strong>{{fieldName}}</strong> {{fieldsError.join('.\n')}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import validate from 'validate.js'
import { getAccountName, getContactName, transferMoney } from '../../helper/user.js'
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
  name: 'MoneyTransfer',
  data () {
    return {
      transfer: {
        receiveAccount: '',
        money: '',
        message: ''
      },
      accountHolder: 'Account Holder',
      checkAccount: '',
      errors: null
    }
  },
  watch: {
    'transfer.receiveAccount': function (newVal, oldVal) {
      this.accountHolder = 'Searching...'
      if (newVal === '') {
        this.accountHolder = 'Account Holder'
      } else {
        this.debouncedGetAnswer()
      }
    }
  },
  created () {
    var vm = this
    this.debouncedGetAnswer = debounce(function () {
      return vm.getHolder()
    }, 500)
  },
  methods: {
    getHolder () {
      console.log('called')
      getContactName({
        userId: this.$store.state.currentUser.userId,
        accountNumber: this.transfer.receiveAccount
      })
        .then(res => {
          console.log(res)
          if (res.status === 201) {
            this.accountHolder = res.data.accountName
            this.checkAccount = true
          } else {
            if (res.status === 204) {
              getAccountName({
                accountNumber: this.transfer.receiveAccount
              })
                .then(res => {
                  if (res.status === 201) {
                    this.accountHolder = res.data.accountName
                    this.checkAccount = true
                  } else {
                    if (res.status === 204) {
                      this.accountHolder = "This Account Number doesn't exist"
                      this.checkAccount = false
                    }
                  }
                })
            }
          }
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    transferNow () {
      this.errors = null
      const constraints = this.getConstraints()
      const errors = validate(this.$data.transfer, constraints)
      if (errors) {
        this.errors = errors
      }
      // Send the data to the back-end APi
      if (errors || this.checkAccount === false) {
        this.errors = errors
        if (this.checkAccount === false) {
          this.errors = {
            accountHolder: ["Doesn't exist"]
          }
        }
      } else {
        transferMoney({
          sendAcc: this.$store.state.currentAccount.bankAccountId,
          recAcc: this.transfer.receiveAccount,
          message: this.transfer.message,
          amount: this.transfer.money
        })
          .then(res => {
            if (res.status === 200) {
              if (res.data.msg === 'ACCEPTED') {
                // Chuyển xong nhảy qua trang OTP
                this.$store.commit('transactionid', res.data.transactionId)
                this.$router.push('/user/verifyotp')
              }
              if (res.data.msg === 'NOTENOUGH') {
                this.errors = {
                  Money: ['This Account Not Enough Money']
                }
              }
            }
          })
          .catch(errors => {
            console.log(errors)
            alert('Something wrongs')
          })
      }
    },
    getConstraints () {
      return {
        receiveAccount: {
          presence: true,
          numericality: true,
          length: {
            minimum: 3,
            message: 'must be at least 3 numbers long'
          }
        },
        money: {
          presence: true,
          numericality: true
        },
        message: {
          presence: true,
          length: {
            minimum: 3,
            message: 'must be at least 10 characters long'
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
