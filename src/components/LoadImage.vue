<template>
  <img :src="imageSrc"></img>
</template>

<script>
export default {
  name: 'preload-image-loader',
  props: [
    'src'
  ],
  data: function () {
    return {
      imageSrc: 'img/dualring.svg'
    }
  },
  created(){
    var img, that;
    img = new Image();
    that = this;

    img.onload = function(){
        that.imageSrc = that.src;
    }
    
    img.onerror = function(){
    that.imageSrc = 'img/default.jpg';
    }
    img.src = this.src;
  }
}
</script>