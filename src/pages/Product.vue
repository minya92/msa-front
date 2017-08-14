<template>
  <main-layout>
    <div class="content-fluid product__detail">
      <div class="product__detail__media">
      <div class="main-image"><img v-if="product.images" :src="loadImage(product.images[0].full)"></div>
        <div class="thumblist">
          <a v-for="image in product.images"><img :src="loadImage(image.small)"></a>
        </div>
      </div>
      <div class="product__detail__description">
        <h1>{{product.name}}</h1>
        <div class="product-price-block">
          <div class="price">{{product.price}} {{product.currency}}</div>
          <div class="stock">{{product.stock}}</div>
        </div>
        <div class="article">{{product.article}}</div>
        <button @click="addToCart(product)"><img src="../assets/img/cart_empty.svg">Вкорзину</button>
        <template v-if='product.chars'>
          <div class="characteristic-block">
            <h3>Характеристики</h3>
            <div v-for="char in product.chars">{{char.char_name}}: <strong>{{char.char_value}}</strong></div>
          </div>
        </template>
        <div>
          <div>Доставка осуществляется в течении 10-14 дней, при наличии на складе производителя></div>
          <div>Мы принимаем электронные платежи</div>
        </div>
      </div>
    </div>
    <template v-if='product.description'>
      <div class="content-fluid product__detail_description">
        <h3>Описание</h3>
        <div>{{product.description}}</div>
      </div>
    </template>
    <template v-if='product.compatibility'>
      <div class="content-fluid product-compatibility">
        <h3>Совместимость</h3>
        <ul>
          <li v-for="compatibility in product.compatibility">
          <router-link :to="/product/ + compatibility.mark_model_id">{{compatibility.mark_model_name}}</router-link></li>
        </ul>
      </div>
    </template>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main.vue'

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
        product: {}
        /*product: {
          name: 'Сумка на бак QUICK-LOCK Tankbag ION TWO',
          price: '72000',
          currency: 'руб.',
          image: 'img/catalog/axe.png',
          images: ['img/catalog/shop_items_catalog_image9131.png','img/catalog/shop_items_catalog_image9224.png','img/catalog/shop_items_catalog_image9131.png','img/catalog/shop_items_catalog_image9224.png','img/catalog/shop_items_catalog_image9131.png','img/catalog/shop_items_catalog_image9224.png','img/catalog/shop_items_catalog_image9131.png','img/catalog/shop_items_catalog_image9224.png','img/catalog/shop_items_catalog_image9131.png','img/catalog/shop_items_catalog_image9224.png',],
          article: 'AFW4534TFQV34',
          description: 'Удобно и просто, сумка подходит для всех типов бензобаков и во время коротких поездок заботится о ваших личных вещах, таких как бумажник и документы на Мотоцикл. Система крепления Quick Lock EVO поможет в течение нескольких секунд безопасно установить сумку и также легко ее снять.Сумка изготовлена ​​из прочного нейлона 1680D, а также доступна в качестве электрической версии с интегрированным блоком питания. Компактный дизайн.',
          chars: [
          {key: 'Цвет', value: 'черный'},
          {key: 'Материал', value: 'пластик'},
          {key: 'Размеры', value: '100х50х20'},
          {key: 'Вес', value: '3кг'}
          ],
          stock: 'под заказ',
          compatibility: ['BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)', 'BMW srfw 234 vsdf (2012 - 2116)']
        }*/
      }
    },
    methods: {
      addToCart: function(item){
        item.quantity += 1;
      },
      loadImage: function(image){
        if (!image){
          return 'img/default.jpg';
        }

        return this.$SERVER_URL + image;
      }
    },
    created: function(){
      this.$API.get('getItem/'+this.$route.params.id).then(response => {
        var item = response.data.data;
        this.product = {
          id: item.id, 
          name: item.name, 
          article: item.artikul, 
          description: item.description, 
          price: item.cost, 
          currency: item.currency, 
          images: item.images,
          compatibility: item.supported,
          chars: item.chars
        };
      }).catch(e => {
        console.log(e);
      });
    }
  }
</script>

<style scoped>
  .product__detail{
    display: flex;
  }
  .product__detail__media{
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
  .product__detail__description{
    width: 460px;
  }
  .product__detail__description h1{
    font-size: 36px;
    font-weight: bold;
  }
  .product__detail__description .price{
    font-size: 36px;
    font-weight: bold;
    color: #801f25;
  }
  .product__detail__description  button{
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
    margin: 20px 0;
  }
  .product__detail__description  button:hover{
    background: #901820;
  }
  .product__detail__description  button img{
    padding-right: 10px
  }
  .product-price-block .stock{
    font-size: 20px;
    color: #b7c1c6;
    padding-left: 20px;
  }
  .product-price-block{
    display: flex;
    align-items: baseline;
    margin-top: 20px;
  }
  .product__detail__description .article{
    color: #b7c1c6;
    margin-top: 20px;
  }
  .characteristic-block h3{
    font-size: 18px;
    margin: 10px 0;
  }
  .characteristic-block>div{
    margin: 5px 0;
  }
  .product__detail_description, .product-compatibility{
    display: flex;
    flex-direction: column;
  }
  .product__detail_description h3, .product-compatibility h3{
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