<template>
  <div id="user">
    <div class="content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card card-default">
              <div class="card-header">Contact</div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <th>Index</th>
                    <th>Account Number</th>
                    <th>Alias</th>
                  </thead>
                  <tbody>
                    <template v-if="!contactList.length">
                      <tr>
                        <td colspan="4" class="text-center">No Bank Account In Contact List</td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr v-for="(account, index) in contactList" :key="index">
                        <td>{{index + 1}}</td>
                        <td>{{account.accountNumber}}</td>
                        <td>{{account.name}}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
                <div class="btn-wrapper">
                  <router-link to="/contact/new" class="btn btn-primary">New</router-link>
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
export default {
  name: 'Contact',
  computed: {
    contactList () {
      return this.$store.state.currentUser.contactList
    }
  }
}
</script>
