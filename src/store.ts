import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export let store = new Vuex.Store({
  state: {
    basicAuthToken: null,
    token: null,
    authOpt: null,
    username: null,
    userID: null,
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
      localStorage.setItem('userID', JSON.stringify(id));
    },
    logout(state) {
      state.authOpt = null;
      state.username = null;
      localStorage.removeItem('authOpt');
      localStorage.removeItem('username');
      localStorage.removeItem('userID');
    },
    recoverAuth(state) {
      try {
        state.authOpt = JSON.parse(localStorage.getItem('authOpt'));
        state.username = localStorage.getItem('username');
        state.userID = localStorage.getItem('userID');
      } catch (e) {
        console.warn('Failed to recover auth');
      }
    }
  }
});
