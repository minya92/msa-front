<template>
  <modal-fade @close="closeForm">
    <div class="modal__order-status__content">
      <div class="head-text">{{ headerText }}</div>
      <div class="span-grey">{{ textFromHeaderText }}</div>
      <div class="form-group">
        <input type="text" v-model="idOrder" @keyup.enter="getOrderInfoById" />
        <span v-if="showError" class="text-error">{{ textError }}</span>
      </div>
      <div class="form-group">
        <button class="btn_theme" @click="getOrderInfoById">Найти</button>
      </div>
    </div>
  </modal-fade>
</template>

<script>
import ModalFade from '@/layouts/Modal.vue';
import { apiFactory } from '@/api';
const apiOrder = apiFactory.get('order');

export default {
  components: { ModalFade },
  data() {
    return {
      headerText: 'Статус заказа',
      textFromHeaderText: 'Введите номер заказа',
      idOrder: '',
      textError: 'Заказ не найден',
      showError: false
    };
  },
  methods: {
    async getOrderInfoById() {
      if (this.idOrder.trim().length < 1) return;

      try {
        const result = await apiOrder.getOrder(this.idOrder);
        this.closeForm();
        this.$router.push({
          name: 'profile-order-id',
          params: { id: this.idOrder }
        });
      } catch {
        this.showError = true;
      }
    },
    closeForm() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.alt-auth {
  text-align: center;
}
.modal__order-status__content {
  width: 340px;
  max-width: 100%;
}
@media screen and (max-width: 375px) {
  .modal__order-status__content {
    width: 100%;
  }
}
</style>
