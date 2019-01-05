<template>
    <div class="close-account">
        <form @submit.prevent ="close">
            Choose transfer account
            <div class="form-group">
                <template v-if="listAccount.length === 1">
                    <div>
                        You just have only 1 account. Therefore, you can't close it.
                    </div>
                </template>
                <template v-else>
                    <div class="form-check form-check-inline" v-for="(account,index) in listAccount" :key="index">
                      <template v-if="account !== currentAccount">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" :id="account" :value="account" v-model="picked">
                        <label class="form-check-label" :for="account">{{account}}</label>
                      </template>
                    </div>
                    <div class="row mt-3">
                      <input class="btn btn-primary" type="submit" value="Close Account">
                    </div>
                </template>
            </div>
        </form>
    </div>
</template>
<script>
import { closeAccount, transferBalance } from '../../helper/user.js'
export default {
  name: 'CloseAccount',
  data () {
    return {
      listAccount: this.$store.state.currentUser.listAccount,
      currentAccount: this.$store.state.currentAccount.bankAccountId,
      picked: null
    }
  },
  methods: {
    close () {
      if (this.picked !== null) {
        transferBalance({
          userId: this.$store.state.currentUser.userId,
          delAcc: this.$store.state.currentAccount.bankAccountId,
          recAcc: this.picked
        })
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              closeAccount({
                userId: this.$store.state.currentUser.userId,
                bankAccountId: this.$store.state.currentAccount.bankAccountId
              })
                .then(res => {
                  console.log(res)
                  if (res.status === 200) {
                    if (res.data.msg === 'DELETED') {
                      alert('This Account Is Deleted')
                      this.$router.push('/user')
                    }
                    if (res.data.msg === 'FAILED') {
                      alert('Something Wrongs')
                    }
                  }
                })
                .catch(errors => {
                  alert('Something Wrongs')
                })
            } else {
              if (res.status === 500) {

              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>
