<template>
    <table class="table">
      <thead>
        <th>Index</th>
        <th>Account Number</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <template v-if="!accountList.length">
          <tr>
            <td colspan="4" class="text-center">No Bank Account Available</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(account, index) in accountList" :key="index">
            <td>{{index + 1}}</td>
            <td>{{account}}</td>
            <td>
              <router-link :to="{name: 'AccountDetail', params: {id: account}}" v-bind:style="{color: 'white'}" class="btn btn-info">More Detail</router-link>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
</template>

<script>
import { getListAccount } from '../../helper/user.js'
export default {
  name: 'list',
  computed: {
    accountList () {
      return this.$store.state.listAccount
    }
  },
  mounted () {
    this.$store.dispatch('loading') // goi commit loading
    getListAccount({ userId: this.$store.state.currentUser.userId })
      .then(res => {
        this.$store.commit('getListSuccess', res)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
