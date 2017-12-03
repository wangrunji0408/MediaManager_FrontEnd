import Vue from 'vue';
import Component from 'vue-class-component';
import {UserPage} from './userpage';
import {SelfPage} from './selfpage';
import {FollowPage} from './followpage/index';
import {GroupPage} from './grouppage/index';
import {GroupApi} from '../../api';

@Component({
  template: require('./settings.html'),
  async mounted() {
    await this.testAdmin();
  }
})
export class Settings extends Vue {
  isAdmin: boolean = false;

  async testAdmin() {
    this.isAdmin = false;
    try {
      await new GroupApi().getUserGroups();
      this.isAdmin = true;
    } catch (e) {
    }
  }
}

export let SettingsRoute = [
  { path: '', component: SelfPage },
  { path: 'user', component: UserPage },
  { path: 'self', component: SelfPage },
  { path: 'follow', component: FollowPage },
  { path: 'group', component: GroupPage },
];
