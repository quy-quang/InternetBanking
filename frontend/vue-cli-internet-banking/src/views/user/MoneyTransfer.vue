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
import lodash from 'lodash'
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
    transfer: function (newVal, oldVal) {
      this.accountHolder = 'Searching...'
      this.SearchHolder()
    }
  },
  created () {
    this.SearchHolder = this.getHolder()
  },
  method: {
    getHolder () {
      this.accountHolder = 'Cao Ba Dong'
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
