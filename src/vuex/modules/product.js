import * as types from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allProducts: state => state.all
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    /*shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })*/
  },
  recentItem ({ commit, item }) {
    console.log(item);
  }
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}