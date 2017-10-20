import Vue from 'vue';
import Component from 'vue-class-component';
import {FileList} from './filelist';
import {Another} from './another/index';

@Component({
  template: require('./filepage.html'),
  components: {FileList}
})
export class FilePage extends Vue {

}

export let FilePageRouter = [
    { path: '', component: FileList },
    { path: 'all', component: FileList },
    { path: 'another', component: Another }
];
