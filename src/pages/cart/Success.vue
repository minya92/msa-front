<template>
  <main-layout v-if="orderId">
      <div class="content-fluid">
        <p>Ваш заказ №{{orderId}}</p>
        <p>
          <button class="btn_theme primary" @click="goCatalog">Продолжить покупки</button>
        </p>
      </div>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main'

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
        orderId: null,
        lang:{
          emptyCart: 'Корзина пустая'
        },
      }
    },
    methods: {
      getOrderId: function(){
        this.orderId = this.$store.state.cart.orderId
      },
      goCatalog: function(){
        this.$router.push({name: 'catalog'});
      }
    },
    created: function(){
      this.getOrderId()
    }
  }
</script>