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
            <router-link class="models-top-slider-item" v-for="(imgModel, index) in imgModels" 
              :key="index"
              :to="{name:'catalogSearch', params: {searchDetails: imgModel.marks_models_id}}" 
            >
              <img :src="imgModel.full_image" :alt="imgModel.mm_name" :title="imgModel.mm_name">
            </router-link>
          </div>
        </swiper>
      </div>
    </div>
    
    <div class="container-fluid">
      <div class="category-menu">
        <div class="category-menu-item" v-for="catalog in catalogs" :key="catalog.id">
          <h2>{{catalog.name}}</h2>
        </div>
      </div>
    </div>

    <div style="background: #771d22 url('img/bg_red_texture.jpg'); background-size:100% 100%">
      <div class="container-fluid">
        <div class="home-box-with-slider">
          <h2>Найти запчасти по производителю</h2>

          <swiper class="main-bot-slider" :options="swiperOptionModels">
            <swiper-slide v-for='(imgModelWhite, index) in imgModelsWhite' :key="index">
              <router-link :to="{name:'catalogSearch', params: {searchDetails: imgModelWhite.marks_models_id}}" >
                <img :src="imgModelWhite.full_image" :alt="imgModelWhite.mm_name" :title="imgModelWhite.mm_name">
              </router-link>
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
        catalogs: [],
        imgModels: [],
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
      getCatalogs: function(){
        this.$API.get('getTypes').then(r => {
          var catalogs = [];
          for (var i = 0; i < r.data.data.length; i++){
            var item = r.data.data[i];
            catalogs.push({
              id: item.items_types_id, 
              name: item.type_description
            });
          }
            this.catalogs = catalogs;
        })
      },
      getMarksBannerTop: function(){
        this.$API.get('getMarksForBaner/1').then(r => {
          this.imgModels = r.data.data;
        });
      },
      getMarksBannerBottom: function(){
        this.$API.get('getMarksForBaner/2').then(r => {
          this.imgModelsWhite = r.data.data;
        });
      }
    },
    created() {
      this.getMarksBannerTop();
      this.getMarksBannerBottom();
      this.getCatalogs();
    }
  }
</script>