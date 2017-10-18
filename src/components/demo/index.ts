import Vue from 'vue';
import Component from 'vue-class-component';
import {Link} from '../navbar/link';
import {Watch} from 'vue-property-decorator';

@Component({
  template: require('./demo.html')
})
export class Demo extends Vue {

  inverted: boolean = true; // default value

  object: { default: string } = { default: 'Default object property!' }; // objects as default values don't need to be wrapped into functions

  links: Link[] = [
    new Link('HomeComponent', '/demo/home'),
    new Link('AboutComponent', '/demo/about'),
    new Link('ListComponent', '/demo/list')
  ];

  @Watch('$route.path')
  pathChanged() {
  }
}
