import Vue from 'vue';
import Component from 'vue-class-component';
import {UserPage, UserPageRoute} from './userpage';
import {SelfPage} from './selfpage';

@Component({
  template: require('./settings.html'),
})
export class Settings extends Vue {

}

export let SettingsRoute = [
  { path: '', component: SelfPage },
  { path: 'user', component: UserPage, children: UserPageRoute },
  { path: 'self', component: SelfPage }
];
