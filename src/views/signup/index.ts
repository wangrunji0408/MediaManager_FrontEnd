import Vue from 'vue';
import Component from 'vue-class-component';
import {ErrorInfo, UserApi} from '../../api';

@Component({
  template: require('./signup.html')
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
    if (!email.endsWith('tsinghua.edu.cn'))
      return '必须是清华邮箱';
    return null;
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
