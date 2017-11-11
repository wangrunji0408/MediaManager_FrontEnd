import Vue from 'vue';
import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';

@Component({
  template: require('./path_breadcrumb.html'),
  props: ['value'],
})
export class PathBreadcrumb extends Vue {

  value: string = '';

  @Watch('value')
  get pathItems() {
    let items = [{text: 'root', path: '/', disabled: false}];
    let lastPos = 0;
    for (let i = 1; i < this.value.length; ++i) {
      if (this.value[i] !== '/')
        continue;
      items.push({
        text: this.value.substring(lastPos + 1, i),
        path: this.value.substring(0, i + 1),
        disabled: false
      });
      lastPos = i;
    }
    items[items.length - 1].disabled = true;
    return items;
  }

  onClick(item) {
    this.value = item.path;
    this.$emit('input', this.value);
  }
}
