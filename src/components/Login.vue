<template>
  <div class="demo" style="padding: 20px 0;">
    <div class="container">
      <div class="row">
        <div class="col-md-offset-3 col-md-6">
          <span class="heading">登录</span>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="用户名" name="username" v-model="username">
            <i class="fa fa-user"></i>
          </div>
          <div class="form-group help">
            <input type="password" class="form-control" placeholder="密  码" name="password" v-model="password">
            <i class="fa fa-lock"></i>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default" v-on:click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="">
  export default {
    data(){
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login () {
        this.$dispatch('submit-login', {
          username: this.username,
          password: this.password
        });
      }
    }
  }
</script>
