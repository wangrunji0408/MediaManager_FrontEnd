import Vue from 'vue';
import Component from 'vue-class-component';
import {GroupApi, User, UserApi, UserGroup} from '../../../api';
import {inGroup} from '../userpage/util';
import {Watch} from 'vue-property-decorator';

interface TransferData {
  key: number;
  label: string;
}

function removeGroup(user: User, group: UserGroup) {
  user.groups = user.groups.filter(g => g.id !== group.id);
}

@Component({
  template: require('./grouppage.html'),
  async mounted() {
    await this.fetchData();
  }
})
export class GroupPage extends Vue {

  nowGroup: UserGroup = null;
  groups: UserGroup[] = [];
  users: User[] = [];

  // transfer data
  allList: TransferData[] = [];
  selectedList: number[] = [];

  @Watch('nowGroup')
  updateList() {
    if (this.nowGroup === null)
      return;
    this.selectedList = this.users
      .filter(u => inGroup(u, this.nowGroup.name))
      .map(u => u.id);
  }

  async updateUser() {
    this.users.forEach(u => removeGroup(u, this.nowGroup));
    for (let id of this.selectedList) {
      let user = this.users.find(u => u.id === id);
      user.groups.push(this.nowGroup);
    }
    try {
      for (let user of this.users) {
        await new UserApi().updateUser({id: user.id, body: user});
      }
    } catch (e) {
      this.$message.error('更新用户信息失败');
      throw e;
    }
  }

  async updateGroup(g: UserGroup) {
    try {
      await new GroupApi().updateUserGroup({id: g.id, body: g});
    } catch (e) {
      this.$message.error('更新用户组信息失败');
      throw e;
    }
  }

  newGroup: UserGroup = {id: 0, name: '', color: '#FFFFFF'};
  async addGroup () {
    try {
      let rsp = await new GroupApi().createUserGroup({body: this.newGroup});
      this.$message.success('新建用户组成功');
      this.newGroup = {id: 0, name: '', color: '#FFFFFF'};
    } catch (e) {
      this.$message.error('新建用户组失败');
      return;
    }
    await this.fetchData();
  }

  async fetchData () {
    try {
      this.users = await new UserApi().getUser({});
      this.groups = await new GroupApi().getUserGroups();
      this.allList = this.users.map(u => ({key: u.id, label: u.username}));
      this.updateList();
    } catch (e) {
      this.$message.error('获取用户组信息失败');
      throw e;
    }
  }
}
