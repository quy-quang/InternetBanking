<template>
    <div id="user">
        <div class="content">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-10">
                        <div class="card card-default">
                            <template v-if="this.$route.name == 'ListBankAccount'">
                                <div class="card-header">
                                    Customer
                                </div>
                            </template>
                            <template v-else-if="this.$route.name == 'HistoryAccount'">
                                <div class="card-header">
                                    History
                                </div>
                            </template>
                            <template v-else-if="this.$route.name == 'CloseAccount'">
                                <div class="card-header">
                                    Close Account
                                </div>
                            </template>
                            <template v-else-if="this.$route.name == 'MoneyTransfer'">
                                <div class="card-header">
                                    Money Transfer
                                </div>
                            </template>
                            <template v-else-if="this.$route.name == 'AccountDetail'">
                                <div class="card-header">
                                    Account Detail
                                </div>
                            </template>
                            <div class="card-body">
                                <router-view></router-view>
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
  name: 'user-main'
}
</script>
