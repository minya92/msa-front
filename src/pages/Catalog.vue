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
    <div class="content-fluid">
      <aside>
        <a class="btn-action">Акции</a>
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
      </div>

    </div>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
        products: [
          {article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: '34500', currency: 'р', id: '56', image: 'img/catalog/axe.png'},
          {article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: '34500', currency: 'р', id: '57', image: 'img/catalog/axe.png'},
          {article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: '34500', currency: 'р', id: '58', image: 'img/catalog/axe.png'},
          {article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: '34500', currency: 'р', id: '59', image: 'img/catalog/axe.png'},
          {article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: '34500', currency: 'р', id: '60', image: 'img/catalog/axe.png'}
        ]
      }
    }
  }
</script>

<style scoped>
  .breadcrumbs{
    font-size: 10px;
    background: #801f25;
    height: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-bottom: 35px;
  }
  .padding-delmiter{
    padding: 0 5px;
  }
  .filter-section{
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 15px;
    margin: 0 auto 40px;
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
    background: #801f25;
    display: block;
    text-align: center;
    line-height: 50px;
    text-transform: uppercase;
    font-size: 20px;
    color: #fff;
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
    max-height: 50px;
    overflow: hidden;
    margin: 5px 0;
  }
  .product-price{
    color: #801f25;
    font-weight: 600;
  }
</style>