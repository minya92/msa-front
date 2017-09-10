<template>
	<router-link to="cart" class="mini-cart">
    <div class="minicart__img">
      <img src="../../assets/img/cart_empty.svg">
      <span class="minicart__count">{{count}}</span>
    </div>
    <div v-if="count">
      {{totalPrice}} 
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
    methods: {
      formatPrice: function(val){
        return val.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")
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
      },
      totalPrice: function(){
        let total = 0
        let currency = ''
        
        this.$store.getters.cartProducts.forEach(function(element) {
            total+= element.quantity * element.price
            if (element.currency) { 
              currency = element.currency 
            }
        }, this);

        return `${this.formatPrice(total)} ${currency}`
      }
    },
    created: function(){

    }
  }
</script>