import Vue from 'vue';
import Component from 'vue-class-component';
import {File, FileApi} from '../../../api';

class FileModel extends File {
  choice: boolean = false;
  star: boolean = true;

  renaming: boolean = false;
  rename() {

  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

  get path(): string {
    let value = this.$route.query['path'];
    return value ? value : '/';
  }

  get pathItems() {
    let items = [];
    let lastPos = 0;
    for (let i = 1; i < this.path.length; ++i) {
      if (this.path[i] !== '/')
        continue;
      items.push({
        text: this.path.substring(lastPos + 1, i),
        href: '#file/all?path=' + this.path.substring(0, i + 1)
      });
      lastPos = i;
    }
    return items;
  }

  constructor() {
    super();
    // 临时生成一堆文件信息
    for (let i = 0; i < 20; ++i) {
      let f = JSON.parse(JSON.stringify(this.files[0])); // deep clone
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
    this.$root.$emit('bv::show::modal', 'detail-modal');
  }

  rename (item: FileModel) {
    item.renaming = true;
  }

  rename_done (item: FileModel) {
    item.renaming = false;
    // TODO do rename
    alert('rename done');
  }

  resetModal() {
    this.modalDetails.data = '';
    this.modalDetails.index = '';
  }

  deleteTarget: FileModel;

  delete_ask(item: FileModel) {
    this.deleteTarget = item;
    this.$root.$emit('bv::show::modal', 'delete-modal');
  }

  async deleteFile(item: FileModel) {
    try {
      await new FileApi().deleteFile(item.id);
    } catch (e) {
      this.showAlert('删除失败', 'error');
    }
    this.showAlert('删除成功', 'success');
    await this.refreshData();
  }

  isLoading: boolean = false;

  async refreshData() {
    this.isLoading = true;
    // TODO refresh data
    await delay(1000);
    this.isLoading = false;
  }

  showAlert(message: string, type: string = 'info') {
    let thisany: any = this;
    thisany.$message({message, type});
  }

  files: FileModel[] = [
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
      tags: [],

      choice: false,
      star: true,
      renaming: false,
      rename() {}
    },
  ];

  fields = [
    {key: 'star', label: ''},
    {key: 'thumbnails', label: ''},
    {key: 'name', sortable: true},
    {key: 'size', sortable: true},
    {key: 'modifyDate', sortable: true},
    'detail'
  ];

}
