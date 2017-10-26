import Vue from 'vue';
import Component from 'vue-class-component';
import {User, UserApi, UserGroup} from '../../../api';
import {GroupDropdown} from '../group_dropdown';

@Component({
  template: require('./adduserbar.html'),
  props: ['allGroups'],
  components: {GroupDropdown}
})
export class AddUserBar extends Vue {

  username: string;
  password: string;
  allGroups: UserGroup[];
  groups: UserGroup[] = [];

  async createUser() {
    let user = new User();
    user.username = this.username;
    user.password = this.password;
    user.groups = this.groups;
    alert('create:' + JSON.stringify(user));
    let rsp = await new UserApi().createUser(user);

  }
}
