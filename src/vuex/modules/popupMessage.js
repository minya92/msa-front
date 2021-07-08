import {
  HIDE_POPUP_MESSAGE,
  SHOW_POPUP_MESSAGE
} from '@/vuex/mutation-types'

const state = {
  statusPopup: true,
  visiblePopup: false,
  messagePopup: ''
};

const mutations = {
  [SHOW_POPUP_MESSAGE](state, { status, message }) {
    state.visiblePopup = true;
    state.statusPopup = status;
    state.messagePopup = message;
  },
  [HIDE_POPUP_MESSAGE](state) {
    state.visiblePopup = false;
  }
};

const getters = {
  getStatusPopup: state => {    
    return state.statusPopup;
  },
  getVisiblePopup: state => {
    return state.visiblePopup;
  },
  getMessagePopup: state => {    
    return state.messagePopup;
  },
};

const actions = {
  hidePopup({ commit }) {
    commit(HIDE_POPUP_MESSAGE);
  },
  showPopup({ commit }, { status, message }) {
    commit(SHOW_POPUP_MESSAGE, {status, message});
    
    setTimeout(() => { commit(HIDE_POPUP_MESSAGE); }, 4000)
  },
};

export default{
  state,
  mutations,
  getters,
  actions,
};