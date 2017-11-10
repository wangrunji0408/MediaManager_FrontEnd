import Vue from 'vue';
import Component from 'vue-class-component';
import moment from 'moment';
import {ErrorInfo, File, FileApi, BASE_PATH} from '../../../api';
import {UploadStatus} from '../../../components/upload_status';
import {Watch} from 'vue-property-decorator';

class FileModel extends File {
  choice: boolean = false;
  star: boolean = true;
  oldName: string = '';
  renaming: boolean = false;
  url: string = '';
}

function inSuffixs(str: string, suffixs: string[]): boolean {
  for (let s of suffixs)
    if (str.endsWith('.' + s))
      return true;
  return false;
}
function isVideo(file: File): boolean {
  if (file == null)  return false;
  return inSuffixs(file.name, ['avi', 'mp4']);
}
function isImage(file: File): boolean {
  if (file == null)  return false;
  return inSuffixs(file.name, ['jpg', 'png']);
}
function isText(file: File): boolean {
  if (file == null)  return false;
  return inSuffixs(file.name, ['txt']);
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  template: require('./filelist.html'),
  components: {UploadStatus}
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

  @Watch('path')
  get pathItems() {
    let items = [{text: 'root', to: '/file/all?path=%2F'}];
    let lastPos = 0;
    for (let i = 1; i < this.path.length; ++i) {
      if (this.path[i] !== '/')
        continue;
      items.push({
        text: this.path.substring(lastPos + 1, i),
        to: '/file/all?path=' + this.path.substring(0, i + 1).replace('/', '%2F')
      });
      lastPos = i;
    }
    return items;
  }

  constructor() {
    super();
    this.fetchData();
  }

  filesToUpload: any[] = [];

  async handleError(e, title: string) {
    if (e instanceof Response) {
      try {
        let error: ErrorInfo = await e.json();
        this.$message.error(title + '失败: ' + error.info);
      } catch (ee) {
        this.$message.error(title + '失败: ' + '解析错误失败');
      }
    } else if (e instanceof String) {
      this.$message.error(title + '失败: ' + e);
    } else {
      this.$message.error(title + '失败: ' + '未知错误');
      throw e;
    }
  }

  async uploadFiles() {
    try {
      if (this.filesToUpload.length === 0)
        throw '没有选择文件';
      for (let file of this.filesToUpload) {
        let rsp = await new FileApi().uploadFile({
          id: '0', file: file, path: this.path
        });
      }
      this.showAlert('上传文件成功', 'success');
    } catch (e) {
      await this.handleError(e, '上传文件');
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
      await this.handleError(e, '重命名');
      item.name = item.oldName;
      return;
    }
  }

  resetModal() {
    this.modalDetails.data = '';
    this.modalDetails.index = '';
  }

  targetFiles: FileModel[] = [];

  deleteBegin(items: FileModel[]) {
    this.targetFiles = items;
    this.ensureTargetNotEmpty();
    this.$root.$emit('bv::show::modal', 'delete-modal');
  }

  async deleteFiles() {
    this.ensureTargetNotEmpty();
    try {
      for (let file of this.targetFiles) {
        await new FileApi().deleteFile({id: file.id});
      }
      this.showAlert('删除成功', 'success');
    } catch (e) {
      await this.handleError(e, '删除');
      return;
    }
    await this.fetchData();
  }

  ensureTargetNotEmpty () {
    if (this.targetFiles.length > 0)
      return;
    this.showAlert('请先选择文件', 'error');
    throw 'No selected files.';
  }

  moveBegin(items: FileModel[]) {
    this.targetFiles = items;
    this.ensureTargetNotEmpty();
    this.$root.$emit('bv::show::modal', 'move-modal');
  }

  targetPath: string = '/';

  async moveSelected() {
    this.ensureTargetNotEmpty();
    // TODO check invalid path
    if (!this.targetPath.endsWith('/'))
      this.targetPath += '/';
    try {
      let files = this.targetFiles;
      files.forEach(f => f.path = this.targetPath);
      await new FileApi().updateFiles({body: files});
      this.showAlert('移动成功', 'success');
    } catch (e) {
      await this.handleError(e, '移动');
      return;
    }
    await this.fetchData();
  }

  isLoading: boolean = false;

  @Watch('path')
  async fetchData() {
    this.isLoading = true;
    // TODO 超时判断
    try {
      let files = await new FileApi().getFiles({path: this.path});
      this.files = files.map(f => {
        let ff = f as FileModel;  // 扩展为子类，补全属性
        ff.choice = false;
        ff.oldName = '';
        ff.renaming = false;
        ff.star = false;
        ff.url = BASE_PATH + `/file/${ff.id}/data`;
        return ff;
      });
      // this.$message.success('获取数据成功');
    } catch (e) {
      await this.handleError(e, '刷新');
    }
    this.isLoading = false;
  }

  showAlert(message: string, type: string = 'info') {
    (this as any).$message({message, type});
  }

  // TODO 实现全部选中/取消选中
  selectAll: boolean = true;
  switchSelectAll() {
    this.selectAll = !this.selectAll;
    this.files.forEach(f => f.choice = this.selectAll);
  }

  newDirName: string = '';
  async createDir() {
    try {
      let rsp = await new FileApi().createFile({body: {
        path: this.path,
        name: this.newDirName,
        isDir: true
      }});
      this.showAlert('新建文件夹成功', 'success');
    } catch (e) {
      await this.handleError(e, '新建文件夹');
    }
    await this.fetchData();
  }

  newFileName: string = '';
  async createFile() {
    try {
      let rsp = await new FileApi().createFile({body: {
        path: this.path,
        name: this.newFileName,
        isDir: false
      }});
      this.showAlert('新建文件成功', 'success');
    } catch (e) {
      await this.handleError(e, '新建文件');
    }
    await this.fetchData();
  }

  open(item: FileModel) {
    if (item.isDir) {
      let nextPath = item.path + item.name + '/';
      this.$router.push('/file/all?path=' + nextPath);
    } else {
      this.targetFile = item;
      this.$root.$emit('bv::show::modal', 'preview-modal');
    }
  }

  get isVideo() {
    return isVideo(this.targetFile);
  }
  get isImage() {
    return isImage(this.targetFile);
  }
  get isText() {
    return isText(this.targetFile);
  }
  targetFile: FileModel = null;

  files: FileModel[] = [];

  fields = [
    'select',
    // 'star',
    {key: 'thumbnails', label: ''},
    {key: 'name', sortable: true},
    {key: 'size', sortable: true},
    {key: 'modifyDate', sortable: true},
    'detail'
  ];

}
