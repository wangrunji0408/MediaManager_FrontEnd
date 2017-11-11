import Vue from 'vue';
import Component from 'vue-class-component';
import {BASE_PATH, File} from '../../api';
import util from '../../views/filepage/util';

@Component({
  template: require('./preview_modal.html'),
  props: ['file'],
})
export class PreviewModal extends Vue {

  file: File = null;

  get url() {
    return BASE_PATH + `/file/${this.file.id}/data`;
  }

  get isVideo() {
    return util.isVideo(this.file);
  }
  get isImage() {
    return util.isImage(this.file);
  }
  get isText() {
    return util.isText(this.file);
  }
}
