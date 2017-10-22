import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './themes/cosmo.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { NavbarComponent } from './components/navbar';
import { Login } from './components/login';
import { Signup } from './components/signup';
import {FilePage, FilePageRouter} from './components/filepage';
import {UserPage, UserPageRouter} from './components/userpage';


// register the plugin
Vue.use(VueRouter);
Vue.use(BootstrapVue);

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
