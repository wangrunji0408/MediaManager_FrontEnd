import Vue from 'vue';
import Component from 'vue-class-component';
import {UserList} from './userlist';
import {AddUserBar} from './adduserbar';
import {GroupApi, User, UserApi, UserGroup} from '../../api';
import {inGroup} from './util';

@Component({
  template: require('./userpage.html'),
  components: {UserList, AddUserBar},
})
export class UserPage extends Vue {

  constructor() {
    super();
    this.fetchData();
  }

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

  newGroupName: string = 'Add Group';
  addingNewGroup: boolean = false;

  addGroup () {
    this.addingNewGroup = true;
    this.newGroupName = '';
  }

  async addGroupDone () {
    let newName = this.newGroupName;
    this.addingNewGroup = false;
    this.newGroupName = 'Add Group';
    try {
      let rsp = await new GroupApi().createUserGroup({body: {
        id: 0,
        name: this.newGroupName
      }});
      (this as any).$message({message: '新建用户组成功', type: 'success'});
    } catch (e) {
      (this as any).$message.error('新建用户组失败');
      return;
    }
    await this.fetchData();
  }

  async fetchData() {
    this.users = await new UserApi().getUser({group: 0});
    this.allGroups = await new GroupApi().getUserGroups();
  }
}

export const UserPageRouter = [
    { path: '', component: UserList },
    { path: 'all', component: UserList}
];
