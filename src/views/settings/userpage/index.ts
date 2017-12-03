import Vue from 'vue';
import Component from 'vue-class-component';
import {UserList} from './userlist';
import {AddUserBar} from './adduserbar';
import {BASE_PATH, GroupApi, User, UserApi, UserGroup} from '../../../api';
import {inGroup} from './util';
import VueRouter from 'vue-router';

@Component({
  template: require('./userpage.html'),
  components: {UserList, AddUserBar},
  async mounted() {
    await this.fetchData();
  }
})
export class UserPage extends Vue {

  users: User[] = [];
  allGroups: UserGroup[] = [];

  get groupsCount() {
    let ret: any[] = [{name: 'all', count: this.users.length, query: '*'}];
    for (let g of this.allGroups) {
      let count = 0;
      for (let u of this.users)
        if (inGroup(u, g.name))
          count += 1;
      ret.push({name: g.name, count: count});
    }
    return ret;
  }

  newGroupName: string = '';

  async addGroup () {
    // if (this.newGroupName === '') {
    //   this.$message.error('组名不能为空');
    //   return;
    // }

    try {
      let rsp = await new GroupApi().createUserGroup({body: {
        id: 0,
        name: this.newGroupName,
        color: '#FFFFFF'
      }});
      this.$message.success('新建用户组成功');
      this.newGroupName = '';
    } catch (e) {
      this.$message.error('新建用户组失败');
      return;
    }
    await this.fetchData();
  }

  userAvatarUrl(user: User): string {
    return `${BASE_PATH}/user/${user.id}/avatar`;
  }

  async fetchData() {
    let users = await new UserApi().getUser({});
    this.users = users.map(u => ({...u, image: this.userAvatarUrl(u)}));
    this.allGroups = await new GroupApi().getUserGroups();
  }
}
