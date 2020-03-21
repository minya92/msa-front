<template>
  <router-link to="/cart" class="mini-cart">
    <div class="minicart__img">
      <svg
        width="17px"
        height="17px"
        viewBox="0 0 17 17"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="cart_empty" transform="translate(0.000000, 1.000000)">
            <polyline
              id="Stroke-1"
              stroke="#FFFFFF"
              stroke-width="2"
              points="0 0 3.60932925 0 5.93085954 11.3925112 14.9302224 11.3925112"
            ></polyline>
            <polyline
              id="Stroke-3"
              stroke="#FFFFFF"
              stroke-width="2"
              points="5.3936589 7.96885952 14.2895904 7.96885952 15.4425126 3 4 3"
            ></polyline>
            <path
              d="M6.46847457,15.9247613 C5.65730888,15.9247613 5,15.2700504 5,14.4623806 C5,13.6547108 5.65730888,13 6.46847457,13 C7.27934942,13 7.9366583,13.6547108 7.9366583,14.4623806 C7.9366583,15.2700504 7.27934942,15.9247613 6.46847457,15.9247613 Z"
              id="Stroke-5"
              fill="#FFFFFF"
            ></path>
            <path
              d="M12.4684746,15.9247613 C11.6573089,15.9247613 11,15.2700504 11,14.4623806 C11,13.6547108 11.6573089,13 12.4684746,13 C13.2793494,13 13.9366583,13.6547108 13.9366583,14.4623806 C13.9366583,15.2700504 13.2793494,15.9247613 12.4684746,15.9247613 Z"
              id="Stroke-5-Copy"
              fill="#FFFFFF"
            ></path>
          </g>
        </g>
      </svg>
      <span class="minicart__count">{{ count }}</span>
    </div>
    <div v-if="count">
      {{ totalPrice }}
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
      lang: {
        emptyCart: 'Корзина пустая'
      }
    };
  },
  methods: {
    formatPrice: function(val) {
      return val.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1');
    }
  },
  computed: {
    count: function() {
      let count = 0;

      this.$store.getters['cart/cartProducts'].forEach(function(element) {
        count += element.quantity;
      }, this);

      return count;
    },
    totalPrice: function() {
      let total = 0;
      let currency = '';

      this.$store.getters['cart/cartProducts'].forEach(function(element) {
        total += element.quantity * element.price;
        if (element.currency) {
          currency = element.currency;
        }
      }, this);

      return `${this.formatPrice(total)} ${currency}`;
    }
  }
};
</script>

<style scoped>
.mini-cart {
  display: flex;
  justify-content: flex-end;
  text-decoration: none;
  color: #fff;
}
.minicart__img {
  position: relative;
  margin-right: 10px;
}
.minicart__count {
  position: absolute;
  background: #801f25;
  color: #fff;
  border-radius: 50%;
  top: -4px;
  right: -3px;
  font-size: 10px;
  min-width: 14px;
  min-height: 14px;
  z-index: 1;
  text-align: center;
}
.mini-cart svg {
  vertical-align: bottom;
  margin-right: 5px;
  width: 18px;
  height: 18px;
}
</style>
