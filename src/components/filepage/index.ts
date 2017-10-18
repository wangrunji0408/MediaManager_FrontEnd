import Vue from 'vue';
import Component from 'vue-class-component';
import {FileList} from '../filelist';

@Component({
  template: require('./filepage.html'),
  components: {FileList}
})
export class FilePage extends Vue {

}

