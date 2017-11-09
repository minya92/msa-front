import Vue from 'vue'
import Vuex from 'vuex'

import {LOGIN} from './mutation-types.js'
import {LOGIN_SUCCESS} from './mutation-types.js'
import {LOGOUT} from './mutation-types.js'

import {PATH_REDIRECT_LOGIN} from './mutation-types.js'

import cart from './modules/cart.js'
import recentProducts from './modules/product.js'

Vue.use(Vuex)

const state = {
	isAuthorized: !!localStorage.getItem('token'),
	pending: false,
  pathRedirectLogin: '/'
}

const mutations = {
	[LOGIN] (state) {
		state.pending = true;
	},
	[LOGIN_SUCCESS] (state) {
		state.isAuthorized = true;
		state.pending = false;
	},
	[LOGOUT](state) {
		state.isAuthorized = false;
	},
	[PATH_REDIRECT_LOGIN](state, path) {
		state.pathRedirectLogin = path;
	},
}

const getters = {
  isAuthorized: state => {
    return state.isAuthorized;
  },
  pathRedirectLogin: state => {
    return state.pathRedirectLogin;
  }
}

const actions = {
 login({ commit }, creds) {
   commit(LOGIN);
   return new Promise(resolve => {
     setTimeout(() => {
       console.log(creds);
       localStorage.setItem("token", creds);
       commit(LOGIN_SUCCESS);
       resolve();
     }, 1000);
   });
 },
 logout({ commit }) {
   localStorage.removeItem("token");
   commit(LOGOUT);
 },
 pathRedirectLogin({ commit }, path) {
   commit(PATH_REDIRECT_LOGIN, path);
 }
}

export default new Vuex.Store({
	state,
  modules:{
    cart,
    recentProducts
  },
	mutations,
	getters,
	actions
})
