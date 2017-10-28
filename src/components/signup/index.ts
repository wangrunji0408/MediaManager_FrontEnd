import Vue from 'vue';
import Component from 'vue-class-component';
import {UserApi} from '../../api';

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

  alert_success (info: string) {
    (this as any).$message({message: info, type: 'success'});
  }

  alert_error (info: string) {
    (this as any).$message.error(info);
  }

  async signup () {
    try {
      let body = {
        username: this.username,
        password: this.password,
        phone: this.phone,
        email: this.email
      };
      // let rsp = await new UserApi().signupUser(body);
      // this.alert_success(rsp.body);
      this.alert_success('注册成功');
      this.$router.push({path: '/login'});
    } catch (e) {
      this.alert_error(e.toString());
      throw e;
    }
  }
}
