<template>
  <main-layout>
    <div class="content-fluid catalog-section">
      <aside>
        <categories />
        <filter-model></filter-model>
      </aside>

      <div class="content-section">
        <template v-if="products.length > 0">
          <div class="sort-section">
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
            <div class="product-wrapper" v-for="product in products">
              <div class="product">
                <router-link :to="/product/ + product.id" class="product__image">
                <preload-image-loader :src="product.image"></preload-image-loader>
                </router-link>
                <div class="product-data">
                  <div class="product-name">{{product.name}}</div>
                  <div class="product-article" v-if="product.article">артикул: {{product.article}}</div>
                  <div class="product-description">{{product.description}}</div>
                  <div class="product-price">{{product.price}} {{product.currency}}</div>
                </div>
                <div class="btns_product">
                  <button class="btn_product btn_theme_white"  @click.prevent='$router.push({path: `/product/${product.id}`})'>Подробнее</button>
                  <button class="btn_product btn_theme"  @click.prevent='addToCart(product)'>В корзину</button>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <pagination :current="currentPage" :total="totalProducts" :pageSize="pageSize" @page-changed="changePage"></pagination>
      </template>
    </div>
  </div>
  <div class="content-fluid">
    <RecentView />
  </div>
  <grey-marks class="container-fluid"></grey-marks>
  <action-blocks class="container-fluid"></action-blocks>
</main-layout>
</template>

<script>
  import pagination from '@/components/Pagination'
  import MainLayout from '@/layouts/Main'
  import RecentView from './RecentView'
  import GreyMarks from './GreyMarks'
  import ActionBlocks from './ActionBlocks'
  import Categories from './Categories'
  import AddToCart from '@/components/AddToCart'
  import PreloadImageLoader from '@/components/LoadImage'
  import FilterModel from '@/components/catalog/Filter'

  export default {
    components: {
      pagination, 
      MainLayout, 
      RecentView, 
      AddToCart, 
      PreloadImageLoader, 
      GreyMarks, 
      ActionBlocks, 
      Categories,
      FilterModel
    },
    data() {
      return {
        showCart: false,
        lang: {
          textEmptyProducts: 'В данной категории нет товаров.'
        },
        totalProducts: 0,
        pageSize: 12,
        currentPage: 1,
        selectProduct: {},
        products: [],
        selectedSort: ''
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
      loadProducts: function(page){
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

        this.$API.get('getItemsCount'+query).then(r => {
          this.totalProducts = r.data.data

          this.$store.dispatch('showLoading');
          this.$API.get("getItems"+query).then(response => {
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
      addToCart: function(product){
        this.product = product;
        this.$store.dispatch("addToCart", {product: product, quantity: 1})
        this.showCart=true;
      },
      loadPage: function(){
        if (this.$route.query.page == undefined || !isNaN(this.$route.query.page)){
          this.$route.query.page == undefined ? this.currentPage = 1 : this.currentPage = Number(this.$route.query.page);
          this.$route.query.sort != undefined ? this.selectedSort = this.$route.query.sort : this.selectedSort = '';

          this.loadProducts(this.currentPage)
        }
      }
    },
    mounted() {
      this.loadPage()
    }
  }
</script>
