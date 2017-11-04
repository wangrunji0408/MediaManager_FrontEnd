import Vue from 'vue';
import Component from 'vue-class-component';
import {UserGroup} from '../../api';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import {Watch} from 'vue-property-decorator';

@Component({
  template: require('./group_dropdown.html'),
  props: ['all', 'value'],
  components: { Multiselect },
})
export class GroupDropdown extends Vue {

  all: UserGroup[];
  value: UserGroup[];

  @Watch('value')
  onSelectedChanged() {
    this.$emit('input', this.value);
  }
}
