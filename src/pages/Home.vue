<template>
  <main-layout>
    <div class="top__slider__cc">
        <swiper class="main-slider" :options="swiperOption">
          <swiper-slide v-for='(topSlider, index) in topSliders' :key="index">
            <div class="top-slider-text-content">
              <h2>{{ topSlider.headerText }}</h2>
              <span>{{ topSlider.footerText }}</span>
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

    <div class="container-fluid">
      <div class="category-menu">
        <div class="category-menu-item" v-for="catalog in catalogs" :key="catalog.id">
          <router-link :to="`/catalog/types=${catalog.id}`">
            <img :src="catalog.img">
            <h2>{{ catalog.name }}</h2>
          </router-link>
        </div>
      </div>
    </div>

    <div style="background: #771d22 url('img/bg_red_texture.jpg'); background-size:100% 100%">
      <div class="container-fluid">
        <div class="home-box-with-slider">
          <h2>Поиск по бренду</h2>

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
  import MainLayout from '@/layouts/Main.vue'
  import 'swiper/dist/css/swiper.css'
  const { swiper, swiperSlide } = require('vue-awesome-swiper').VueAwesomeSwiper
  import { getMarksForBaner } from '@/api/modules/types'

  export default {
    components: {
      MainLayout, swiper, swiperSlide
    },
    data() {
      return {
        catalogs: [],
        imgModels: [],
        imgModelsWhite: [],
        topSliders: [
        {
          headerText: 'Мотопластик',
          footerText: 'Широкий выбор мотопластика от протестированных нами лично китайских производителей. Доступные цены и быстрая доставка до Вашего города.',
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
          autoplay: {
            delay: 5000,
          },
          grabCursor : true,
          slidesPerView: 3,
          slidesPerColumn: 2,
          spaceBetween: 30,
          slidesPerGroup: 1,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          //loop: true,
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
              name: item.type_description,
              img: item.full_image
            });
          }
          this.catalogs = catalogs;
        })
      },
      getMarksBannerTop: function(){
        getMarksForBaner(1).then(r => {
          this.imgModels = r;
        });
      },
      getMarksBannerBottom: function(){
        getMarksForBaner(2).then(r => {
          this.imgModelsWhite = r;
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
