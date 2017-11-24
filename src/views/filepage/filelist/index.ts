import Vue from 'vue';
import Component from 'vue-class-component';
import moment from 'moment';
import {ErrorInfo, File, FileApi, BASE_PATH, FileTag, FiletagApi, UserGroup, UserApi} from '../../../api';
import {UploadStatus} from '../../../components/upload_status';
import {Watch} from 'vue-property-decorator';
import {CommentList} from '../comment_list/index';
import {PathBreadcrumb} from '../../../components/path_breadcrumb/index';
import {PathSelector} from '../../../components/path_selector/index';
import {PreviewModal} from '../../../components/preview_modal/index';
import Multiselect from 'vue-multiselect';


class FileModel extends File {
  choice: boolean = false;
  star: boolean = true;
  oldName: string = '';
  renaming: boolean = false;
  url: string = '';
}

const nullFile: FileModel = {
  ...new File(),
  choice: null,
  star: null,
  oldName: null,
  renaming: null,
  url: null
};

@Component({
  template: require('./filelist.html'),
  components: {Multiselect, UploadStatus, CommentList, PathBreadcrumb, PathSelector, PreviewModal},
  async mounted() {
    await this.fetchData();
  }
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

  path: string = '/';

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

  showDetail (item: FileModel) {
    this.targetFile = item;
    this.$root.$emit('bv::show::modal', 'detail-modal');
  }

  showComment (item: FileModel) {
    this.targetFile = item;
    this.$root.$emit('bv::show::modal', 'comment-modal');
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
      this.files = files.map(f => ({
        ...f,
        choice: false,
        oldName: '',
        renaming: false,
        star: false,
        url: BASE_PATH + `/file/${f.id}/data`,
      }));
      this.allTags = await new FiletagApi().getFileTags();
      let self = await new UserApi().getUserByName({id: this.$store.state.userID});
      this.allUserGroups = self.groups;
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
      this.path = item.path + item.name + '/';
    } else {
      this.targetFile = item;
      this.$root.$emit('bv::show::modal', 'preview-modal');
    }
  }

  allTags: FileTag[] = [];

  newTagName: string = '';
  addTagBegin() {
    this.newTagName = '';
  }
  async updateTargetFile() {
    try {
      let rsp = await new FileApi().updateFiles({body: [this.targetFile]});
    } catch (e) {
      await this.handleError(e, '修改文件信息');
    } finally {
      await this.fetchData();
    }
  }
  async newTag(tagName: string) {
    try {
      let tag = await new FiletagApi().createFileTag({body:
        {id: 0, name: tagName, color: '#FFFFFF'}});
      this.targetFile.tags.push(tag);
      let rsp = await new FileApi().updateFiles({body: [this.targetFile]});
    } catch (e) {
      await this.handleError(e, '新建标签');
    } finally {
      await this.fetchData();
    }
  }

  allUserGroups: UserGroup[] = [];

  targetFile: FileModel = nullFile;

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
