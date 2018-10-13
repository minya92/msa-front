<template>
  <div class="recent-view" v-if="products.length > 0">
    <h3>Вы смотрели недавно</h3>
    <div class="prev-next">
      <div :class="['prev-result', PrevIsActive() ? '' : 'disabled']" @click="prevResult"><</div>
      <div :class="['next-result', NextIsActive() ? '' : 'disabled']" @click="nextResult">></div>
    </div>
    <div class="products-section">
      <div class="product-wrapper" v-for="(product, index) in products" v-if="showMore(index)" :key="index">
        <router-link :to="/product/ + product.id" class="product">
          <div class="product__image">
            <img :src="product.image">
          </div>
          <div class="product-data">
            <div class="product-name">{{product.name}}</div>
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
        ]
      }
    },
    created() {
      this.products = this.$store.getters.allProducts;
      
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
        };
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

.recent-view .products-section {
  display: flex;
}
.recent-view .product-wrapper{
  display: flex;
  width: 25%;
  margin-bottom: 25px;
}
.recent-view .product{
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
.recent-view .product-data{
  padding: 15px;
}
.recent-view .product__image{
	display: flex;
	width: 100%;
	/*height: 180px;*/
	justify-content: center;
	align-items: center;
  overflow: hidden;
}
.recent-view .product__image img{
  width: 100%;
	/*max-width: 100%;
	max-height: 100%;*/

}
.recent-view .product .product-name{
	font-weight: 600;
}
.recent-view .product-article{
	font-size: 12px;
	color: #b9c3c7;
}
.recent-view .product-description{
	max-height: 62px;
	overflow: hidden;
	margin: 5px 0;
}
.recent-view .product-price{
	color: #801f25;
	font-weight: 600;
	font-size: 18px;
}
.recent-view .btns_product{
	display: none;
	font-size: 14px;
	position: absolute;
	top: 5px;
	right: 5px;
	left: 5px;
}
.recent-view .btn_product{
	padding: 7px 15px;
	width: 48%;
	margin-bottom: 10px;

}
.recent-view .product:hover .btns_product{
	display: flex;
	justify-content: space-between;
}

@media (max-width: 960px){
	.recent-view .product{
		padding-bottom: 46px;
	}
	.recent-view .product .btns_product{
		display: flex;
		justify-content: space-between;
		bottom: 8px;
		top: auto;
	}
	.recent-view .product-description {
		max-height: 65px;
	}
}
@media (min-width: 481px) and (max-width: 768px){
	.recent-view .product-wrapper{
		margin-bottom: 10px;
		width: 33.33%;
	}
	.recent-view .products-section{
		margin-right: -15px;
	}
	.recent-view .product{
		margin-right: 15px;
		padding: 5px;
		font-size: 12px;
		display: block;
		padding-bottom: 46px;
	}
}
@media (max-width: 480px){
	.recent-view .product-wrapper{
		margin-bottom: 10px;
		width: 50%;
	}
	.recent-view .products-section{
		margin-right: -10px;
	}
	.recent-view .product{
		margin-right: 10px;
		padding: 5px;
		font-size: 12px;
		display: block;
		padding-bottom: 75px;
	}
	.recent-view .product .btns_product{
		display: flex;
		flex-wrap: wrap;
		margin-top: 5px;
		justify-content: space-between;
		bottom: 5px;
		top: auto;
	}
	.recent-view .product .btn_product{
		width: 100%;
	}
	.recent-view .product-description {
		max-height: 65px;
	}
}
@media screen and (max-width: 375px) {
  .recent-view .product-wrapper {
    margin-bottom: 10px;
    width: 50%;
  }
}
</style>
