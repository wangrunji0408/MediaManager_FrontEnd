import Vue from 'vue';
import Component from 'vue-class-component';
import {File} from '../../api';

@Component({
  template: require('./filelist.html')
})
export class FileList extends Vue {

  filter: string = '';

  sortBy: string = '';
  sortDesc: boolean = false;

  currentPage: number = 1;
  perPage: number = 10;
  get totalRows() {
    return this.files.length;
  }

  modalDetails: { index, data } = {index: '', data: ''};

  constructor() {
    super();
    // 临时生成一堆文件信息
    for (let i = 0; i < 20; ++i) {
      let f = Object.create(this.files[0]);
      f.name += i;
      this.files.push(f);
    }

  }

  onFiltered (filteredItems) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.currentPage = 1;
  }

  showDetail (item: File, index: number) {
    this.modalDetails.data = JSON.stringify(item, null, 2);
    this.modalDetails.index = index;
    alert('123');
    this.$root.$emit('bv::show::modal', 'modal1');
  }

  resetModal() {
    this.modalDetails.data = '';
    this.modalDetails.index = '';
  }

  files: File[] = [
    {
      id: 'ID',
      name: 'frontend.avi',
      path: '/',
      isDir: false,
      url: '',
      md5: 'MD5',
      thumbnails: 'https://lorempixel.com/250/250/technics/4/',
      size: 1024,
      modifyDate: new Date('2017/1/2'),
      createDate: new Date('2017/1/1'),
      tags: []
    },
  ];

  fields = [
    {key: 'thumbnails', label: ''},
    {key: 'name', sortable: true},
    {key: 'size', sortable: true},
    {key: 'modifyDate', sortable: true},
    'detail'
  ];

}
