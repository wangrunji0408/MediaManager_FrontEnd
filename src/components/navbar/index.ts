import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  template: require('./navbar.html')
})
export class NavbarComponent extends Vue {
}
