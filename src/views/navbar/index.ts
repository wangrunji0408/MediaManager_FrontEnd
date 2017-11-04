import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import {ErrorInfo, UserApi} from '../../api';

@Component({
  template: require('./navbar.html')
})
export class NavbarComponent extends Vue {

  async logout() {
    try {
      await new UserApi().logoutUser();
      this.$store.commit('logout');
      this.$router.push({path: '/login'});
      this.$message.success('登出成功');
    } catch (e) {
      let error: ErrorInfo = e.json();
      this.$message.success('登出失败: ' + error.infos[0]);
    }
  }
}
