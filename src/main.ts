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
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

import { NavbarComponent } from './components/navbar';
import { Login } from './components/login';
import { Signup } from './components/signup';
import {FilePage, FilePageRouter} from './components/filepage';
import {UserPage, UserPageRouter} from './components/userpage';

let router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/file', component: FilePage, children: FilePageRouter },
    { path: '/user', component: UserPage, children: UserPageRouter },
  ]
});

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'navbar': NavbarComponent
  }
});
