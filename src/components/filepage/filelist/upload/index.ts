import Vue from 'vue';
import Component from 'vue-class-component';
import {File, FileApi} from '../../../../api';

@Component({
  template: require('./upload.html'),
  props: ['path']
})
export class Upload extends Vue {

  path: string = '/';

  filesToUpload: any[] = [];

  async uploadFiles() {
    try {
      for (let file of this.filesToUpload) {
        let rsp = await new FileApi().uploadFile(file, this.path);
      }
      this.showAlert('上传文件成功', 'success');
    } catch (e) {
      this.showAlert('上传文件失败 ' + e, 'error');
      throw e;
    }
  }

  showAlert(message: string, type: string = 'info') {
    (this as any).$message({message, type});
  }
}
