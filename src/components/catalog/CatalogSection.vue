<template>
  <div class="content-section" v-if="products.length > 0">
    <div class="sort-section" v-if="sortBlock">
      Сортировать по:
      <select v-model="selectedSort" @change="changePageFromSort">
        <option value="" selected>по добавлению</option>
        <option value="name">наименованию</option>
        <option value="cost">возрастанию цены</option>
        <option value="costDesc">убыванию цены</option>
      </select>
    </div>
    <div class="products-section">
      <AddToCart v-if="showCart" @close="showCart = false" :product="product"></AddToCart>
      <catalog-item 
        v-for="product in products"
        :product="product"
        @addToCart="addToCart"
        :key="product.id"
      ></catalog-item>
    </div>
    <pagination
      :current="currentPage" 
      :total="totalProducts" 
      :pageSize="pageSize" 
      @page-changed="changePage"
      buttonUp
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
    sortBlock: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedSort: '',
      showCart: false,
      totalProducts: 0,
      pageSize: 12,
      currentPage: 1,
      products: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.products = [];
      this.loadPage();
    }
  },
  methods: {
    changePage: function(page){
      let query = Object.assign({}, this.$route.query);
      query.sort = this.selectedSort;
      query.page = page;

      this.$router.push({query: query})
    },
    changePageFromSort: function(){
      let query = Object.assign({}, this.$route.query);
      query.sort = this.selectedSort;
      query.page = 1;

      this.$router.push({query: query})
    },
    loadProductsByFilter: function(page){
      let query = this.filterQuery();
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
      window.scrollTo(0,0);
      if (typeof this.$route.query.cost_min != 'undefined'){
        query += `&cost_min=${this.$route.query.cost_min}`;
      }
      if (typeof this.$route.query.cost_max != 'undefined'){
        query += `&cost_max=${this.$route.query.cost_max}`;
      }
      if (typeof this.$route.params.types != 'undefined'){
        query += `&types=%5B${this.$route.params.types}%5D`;
      }
      //запрос по id года, модели и марки
      let idModel = this.$route.query.year || this.$route.query.model || this.$route.query.mark;
      if (!!idModel){
        query += `&mark_model=${idModel}`;
      }

      if (typeof this.$route.query.search_string != 'undefined'){
        query += `&search_string=${this.$route.query.search_string}`;
      }
      query += `&page=${this.currentPage}&pageSize=${this.pageSize}`;
      query += `&order=${this.selectedSort}`;

      return query;
    },
    addToCart: function(product){
      this.product = product;
      this.$store.dispatch("addToCart", {product: product, quantity: 1})
      this.showCart=true;
    },
    loadPage: function(){
      if (this.$route.query.page == undefined || !isNaN(this.$route.query.page) ){
        this.$route.query.page == undefined ? this.currentPage = 1 : this.currentPage = Number(this.$route.query.page);
        this.$route.query.sort != undefined ? this.selectedSort = this.$route.query.sort : this.selectedSort = '';

        this.loadProductsByFilter(this.currentPage)
      } else {
        this.loadProductsByFilter(1)
      }
    }
  },
  mounted() {
    this.loadPage();
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