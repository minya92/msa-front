<template>
  <main-layout>
    <div class="breadcrumbs">
      <template>
        <span>Главная страница <span class="padding-delmiter">/</span> {{this.$breadcrumbs[0].meta.breadcrumb}}</span>
      </template>
    </div>
    <div class="content-fluid filter-section">
      fsefsef
    </div>
    <div class="content-fluid catalog-section">
      <aside>
        <a class="btn-action redBtn">Акции</a>
        <div>Каталог</div>
        <ul class="nav-vertical">
          <li>
            <router-link to="/catalog">Категория</router-link>
            <ul>
              <li>Подкатегория товара</li>
              <li>Подкатегория</li>
              <li>Подкатегория товара</li>
              <li>Подкатегория</li>
              <li>Подкатегория товара</li>
              <li>Подкатегория</li>
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

  export default {
    components: {
      pagination, MainLayout 
    },
    data() {
      return {
        totalProducts: 0,
        perPage: 3,
        currentPage: 1,
        products: [
        {article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: '34500', currency: 'р', id: '56', image: 'img/catalog/axe.png'},
        {article: 'acw43q4ca4', description: 'shop_items', price: '34500', currency: 'р', id: '57', image: 'img/catalog/axe.png'},
        {article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catatalog_image20589', price: '34500', currency: 'р', id: '58', image: 'img/catalog/axe.png'},
        {article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: '34500', currency: 'р', id: '59', image: 'img/catalog/axe.png'},
        {article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: '34500', currency: 'р', id: '60', image: 'img/catalog/axe.png'}
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
        ]
      }
    },
    methods: {
      loadProducts: function(page){
        /*this.$apiHTTP.get('getItems?filter=%7B"pagination":%7B"page":2,"pageSize":3%7D%7D')
        .then(response => {
          if (response.data.code != 0){
            console.log('code != 0');
            return;
          }
          this.totalProducts = response.data.data;
          this.currentPage = page;
        }).catch(e => {
          console.log(e);
        });*/
        this.totalProducts = 25;
        this.currentPage = page;
      }
    },
    created: function(){
      this.loadProducts(this.currentPage);
    }
  }
</script>

<style scoped>
  .catalog-section{
    display: flex;
  }
  .filter-section{
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 15px;
    margin: 20px auto;
  }
  aside{
    width: 260px;
    margin-right: 40px;
  }
  .content-section{
    width: 860px;
  }
  .btn-action{
    height: 50px;
    width: 260px;
    display: block;
    line-height: 50px;
    text-transform: uppercase;
    font-size: 20px;
  }
  .products-section{    
    margin-right: -40px;
    display: flex;
    flex-wrap: wrap;
  }
  .product-wrapper{
    display: flex;
    width: 33.33%;
    margin-bottom: 40px;
  }
  .product{
    border: 1px solid #e7e7e7;
    margin-right: 40px;
    width: 100%;
    font-size: 14px;
    padding: 15px;
    text-decoration: none;
    color: inherit;
  }
  .product .image{
    width: 100%;
    height: 150px;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .product-article{
    font-size: 12px;
    color: #b9c3c7;
  }
  .product-description{
    height: 62px;
    overflow: hidden;
    margin: 5px 0;
  }
  .product-price{
    color: #801f25;
    font-weight: 600;
  }
  .block-action-img{
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 290px;
  }
  .bottom-action{
    display: flex;
  }
  .bottom-action>div{
    flex: 1;
    position: relative;
  }
  .block-action-text-content{
    position: absolute;
    z-index: 2;
    top: 90px;
    text-align: center;
    color: #fff;
    max-width: 600px;
    margin: auto;
    left: 0;
    right: 0;
    padding: 20px;
  }
  .block-action-text-content h2{
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;
    padding-bottom: 20px;
  }
  .block-action-text-content>span{
    font-size: 14px;
  }
</style>