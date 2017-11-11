import Vue from 'vue';
import Component from 'vue-class-component';
import {BASE_PATH, File} from '../../../api';

@Component({
  template: require('./albumpage.html')
})
export class AlbumPage extends Vue {
  files: File[] = [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
  ];

  column: number = 5;

  get filesInGrid(): File[][] {
    let res: File[][] = [];
    this.files.forEach((f, i) => {
      if (i % this.column === 0)
        res.push([f]);
      else
        res[res.length - 1].push(f);
    });
    while (res[res.length - 1].length < this.column)
      res[res.length - 1].push({id: '0'});
    return res;
  }

  getUrl(file: File): string {
    if (file.id === '0')
      return '';
    return 'https://placekitten.com/g/300/300'; // TODO temp
    // return `${BASE_PATH}/file/${file.id}/data`;
  }
}
