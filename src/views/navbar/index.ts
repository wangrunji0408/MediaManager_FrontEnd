import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import {BASE_PATH, ErrorInfo, UserApi} from '../../api';
import {MessageList} from './message_list/index';

@Component({
  template: require('./navbar.html'),
  components: {MessageList}
})
export class NavbarComponent extends Vue {

  get userAvatarUrl(): string {
    return `${BASE_PATH}/user/${this.$store.state.userID}/avatar`;
  }

  get username(): string {
    return this.$store.state.username;
  }

  get isLogin() {
    return this.$store.state.userID != null;
  }

  get isGuest() {
    return this.$store.state.username === 'youke';
  }

  async logout() {
    try {
      this.$store.commit('logout');
      this.$router.push({path: '/login'});
      // await new UserApi().logoutUser();
      this.$message.success('登出成功');
    } catch (e) {
      let error: ErrorInfo = await e.json();
      this.$message.error('登出失败: ' + error.info);
    }
  }
}
