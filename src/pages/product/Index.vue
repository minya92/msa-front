<template>
  <main-layout>
    <template v-if="product">
      <image-sliders v-if="showImageSliders" :images="full_images" :currentImg="numCurrentImage" @close="showImageSliders = false"></image-sliders>

      <div class="content-fluid">
        <AddToCart v-if="showCart" @close="showCart = false" :product="product"></AddToCart>
        <div class="product__detail">
          <div class="product__detail__media">
          <div class="main-image">
            <preload-image-loader v-if="product.images && product.images.length > 0"
              :src="loadFullImage"
              :zoom="true"
              @click.native="showImageSliders = true"
            >
            </preload-image-loader>
            <p class="main-image__tooltip">Кликните для просмотра в полный экран</p> 
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
            <div class="article" v-if="product.article">артикул: {{product.article}}</div>
            <button @click="addToCart(product)"><img src="../../assets/img/cart_empty.svg">Вкорзину</button>
            <button @click="oneClickShow = true"><img src="../../assets/img/cart_empty.svg">Купить в 1 клик</button>
            <template v-if='product.chars'>
              <div class="characteristic-block">
                <h3>Характеристики</h3>
                <div v-for="char in product.chars">{{char.char_name}}: <strong>{{char.char_value}}</strong></div>
              </div>
            </template>
            <div>
              <div>Мы принимаем электронные платежи</div>
            </div>
          </div>
        </div>
      </div>
      <template v-if='product.description'>
        <div class="content-fluid product__detail_description">
          <h3>Описание</h3>
          <div v-html="formatProductDescription"></div>
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
      <one-click :product="product" v-if="oneClickShow" @close="oneClickShow = false"></one-click>
    </template>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main.vue'
  import AddToCart from '@/components/AddToCart'
  import PreloadImageLoader from '@/components/LoadImage'
  import ImageSliders from '@/components/SliderImage'
  import OneClick from '@/components/oneClick/OneClick'

  export default {
    components: {
      MainLayout, AddToCart, PreloadImageLoader, ImageSliders, OneClick
    },
    data() {
      return {
        product: null,
        numCurrentImage: 0,
        imgDefault: '../img/default.jpg',
        showCart: false,
        showImageSliders: false,
        full_images: [],
        oneClickShow: false
      }
    },
    computed:{
      formatProductDescription() {
        return this.product.description ? this.product.description.replace(/\n/g,'<br/>') : '';
      },
      loadFullImage: function(){
        if (this.product.images.length == 0){
          return ''
        }

        return this.$SERVER_URL + this.product.images[this.numCurrentImage].full_image
      },
    },
    methods: {
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
        
        this.full_images = item.images.map(x => this.$SERVER_URL + x.full_image);
        this.$store.dispatch("recentItem", this.product);
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
    outline-color: #801f25;
    cursor: pointer;
  }
  .main-image img, .thumblist a img{
    max-width: 100%;
    max-height: 100%;
  }
  .main-image{
    width: 100%;
    height: 370px;
    outline: 1px solid #e7e7e7;
    overflow: hidden;
    position: relative;
  }
  .main-image__tooltip {
    display: none;
    position: absolute;
    background: #fff;
    border-radius: 3px;
    padding: 3px 5px;
    bottom: 0;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  }
  .main-image:hover .main-image__tooltip {
    display: block;
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

  @media (max-width: 768px){
    .product__detail__description h1{
      font-size: 24px;
    }
    .product__detail__description .price{
      font-size: 22px;
    }
    .product-price-block, .product__detail__description .article{
      margin-top: 10px;
    }
    .product__detail__media {
      width: 330px;
      margin-right: 20px;
    }
    .thumblist a[data-v-4978f586] {
      border: 1px solid #e7e7e7;
      margin-right: 5px;
      width: 95px;
      height: 95px;
    }
    .main-image{
      height: 280px;
    }
  }

  @media (max-width: 480px){
    .product__detail{
      flex-wrap: wrap;
    }
    .product__detail__description{
      margin-bottom: 10px;
    }
    .product__detail__media{
      margin-right: 0;
      order: 2;
      width: 100%;
    }
    .thumblist a[data-v-4978f586][data-v-4978f586] {
        width: 68px;
        height: 68px;
    }
  }
  @media (max-width: 375px){
    .product__detail__description h1{
      font-size: 18px;
    }
    .product__detail__description .price{
      font-size: 16px;
    }
    .product-price-block, .product__detail__description .article{
      margin-top: 10px;
    }
    .main-image{
      height: 200px;
    }
    .thumblist a {
      width: 50px;
      height: 50px
    }
    .product__detail__description  button{
      margin: 10px 0;
    }
  }
</style>
