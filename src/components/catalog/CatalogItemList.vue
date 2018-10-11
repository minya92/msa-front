<template>
  <div class="content-section" v-if="products.length > 0">
    <div class="products-section">
      <AddToCart v-if="showCart" @close="showCart = false" :product="product"></AddToCart>
      <catalog-item 
        v-for="product in products"
        :product="product"
        @addToCart="addToCart"
        :key="product.id"
      ></catalog-item>
    </div>
    <pagination v-if="paginationBlock"
      :current="currentPage" 
      :total="totalProducts" 
      :pageSize="pageSize" 
      @page-changed="changePage"
    ></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import AddToCart from '@/components/AddToCart'
import CatalogItem from '@/components/catalog/CatalogItem'
export default {
  components: {
    Pagination,
    AddToCart,
    CatalogItem
  },
  props: {
    paginationBlock: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedSort: '',
      showCart: false,
      totalProducts: 0,
      pageSize: 12,
      currentPage: 1,
      products: {}
    }
  },
  methods: {
    changePage: function(page){
      this.currentPage = page;
      this.loadProducts(page)
    },
    loadProducts: function(page){
      let query = this.filterQuery(page);
      this.loadApiProducts(query);
    },
    loadApiProducts(query = '') {
      this.$API.get('getItemsCount'+query).then(r => {
        this.totalProducts = r.data.data

        this.$store.dispatch('showLoading');
        this.$API.get("getItems" + query).then(response => {
          var products = [];
          for (var i = 0; i < response.data.data.length; i++){
            var item = response.data.data[i];
            products.push({
              id: item.cost_id,
              name: item.item_name,
              article: item.artikul,
              description: item.item_description,
              price: item.item_cost,
              currency: item.currency,
              image: item.thumbnail
            });
          }

          this.products = products;
          this.$store.dispatch('hideLoading');
        })
      }).catch(err => {
        this.$store.dispatch('hideLoading');
      })
    },
    filterQuery() {
      let query = '?';
      query += `page=${this.currentPage}&`;

      Object.keys(this.filter).forEach(x => {
        if (this.filter[x])
        query += `${x}=${this.filter[x]}&`
      });
      
      return query;
    },
    addToCart: function(product){
      this.product = product;
      this.$store.dispatch("addToCart", {product: product, quantity: 1})
      this.showCart=true;
    }
  },
  mounted() {
    this.filter.pageSize ? this.pageSize = this.filter.pageSize : this.filter.pageSize = this.pageSize;
    this.loadProducts(1);
  }
}
</script>

<style scoped>
.products-section{
	/*margin-right: -40px;*/
	display: flex;
	flex-wrap: wrap;
}
</style>
