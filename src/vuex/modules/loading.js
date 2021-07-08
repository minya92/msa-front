import {
  HIDE_LOADING,
  SHOW_LOADING
} from '@/vuex/mutation-types'

const state = {
  isloading: false
};

const mutations = {
  [SHOW_LOADING](state) {
    state.isloading = true;
  },
  [HIDE_LOADING](state) {
    state.isloading = false;
  }
};

const getters = {
  isLoading: state => {    
    return state.isloading;
  }
};

const actions = {
  hideLoading({ commit }) {
    commit(HIDE_LOADING);
  },
  showLoading({ commit }) {
    commit(SHOW_LOADING);
  }
};

export default{
  state,
  mutations,
  getters,
  actions,
};