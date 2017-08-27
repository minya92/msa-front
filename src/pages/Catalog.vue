<template>
  <main-layout>
    <div class="content-fluid filter-section">
      <vsc ref="vsc" class="vsc" @callback="vscChange" v-bind="dataSlide" v-model="dataSlide.value" v-show="dataSlide.max && dataSlide.min"></vsc>
    </div>
    <div class="content-fluid catalog-section">
      <aside>
        <a class="btn-action btn_theme">Акции</a>
        <div class="aside__v-menu__title">Каталог</div>
        <ul class="aside__nav_vertical">
          <li v-for="catalog in catalogs">
            <!--<span v-if="catalog.child.length" class="arrow_down" @click="toggle"></span>-->
            <router-link :to="`/catalog/types=${catalog.url}`">{{catalog.name}}</router-link>
            <!--<ul>
              <li v-for="childCatalog in catalog.child">
                <router-link :to="catalog.url">{{childCatalog.name}}</router-link>
              </li>
            </ul>-->
          </li>
        </ul>
      </aside>

      <div class="content-section" v-if="products.length > 0">
        <div class="sort-section"></div>
        <div class="products-section">
          <AddToCart v-if="showCart" @close="showCart = false" :product="product"></AddToCart>
          <div class="product-wrapper" v-for="product in products">
            <div class="product">
              <router-link :to="/product/ + product.id" class="product__image" :style='{ backgroundImage: "url(" + product.image + ")", }'>
              </router-link>
              <div class="">
                <div class="product-name">{{product.name}}</div>
                <div class="product-article">{{product.article}}</div>
                <div class="product-description">{{product.description}}</div>
                <div class="product-price">{{product.price}} {{product.currency}}</div>
              </div>
              <div>
                <button class="btn_product btn_theme"  @click.prevent='addToCart(product)'>В корзину</button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <pagination :current="currentPage" :total="totalProducts" :pageSize="pageSize" @page-changed="loadProducts"></pagination>
    </div>
    <div class="content-section" v-else>{{lang.textEmptyProducts}}</div>
  </div>
  <div class="content-fluid">
    <RecentView></RecentView>
  </div>
  <div class="container-fluid model-grey">
    <div v-for="imgModelGrey in imgModelsGrey">
      <img :src="imgModelGrey">
    </div>
  </div>
  <div>
  </div>
  <div class="container-fluid bottom-action">
    <div v-for="blockAction in blockActions">
      <div class="block-action-img" :style='{ backgroundImage: "url(" + blockAction.image + ")", }'></div>
      <div class="transbackground"></div>
      <div class="block-action-text-content">
        <h2>{{blockAction.headerText}}</h2>
        <span>{{blockAction.footerText}}</span>
      </div>
    </div>
  </div>
</main-layout>
</template>

<script>
  import pagination from '@/components/Pagination'
  import MainLayout from '@/layouts/Main'
  import Vsc from 'vue-slider-component'
  import RecentView from '@/components/RecentView'
  import AddToCart from '@/components/AddToCart'
  import lodash from 'lodash'

  export default {
    components: {
      pagination, MainLayout, Vsc, RecentView, AddToCart
    },
    data() {
      return {
        showCart: false,
        dataSlide:{
          value: [ 0, 0 ],
          width: "100%",
          height: 2,
          dotSize: 10,
          min: 0,
          max: 0,
          interval: 1,
          tooltip: "always",
          formatter: "{value} руб.",
          bgStyle: { "backgroundColor": "#e7e7e7" },
          sliderStyle: { "backgroundColor": "#801f25" },
          tooltipStyle: { "backgroundColor": "#fff", 'color': '#000', 'border': '0'},
          processStyle: { "backgroundColor": "#801f25" }
        },
        imgModelsGrey: ['img/slider/ducati_grey.png',
        'img/slider/kawasaki_grey.png',
        'img/slider/honda_grey.png', 
        'img/slider/bmw_grey.png',
        'img/slider/suzuki_grey.png',  
        'img/slider/yamaha_grey.png',
        'img/slider/ktm_grey.png'
        ],
        lang: {
          textEmptyProducts: 'В данной категории нет товаров.'
        },
        totalProducts: 0,
        pageSize: 12,
        currentPage: 1,
        selectProduct: {},
        products: [],
        blockActions: [
        {
          headerText: 'Большой и длинный заголовок',
          footerText: 'В наличии и под заказ любые комплектующие для вашего мотоцикла. Для постоянных покупателей действуют скидки и промо-коды',
          image: 'img/article_1.png'
        },
        {
          headerText: 'Большой и длинный заголовок',
          footerText: 'В наличии и под заказ любые комплектующие для вашего мотоцикла. Для постоянных покупателей действуют скидки и промо-коды',
          image: 'img/article_2.png'
        }
        ],
        catalogs: []
      }
    },
    watch: {
      '$route' (to, from) {
        this.loadPage()
      }
    },
    methods: {
      loadProducts: function(page){
        this.currentPage = page;
        let query = `?cost_min=${this.dataSlide.value[0]}&cost_max=${this.dataSlide.value[1]}`
        if (typeof this.$route.params.types != 'undefined'){
          query += `&types=%5B${this.$route.params.types}%5D`;
        }
        if (typeof this.$route.params.searchDetails != 'undefined'){
          query += `&marks_models_id=${this.$route.params.searchDetails}`;
        }
        query += `&page=${this.currentPage}&pageSize=${this.pageSize}`;

        this.$API.get('getItemsCount'+query).then(r => {
          this.totalProducts = r.data.data

          this.$API.get("getItems"+query).then(response => {
            var products = [];
            for (var i = 0; i < response.data.data.length; i++){
              var item = response.data.data[i];
              products.push({
                id: item.items_catalog_id, 
                name: item.item_name, 
                article: item.artikul, 
                description: item.item_description, 
                price: item.item_cost, 
                currency: item.currency, 
                image: this.loadImage(item.thumbnail) 
              });
            }

            this.products = products;
            this.filterPrice();
          })
        })
      },
      getItemsMaxMinCost: function(){
        let query = ''

        if (typeof this.$route.params.types != 'undefined'){
          query += `?types=%5B${this.$route.params.types}%5D`
        }

        this.$API.get('getItemsMaxMinCost'+query).then(r => {
          this.dataSlide.value = [r.data.data.min_cost, r.data.data.max_cost]
          this.dataSlide.min = r.data.data.min_cost
          this.dataSlide.max = r.data.data.max_cost
        })
      },
      loadCatalogs: function(){
        this.$API.get('getTypes').then(r => {
          var catalogs = [];
          
          for (var i = 0; i < r.data.data.length; i++){
            var item = r.data.data[i];
            catalogs.push({
              id: item.items_types_id, 
              parentType: item.parent_type, 
              name: item.type_description, 
              url: item.items_types_id
            });
          }
            this.catalogs = catalogs;
        })
      },
      toggle: function(e){
        console.log(e.target.parentNode);
      },
      loadImage: function(image){
        if (!image){
          return 'img/default.jpg';
        }

        return this.$SERVER_URL + image;
      },
      filterPrice: function(){
        var min = this.dataSlide.min;
        var max = this.dataSlide.max;

        for(var i=0; i < this.products.length; i++){
          if (min > this.products[i].price || min == 0) min = this.products[i].price;
          if (max < this.products[i].price) max = this.products[i].price;
        }
        
        this.dataSlide.min = min;
        this.dataSlide.max = max;
      },
      addToCart: function(product){
        this.product = product;
        this.$store.dispatch("addToCart", {id: product.id, quantity: 1})
        this.showCart=true;
      },
      loadPage: function(){
        this.dataSlide.min = 0
        this.dataSlide.max = 0

        this.loadCatalogs()
        this.getItemsMaxMinCost()
        this.loadProducts(1)
      },
      vscChange: _.debounce(function (e) {
        this.loadProducts(1)
      }, 1000)
    },
    created: function(){
      this.loadPage()
    }
  }
</script>

<style>
  .vue-slider-tooltip-wrap{
    top: 0 !important;
  }
  .vue-slider-tooltip:before{
    display: none !important;
  }
</style>