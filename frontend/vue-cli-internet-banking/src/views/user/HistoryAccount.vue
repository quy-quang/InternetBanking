<template>
  <div class="historyaccount">
    <table class="table">
      <thead>
        <th>Transfer ID</th>
        <th>Send Account</th>
        <th>Receive Account</th>
        <th>Message</th>
        <th>Amount</th>
        <th>Type</th>
      </thead>
      <tbody>
        <template v-if="!historyAccount.length">
          <tr>
            <td colspan="4" class="text-center">This Account Do Not Have Any History Transaction</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(account, index) in historyAccount" :key="index">
            <td>{{account.transactionId}}</td>
            <td>{{account.sendAcc}}</td>
            <td>{{account.recAcc}}</td>
            <td>{{account.message}}</td>
            <td>{{account.amount}}</td>
            <template v-if="account.sendAcc == accountId">
              <td>Send</td>
            </template>
            <template v-else>
              <td>Receive</td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import { getAccountHistory } from '../../helper/user.js'
export default {
  name: 'HistoryAccount',
  data () {
    return {
      historyAccount: [{
        amount: 0,
        message: '',
        recAcc: '',
        sendAcc: '',
        transactionId: ''
      }]
    }
  },
  computed: {
    accountId () {
      return this.$store.state.currentAccount.bankAccountId
    }
  },
  created () {
    this.$store.dispatch('loading') // goi commit loading
    getAccountHistory({
      userId: this.$store.state.currentUser.userId,
      bankAccountId: this.$store.state.currentAccount.bankAccountId
    })
      .then(res => {
        console.log(res.relatedTransaction)
        this.historyAccount = res.relatedTransaction
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
