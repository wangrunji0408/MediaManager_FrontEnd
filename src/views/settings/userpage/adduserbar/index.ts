import Vue from 'vue';
import Component from 'vue-class-component';
import {User, UserApi, UserGroup} from '../../../../api';
import {GroupDropdown} from '../../../../components/group_dropdown';

@Component({
  template: require('./adduserbar.html'),
  props: ['allGroups'],
  components: {GroupDropdown}
})
export class AddUserBar extends Vue {

  username: string = '';
  password: string = '';
  allGroups: UserGroup[];
  groups: UserGroup[] = [];

  async createUser() {
    try {
      let user = new User();
      user.username = this.username;
      user.password = this.password;
      user.groups = this.groups;
      let rsp = await new UserApi().createUser({body: user});
      this.$message.success('创建用户成功');
      this.$emit('fetch');
    } catch (e) {
      this.$message.error('创建用户失败' + e);
      return;
    }
  }
}
