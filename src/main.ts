import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

// BootstrapVue
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './themes/cosmo.min.css';
import 'font-awesome/css/font-awesome.min.css';
Vue.use(BootstrapVue);

// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import { NavbarComponent } from './views/navbar';
import {store} from './store';
import {router} from './router';

store.commit('recoverAuth');

new Vue({
  el: '#app-main',
  store,
  router,
  components: {
    'navbar': NavbarComponent
  }
});
