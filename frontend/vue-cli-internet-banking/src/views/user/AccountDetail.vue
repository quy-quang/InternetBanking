<template>
  <div class="account-detail">
      <table class="table">
        <tr>
          <th>Account Number</th>
          <td>{{account.bankAccountId}}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>{{account.bankAccountName}}</td>
        </tr>
        <tr>
          <th>Balance</th>
          <td>{{account.remain}}</td>
        </tr>
      </table>
      <div class="row" style="text-align: center;">
        <div class="col-4">
          <router-link class="btn btn-success"
            :to="'/user/moneytransfer'"
            v-bind:style="{color: 'white'}"
          >Balance Transfer</router-link>
        </div>
        <div class="col-4">
          <router-link class="btn btn-primary"
            :to="'/user/historyaccount'"
            v-bind:style="{color: 'white'}"
          >Transaction History</router-link>
        </div>
        <div class="col-4">
          <router-link class="btn btn-danger"
            :to="'/user/closeaccount'"
            v-bind:style="{color: 'white'}"
          >Close Account</router-link>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'AccountDetail',
  computed: {
    account () {
      return this.$store.state.currentAccount
    }
  },
  mounted () {
    this.$store.dispatch('loadAccountDetail', {
      userId: this.$store.state.currentUser.userId,
      bankAccountId: this.$route.params.id
    })
  }
}
</script>
