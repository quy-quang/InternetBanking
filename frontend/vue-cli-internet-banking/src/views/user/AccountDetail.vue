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
      <div class="row">
        <div class="col-4">
          <button class="btn btn-success">
            <router-link
              :to="'/user/balancetransfer'"
              v-bind:style="{color: 'white'}"
            >Balance Transfer</router-link>
          </button>
        </div>
        <div class="col-4">
          <button class="btn btn-info">
            <router-link
              :to="'/user/historyaccount'"
              v-bind:style="{color: 'white'}"
            >Transaction History</router-link>
          </button>
        </div>
        <div class="col-4">
          <button class="btn btn-danger">
            <router-link
              :to="'/user/closeaccount'"
              v-bind:style="{color: 'white'}"
            >Close Account</router-link>
          </button>
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
      accountNumber: this.$route.params.id
    })
  }
}
</script>
