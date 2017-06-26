<template>
  <main-layout>
    <div class="breadcrumbs">
      <template>
        <span>Главная страница <span class="padding-delmiter">/</span> {{this.$breadcrumbs[0].meta.breadcrumb}} <span class="padding-delmiter">/</span> {{$route.params.id}}</span>
      </template>
    </div>
    <div class="content-fluid" style="display: flex">
      <div class="product-media-container">
        <div class="main-image"><img :src="product.image"></div>
        <div class="thumblist">
          <a v-for="image in product.images"><img :src="image"></a>
        </div>
      </div>
      <div class="product-details-container">
        <h1>{{product.name}}</h1>
        <div>
          <div class="price">{{product.price}} {{product.currency}}</div>
          <button @click="addToCart(product)"><img src="../assets/img/cart_empty.svg">Вкорзину</button>
          <div>{{product.stock}}</div>
        </div>
        <div>{{product.article}}</div>
        <template v-if='product.characteristics'>
          <div>
            <div>Характеристики</div>
            <div v-for="characteristic in product.characteristics">{{characteristic.key}}: {{characteristic.value}}</div>
          </div>
        </template>
      </div>
    </div>
    <template v-if='product.description'>
      <div class="content-fluid product-description">
        <h3>Описание</h3>
        <div>{{product.description}}</div>
      </div>
    </template>
    <template v-if='product.compatibility'>
      <div class="content-fluid product-compatibility">
        <h3>Совместимость</h3>
        <ul>
          <li v-for="compatibility in product.compatibility">{{compatibility}}</li>
        </ul>
      </div>
    </template>
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
          price: '72000',
          currency: 'руб.',
          image: 'img/catalog/axe.png',
          images: ['img/catalog/shop_items_catalog_image9131.png','img/catalog/shop_items_catalog_image9224.png','img/catalog/shop_items_catalog_image9131.png','img/catalog/shop_items_catalog_image9224.png','img/catalog/shop_items_catalog_image9131.png','img/catalog/shop_items_catalog_image9224.png','img/catalog/shop_items_catalog_image9131.png','img/catalog/shop_items_catalog_image9224.png','img/catalog/shop_items_catalog_image9131.png','img/catalog/shop_items_catalog_image9224.png',],
          article: 'AFW4534TFQV34',
          description: 'Удобно и просто, сумка подходит для всех типов бензобаков и во время коротких поездок заботится о ваших личных вещах, таких как бумажник и документы на Мотоцикл. Система крепления Quick Lock EVO поможет в течение нескольких секунд безопасно установить сумку и также легко ее снять.Сумка изготовлена ​​из прочного нейлона 1680D, а также доступна в качестве электрической версии с интегрированным блоком питания. Компактный дизайн.',
          characteristics: [
          {key: 'Цвет', value: 'черный'},
          {key: 'Материал', value: 'пластик'},
          {key: 'Размеры', value: '100х50х20'},
          {key: 'Вес', value: '3кг'}
          ],
          stock: 'на заказ',
          compatibility: ['BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)']
        }
      }
    },
    methods: {
      addToCart: function(item){
        item.quantity += 1;
      }
    }
  }
</script>

<style scoped>
  .product-media-container{
    width: 660px;
    margin-right: 40px;
  }
  .main-image, .thumblist a{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .thumblist a.active, .thumblist a:hover, .main-image:hover{
    border-color: #801f25;
    cursor: pointer;
  }
  .main-image img, .thumblist a img{
    max-width: 100%;
    max-height: 100%;
  }
  .main-image{
    width: 100%;
    height: 370px;
    border: 1px solid #e7e7e7;
  }
  .thumblist{
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .thumblist a{
    border: 1px solid #e7e7e7;
    margin-right: 10px;
    width: 100px;
    height: 100px;
    display: flex;
    margin-bottom: 10px;
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
  .product-details-container  button{
    background: #801f25;
    width: 160px;
    height: 40px;
    border: 0;
    outline: 0;
    color: #fff;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .product-details-container  button:hover{
    background: #901820;
  }
  .product-details-container  button img{
    padding-right: 10px
  }
  .product-description, .product-compatibility{
    display: flex;
    flex-direction: column;
  }
  .product-description h3, .product-compatibility h3{
    padding-bottom: 10px;
    text-transform: uppercase;
  }
  .product-compatibility ul{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
  .product-compatibility ul li{
    width: 33.33%;
    padding: 5px 10px 5px 0;
  }
</style>