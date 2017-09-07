<template>
  <main-layout>
      <div v-if="orderId">
        Ваш заказ №{{orderId}}
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
      }
    },
    created: function(){
      this.getOrderId()
    }
  }
</script>