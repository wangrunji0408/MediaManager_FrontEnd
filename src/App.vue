<template>
  <div id="app">
    <img src="./assets/logo.png"><br>
    <div class="btn-group" role="group">
      <router-link type="button" class="btn btn-default" to="/hello">Hello</router-link>
      <router-link type="button" class="btn btn-default" to="/user/signup">Signup</router-link>
      <router-link type="button" class="btn btn-default" to="/user/login">Login</router-link>
      <router-link type="button" class="btn btn-default" to="/file">File</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
