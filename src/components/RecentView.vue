<template>
  <div class="recent-view">
    <h3>Вы смотрели недавно</h3>
    <div class="prev-next">
      <div :class="['prev-result', PrevIsActive() ? '' : 'disabled']" @click="prevResult"><</div>
      <div :class="['next-result', NextIsActive() ? '' : 'disabled']" @click="nextResult">></div>
    </div>
    <div class="products-section">
      <div class="product-wrapper" v-for="(product, index) in products" v-if="showMore(index)" >
        <router-link :to="/product/ + product.id" class="product">
          <div class="product__image">
            <img :src="product.image">
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
</template>

<script>
  export default {
    data() {
      return {
        paramNextPrev: {
          totalProducts: 0,
          perItems: 4,
          currentItems: 0,
          indexResultItems: 1
        },
        products: [
        { article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: 3, currency: 'р', id: '56', image: 'img/catalog/axe.png' },
        { article: 'acw43q4ca4', description: 'shop_items', price: 36, currency: 'р', id: '57', image: 'img/catalog/axe.png' },
        { article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catatalog_image20589', price: 145, currency: 'р', id: '58', image: 'img/catalog/axe.png' },
        { article: 'acw43q4ca4', description: 'shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589 shop_items_catalog_image20589', price: 5550, currency: 'р', id: '59', image: 'img/catalog/axe.png' },
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
        ]
      }
    },
    created() {
      this.paramNextPrev.totalProducts = this.products.length;
      this.NextIsActive();
    },
    methods: {
      NextIsActive: function(){
        return (this.paramNextPrev.perItems*this.paramNextPrev.indexResultItems < this.paramNextPrev.totalProducts);
      },
      PrevIsActive: function(){
        return (this.paramNextPrev.indexResultItems > 1);
      },
      nextResult: function(){
        if (this.NextIsActive()){
          this.paramNextPrev.currentItems = this.paramNextPrev.perItems*this.paramNextPrev.indexResultItems;
          this.paramNextPrev.indexResultItems++;
        }; console.log(this.paramNextPrev.currentItems);
      },
      prevResult: function(){
        if (this.PrevIsActive()){
          this.paramNextPrev.currentItems -= this.paramNextPrev.perItems;
          this.paramNextPrev.indexResultItems--;
        }
      },
      showMore: function(index){
        return index >= this.paramNextPrev.currentItems && index < this.paramNextPrev.perItems*this.paramNextPrev.indexResultItems;
      }
    }
  }
</script>

<style scoped>
  .recent-view{
    position: relative;
    overflow: hidden;
  }
  .recent-view .product-wrapper {
    display: flex;
    width: 25%;
    margin-bottom: 40px;
  }
  .recent-view h3{
    padding-bottom: 15px;
    text-transform: uppercase;
  }
  .prev-next{
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
  }
  .prev-result, .next-result{
    background: #801f25;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .prev-result:not(.disabled):hover, .next-result:not(.disabled):hover{
    box-shadow: 0 0px 6px rgba(103, 70, 70, 0.7);
    cursor: pointer;
  }
  .prev-result.disabled, .next-result.disabled{
    background: #fff;
    color: #000;
    border: 1px solid #000;
  }
  .prev-result{
    margin-right: 5px;
  }
  .next-result{

  }
  @media screen and (max-width: 375px) {
    .product-wrapper, .recent-view .product-wrapper {
      margin-bottom: 10px;
      width: 50%;
    }
  }
</style>
