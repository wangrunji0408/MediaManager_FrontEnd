import Vue from 'vue';
import Component from 'vue-class-component';
import {FileList} from './filelist';
import {RecentList} from './recentlist';

@Component({
  template: require('./filepage.html'),
  components: {FileList, RecentList}
})
export class FilePage extends Vue {

}

export let FilePageRouter = [
    { path: '', component: FileList },
    { path: 'all', component: FileList },
    { path: 'recent', component: RecentList }
];
