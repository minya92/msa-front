import * as types from './../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  added: [],
  checkoutStatus: null
}

// getters
const getters = {
  checkoutStatus: state => state.checkoutStatus,
  cartProducts: state => state.added
}

// actions
const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.added]
    commit(types.CHECKOUT_REQUEST)
    shop.buyProducts(
      products,
      () => commit(types.CHECKOUT_SUCCESS),
      () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
      )
  },
  addToCart ({ commit }, product) {
    commit(types.ADD_TO_CART, product)
  },
  removeCart ({ commit }, product) {
    commit(types.REMOVE_CART, product)
  },
  updateCart ({ commit }, product) {
    commit(types.UPDATE_CART, product)
  }
}
// mutations
const mutations = {
  [types.ADD_TO_CART] (state, {id, quantity} ) {
    const record = state.added.find(p => p.id === id)
    if (!record) {
      state.added.push({
        id,
        quantity: quantity
      })
    } else {
      record.quantity++
    }
  },
  [types.UPDATE_CART] (state, {id, quantity} ) {
    const record = state.added.find(p => p.id === id)
    if (!record) {
      state.added.push({
        id,
        quantity: quantity
      })
    } else {
      record.quantity = quantity
    }
  },
  [types.REMOVE_CART] (state, {id} ) {
      state.added.splice(state.added.indexOf(id), 1)
  },

  [types.CHECKOUT_REQUEST] (state) {
    // clear cart
    state.added = []
    state.checkoutStatus = null
  },

  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  },

  [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
    // rollback to the cart saved before sending the request
    state.added = savedCartItems
    state.checkoutStatus = 'failed'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}