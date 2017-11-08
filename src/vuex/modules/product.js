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
  recentItem ({ commit }, product) {
    commit(types.RECEIVE_PRODUCTS, product)
  }
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { id, name, description, price, currency, images, article}) {
    state.all.push({ 
      id, 
      name, 
      description, 
      price, 
      currency, 
      article, 
      image:(images.length > 0 ? images[0].thumbnail : '')
    });
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}