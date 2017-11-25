import Vue from 'vue';
import Component from 'vue-class-component';
import {File, FileApi, FileTag, FiletagApi} from '../../../api';
import {Watch} from 'vue-property-decorator';
import Multiselect from 'vue-multiselect';


@Component({
  template: require('./searchpage.html'),
  components: {Multiselect},
  async mounted() {
    await this.fetchData();
  }
})
export class SearchPage extends Vue {

  searchName: string = '';
  searchTags: FileTag[] = [];
  allTags: FileTag[] = [];
  files: File[] = [];
  get filteredFiles() {
    return this.files.filter(f => this.filter(f));
  }

  filter(file: File): boolean {
    return file.name.match(this.searchName) != null;
  }

  @Watch('searchTags')
  @Watch('searchName')
  async search() {
    try {
      this.files = await new FileApi().getFiles({
        name: this.searchName,
        tags: this.searchTags.map(t => t.id)
      });
    } catch (e) {
      this.$message.error('获取文件信息失败');
    }
  }

  async fetchData() {
    try {
      this.allTags = await new FiletagApi().getFileTags();
    } catch (e) {
      this.$message.error('获取文件标签失败');
    }
  }
}
