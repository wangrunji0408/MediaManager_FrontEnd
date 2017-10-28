import Vue from 'vue';
import Component from 'vue-class-component';
import {GroupApi, User, UserApi, UserGroup} from '../../../api';
import {GroupDropdown} from '../group_dropdown/';
import {testString, inGroup} from '../util';

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

  users: User[];
  allGroups: UserGroup[];

  fields = [
    'icon',
    {key: 'username', sortable: true},
    {key: 'groups'},
  ];

  ////////// Rename //////////

  renameTarget: User;
  newName: string = '';

  rename(item: User) {
    this.renameTarget = item;
    this.$root.$emit('bv::show::modal', 'rename-modal');
  }

  async renameDone() {
    let item = this.renameTarget;
    item.username = this.newName;
    try {
      let rsp = await new UserApi().updateUser({id: item.id, body: item});
      (this as any).$message({message: '重命名成功', type: 'success'});
    } catch (e) {
      (this as any).$message({message: '重命名失败', type: 'error'});
      return;
    }
    await this.$emit('fetch');
  }
}
