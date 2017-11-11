import Vue from 'vue';
import Component from 'vue-class-component';
import {User, UserApi} from '../../../api';
import './style.css';

@Component({
  template: require('./selfpage.html'),
  async mounted() {
    await this.fetchData();
  }
})
export class SelfPage extends Vue {
  user: User = {};

  get uploadImageUrl(): string {
    return new UserApi().basePath + `/user/${this.user.id}/avatar`;
  }
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
  get oldPasswordError() {
    if (this.oldPassword1 !== this.oldPassword2)
      return '密码不一致';
    if (this.oldPassword1 === '')
      return '';
    return null;
  }
  get oldPasswordState() {
    let error = this.oldPasswordError;
    if (error === null)
      return true;
    if (error === '')
      return 'null';
    return false;
  }
  get newPasswordError() {
    if (this.newPassword === '')
      return '';
    if (this.newPassword.length < 8)
      return '密码长度必须>=8';
    return null;
  }
  get newPasswordState() {
    let error = this.newPasswordError;
    if (error === null)
      return true;
    if (error === '')
      return 'null';
    return false;
  }

  async onSubmit() {
    try {
      this.user.password = '';
      await new UserApi().updateUser({id: this.user.id, body: this.user});
      this.$message.success('修改用户信息成功');
    } catch (e) {
      this.$message.error('修改用户信息失败');
    }
  }

  onPasswordModalShow() {
    this.oldPassword1 = '';
    this.oldPassword2 = '';
    this.newPassword = '';
  }

  async onSubmitPassword() {
    if (!this.newPasswordState || !this.oldPasswordState) {
      this.$message.error('信息错误');
      return;
    }
    try {
      await new UserApi().changeUserPassword({
        id: this.user.id,
        oldPassword: this.oldPassword1,
        newPassword: this.newPassword
      });
      this.$message.success('修改密码成功');
      (this.$refs.password_modal as any).hide();
    } catch (e) {
      this.$message.error('修改密码失败');
    }
  }

  async fetchData () {
    try {
      this.user = await new UserApi().getUserByName(
        {id: this.$store.state.userID});
    } catch (e) {
      this.$message.error('获取用户信息失败');
      throw e;
    }
  }
}
