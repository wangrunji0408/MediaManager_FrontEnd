<template>
  <div class="demo" style="padding: 20px 0;">
    <div class="container">
      <div class="row">
        <div class="col-md-offset-3 col-md-6">

            <span class="heading">注册ing</span>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="用户名" name="username" v-model="username" required>
              <i class="fa fa-user"></i>
            </div>
            <div class="form-group">
              <input type="email" class="form-control" placeholder="邮箱" name="email" v-model="email" required>
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="联系方式" name="phone" v-model="phone" required>
              <i class="fa fa-phone"></i>
            </div>
            <div class="form-group">
              <div class="col-sm-8" style="padding:0" id="passwdbox">
                <input v-bind:type=" show_password? 'text': 'password' " class="form-control" placeholder="密  码" name="password" v-model="password" required>
              </div>
              <i class="fa fa-lock"></i>
              <button class="btn btn-default" v-on:click="switch_show_password">
                {{ show_password? '隐藏密码' : '显示密码' }}
              </button>
            </div>
            <hr>
            <div class="form-group">
              <button type="submit" class="btn btn-default" v-on:click="signup">注册</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        password: '',
        phone: '',
        email: '',
        show_password: false,
      }
    },
    methods: {
      signup () {
        alert('signup');
      },
      switch_show_password () {
        this.show_password = !this.show_password;
      }
    }
  }
</script>
