<template>
  <main-layout>
    <modal-fade v-if="showModal" @close="showModal=false">
      
      <div class="main-image">
        <img v-if="product.images" :src="loadFullImage(numCurrentImage)" @click="openModal">
      </div>
        <div class="modal__thumblist thumblist">
          <a v-for="(image, index) in product.images" :key="image.id"><img :src="loadImage(image.thumbnail)" @click="selectImage($event,index)" ref="image.id"></a>
        </div>
      </div>
    </modal-fade>
    <div class="content-fluid product__detail">
      <AddToCart v-if="showCart" @close="showCart = false" :product="product"></AddToCart>
      <div class="product__detail__media">
      <div class="main-image">
        <img v-if="product.images" :src="loadFullImage(numCurrentImage)" @click="openModal">
      </div>
        <div class="thumblist">
          <a v-for="(image, index) in product.images" :key="image.id"><img :src="loadImage(image.thumbnail)" @click="numCurrentImage = index"></a>
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
          <div>Доставка осуществляется в течении 10-14 дней, при наличии на складе производителя</div>
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
          <li v-for="compatibility in product.compatibility">{{compatibility.mark_model_name}}</li>
        </ul>
      </div>
    </template>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main.vue'
  import AddToCart from '@/components/AddToCart'
  import ModalFade from '@/layouts/Modal.vue'

  export default {
    components: {
      MainLayout, AddToCart, ModalFade
    },
    data() {
      return {
        product: {},
        numCurrentImage: 0,
        imgDefault: 'img/default.jpg',
        showCart: false,
        showModal: false
      }
    },
    methods: {
      openModal: function(){
        this.showModal=true
      },
      close: function(){
        this.showModal=false
      },
      addToCart: function(product){
        this.product = product;
        this.$store.dispatch("addToCart", {product: product, quantity: 1})
        this.showCart=true;
      },
      loadImage: function(image){
        if (!image){
          return this.imgDefault
        }

        return this.$SERVER_URL + image
      },
      loadFullImage: function(){
        if (this.product.images.length == 0){
          return this.imgDefault
        }

        return this.loadImage(this.product.images[this.numCurrentImage].full_image)
      }, 
      selectImage: function(elem, index){
        let imageSrc = this.$SERVER_URL + this.product.images[index].full_image
        elem.target.offsetParent.getElementsByClassName("main-image")[0].firstChild.setAttribute("src",imageSrc)
      }
    },
    created: function(){
      this.$API.get('getItem/'+this.$route.params.id).then(r => {
        var item = r.data.data;
        this.product = {
          id: item.cost_id, 
          name: item.item_name, 
          article: item.artikul, 
          description: item.item_description, 
          price: item.item_cost, 
          currency: item.currency, 
          images: item.images,
          compatibility: item.supported,
          chars: item.chars
        };
      })
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
  .modal__thumblist.thumblist a{
    width: 48px;
    height: 48px;
  }
</style>