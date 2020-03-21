<template>
  <div v-if="zoom" class="img-zoom-container" ref="container">
    <img :src="imageSrc" ref="imgZoom" />
  </div>
  <img v-else :src="imageSrc" ref="imgZoom" />

  <!--<iframe :src="src" width="100%" height="100%" frameborder="0"></iframe>
  <video :src="src" width="100%" height="100%" frameborder="0"></video>-->
  <!--<div v-if="zoom" class='img-zoom-container' ref="container"><img :src="imageSrc" ref="imgZoom"/></div>
  <img v-else :src="imageSrc" ref="imgZoom"/>-->
</template>

<script>
import ImageZoom from '@/components/image-zoom.js';
export default {
  name: 'preload-image-loader',
  props: {
    src: {
      type: String,
      default: ''
    },
    zoom: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      imageSrc: '../img/dualring.svg',
      imgElement: null,
      imageZoom: null
    };
  },
  watch: {
    src: function() {
      this.initialize();
      this.imgElement.style.width = '48px';
      this.imgElement.style.height = '48px';
      this.imageSrc = '../img/dualring.svg';
      this.created();
    }
  },
  methods: {
    created: function() {
      this.loadImage()
        .then(r => {
          this.imageSrc = r.src;
          if (this.zoom) this.addZoomImage(r);
        })
        .catch(err => {
          this.imageSrc = err;
        });
    },
    loadImage: function() {
      return new Promise((resolve, reject) => {
        let img = new Image();

        img.onload = () => {
          resolve(img);
        };
        img.onerror = () => {
          reject('../img/default.jpg');
        };

        this.src != null || this.src != ''
          ? (img.src = this.src)
          : reject('../img/default.jpg');
      });
    },
    addZoomImage: function(r) {
      var container = document.getElementsByClassName('img-zoom-container')[0];
      let x = 0,
        y = 0;
      var containerParent = container.parentNode;
      if (
        r.naturalWidth > containerParent.offsetWidth ||
        r.naturalHeight > containerParent.offsetHeight
      ) {
        if (
          containerParent.offsetWidth / r.naturalWidth >
          containerParent.offsetHeight / r.naturalHeight
        ) {
          x = (r.naturalWidth * containerParent.offsetHeight) / r.naturalHeight;
          y = containerParent.offsetHeight;
        } else {
          x = containerParent.offsetWidth;
          y = (r.naturalHeight * containerParent.offsetWidth) / r.naturalWidth;
        }
      }

      let options = {
        img: this.imageSrc,
        width: x,
        height: y,
        zoomWidth: x,
        offset: { vertical: 0, horizontal: 10 }
      };

      this.imageZoom = ImageZoom(container, options);
    },
    initialize: function() {
      if (this.zoom) {
        this.$refs.container.innerHTML = '';
        this.imgElement = document.createElement('img');
        this.imgElement.setAttribute('src', this.imageSrc);
        this.$refs.container.appendChild(this.imgElement);
      }
    }
  },
  mounted() {
    this.created();
    this.initialize();
  }
};
</script>

<style>
#container div {
  left: 0 !important;
}
.img-zoom-container {
  max-height: 100%;
  max-width: 100%;
}
</style>
