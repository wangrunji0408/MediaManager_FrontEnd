import Vue from 'vue';
import Component from 'vue-class-component';
import {User} from '../../../api';

function testString(str: string, pattern: string): boolean {
  return str.match(pattern) != null;
}

function inGroup(user: User, group: string): boolean {
  return !group || group === '*'
    || user.groups.find(g => g.name === group) != null;
}

@Component({
  template: require('./userlist.html'),
  props: ['users']
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

  users: User[];

  fields = [
    'icon',
    {key: 'username', sortable: true},
    {key: 'groups'},
  ];
}
