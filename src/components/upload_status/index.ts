import Vue from 'vue';
import Component from 'vue-class-component';

interface FileUploadStatus {
  filename: string;
  finishSize: number;
  totalSize: number;
}

@Component({
  template: require('./upload_status.html'),
  props: ['status']
})
export class UploadStatus extends Vue {

  status: FileUploadStatus[] = [];

  fileList = [{
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    status: 'finished'
  }, {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    status: 'finished'
  }];
}
