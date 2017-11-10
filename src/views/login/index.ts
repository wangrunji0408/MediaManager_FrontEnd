import Vue from 'vue';
import Component from 'vue-class-component';
import {ErrorInfo, User, UserApi} from '../../api';

@Component({
  template: require('./login.html')
})
export class Login extends Vue {

  username: string = '';
  password: string = '';

  constructor() {
    super();
    if (this.$store.state.authOpt)
      this.goNext();
  }

  goNext() {
    let next = this.$route.query['redirect'];
    if (next == null)
      next = '/file';
    this.$router.push({path: next});
  }

  async login () {
    try {
      let up = {
        username: this.username,
        password: this.password
      };
      let rsp = await new UserApi().loginUser(up);
      this.$message.success('登陆成功');
      this.$store.commit('setToken', rsp.token);
      this.$store.commit('setBasicAuth', up);
      this.$store.commit('setUserID', rsp.userID);
      this.goNext();
    } catch (e) {
      if (e instanceof Response) {
        let error: ErrorInfo = await e.json();
        this.$message.error('登录失败: ' + error.info);
      }
      throw e;
    }

  }
}
