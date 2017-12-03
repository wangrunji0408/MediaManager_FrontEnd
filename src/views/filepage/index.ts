import Vue from 'vue';
import Component from 'vue-class-component';
import {FileList} from './filelist';
import {AlbumPage} from './albumpage';
import {SearchPage} from './searchpage/index';

@Component({
  template: require('./filepage.html'),
})
export class FilePage extends Vue {

}

export let FilePageRouter = [
    { path: '', component: FileList },
    { path: 'all', component: FileList },
    { path: 'album', component: AlbumPage },
    { path: 'search', component: SearchPage }
];
