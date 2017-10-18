import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'font-awesome/css/font-awesome.min.css';

import './sass/main.scss';

import { HomeComponent } from './components/home';
import { AboutComponent } from './components/about';
import { ListComponent } from './components/list';
import { NavbarComponent } from './components/navbar';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { Demo } from './components/demo';
import { Test } from './components/test';
import { FilePage } from './components/filepage';

// register the plugin
Vue.use(VueRouter);
Vue.use(BootstrapVue);

let router = new VueRouter({
  routes: [
    { path: '/', component: Test },
    { path: '/demo', component: Demo, children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'list', component: ListComponent }
    ] },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/file', component: FilePage },
  ]
});

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'navbar': NavbarComponent
  }
});
