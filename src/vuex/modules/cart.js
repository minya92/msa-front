import * as types from './../mutation-types'

function saveItems(data){
  localStorage.setItem('itemsCart', JSON.stringify(data))
}
function getItems(){
  try {
    let result = JSON.parse(localStorage.getItem('itemsCart'))
    
    return result ? result : []
  } catch (e){
    saveItems([])
    return []
  }
}

const state = {
  items: getItems(),
  checkoutStatus: null,
  orderId: null
}

const getters = {
  checkoutStatus: state => state.checkoutStatus,
  cartProducts: state => state.items
}

const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit(types.CHECKOUT_REQUEST)
    shop.buyProducts(
      products,
      () => commit(types.CHECKOUT_SUCCESS),
      () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
    );
  },
  addToCart ({ commit }, product) {
    commit(types.ADD_TO_CART, product);
  },
  removeCart ({ commit }, { id }) {
    commit(types.REMOVE_CART, id);
  },
  updateCart ({ commit }, product) {
    commit(types.UPDATE_CART, product);
  },
  successCheckout ({ commit }, orderId) {
    commit(types.CHECKOUT_REQUEST, orderId);
  },
  verificationCart({ commit }, ids) {
    state.items.forEach(item => {
      if (ids.indexOf(item.id) < 0) {
        commit(types.REMOVE_CART, item.id)
      }
    }, this);
  }
}

const mutations = {
  [types.ADD_TO_CART] (state, item ) {
    const record = state.items.find(p => p.id === item.product.id)
    if (!record) {
      if (item.product.id && item.product.price && item.quantity) {
        state.items.push({
          id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          currency: item.product.currency
        })
      }
    } else {
      record.quantity++
    }

    saveItems(state.items)
  },
  [types.UPDATE_CART] (state, item) {
    const record = state.items.find(p => p.id === item.cost_id)
    if (!record) {
      state.items.push({
        id: item.cost_id,
        quantity: item.quantity,
        price: item.price,
        currency: item.currency
      })
    } else {
      record.quantity = item.quantity
    }

    saveItems(state.items)
  },
  [types.REMOVE_CART] (state, id ) {
      state.items.splice(state.items.indexOf(id), 1)
      saveItems(state.items)
  },

  [types.CHECKOUT_REQUEST] (state, {orderId}) {
    // clear cart
    state.items = []
    state.orderId = orderId
    saveItems(state.items)
    state.checkoutStatus = null
  },

  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  },

  [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
    state.items = savedCartItems
    state.checkoutStatus = 'failed'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}