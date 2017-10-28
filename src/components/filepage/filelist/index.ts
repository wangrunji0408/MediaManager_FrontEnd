import Vue from 'vue';
import Component from 'vue-class-component';
import moment from 'moment';
import {File, FileApi} from '../../../api';

class FileModel extends File {
  choice?: boolean = false;
  star?: boolean = true;
  oldName?: string = '';

  renaming?: boolean = false;
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

  fileSizeToString(size: number): string {
    if (size < 1024)
      return `${size}KB`;
    if (size < 1024 * 1024)
      return `${size / 1024}MB`;
    if (size < 1024 * 1024 * 1024)
      return `${size / 1024 / 1024}GB`;
    return `HUGE`;
  }

  dateToString(date: Date): string {
    return moment(date).format('YYYY-MM-DD hh:mm:ss');
  }

  get selectedFiles(): FileModel[] {
    return this.files.filter(f => f.choice);
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
    item.oldName = item.name;
  }

  async rename_done (item: FileModel) {
    item.renaming = false;
    try {
      let rsp = await new FileApi().updateFiles({body: [item]});
      this.showAlert('重命名成功', 'success');
    } catch (e) {
      this.showAlert('重命名失败', 'error');
      item.name = item.oldName;
      return;
    }
  }

  resetModal() {
    this.modalDetails.data = '';
    this.modalDetails.index = '';
  }

  deleteTargets: FileModel[] = [];

  delete_ask(items: FileModel[]) {
    this.deleteTargets = items;
    this.$root.$emit('bv::show::modal', 'delete-modal');
  }

  async deleteFiles() {
    this.ensureSelectedNotEmpty();
    try {
      for (let file of this.deleteTargets) {
        await new FileApi().deleteFile({id: file.id});
      }
      this.showAlert('删除成功', 'success');
    } catch (e) {
      this.showAlert('删除失败', 'error');
      return;
    }
    await this.refreshData();
  }

  ensureSelectedNotEmpty () {
    if (this.selectedFiles.length > 0)
      return;
      this.showAlert('请先选择文件', 'error');
    throw 'No selected files.';
  }

  showPathModal() {
    this.ensureSelectedNotEmpty();
    this.$root.$emit('bv::show::modal', 'path-modal');
  }

  targetPath: string = '/';

  async moveSelected() {
    this.ensureSelectedNotEmpty();
    // TODO check invalid path
    try {
      let files = this.selectedFiles;
      files.forEach(f => f.path = this.targetPath);
      await new FileApi().updateFiles({body: files});
      this.showAlert('移动成功', 'success');
    } catch (e) {
      this.showAlert('移动失败', 'error');
      return;
    }
    await this.refreshData();
  }

  isLoading: boolean = false;

  async refreshData() {
    this.isLoading = true;
    // TODO 超时判断
    this.files = await new FileApi().getFiles({path: this.path});
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
      oldName: '',
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
