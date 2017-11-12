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
	loginInfo: null,
	pending: false,
  pathRedirectLogin: '/'
}

const mutations = {
	[LOGIN] (state, loginInfo) {
		state.loginInfo = loginInfo;
	},
	[LOGOUT](state) {
		state.loginInfo = null;
	},
	[PATH_REDIRECT_LOGIN](state, path) {
		state.pathRedirectLogin = path;
	},
}

const getters = {
  isAuthorized: state => {
    return state.loginInfo != null;
  },
  getName: state => {
    return state.loginInfo != null ? state.loginInfo.f_name : 'Профиль';
  },
  pathRedirectLogin: state => {
    return state.pathRedirectLogin;
  }
}

const actions = {
 login({ commit }, creds) {
   commit(LOGIN, creds);
 },
 logout({ commit }) {
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
