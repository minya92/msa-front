import Vue from 'vue'
import Vuex from 'vuex'

import {LOGIN} from './mutation-types.js'
import {LOGIN_SUCCESS} from './mutation-types.js'
import {LOGOUT} from './mutation-types.js'

import cart from './modules/cart.js'

Vue.use(Vuex)

const state = {
	isAuthorized: !!localStorage.getItem('token'),
	pending: false,
  //itemsCart: []
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
  /*[CART](state) {
    state.itemsCart.push(product);
  },*/
}

const getters = {
  isAuthorized: state => {
    return state.isAuthorized
  }
}

const actions = {
 login({ commit }, creds) {
   commit(LOGIN);
   return new Promise(resolve => {
     setTimeout(() => {
       localStorage.setItem("token", creds);
       commit(LOGIN_SUCCESS);
       resolve();
     }, 1000);
   });
 },
 logout({ commit }) {
   localStorage.removeItem("token");
   commit(LOGOUT);
 }
 /*addToCart({ commit }, product) {
   commit(CART, product);
 },*/
}

export default new Vuex.Store({
	state,
  modules:{
    cart
  },
	mutations,
	getters,
	actions
})
