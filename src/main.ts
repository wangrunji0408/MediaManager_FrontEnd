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

// Vuex
import Vuex from 'vuex';
Vue.use(Vuex);

// Views
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
    { path: '/file', component: FilePage, children: FilePageRouter,
      meta: {requireAuth: true, },
    },
    { path: '/user', component: UserPage, children: UserPageRouter,
      meta: {requireAuth: true, },
    },
  ]
});

router.beforeEach((to, from, next) => {
  // if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
  if (to.path !== '/login' && to.path !== '/signup') {
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  }
  else {
    next();
  }
});

const store = new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.token = null;
    }
  }
});

new Vue({
  el: '#app-main',
  store,
  router,
  components: {
    'navbar': NavbarComponent
  }
});
