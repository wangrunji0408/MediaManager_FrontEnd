import Vue from 'vue';
import Component from 'vue-class-component';
import {ErrorInfo, UserApi} from '../../api';

@Component({
  template: require('./signup.html'),
  mounted() {
    this.fromEmail();
  }
})
export class Signup extends Vue {

  username: string = '';
  password: string = '';
  phone: string = '';
  email: string = '';
  show_password: boolean = false;

  switch_show_password () {
    this.show_password = !this.show_password;
  }

  validate_email(email: string): string {
    if (!email)
      return 'email不能为空';
    if (!email.endsWith('tsinghua.edu.cn'))
      return '必须是清华邮箱';
    return null;
  }

  async fromEmail() {
    let token = this.$route.query['token'];
    let id = parseInt(this.$route.query['id']);
    if (!token) {
      this.$store.commit('logout');
      return;
    }
    let user = await new UserApi().getUserByName({id: id});
    this.$store.commit('setToken', token);
    this.$store.commit('setUser', user);
    this.$router.push('/file');
  }

  async signup () {
    let error = this.validate_email(this.email);
    if (error) {
      this.$message.error(error);
      return;
    }

    try {
      let body = {
        username: this.username,
        password: this.password,
        phone: this.phone,
        email: this.email
      };
      let rsp = await new UserApi().signupUser({body});
      this.$message.success('注册成功');
      this.$router.push({path: '/login'});
    } catch (e) {
      let error: ErrorInfo = await e.json();
      this.$message.error('注册失败:' + error.info);
      throw e;
    }
  }
}
