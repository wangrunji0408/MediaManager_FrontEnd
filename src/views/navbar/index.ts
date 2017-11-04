import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import {ErrorInfo, UserApi} from '../../api';

@Component({
  template: require('./navbar.html')
})
export class NavbarComponent extends Vue {

  async logout() {
    try {
      this.$store.commit('logout');
      this.$router.push({path: '/login'});
      await new UserApi().logoutUser();
      this.$message.success('登出成功');
    } catch (e) {
      let error: ErrorInfo = await e.json();
      this.$message.error('登出失败: ' + error.info);
    }
  }
}
