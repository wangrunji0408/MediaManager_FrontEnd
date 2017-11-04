import Vue from 'vue';
import Component from 'vue-class-component';
import {ErrorInfo, User, UserApi, UserGroup} from '../../../../api';
import {GroupDropdown} from '../../../../components/group_dropdown';

@Component({
  template: require('./adduserbar.html'),
  props: ['allGroups'],
  components: {GroupDropdown}
})
export class AddUserBar extends Vue {

  username: string = '';
  password: string = '';
  email: string = '';
  allGroups: UserGroup[];
  groups: UserGroup[] = [];

  clear() {
    this.username = '';
    this.password = '';
    this.email = '';
  }

  async createUser() {
    try {
      let user = new User();
      user.username = this.username;
      user.password = this.password;
      user.email = this.email;
      user.groups = this.groups;
      let rsp = await new UserApi().createUser({body: user});
      this.$message.success('创建用户成功');
      this.$emit('fetch');
      this.clear();
    } catch (e) {
      let error: ErrorInfo = await e.json();
      this.$message.error('创建用户失败: ' + error.info);
      return;
    }
  }
}
