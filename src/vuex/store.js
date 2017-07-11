import Vue from 'vue'
import Vuex from 'vuex'

import {LOGIN} from './mutation-types.js'
import {LOGIN_SUCCESS} from './mutation-types.js'
import {LOGOUT} from './mutation-types.js'

Vue.use(Vuex)

const state = {
	isAuthorized: !!localStorage.getItem('token'),
	pending: false
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
	}
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
 }

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})