import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import 'iview/dist/styles/iview.css';    // 使用 CSS

import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import File from '@/components/File'

Vue.use(Router);
Vue.use(iView);

export default new Router({
  routes: [
    {
      path: '/hello',
      component: HelloWorld
    },
    {
      path: '/user/signup',
      component: Signup
    },
    {
      path: '/user/login',
      component: Login
    },
    {
      path: '/file',
      component: File
    },
  ]
})
