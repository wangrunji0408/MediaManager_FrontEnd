import axios from 'axios';
import {store} from './store';
import {router} from './router';


// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.authType === 'basic' && store.state.basicAuthToken != null) {
      config.headers.Authorization = `Basic ${store.state.basicAuthToken}`;
    } else if (store.state.authType === 'token' && store.state.token != null) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Token ${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit('logout');
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          });
      }
    }
    return Promise.reject(error.response.data);   // 返回接口返回的错误信息
  });

export default axios;
