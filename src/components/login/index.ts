import Vue from 'vue';
import Component from 'vue-class-component';
import {User, UserApi} from '../../api';

@Component({
  template: require('./login.html')
})
export class Login extends Vue {

  username: string = '';
  password: string = '';

  alert_type: string = '';
  info: string = '';

  alert_success (info: string) {
    this.alert_type = 'success';
    this.info = info;
  }

  alert_error (info: string) {
    this.alert_type = 'danger';
    this.info = info;
  }

  async login () {
    try {
      let rsp = await new UserApi().loginUser(this.username, this.password);
      this.alert_success(rsp.body);
    } catch (e) {
      this.alert_error(e.toString());
      throw e;
    }

  }
}
