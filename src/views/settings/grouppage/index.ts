import Vue from 'vue';
import Component from 'vue-class-component';
import {GroupApi, User, UserApi, UserGroup} from '../../../api';
import {inGroup} from '../userpage/util';
import {Watch} from 'vue-property-decorator';

interface TransferData {
  key: number;
  label: string;
}

class GroupModel extends UserGroup {
  renaming: boolean = false;
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

  nowGroup: GroupModel = null;
  groups: GroupModel[] = [];
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
    if (this.newGroup.name === '') {
      this.$message.error('组名不能为空');
      return;
    }
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

  async deleteGroup (g: UserGroup) {
    try {
      let rsp = await new GroupApi().deleteUserGroup({id: g.id});
    } catch (e) {
      this.$message.error('删除用户组失败');
      return;
    }
    await this.fetchData();
  }

  async rename (g: GroupModel) {
    g.renaming = false;
    await this.updateGroup(g);
  }

  async fetchData () {
    try {
      this.users = await new UserApi().getUser({});
      let groups = await new GroupApi().getUserGroups();
      this.groups = groups.map(g => ({...g, renaming: false}));
      this.allList = this.users.map(u => ({key: u.id, label: u.username}));
      this.updateList();
    } catch (e) {
      this.$message.error('获取用户组信息失败');
      throw e;
    }
  }
}
