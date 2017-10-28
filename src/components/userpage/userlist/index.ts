import Vue from 'vue';
import Component from 'vue-class-component';
import {GroupApi, User, UserApi, UserGroup} from '../../../api';
import {GroupDropdown} from '../group_dropdown/';
import {testString, inGroup} from '../util';

class UserModel extends User {
  renaming: boolean = false;
}

@Component({
  template: require('./userlist.html'),
  props: ['users', 'allGroups'],
  components: {GroupDropdown}
})
export class UserList extends Vue {

  get filter() {
    let gf = this.groupFilter;
    let nf = this.nameFilter;
    return (user: User) =>
      inGroup(user, gf) && testString(user.username, nf);
  }

  sortBy: string = '';
  sortDesc: boolean = false;

  currentPage: number = 1;
  perPage: number = 10;
  get totalRows() {
    return this.users.length;
  }

  modalDetails: { index, data } = {index: '', data: ''};

  get groupFilter() {
    return this.$route.query['group'];
  }
  nameFilter: string = '';

  users: UserModel[];
  allGroups: UserGroup[];

  fields = [
    'icon',
    {key: 'username', sortable: true},
    {key: 'groups'},
  ];

  async fetchData() {
    let users = await new UserApi().getUser({group: 0});
    this.users = users.map((u: UserModel) => {
      u.renaming = false;
      return u;
    });
    this.allGroups = await new GroupApi().getUserGroups();
  }
}
