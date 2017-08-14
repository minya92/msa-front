<template>
  <main-layout>
    <div v-if="$store.getters.cartProducts.length" class="content-fluid">
      <table class="table__cart">
        <tbody>
          <tr>
            <th class="table__cart__picture">{{lang.picture}}</th>
            <th>{{lang.description}}</th>
            <th class="table__cart__quantity">Количество</th>
            <th class="table__cart__price">Цена</th>
            <th></th>
          </tr>
          <tr v-for="(product, index) in products">
            <td class="table__cart__picture"><img :src="product.image"></td>
            <td>{{product.name}}</td>
            <td class="table__cart__quantity">
              <div class="quantity_minus" @click="quantityMinus(product)">-</div>
              <input :value="product.quantity">
              <div class="quantity_plus" @click="quantityPlus(product)">+</div>
            </td>
            <td class="table__cart__price">{{product.price}}</td>
            <td class="table__cart__remove">
              <div class="" @click="removeItem(product)">x</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="result__cart__table">
        <div>{{selectDeliveryMethods}}</div>
        <div>{{selectPaymentMethods}}</div>
        <div>Сумма: {{total}}</div>
      </div>
      <div class="cart-methods-section">
        <div class="delivery-section">
          <div class="delivery-section__title">Способ получения заказа</div>
          <div class="delivery-block" v-for="deliv in delivery" v-if="total >= deliv.minOrderSum">
            <input type="radio" :value="deliv.id" v-model="selectDelivery">
            <label class="delivery-block__title" :for="deliv.id">{{deliv.deliveryName}}</label>
            <div class="delivery-block__description">{{deliv.deliveryDefinition}}</div>
          </div>
        </div>
        <div class="payment-section">
          <div class="delivery-section__title">Способ оплаты</div>
          <div class="delivery-block" v-for="payment in payments" v-if="total >= payment.minOrderSum">
            <input type="radio" :value="payment.id" v-model="selectPayment">
            <label class="delivery-block__title" :for="payment.id">{{payment.payName}}</label>
            <div class="delivery-block__description">{{payment.payDefinition}}</div>
          </div>
        </div>
        <div class="data-info-section">
          <div class="delivery-section__title">Авторизация</div>
        </div>
      </div>
      <button class="btn_theme" @click="sendOrder()">Оформить заказ</button>
    </div>
    <div class="content-fluid" v-else>{{lang.emptyCart}}</div>
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
        products: [],
        selectDelivery: [],
        selectPayment: [],
        lang:{
          emptyCart: 'Корзина пустая',
          toCatalog: 'Перейти в каталог',
          picture: 'Изображение',
          description: 'Описание'
        },
        delivery: [],
        payments: [],
      }
    },
    computed: {
      total () {
        var delivery = this.delivery.find(p => p.id === this.selectDelivery)
        var deliveryCost = 0
        if (delivery){
          deliveryCost = delivery.deliverCost;
        }
        return this.products.reduce((total, p) => {
          return total + p.price * p.quantity + deliveryCost
        }, 0)
      },
      selectPaymentMethods(){
        var payments = this.payments.find(p => p.id === this.selectPayment)
        if (!payments){
          return ''
        }

        return payments.payName
      },
      selectDeliveryMethods(){
        var delivery = this.delivery.find(p => p.id === this.selectDelivery)
        if (!delivery){
          return ''
        }

        return delivery.deliveryName + ': ' + delivery.deliverCost
      }
    },
    methods: {
      loadImage: function(image){
        if (!image){
          return 'img/default.jpg'
        }

        return image;
      },
      quantityMinus: function(product){
        if (product.quantity > 1){
          product.quantity--;
          this.$store.dispatch('updateCart', product);
        }
      },
      quantityPlus: function(product){
        product.quantity++;
        this.$store.dispatch('updateCart', product);
      },
      removeItem: function(product){
        this.$store.dispatch('removeCart', product);
        this.products.splice(this.products.indexOf(product), 1)
      },
      sendOrder: function(){
        /*{
          phone: '89999999999', 
          email: 'email@gmail.com', 
          deliveryType: 1, 
          deliveryAddress: 'Деревня в которой людишки живут', 
          orderItems: [
            { 
              itemsCount: 3,
              costID: 149996890525100
            }
          ], 
          payType: 2, 
        }*/
        var post = 'phone=89999999999&email=email@gmail.com&deliveryType=1&deliveryAddress=Деревня в которой людишки живут&orderItems=[{"itemsCount":3,"costID":149996890525100}]&payType=2';
        this.$API.post('placeOrder/', post).then(response => {
          console.log(response);
        }).catch(e => {
          console.log(e);
        });
      }, 
      deliveryMehods: function(){
        this.$API.get('getDelivery').then(response => {
          this.delivery = response.data.data
        })
      }, 
      paymentMehods: function(){
        this.$API.get('getPayTypes').then(response => {
          this.payments = response.data.data
        })
      }
    },
    filters: {
      selectPaymentMethod: function(delivery){
          console.log(this); 
        if (delivery){
          return 'delivery'
        }
        var deliverys = this.delivery.find(p => p.id === this.selectDelivery)
        var deliveryCost = 0
        if (deliverys){
          deliveryCost = delivery.deliverCost;
        }
        return 'deliveryCost'
      }
    },
    created: function(){
      if (!this.$store.getters.cartProducts.length){
        return;
      }
      this.deliveryMehods()
      this.paymentMehods()
      /*this.$API.get('getOrder/150013152392500').then(response => {
        console.log(response.data.data.details);
      }).catch(e => {
        console.log(e);
      });*/
      var $forBlock = this;
      this.products = [];
      this.$store.getters.cartProducts.forEach(function(prod){
        $forBlock.$API.get('getItem/'+prod.id).then(response => {
          var item = response.data.data;
          $forBlock.products.push({
            id: item.id, 
            name: item.name, 
            article: item.artikul, 
            description: item.description, 
            price: item.cost, 
            currency: item.currency, 
            image: $forBlock.loadImage(item.images.full),
            quantity: prod.quantity
          });
        })
      });
    }
  }
</script>

<style scoped>
  .table__cart{
    width: 100%;
  }
  .table__cart img{
    max-width: 100%;
    max-height: 100px;
  }
  .table__cart__picture{
    text-align: center;
    width: 200px;
  }
  .table__cart__quantity{
    text-align: center;
  }
  .table__cart__price{
    text-align: center;
  }
  .table__cart__quantity input{
    height: 22px;
    width: 50px;
  }
  .quantity_minus, .quantity_plus{
    background: #801f25;
    width: 22px;
    height: 22px;
    display: inline-block;
    color: #fff;
    cursor: pointer; 
    text-align: center;
  }
  .cart-methods-section{
    display: flex;
    justify-content: space-between;
  }
  .delivery-section, .payment-section, .data-info-section{
    width: 32%;
    padding: 10px 10px;
    border-color: #e6e6e7 #d1d2d4 #b8babc #d1d2d4;
    border-width: 1px;
    border-style: solid;
    margin-bottom: 20px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    background-color: #ffffff;
    background: linear-gradient(to bottom, #ffffff 75%,#f5f5f5 100%);
  }
  .delivery-section__title{
    font-weight: bold;
    font-size: 16px;
  }
  .delivery-block{
    padding: 10px 0;
  }
  .delivery-block__title{
    font-weight: bold;
    font-size: 14px;
  }
  .delivery-block__description{
    font-size: 12px;
  }
  .result__cart__table{
    text-align: right;
  }
</style>