<template>
  <modal-fade>
    <a class="modal_box_close" @click="$emit('close')"></a>
    <div class="head-text">Товар добавлен в корзину</div>
    <div>
      <button class="btn_product btn_theme_white"  @click="$emit('close')">В каталог</button>
      <button class="btn_product btn_theme"  @click="$emit('close')">В корзину</button>
    </div>
  </modal-fade>
</template>

<script>
  import ModalFade from '../layouts/Modal.vue'

  export default {
    components: {ModalFade},
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>