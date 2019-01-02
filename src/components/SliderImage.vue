<template>
  <div class="my-image-sliders" v-if="images.length > 0">
    <div class="my-image-sliders__close" @click.prevent="$emit('close')">
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
        <path style="fill:#801f25;" d="M 0 13.2 C 0 13.2 13.13 -0.01 13.13 -0.01 C 13.13 -0.01 14.64 1.52 14.64 1.52 C 14.64 1.52 1.51 14.73 1.51 14.73 C 1.51 14.73 0 13.2 0 13.2 Z"></path>
        <path style="fill:#801f25;" d="M 1.87 0.27 C 1.87 0.27 15 13.48 15 13.48 C 15 13.48 13.49 15 13.49 15 C 13.49 15 0.36 1.79 0.36 1.79 C 0.36 1.79 1.87 0.27 1.87 0.27 Z"></path>
      </svg>
    </div>
    <transition-group name="fade" class="image-slider">
        <img 
          v-for="(image, index) in images"
          v-if="current == index" 
          :src="image" 
          @click="plus"
        />
    </transition-group>
    <div class="my-image-sliders-prev" @click="minus">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="transform: rotate(-180deg);" viewBox="0 0 240.823 240.823" xml:space="preserve" width="40px" height="40px">
        <g>
          <path d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179   l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261   C187.881,124.315,187.881,116.495,183.189,111.816z" fill="#801f25"/>
	      </g>
      </svg>
    </div>
    <div class="my-image-sliders-next" @click="plus">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 240.823 240.823" xml:space="preserve" width="40px" height="40px">
        <g>
          <path d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179   l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261   C187.881,124.315,187.881,116.495,183.189,111.816z" fill="#801f25"/>
	      </g>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      currentImg: {
        type: Number,
        default: 0
      },
      images: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        current: 0
      }
    },
    methods: {
      minus: function() {
        if (this.current > 0) this.current--;
      }, 
      plus: function() {
        this.current < this.images.length-1 ? this.current++ : this.current = 0;
      },
    }, 
    created(){
      this.current = this.currentImg;
      if ( this.current > this.images.length-1 || this.current < 0 ) this.current = 0;
    }
  }
</script>

<style>
  .my-image-sliders{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.93);
    z-index: 100;
  }
  .my-image-sliders__close{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 4%;
    top: 5%;
    cursor: pointer;
    z-index: 1;
  }
  .image-slider{
    position:relative;    
    width: 100%;
    height: 100%;
    display: block;
  }
  .image-slider img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    max-width: 90%;
    max-height: 90%;
  }
  .my-image-sliders-prev{
    position: absolute;
    left: 4%;
    top: 50%;
    transform: translate(0,-50%);
    cursor: pointer;
  }
  .my-image-sliders-next{
    position: absolute;
    right: 4%;
    top: 50%;
    transform: translate(0,-50%);
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
