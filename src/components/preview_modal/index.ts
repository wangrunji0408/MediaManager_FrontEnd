import Vue from 'vue';
import Component from 'vue-class-component';
import {BASE_PATH, File, FileApi} from '../../api';
import util from '../../views/filepage/util';
import {Watch} from 'vue-property-decorator';

@Component({
  template: require('./preview_modal.html'),
  props: ['file'],
})
export class PreviewModal extends Vue {

  file: File = null;

  get url() {
    return BASE_PATH + `/file/${this.file.id}/data`;
  }

  @Watch('file')
  update() {
    this.isVideo = util.isVideo(this.file);
    this.isImage = util.isImage(this.file);
    this.isText = util.isText(this.file);
  }

  isVideo: boolean = false;
  isImage: boolean = false;
  isText: boolean = false;

  // get isVideo() {
  //   return util.isVideo(this.file);
  // }
  // get isImage() {
  //   return util.isImage(this.file);
  // }
  // get isText() {
  //   return util.isText(this.file);
  // }
}
