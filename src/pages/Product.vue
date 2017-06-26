<template>
  <main-layout>
    <div class="breadcrumbs">
      <template>
        <span>Главная страница <span class="padding-delmiter">/</span> {{this.$breadcrumbs[0].meta.breadcrumb}} <span class="padding-delmiter">/</span> {{$route.params.id}}</span>
      </template>
    </div>
    <div class="content-fluid">
      <div class="product-media-container">
      <div class="main-image"></div>
      </div>
      <div class="product-details-container">
        <h1>{{product.name}}</h1>
        <div class="price">{{product.price}}</div>
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
        product: {
          name: 'Сумка на бак QUICK-LOCK Tankbag ION TWO',
          price: '72000 р'
        }
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
  .product-media-container{
    width: 660px;
    margin-right: 40px;
  }
  .main-image{
    width: 100%;
    height: 370px;
    border: 1px solid #e7e7e7;
  }
  .product-details-container{
    width: 460px;
  }
  .product-details-container h1{
    font-size: 36px;
    font-weight: bold;
  }
  .product-details-container .price{
    font-size: 36px;
    font-weight: bold;
    color: #801f25;
  }
</style>