import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export let store = new Vuex.Store({
  state: {
    authType: 'basic',
    basicAuthToken: null,
    token: null,
    opt: null
  },
  mutations: {
    setBasicAuth(state, payload: {username, password}) {
      state.basicAuthToken = btoa(payload.username + ':' + payload.password);
      state.opt = {headers: {Authorization: `Basic ${state.basicAuthToken}`}};
    },
    setToken(state, token) {
      state.token = token;
      state.opt = {headers: {Authorization: `Token ${state.token}`}};
    },
    logout(state) {
      state.token = null;
    }
  }
});
