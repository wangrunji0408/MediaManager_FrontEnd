import Vue from 'vue';
import Component from 'vue-class-component';
import {User, UserApi} from '../../api';

@Component({
  template: require('./login.html')
})
export class Login extends Vue {

  username: string = '';
  password: string = '';

  alert_success (info: string) {
    (this as any).$message({message: info, type: 'success'});
  }

  alert_error (info: string) {
    (this as any).$message.error(info);
  }

  async login () {
    try {
      // let rsp = await new UserApi().loginUser(this.username, this.password);
      // this.alert_success(rsp.body);
      this.alert_success('登陆成功');
      this.$store.commit('setToken', 'user');
      this.$router.push({path: this.$route.query['redirect']});
    } catch (e) {
      this.alert_error(e.toString());
      throw e;
    }

  }
}
