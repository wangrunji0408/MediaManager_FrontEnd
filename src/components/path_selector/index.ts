import Vue from 'vue';
import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import {File, FileApi} from '../../api';

@Component({
  template: require('./path_selector.html'),
  props: ['value'],
})
export class PathSelector extends Vue {

  value: string = '';
  folders: File[] = [];
  loading: boolean = false;

  entry(folder: File) {
    this.value = folder.path;
    if (!this.value.endsWith('/'))
      this.value += '/';
    this.value += folder.name + '/';
    this.$emit('input', this.value);
  }

  @Watch('value')
  async fetchData() {
    if (this.value === '')
      return;
    try {
      this.loading = true;
      let files = await new FileApi().getFiles({path: this.value});
      this.folders = files.filter(f => f.isDir);
    } catch (e) {
      this.$message.error('获取文件信息失败');
    } finally {
      this.loading = false;
    }
  }
}
