import Vue from 'vue';
import Component from 'vue-class-component';
import {User} from '../../../api';

@Component({
  template: require('./userlist.html'),
  props: ['users']
})
export class UserList extends Vue {

  get filter() {
    let gf = this.groupFilter;
    if (!gf || gf === '*')
      return '';
    return (user: User) =>
      user.groups.find(g => g.name === gf) != null;
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

  users: User[];

  fields = [
    'icon',
    {key: 'username', sortable: true},
    {key: 'groups'},
  ];
}
