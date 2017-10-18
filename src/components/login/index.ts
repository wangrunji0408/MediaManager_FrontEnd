import Vue from 'vue';
import Component from 'vue-class-component';
import {User, UserApi} from '../../api';

@Component({
  template: require('./login.html')
})
export class Login extends Vue {

  username: string = '';
  password: string = '';

  login () {
    alert('login');
    new UserApi().loginUser(this.username, this.password);
  }
}
