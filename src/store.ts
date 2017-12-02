import Vue from 'vue';
import Vuex from 'vuex';
import {User} from './api';
Vue.use(Vuex);

export let store = new Vuex.Store({
  state: {
    basicAuthToken: null,
    token: null,
    authOpt: null,
    username: null,
    userID: null,
    user: null,
  },
  mutations: {
    setBasicAuth(state, payload: {username, password}) {
      state.username = payload.username;
      state.basicAuthToken = btoa(payload.username + ':' + payload.password);
      state.authOpt = {headers: {Authorization: `Basic ${state.basicAuthToken}`}};
      localStorage.setItem('authOpt', JSON.stringify(state.authOpt));
      localStorage.setItem('username', payload.username);
    },
    setToken(state, token) {
      state.token = token;
      state.authOpt = {headers: {Authorization: `Token ${state.token}`}};
      localStorage.setItem('authOpt', JSON.stringify(state.authOpt));
    },
    setUserID(state, id) {
      state.userID = id;
      localStorage.setItem('userID', id);
    },
    setUser(state, user: User) {
      state.user = user;
      state.userID = user.id;
      state.username = user.username;
      localStorage.setItem('userID', user.id.toString());
      localStorage.setItem('username', user.username);
    },
    logout(state) {
      state.authOpt = null;
      state.username = null;
      state.userID = null;
      localStorage.removeItem('authOpt');
      localStorage.removeItem('username');
      localStorage.removeItem('userID');
    },
    recoverAuth(state) {
      try {
        state.authOpt = JSON.parse(localStorage.getItem('authOpt'));
        state.username = localStorage.getItem('username');
        state.userID = JSON.parse(localStorage.getItem('userID'));
      } catch (e) {
        console.warn('Failed to recover auth');
      }
    }
  }
});
