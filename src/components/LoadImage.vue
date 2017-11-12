<template>
  <div v-if="zoom" class='img-zoom-container'><img :src="imageSrc" ref="imgZoom"/></div>
  <img v-else :src="imageSrc" ref="imgZoom"/>
</template>

<script>
import ImageZoom from '@/components/image-zoom.js'
export default {
  name: 'preload-image-loader',
  props: {
    src: {
      type: String,
      default: false
    },
    zoom: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      imageSrc: 'img/dualring.svg',
      imgElement: null
    }
  },
  watch: {
    src: function(){
      this.imgElement.style.width = '48px';
      this.imgElement.style.height = '48px';
      this.imageSrc = 'img/dualring.svg';
      this.created();
    }
  },
  methods:{
    created: function(){
      this.loadImage().then(r => {
        this.imageSrc = r.src;
        if (this.zoom) this.addZoomImage(r);
      }).catch(err => {
        this.imageSrc = err;
      });
    },
    loadImage: function(){
      return new Promise((resolve, reject) =>{
        let img = new Image();

        img.onload = () => { resolve(img) }        
        img.onerror = () => { reject('img/default.jpg'); }
        
        (this.src != null || this.src != '') ? img.src = this.src : reject('img/default.jpg');;
      });
    },
    addZoomImage: function(r){
      var container = document.getElementsByClassName('img-zoom-container')[0];
      let x = 0, y = 0;
      var containerParent = container.parentNode;
      if (r.width > containerParent.offsetWidth || r.height >containerParent.offsetHeight){
        if (containerParent.offsetWidth/r.width > containerParent.offsetHeight/r.height){
          x = r.width * containerParent.offsetHeight/r.height;
          y = containerParent.offsetHeight;
        } else {
          
          x = containerParent.offsetWidth;
          y = r.height * containerParent.offsetWidth/r.width;
        }
      }

      let options={
        img:this.imageSrc,
        width: x,
        height: y,
        zoomWidth: x,
        offset: {vertical: 0, horizontal: 10}}

      ImageZoom(container, options);
    }
  },
  mounted(){
      this.created();
      console.log(this.$refs.imgZoom)
      this.imgElement = this.$refs.imgZoom;;//document.getElementsByClassName('img-zoom-container')[0].firstChild; 
  }
}
</script>

<style>
  #container div{
    left: 0 !important;
  }
  .img-zoom-container{
    max-height: 100%;
    max-width: 100%;
  }
</style>
