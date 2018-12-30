<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld v-bind:msg="url"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data () {
    return {
      url: 'Welcome to the International'
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>
.home{
  text-align: center
}
</style>
