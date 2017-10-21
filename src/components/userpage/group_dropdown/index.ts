import Vue from 'vue';
import Component from 'vue-class-component';
import {User, UserGroup} from '../../../api';

@Component({
  template: require('./group_dropdown.html'),
  props: ['all', 'selected']
})
export class GroupDropdown extends Vue {

  all: UserGroup[];
  selected: UserGroup[];
}
