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
}

export const UserPageRouter = [
    { path: '', component: UserList },
    { path: 'all', component: UserList}
];
