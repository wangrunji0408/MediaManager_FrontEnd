import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  template: require('./signup.html')
})
export class Signup extends Vue {

  username: string = '';
  password: string = '';
  phone: string = '';
  email: string = '';
  show_password: boolean = false;

  signup () {
    alert('signup');
  }
  switch_show_password () {
    this.show_password = !this.show_password;
  }
}
