<template>
  <main-layout>
    <div class="top__slider__cc">
      <div class="container-fluid">
        <swiper class="main-slider" :options="swiperOption">
          <swiper-slide v-for='(topSlider, index) in topSliders' :key="index">
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
      </div>
    </div>
    
    <div class="container-fluid">
      <div class="category-menu">
        <div class="category-menu-item">
          <h2>Категория</h2>
          <ul>
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
          </ul>
        </div>
      </div>
    </div>

    <div style="background: #771d22 url('img/bg_red_texture.jpg'); background-size:100% 100%">
      <div class="container-fluid">
        <div class="home-box-with-slider">
          <h2>Найти запчасти по производителю</h2>

          <swiper class="main-bot-slider" :options="swiperOptionModels">
            <swiper-slide v-for='(imgModelWhite, index) in imgModelsWhite' :key="index">
              <img :src='imgModelWhite'>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
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