<template>
  <modal-fade @close="$emit('close')">
    <div class="modal__order-status__content">
      <div class="head-text">{{headerText}}</div>
      <div class="span-grey">{{textFromHeaderText}}</div>
      <div class="form-group">
        <input type="text" v-model="idOrder">
        <span v-if="showError" class="text-error">{{textError}}</span>
      </div>
      <div class="form-group">
        <button class="btn_theme" @click="getOrderInfoById">Найти</button>
      </div>
    </div>
  </modal-fade>
</template>

<script>
  import ModalFade from '@/layouts/Modal.vue'
  export default {
    components: {ModalFade},
    data() {
      return {
        headerText: 'Статус заказа',
        textFromHeaderText: 'Введите номер заказа',
        idOrder: '',
        textError: "Заказ не найден",
        showError: true
      }
    },
    created() {
      
    },
    methods: {
      getOrderInfoById: function(){
        if (this.idOrder.trim().length < 1) return;
        
        this.$API.get('getOrder/'+this.idOrder).then(r => {
          this.router.push({name: 'HistoryBuy', params: {id: this.idOrder}});
        }).catch(err => {
          this.showError = true;
        })
      }
    }
  }
</script>

<style scoped>
  .alt-auth{
    text-align: center;
  }
  .modal__order-status__content{
    width: 340px;
  }
  @media screen and (max-width: 375px) {
    .modal__order-status__content{
      width: 100%;
    }
  }
</style>
