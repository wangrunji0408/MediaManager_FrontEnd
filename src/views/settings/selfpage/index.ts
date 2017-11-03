import Vue from 'vue';
import Component from 'vue-class-component';
import {User, UserApi} from '../../../api';
import './style.css';

@Component({
  template: require('./selfpage.html'),
})
export class SelfPage extends Vue {
  user: User = {
    username: 'Username',
    password: 'Password',
    firstName: 'Firstname',
    lastName: 'Lastname',
    email: 'email@a.com',
    phone: '13000000000'
  };

  uploadImageUrl: string = ''; // TODO 上传头像地址
  imageUrl: string = '';
  beforeImageUpload() {
    this.$message.info('beforeImageUpload');
  }
  onImageUploadSuccess() {
    this.$message.info('onImageUploadSuccess');
  }


  oldPassword1: string = '';
  oldPassword2: string = '';
  newPassword: string = '';
  showPassword: boolean = false;
  get passwordInputType() {
    return this.showPassword ? 'text' : 'password';
  }

  async onSubmit() {
    this.$message.info('submit');
  }

  async onSubmitPassword() {
    this.$message.info('submit_password');
  }

  async fetchData () {
    try {
      let rsp = await new UserApi().getUser({name: '...'});
      this.user = rsp[0];
      this.$message.success('获取用户信息成功');
    } catch (e) {
      this.$message.error('获取用户信息失败');
    }
  }
}
