<template>
    <div id="user">
        <div class="content">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-10">
                        <div class="card card-default">
                            <div class="card-header">
                                Customer
                            </div>
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
