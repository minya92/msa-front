function saveItems(data) {
  this.$cookies.set('itemsCart', data, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  });
}
function getItems() {
  try {
    let result = this.$cookies.get('itemsCart');

    return result ? result : [];
  } catch (e) {
    saveItems([]);
    return [];
  }
}

export const state = () => ({
  items: [],
  checkoutStatus: null,
  orderId: null
});

export const mutations = {
  addToCart(state, item) {
    const record = state.items.find(p => p.id === item.product.id);
    if (!record) {
      if (item.product.id && item.product.price && item.quantity) {
        state.items.push({
          id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          currency: item.product.currency
        });
      }
    } else {
      record.quantity++;
    }

    saveItems(state.items);
  },
  updateCart(state, item) {
    const record = state.items.find(p => p.id === item.cost_id);
    if (!record) {
      state.items.push({
        id: item.cost_id,
        quantity: item.quantity,
        price: item.price,
        currency: item.currency
      });
    } else {
      record.quantity = item.quantity;
    }

    saveItems(state.items);
  },
  removeCart(state, id) {
    state.items.splice(state.items.indexOf(id), 1);
    saveItems(state.items);
  },

  checkoutRequest(state, { orderId }) {
    // clear cart
    state.items = [];
    state.orderId = orderId;
    saveItems(state.items);
    state.checkoutStatus = null;
  },

  checkoutSuccess(state) {
    state.checkoutStatus = 'successful';
  },

  checkoutFailure(state, { savedCartItems }) {
    state.items = savedCartItems;
    state.checkoutStatus = 'failed';
  }
};

export const getters = {
  checkoutStatus: state => state.checkoutStatus,
  cartProducts: state => state.items
};

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    getItems();
  },
  checkout({ commit, state }, products) {
    const savedCartItems = [...state.items];
    commit(checkoutRequest);
    shop.buyProducts(
      products,
      () => commit(checkoutSuccess),
      () => commit(checkoutFailure, { savedCartItems })
    );
  },
  addToCart({ commit }, product) {
    commit('addToCart', product);
  },
  removeCart({ commit }, { id }) {
    commit(removeCart, id);
  },
  updateCart({ commit }, product) {
    commit(updateCart, product);
  },
  successCheckout({ commit }, orderId) {
    commit(checkoutRequest, orderId);
  },
  verificationCart({ commit }, ids) {
    state.items.forEach(item => {
      if (ids.indexOf(item.id) < 0) {
        commit(removeCart, item.id);
      }
    }, this);
  }
};
