import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Views
import { Login } from './views/login';
import { Signup } from './views/signup';
import {FilePage, FilePageRouter} from './views/filepage';
import {Settings, SettingsRoute} from './views/settings/index';

import {store} from './store';

let router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/settings', component: Settings, children: SettingsRoute },
    { path: '/file', component: FilePage, children: FilePageRouter,
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

export {router};
