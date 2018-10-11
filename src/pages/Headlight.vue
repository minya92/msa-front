<template>
  <main-layout>
    <div class="top__banner__cc" :style="top_banner_style">
      <div class="swiper-slide">
        <div class="top-slider-text-content top-banner-text-content">
          <h2>{{ topBanner.title }}</h2>
          <span>{{ topBanner.text }}</span>
        </div>
        <div class="transbackground"></div>
        <!--<img :src='topBanner.img'>-->
        <video preload="auto" loop id="bgvid" poster="" autoplay muted onplaying="style.marginTop=(window.outerHeight*0.5-this.offsetHeight)/2 + 'px'">
          <!--<source src="https://d2edahx6g47lzn.cloudfront.net/v2/home/ICON_Web30_LandingPage_5.1_p_q26.webm" type="video/webm">-->
          <source :src="page.header_video" type="video/mp4">
        </video>
      </div>
      </div>
    <div class="content-fluid">
      <h1 style="text-align: center">{{page.title}}</h1>
      <hr>
      <div class="content-block-image">
        <div class="content-block">
          <img class="" :src="page.img1">
        </div>
        <div class="content-block" v-html="page.text1"></div>
      </div>
      <hr>
      <div v-html="page.text2" style="text-justify: inter-word"></div>
      <div class="content-block-image">
        <div class="content-block" v-html="page.text3"></div>
        <div class="content-block">
          <img class="" :src="page.img3">
        </div>
      </div>
      <hr>
      <div class="content-block-image">
        <div class="content-block">
          <img class="" :src="page.img4">
        </div>
        <div class="content-block" v-html="page.text4"></div>
      </div>
      <div v-html="page.text5" style="text-justify: inter-word"></div>
      <hr>
      <br>
      <router-link to="/catalog/types=150581197408400" class="product__image">
        В каталог
      </router-link>
    </div>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main.vue'

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
        top_banner_style: "height: " + window.outerHeight*0.5 + "px",
//        top_video_style: "margin-top: 0px",// + (window.outerHeight*0.5-document.querySelector('#bgvid').offsetHeight)/2 + "px",
        topBanner: {
          img: '',
          title: '',
          text: ''
        },
        infoText: '<h3>angel_eyes</h3>',
      }
    },
    created: function(){
//      this.top_banner_style = "height: " + window.outerHeight*0.5 + "px"
      this.$API.get('getPage/angel_eyes').then(r => {
        Object.entries(r.data.data).map((val) => {
          this[val[0]] = val[1]
        })
      this.page = this.angel_eyes
        //this.infoText = page.text
      })
    }
  }
</script>

<style>
  .top__banner__cc{
    background: #000;
  }
  .top-slider-text-content.top-banner-text-content{
    position: absolute;
    z-index: 2;
    /*top: 30%;*/
    text-align: center;
    color: #fff;
    max-width: 600px;
    margin: auto;
    left: 0;
    right: 0;
    padding: 20px;
    opacity: 1;
    overflow: hidden;
  }
  .top-slider-text-content.top-banner-text-content h2{
    font-size: 48px;
    text-transform: uppercase;
    text-align: center;
    padding-bottom: 20px;
  }
  .top-slider-text-content.top-banner-text-content>span{
    font-size: 20px;
  }
  .top-slider-text-content.top-banner-text-content>img{
    max-width: 100%;
    max-height: 100%;
    width: 100%;
  }
  .swiper-slide {
    overflow: hidden;
  }
  .swiper-slide video{
    width: 100%;
  }
  .content-block-image{
    display: inline-flex;
    max-height: 100%;
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: 1%;
    margin-bottom: 1%;
  }
  .content-block {
    max-width: 40%;
    height: auto;
    margin: auto;
  }
  .content-block-image div > img{
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }
</style>
