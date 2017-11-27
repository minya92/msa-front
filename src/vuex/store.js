import Vue from 'vue'
import Vuex from 'vuex'

import {LOGIN} from './mutation-types.js'
import {LOGIN_SUCCESS} from './mutation-types.js'
import {LOGOUT} from './mutation-types.js'

import {PATH_REDIRECT_LOGIN} from './mutation-types.js'
import {SHOW_POPUP} from './mutation-types.js'

import cart from './modules/cart.js'
import recentProducts from './modules/product.js'

Vue.use(Vuex)

const state = {
	loginInfo: null,/*{
    "address": null,
    "birthday": null,
    "bonus_category": null,
    "city": null,
    "city_id": null,
    "client": null,
    "email": 'shmail@mail.ru',
    "email_verefied": null,
    "f_name": "Семен Квертиевич",
    "first_name": "Алексей",
    "inst_user_id": null,
    "last_name": "Кашинцев",
    "login": "vk_12640638",
    "middle_name": null,
    "ok_user_id": null,
    "password": "38688899aa25aa89309da9f4e68e2310",
    "person": 150290718779200,
    "person_id": 150290718779200,
    "phone": 89109109988,
    "reg_date": null,
    "usr_name": null,
    "vk_user_id": 12640638
  },*/
	pending: false,
  pathRedirectLogin: '/',
  popup: {
    visible: false,
    error: false,
    message: ''
  }
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
	[SHOW_POPUP](state, payload) {
		state.popup = {
      visible: payload.visible,
      message: payload.message,
      error: payload.error
    };
	},
}

const getters = {
  isAuthorized: state => {
    return state.loginInfo != null;
  },
  getName: state => {
    return state.loginInfo != null ? state.loginInfo.f_name : '';
  },
  getEmail: state => {
    return state.loginInfo != null ? state.loginInfo.email : '';
  },
  getPhone: state => {
    return state.loginInfo != null ? state.loginInfo.phone : '';
  },
  getCity: state => {
    return state.loginInfo != null ? state.loginInfo.city : '';
  },
  pathRedirectLogin: state => {
    return state.pathRedirectLogin;
  },
  popupState: state => {
    return state.popup;
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
 },
 showPopup({ commit }, payload) {
    commit(SHOW_POPUP, {
        visible: true, 
        error: payload.error, 
        message: payload.message
      }
    );
    setTimeout(() => {
      commit(SHOW_POPUP, {
        visible: false, 
        error: payload.error, 
        message: payload.message
      })
    }, 5000)
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
