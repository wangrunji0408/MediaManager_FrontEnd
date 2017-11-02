import Vue from 'vue';
import Component from 'vue-class-component';
import {GroupApi, User, UserApi, UserGroup} from '../../../../api';
import {GroupDropdown} from '../../../../components/group_dropdown';
import {testString, inGroup} from '../util';

class UserModel extends User {
  renaming: boolean = false;
  selected: boolean = false;
}

@Component({
  template: require('./userlist.html'),
  props: ['users', 'allGroups'],
  components: {GroupDropdown}
})
export class UserList extends Vue {

  ////////// For Table //////////

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

  ////////// Data //////////

  users: UserModel[];
  allGroups: UserGroup[];

  get selectedUsers(): UserModel[] {
    return this.users.filter(f => f.selected);
  }

  fields = [
    'select',
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

  ////////// Delete //////////

  targetUsers: UserModel[] = [];

  ensureTargetNotEmpty () {
    if (this.targetUsers.length > 0)
      return;
    (this as any).$message({message: '请先选择用户', type: 'success'});
    throw 'No selected users.';
  }

  deleteBegin(items: UserModel[]) {
    this.targetUsers = items;
    this.ensureTargetNotEmpty();
    this.$root.$emit('bv::show::modal', 'delete-modal');
  }

  async deleteUsers() {
    this.ensureTargetNotEmpty();
    try {
      for (let user of this.targetUsers) {
        await new UserApi().deleteUser({id: user.id});
      }
      (this as any).$message({message: '删除用户成功', type: 'success'});
    } catch (e) {
      (this as any).$message({message: '删除用户失败', type: 'error'});
      return;
    }
    await this.$emit('fetch');
  }
}
