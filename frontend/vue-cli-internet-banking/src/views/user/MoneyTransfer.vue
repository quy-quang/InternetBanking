<template>
  <div class="transferbalance">
    <form @submit.prevent ="add">
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
        <input type="number" name="money" id="money" class="form-control" v-model="transfer.money">
        <small class="text-muted">Currency: VND</small>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea class="form-control" id="message" rows="3" v-model="transfer.message"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Transfer</button>
    </form>
  </div>
</template>
<script>
import validate from 'validate.js'
import { getAccountName, getContactName } from '../../helper/user.js'
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
      error: null
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
          } else {
            if (res.status === 204) {
              getAccountName({
                accountNumber: this.transfer.receiveAccount
              })
                .then(res => {
                  if (res.status === 201) {
                    this.accountHolder = res.data.accountName
                  } else {
                    if (res.status === 204) {
                      this.accountHolder = "This Account Number doesn't exist"
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
    add () {
      this.errors = null
      const constraints = this.getConstraints()
      const errors = validate(this.$data.transfer, constraints)
      if (errors) {
        this.errors = errors
      }
    },
    getConstraints () {
      return {
        receiveAccount: {
          presense: true,
          numbericallity: true,
          length: {
            minimum: 3,
            message: 'must be at least 3 numbers long'
          }
        },
        money: {
          presense: true
        }
      }
    }
  }
}
</script>
