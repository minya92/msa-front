<template>
	<router-link to="cart" class="mini-cart">
    <img src="../../assets/img/cart_empty.svg">
    <div v-if="count">
      товаров: {{count}}
    </div>
    <div v-else>
      корзина пуста
    </div>
  </router-link>
</template>

<script>

  export default {
    data() {
      return {
        //items: [],
        lang:{
          emptyCart: 'Корзина пустая'
        },
      }
    },
    computed: {
      items: function(){
        this.orderId = this.$store.state.cart.orderId
      },
      count: function(){
        let count = 0;
        
        this.$store.getters.cartProducts.forEach(function(element) {
            count+= element.quantity
        }, this);

        return count
      }
    },
    created: function(){

    }
  }
</script>