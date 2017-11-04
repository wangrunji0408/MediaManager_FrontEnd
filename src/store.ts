import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export let store = new Vuex.Store({
  state: {
    basicAuthToken: null,
    token: null,
    authOpt: null
  },
  mutations: {
    setBasicAuth(state, payload: {username, password}) {
      state.basicAuthToken = btoa(payload.username + ':' + payload.password);
      state.authOpt = {headers: {Authorization: `Basic ${state.basicAuthToken}`}};
      localStorage.setItem('authOpt', JSON.stringify(state.authOpt));
    },
    setToken(state, token) {
      state.token = token;
      state.authOpt = {headers: {Authorization: `Token ${state.token}`}};
      localStorage.setItem('authOpt', JSON.stringify(state.authOpt));
    },
    logout(state) {
      state.authOpt = null;
      localStorage.removeItem('authOpt');
    },
    recoverAuth(state) {
      try {
        state.authOpt = JSON.parse(localStorage.getItem('authOpt'));
      } catch (e) {
        console.warn('Failed to recover auth');
      }
    }
  }
});
