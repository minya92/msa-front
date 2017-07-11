<template>
  <main-layout>
    <div class="container-fluid">
      <swiper class="main-slider" :options="swiperOption">
        <swiper-slide v-for='topSlider in topSliders'>
          <div class="top-slider-text-content">
            <h2>{{topSlider.headerText}}</h2>
            <span>{{topSlider.footerText}}</span>
          </div>
          <div class="transbackground"></div>
          <img :src='topSlider.img'>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev" style="display:none"></div>
        <div class="swiper-button-next" slot="button-next" style="display:none"></div>
        <div class="models-top-slider">
          <div class="models-top-slider-item" v-for="imgModel in imgModels">
            <img :src="imgModel">
          </div>
        </div>
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

    <div class="home-box-with-slider" style="background: #771d22 url('img/bg_red_texture.jpg');">
      <h2>Найти запчасти по производителю</h2>

      <swiper class="main-bot-slider" :options="swiperOptionModels">
        <swiper-slide v-for='imgModelWhite in imgModelsWhite'>
          <img :src='imgModelWhite'>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
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
        imgModels: ['img/honda_color.png', 
        'img/bmw_color.png', 
        'img/yamaha_color.png',
        'img/suzuki_color.png', 
        'img/ducati_color.png',
        'img/ktm_color.png'
        ],
        imgModelsWhite: ['img/slider/ducati_white.png',
        'img/slider/kawasaki_white.png',
        'img/slider/honda_white.png', 
        'img/slider/bmw_white.png',
        'img/slider/suzuki_white.png',  
        'img/slider/yamaha_white.png',
        'img/slider/ktm_white.png'
        ],
        topSliders: [
        {
          headerText: 'Мотоэкипировка',
          footerText: 'В наличии и под заказ любые комплектующие для вашего мотоцикла. Для постоянных покупателей действуют скидки и промо-коды',
          img: 'img/slider/slider_pic.jpg'
        }
        ],
        swiperOption: {
          //autoplay: 3000,
          grabCursor : false,
          autoHeight: true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          effect: 'fade',
          loop: true,
        },
        swiperOptionModels: {
          autoplay: 3000,
          grabCursor : true,
          slidesPerView: 3,
          slidesPerColumn: 2,
          spaceBetween: 30,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          loop: true
        }
      }
    },
    methods: {
    },
    mounted() {
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
  height: 510px;
  width: 100%;
}
.home-box-with-slider h2{
  padding-left: 190px;
  padding-top: 70px;
  font-size: 18px;
  text-transform: uppercase;
  color: #fff;
}
.models-top-slider{
  position: absolute;
  top: 360px;
  display: flex;
  list-style: none;
  align-items: center;
  width: 100%;
  justify-content: center;
  z-index: 2;
}
.models-top-slider .models-top-slider-item{
  width: 200px;    
  height: 120px;    
  background: rgba(255, 255, 255,0.5);    
  box-shadow: #111 2px 2px 5px 2px;  
  margin-right: 2px;
  align-items: center;
  display: flex;
  justify-content: center;
  /*border-radius: 10px;*/
}
.models-top-slider .models-top-slider-item:last-child{
  margin-right: 0px;
}
.top-slider-text-content{
  position: absolute;
  z-index: 2;
  top: 135px;
  text-align: center;
  color: #fff;
  max-width: 600px;
  margin: auto;
  left: 0;
  right: 0;
  padding: 20px;
}
.top-slider-text-content h2{
  font-size: 48px;
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 20px;
}
.top-slider-text-content>span{
  font-size: 20px;
}
.main-bot-slider{
  width: 1200px;
  margin-top: 50px;
}
.main-bot-slider .swiper-slide{
  text-align: center;
  padding: 0 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
}
</style>
