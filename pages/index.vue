<template>
  <div>
    <div class="top__slider__cc">
      <div
        class="main-slider"
        v-swiper:mySwiper="swiperOption"
        ref="mainSwiper"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(topSlider, index) in topSliders"
            :key="index"
          >
            <div class="top-slider-text-content">
              <h2>{{ topSlider.headerText }}</h2>
              <span>{{ topSlider.footerText }}</span>
            </div>
            <div class="transbackground"></div>
            <img :src="$store.state.baseUrl + topSlider.img" />
          </div>
          <div class="models-top-slider">
            <a
              class="models-top-slider-item"
              v-for="(imgModel, index) in imgModels"
              :key="index"
              @click="bannerToCatalog({ mark: imgModel.marks_models_id })"
            >
              <img
                :src="$store.state.baseUrl + imgModel.full_image"
                :alt="imgModel.mm_name"
                :title="imgModel.mm_name"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="category-menu">
        <router-link
          class="category-menu-item"
          v-for="catalog in catalogs"
          :key="catalog.id"
          :to="`/catalog/types=${catalog.id}`"
        >
          <!--div class="category-menu-item"-->
          <img class="category-menu-item" :src="catalog.img" />
          <h2 class="category-menu-item">{{ catalog.name }}</h2>
          <!--/div-->
        </router-link>
      </div>
    </div>

    <!--div style="background: #771d22 url('img/bg_red_texture.jpg'); background-size:100% 100%">
      <div class="container-fluid">
        <div class="home-box-with-slider">
          <h2>Поиск по бренду</h2>

          <swiper class="main-bot-slider" :options="swiperOptionModels">
            <swiper-slide v-for='(imgModelWhite, index) in imgModelsWhite' :key="index">
              <router-link :to="{name:'catalog', query: {mark: imgModelWhite.marks_models_id}}" >
                <img :src="imgModelWhite.full_image" :alt="imgModelWhite.mm_name" :title="imgModelWhite.mm_name">
              </router-link>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
      </div>
    </div-->
  </div>
</template>

<script>
import { apiFactory } from '@/api';
const apiCatalog = apiFactory.get('catalog');

export default {
  data() {
    return {
      // imgModels: [],
      // imgModelsWhite: [],
      topSliders: [
        {
          name: '1',
          headerText: 'Мотопластик',
          footerText:
            'Лучший мотопластик в Китае, лучшая цена в России! Найдёте дешевле - сделаем скидку!',
          img: 'img/slider/slider_pic.jpg',
          url: '/catalog/types=149996868299000'
        },
        {
          name: '2',
          headerText: 'Новое поколение фар',
          footerText: 'Единственный диллер в России',
          img: 'img/slider/moto.jpg',
          url: '/catalog/types=150581197408400'
        }
      ],
      swiperOption: {
        autoplay: {
          delay: 5000
        },
        grabCursor: false,
        autoHeight: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        effect: 'fade',
        loop: true
      },
      swiperOptionModels: {
        autoplay: {
          delay: 5000
        },
        grabCursor: true,
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 30,
        slidesPerGroup: 1,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        loop: true
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mainSwiper.swiper;
    }
  },
  methods: {
    bannerToCatalog(query) {
      this.$router.push({
        path: this.topSliders[this.swiper.activeIndex - 1].url,
        query
      });
    },
    isInteger(value) {
      return (value ^ 0) == value;
    }
  },
  mounted() {
    if (
      this.isInteger(this.$route.query.banner) &&
      this.$route.query.banner > 1 &&
      this.topSliders.length >= this.$route.query.banner
    ) {
      this.swiper.slideTo(this.$route.query.banner, 0, true);
    }
  },

  async asyncData({ store }) {
    let catalogs = [];
    let imgModels = [];
    let imgModelsWhite = [];
    try {
      [catalogs, imgModels, imgModelsWhite] = await Promise.all([
        apiCatalog.getTypes(),
        apiCatalog.getMarksForBaner(1),
        apiCatalog.getMarksForBaner(2)
      ]);

      catalogs = catalogs.map(item => ({
        id: item.items_types_id,
        name: item.type_description,
        img: `${store.state.baseUrl}${item.full_image}`
      }));
    } catch {}

    return { catalogs, imgModels, imgModelsWhite };
  }
};
</script>
