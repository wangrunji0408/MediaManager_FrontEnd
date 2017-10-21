import Vue from 'vue';
import Component from 'vue-class-component';
import {UserList} from './userlist';
import {AddUserBar} from './adduserbar';
import {GroupApi, User, UserApi, UserGroup} from '../../api';

@Component({
  template: require('./userpage.html'),
  components: {UserList, AddUserBar},
})
export class UserPage extends Vue {
  users: User[] = [
    {
      'id': 1,
      'username': 'admin',
      'password': '',
      'firstName': 'firstname',
      'lastName': 'lastname',
      'email': 'email',
      'phone': 'phone',
      'image': 'image',
      'groups': [{id: 1, name: 'admin'}]
    },
    {
      'id': 2,
      'username': 'user2',
      'password': '',
      'firstName': 'firstname',
      'lastName': 'lastname',
      'email': 'email',
      'phone': 'phone',
      'image': 'image',
      'groups': [{id: 2, name: 'group1'}]
    }
  ];

  allGroups: UserGroup[] = [
    {id: 1, name: 'admin'},
    {id: 2, name: 'group1'},
  ];

  get groupsCount() {
    let dic: { [name: string]: number } = {};
    for (let u of this.users) {
      for (let g of u.groups) {
        if(! (g.name in dic) )
          dic[g.name] = 0;
        dic[g.name] += 1;
      }
    }
    let ret: any[] = [{name: 'all', count: this.users.length, query: '*'}];
    for (let name in dic)
      ret.push({name: name, count: dic[name]});
    return ret;
  }

  addGroup () {
    alert('addgroup');
  }

  async getData() {
    this.users = await new UserApi().getUser();
    this.allGroups = await new GroupApi().getUserGroups();
  }
}

export const UserPageRouter = [
    { path: '', component: UserList },
    { path: 'all', component: UserList}
];
