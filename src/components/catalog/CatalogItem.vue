<template>
  <div class="product-wrapper">
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
        <button class="btn_product btn_theme"  @click.prevent="$emit('addToCart', product)">В корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
import PreloadImageLoader from '@/components/LoadImage'
export default {
  components: {
    PreloadImageLoader
  },
  props: {
    product: {
      type: Object
    }
  }
}
</script>

<style scoped>
.product-wrapper{
	display: flex;
	width: 33.33%;
	margin-bottom: 25px;
}
.product{
	position: relative;
	border: 1px solid #e7e7e7;
	margin-right: 15px;
	width: 100%;
	font-size: 14px;
	/*padding: 15px;*/
	text-decoration: none;
	color: inherit;
	overflow: hidden;
  box-shadow: rgba(0,0,0,0.08) 5px 5px 5px;
}
.product-data{
  padding: 15px;
}
.product__image{
	display: flex;
	width: 100%;
	/*height: 180px;*/
	justify-content: center;
	align-items: center;
  overflow: hidden;
}
.product__image img{
  width: 100%;
	/*max-width: 100%;
	max-height: 100%;*/

}
.product .product-name{
	font-weight: 600;
}
.product-article{
	font-size: 12px;
	color: #b9c3c7;
}
.product-description{
	max-height: 62px;
	overflow: hidden;
	margin: 5px 0;
}
.product-price{
	color: #801f25;
	font-weight: 600;
	font-size: 18px;
}
.btns_product{
	display: none;
	font-size: 14px;
	position: absolute;
	top: 5px;
	right: 5px;
	left: 5px;
}
.btn_product{
	padding: 7px 15px;
	width: 48%;

}
.product:hover .btns_product{
	display: flex;
	justify-content: space-between;
}
</style>
