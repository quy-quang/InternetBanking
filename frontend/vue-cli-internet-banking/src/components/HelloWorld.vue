<template>
  <div class="hello container-fluid">
    <div class="banner container-fluid">

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}

.banner {
  background-color: green;
  width: 100%;
  height: 400px;
}
</style>
