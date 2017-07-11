<template>
  <main-layout>
    <div class="container-fluid breadcrumbs">
      <template>
        <span>Главная страница <span class="padding-delmiter">/</span> {{this.$breadcrumbs[0].meta.breadcrumb}}</span>
      </template>
    </div>
    <div class="content-fluid filter-section">
      Производитель
      <div>
        <input type="checkbox" id="checkbox-stock" v-model="checkedStock">
        <label for="checkbox">В наличии</label>
      </div>
      <vsc ref="vsc" class="vsc" v-bind="dataSlide" v-model="dataSlide.value"></vsc>
    </div>
    <div class="content-fluid catalog-section">
      <aside>
        <a class="btn-action redBtn">Акции</a>
        <div>Каталог</div>
        <ul class="aside__nav_vertical">
          <li v-for="catalog in catalogs">
              <icon name="caret-down"></icon>
            <router-link :to="catalog.url">{{catalog.name}}</router-link>
            <ul>
              <li v-for="childCatalog in catalog.child">
                <router-link :to="catalog.url">{{childCatalog.name}}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>

      <div class="content-section">
        <div class="sort-section">

        </div>
        <div class="products-section">
          <div class="product-wrapper" v-for="product in products">
            <router-link :to="/product/ + product.id" class="product">
              <div class="image" :style='{ backgroundImage: "url(" + product.image + ")", }'>
              </div>
              <div class="">
                <div class="product-article">{{product.article}}</div>
                <div class="product-description">{{product.description}}</div>
                <div class="product-price">{{product.price}} {{product.currency}}</div>
              </div>
            </router-link>
          </div>
        </div>
        <pagination :current="currentPage" :total="totalProducts" :perPage="perPage" @page-changed="loadProducts"></pagination>
      </div>
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

  export default {
    components: {
      pagination, MainLayout, Vsc, RecentView
    },
    data() {
      return {
        dataSlide:{
          value: [ 0, 0 ],
          width: "100%",
          height: 2,
          dotSize: 10,
          min: 0,
          max: 0,
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
        checkedStock: false,
        totalProducts: 0,
        perPage: 3,
        currentPage: 1,
        products: [
        { article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: 3500, currency: 'р', id: '56', image: 'img/catalog/axe.png' },
        { article: 'acw43q4ca4', description: 'shop_items', price: 36600, currency: 'р', id: '57', image: 'img/catalog/axe.png' },
        { article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catatalog_image20589', price: 14500, currency: 'р', id: '58', image: 'img/catalog/axe.png' },
        { article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: 55500, currency: 'р', id: '59', image: 'img/catalog/axe.png' },
        { article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: 34500, currency: 'р', id: '60', image: 'img/catalog/axe.png' }
        ],
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
        catalogs: [
          {name: 'Большая длинная категория', url:'/1', child:[
              {name: 'Длинная категория', url: '/2'},
              {name: 'Длинная категория', url: '/2'},
              {name: 'Длинная категория', url: '/2'},
              {name: 'Длинная категория', url: '/2'},
            ]
          },
          {name: 'Длинная категория', url:'/1', child:[
              {name: 'Длинная категория', url: '/2'},
              {name: 'Длинная категория', url: '/2'},
              {name: 'Длинная категория', url: '/2'},
              {name: 'Длинная категория', url: '/2'},
              {name: 'Длинная категория', url: '/2'},
            ]
          },
        ]
  }
},
methods: {
  loadProducts: function(page){
    this.$apiHTTP.get('getItems?filter=%7B"pagination":%7B"page":'+page+',"pageSize":'+this.perPage+'%7D%7D').then(response => {
      console.log(response.data);
    }).catch(e => {
      console.log(e);
    });
    this.currentPage = page;

    var min = 0;
    var max = 0;
    for(var i=0; i < this.products.length; i++){
      if (min > this.products[i].price || min == 0) min = this.products[i].price;
      if (max < this.products[i].price) max = this.products[i].price;
    }
    this.dataSlide.min = min;
    this.dataSlide.max = max;
    this.dataSlide.value = [min, max];

  }
},
created: function(){
  this.$apiHTTP.get('getItemsCount').then(response => {
    this.totalProducts = response.data.data;
    this.loadProducts(this.currentPage);
  }).catch(e => {
    console.log(e);
  });
}
}
</script>