import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: require('./test.html')
})
export class Test extends Vue {

  // 可以绑定的变量
  text1: string = '';

  // 可以绑定的函数
  onClick () {
    alert('click');
  }

}
