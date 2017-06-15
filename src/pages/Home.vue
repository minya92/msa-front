<template>
  <main-layout>
    <div class="container-fluid">
    <swiper class="main-slider" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide><img src="../assets/image/slider/slider_pic.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/image/slider/moto_wall1.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/image/slider/moto-wall2.jpg"></swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <div class="category-menu">
        <div class="category-menu-item">
          <h2>Категория</h2>
          <ul>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
          </ul>
        </div>
        <div class="category-menu-item">
          <h2>Категория</h2>
          <ul>
            <li>Наибольшущая подкатегория товара для всех</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
          </ul>
        </div>
        <div class="category-menu-item">
          <h2>Категория</h2>
          <ul>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
          </ul>
        </div>
        <div class="category-menu-item">
          <h2>Категория</h2>
          <ul>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
          </ul>
        </div>
        <div class="category-menu-item">
          <h2>Категория</h2>
          <ul>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
          </ul>
        </div>
        <div class="category-menu-item">
          <h2>Категория</h2>
          <ul>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
          </ul>
        </div>
        <div class="category-menu-item">
          <h2>Категория</h2>
          <ul>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
            <li>Подкатегория товара</li>
            <li>Подкатегория</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="home-box-with-slider">

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
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          notNextTick: true,
          //autoplay: 3000,
          grabCursor : true,
          autoHeight: true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          effect: 'fade',
          loop: true,
          // if you need use plugins in the swiper, you can config in here like this
          debugger: true,
          // swiper callbacks
          onTransitionStart(swiper){
            //console.log(swiper)
          },
          // more Swiper configs and callbacks...
          // ...
        }
      }
    },
    // you can find current swiper instance object like this, while the notNextTick property value must be true
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // you can use current swiper instance object to do something(swiper methods)
      //console.log('this is current swiper instance object', this.swiper)
      //this.swiper.slideTo(3, 1000, false)
    }
  }
</script>

<style scoped>
.main-slider{
  max-height: 540px;
}
  .swiper-slide img {
   width: auto;
   height: auto;
   max-width: 100%;
   max-height: 100%;
 }
 .category-menu{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1160px;
  margin: 45px auto;
}
.category-menu-item{
  flex: 1;
  padding-right: 15px;
}
.category-menu-item:last-child{
  padding-right: 0;
}
.category-menu-item h2{
  font-size: 20px;
}
.category-menu-item ul li{
  font-size: 14px;
  list-style: none;
  margin-top: 12px;
}
.home-box-with-slider{
  background: #771d22 url(../assets/image/bg_red_texture.jpg);
  height: 510px;
  width: 100%;
}
</style>
