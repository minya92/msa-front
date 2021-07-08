const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

const state = {
  all: []
}

const getters = {
  allProducts: state => state.all
}

const actions = {
  getAllProducts ({ commit }) {
    /*shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })*/
  },
  recentItem ({ commit }, product) {
    commit(RECEIVE_PRODUCTS, product);
  }
}

const mutations = {
  [RECEIVE_PRODUCTS] (state, { id, name, description, price, currency, images, article}) {
    state.all = state.all.filter(x => x.id != id);
    
    state.all.unshift({ 
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