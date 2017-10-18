import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  template: require('./login.html')
})
export class Login extends Vue {

  username: string = '';
  password: string = '';

  login () {
    alert('login');
  }
}
