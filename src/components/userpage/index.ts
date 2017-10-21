import Vue from 'vue';
import Component from 'vue-class-component';
import {UserList} from './userlist';
import {User} from '../../api';

@Component({
  template: require('./userpage.html'),
  components: {UserList},
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

  groups1 = [
    {name: 'all', count: this.users.length, query: '*'},
    {name: 'admin', count: 1},
    {name: 'group1', count: 1},
  ];

  get groups() {
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
}

export const UserPageRouter = [
    { path: '', component: UserList },
    { path: 'all', component: UserList}
];
