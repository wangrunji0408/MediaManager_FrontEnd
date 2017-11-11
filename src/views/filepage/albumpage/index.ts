import Vue from 'vue';
import Component from 'vue-class-component';
import {BASE_PATH, File, FileApi} from '../../../api';
import {PathBreadcrumb} from '../../../components/path_breadcrumb';
import {Watch} from 'vue-property-decorator';
import util from '../util';
import {PathSelector} from '../../../components/path_selector';
import {PreviewModal} from '../../../components/preview_modal';

@Component({
  template: require('./albumpage.html'),
  components: {PathBreadcrumb, PathSelector, PreviewModal},
  async mounted() {
    await this.fetchData();
  }
})
export class AlbumPage extends Vue {
  files: File[] = [];

  column: number = 5;
  path: string = '/';
  loading: boolean = false;

  @Watch('files')
  get filesInGrid(): File[][] {
    if (this.files.length === 0)
      return [];
    let res: File[][] = [];
    this.files.forEach((f, i) => {
      if (i % this.column === 0)
        res.push([f]);
      else
        res[res.length - 1].push(f);
    });
    while (res[res.length - 1].length < this.column)
      res[res.length - 1].push(null);
    return res;
  }

  getUrl(file: File): string {
    if (!file) return '';
    // return 'https://placekitten.com/g/300/300';
    return `${BASE_PATH}/file/${file.id}/data`;
  }

  @Watch('path')
  async fetchData() {
    try {
      this.loading = true;
      let files = await new FileApi().getFiles({path: this.path});
      this.files = files.filter(f => util.isImage(f));
    } catch (e) {
      this.$message.error('获取文件信息失败');
    } finally {
      this.loading = false;
    }
  }

  targetFile: File = null;
  preview(item: File) {
    this.targetFile = item;
    this.$root.$emit('bv::show::modal', 'preview-modal');
  }
}
