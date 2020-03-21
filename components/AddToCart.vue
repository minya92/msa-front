<template>
  <modal-fade>
    <a class="modal_box_close" @click="$emit('close')"></a>
    <div class="head-text">Товар добавлен в корзину</div>
    <img :src="loadImage()" class="modalcart__image" />
    <div class="modalcart__name">{{ product.name }}</div>
    <div class="modalcart__article">{{ product.article }}</div>
    <div class="modalcart__nameprice">
      {{ product.price }} {{ product.currency }}
    </div>
    <div class="modalcart__buttons">
      <a class="modalcart__button btn_theme_white" @click="$emit('close')"
        >В каталог</a
      >
      <router-link to="/cart" class="modalcart__button btn_theme"
        >В корзину</router-link
      >
    </div>
  </modal-fade>
</template>

<script>
import ModalFade from '@/layouts/Modal.vue';

export default {
  components: { ModalFade },
  props: ['product'],
  data() {
    return {};
  },
  methods: {
    loadImage: function() {
      if (typeof this.product.image != 'undefined') {
        return this.product.image;
      } else {
        return this.$store.state.baseUrl + this.product.images[0].full_image;
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.modalcart__buttons {
  display: flex;
  justify-content: space-around;
}
.modalcart__button {
  margin: 0 5px;
  width: 160px;
  height: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
}
.modalcart__image {
  display: block;
  margin: 10px auto;
  max-height: 150px;
  max-width: 100%;
}
.modalcart__name {
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
}
.modalcart__article {
  text-align: center;
  font-size: 12px;
  color: #b9b9b9;
  margin-bottom: 10px;
}
.modalcart__nameprice {
  text-align: center;
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 10px;
  color: #801f25;
}
</style>
