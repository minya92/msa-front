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
      <!--<div class="btns_product">
        <button class="btn_product btn_theme_white"  @click.prevent='$router.push({path: `/product/${product.id}`})'>Подробнее</button>
        <button class="btn_product btn_theme"  @click.prevent="$emit('addToCart', product)">В корзину</button>
      </div>-->
			<div class="btns_product">
        <button class="btn_product btn_theme btn_max" @click="oneClickShow = true">Купить в 1 клик</button>
      </div>
      <one-click :product="product" v-if="oneClickShow" @close="oneClickShow = false"></one-click>
    </div>
  </div>
</template>

<script>
import PreloadImageLoader from '@/components/LoadImage'
import OneClick from '@/components/oneClick/OneClick'

export default {
  components: {
		PreloadImageLoader,
		OneClick
  },
  props: {
    product: {
      type: Object
    }
	},
	data() {
		return {
      oneClickShow: false
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
	margin-bottom: 10px;

}
.product:hover .btns_product{
	display: flex;
	justify-content: space-between;
}

@media (max-width: 960px){
	.product{
		padding-bottom: 46px;
	}
	.product .btns_product{
		display: flex;
		justify-content: space-between;
		bottom: 8px;
		top: auto;
	}
	.product-description {
		max-height: 65px;
	}
}
@media (min-width: 481px) and (max-width: 768px){
	.product-wrapper{
		margin-bottom: 10px;
		width: 33.33%;
	}
	.products-section{
		margin-right: -15px;
	}
	.product{
		margin-right: 15px;
		padding: 5px;
		font-size: 12px;
		display: block;
		padding-bottom: 46px;
	}
}
@media (max-width: 480px){
	.product-wrapper{
		margin-bottom: 10px;
		width: 50%;
	}
	.products-section{
		margin-right: -10px;
	}
	.product{
		margin-right: 10px;
		padding: 5px;
		font-size: 12px;
		display: block;
		padding-bottom: 75px;
	}
	.product .btns_product{
		display: flex;
		flex-wrap: wrap;
		margin-top: 5px;
		justify-content: space-between;
		bottom: 5px;
		top: auto;
	}
	.product .btn_product{
		width: 100%;
	}
	.product-description {
		max-height: 65px;
	}
}
</style>
