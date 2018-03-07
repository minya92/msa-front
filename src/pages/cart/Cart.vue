<template>
  <main-layout>
    <div 
      v-if="$store.getters.cartProducts.length && products.length > 0" 
      class="content-fluid"
    >
      <table 
        class="table__cart" 
        cellpadding="5" 
        cellspacing="0" 
        border="0"
      >
        <tbody>
          <tr class="table-header">
            <th class="table__cart__picture">Изображение</th>
            <th>Описание</th>
            <th class="table__cart__quantity">Количество</th>
            <th class="table__cart__price">Цена</th>
            <th></th>
          </tr>
          <tr v-for="(product, index) in products" :key="index">
            <td class="table__cart__picture">
              <router-link :to="'product/'+product.cost_id"><img :src="product.image"></router-link></td>
            <td class="table__cart__description">
              <router-link class="table__cart__title-item" :to="'product/'+product.cost_id">
                {{ product.name }}
              </router-link>
              <div class="table__cart__description-item">{{ product.description }}</div>
            </td>
            <td class="table__cart__quantity">
              <button class="quantity_minus" @click="quantityMinus(product)">-</button>
              <input :value="product.quantity">
              <button class="quantity_plus" @click="quantityPlus(product)">+</button>
            </td>
            <td class="table__cart__price">{{ product.price }}</td>
            <td class="table__cart__remove">
              <div class="table__cart__remove_btn" @click="removeItem(product)">x</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="result__cart__table">
        <div>{{ selectDeliveryMethods }}</div>
        <div>{{ selectPaymentMethods }}</div>
        <div>Сумма: {{ total }}</div>
      </div>
      <div class="cart-methods-section">
        <div class="simplecheckout-left-column">
            <div class="checkout-heading">Покупатель</div>
            <div class="row__customer_group" v-for="field in Object.keys(userFields)" :key="userFields[field].name">
              <label :class="userFields[field].require ? 'require' : ''">{{ userFields[field].name }}</label>
              <masked-input v-if="field == 'phone'" v-model="userFields[field].value" mask="\+\7 (111) 111-11-11" :class="userFields[field].error ? 'error-val' : ''"/>
              <input v-else v-model="userFields[field].value"  @blur="validateInput(field)" :class="userFields[field].error ? 'error-val' : ''"/>
            </div>
        </div>
        <div class="simplecheckout-right-column">
          <payment-methods 
            :payments="payments" 
            v-model="selectPayment" 
            :total="total"
          />
          <shipping-methods 
            :delivery="delivery" 
            v-model="selectDelivery" 
            :total="total"
          />
        </div>
      </div>
      <div class="cart-comment">
        <div class="cart-comment__title">Комментарий к заказу</div>
        <textarea v-model="orderDetails"/>
      </div>
      <div class="cart__footer">
        <button class="btn_theme_white btn_cart" @click="goCatalog">Продолжить покупки</button>
        <button class="btn_theme btn_cart" @click="sendOrder">Оформить заказ</button>
        <div>
          Нажимая кнопку "Оформить заказ", Вы соглашаетесь c условиями 
          <router-link :to="{name: 'PrivacyPolicy'}">политики конфиденциальности</router-link>
        </div>
      </div>
    </div>
    <div class="content-fluid" v-else>Корзина пустая</div>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main'
  import PaymentMethods from './PaymentMethods'
  import ShippingMethods from './ShippingMethods'
  import MaskedInput from 'vue-masked-input'

  export default {
    components: {
      MainLayout, MaskedInput, PaymentMethods, ShippingMethods
    },
    data() {
      return {
        products: [],
        selectDelivery: 1,
        selectPayment: 1,
        delivery: [],
        payments: [],
        userFields: [],
        orderDetails: ''
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
        var payments = this.payments.find(p => p.id == this.selectPayment);

        if (!payments){
          return '';
        }

        return payments.payName
      },
      selectDeliveryMethods(){
        let delivery = this.delivery.find(p => p.id == this.selectDelivery);

        if (!delivery){
          return '';
        }
        const deliverCost = delivery.deliverCost ? delivery.deliverCost : 0
        return delivery.deliveryName + ': ' + deliverCost
      }
    },
    methods: {
      validateInput: function(field){
        if (field == 'email'){
          this.validateEmail();
        }
      },
      validateEmail: function() {
        var reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/
        if (!this.userFields.email.value.match(reg)) {
          this.userFields.email.error = true;
          return;
        }
        this.userFields.email.error = false;
      },
      loadImage: function(image){
        if (!image){
          return 'img/default.jpg'
        }

        return this.$SERVER_URL + image;
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
      validateUser: function(){
        let error = false
        for(let field in this.userFields) {
          if (this.userFields[field].require){
            if (this.userFields[field].value.length > 3) {
              this.userFields[field].error = false
            } else {
              this.userFields[field].error = true; error = true; 
            }
          }
        }
        return !error
      },
      goCatalog: function(){
        this.$router.push({name: 'catalog'});
      },
      sendOrder: function(){
        if (!this.validateUser()) 
          return  
          
        let newJson = []
        this.$store.getters.cartProducts.forEach(x => newJson.push({itemsCount: x.quantity, cost_id: x.id}))

        let post = `fio=${this.userFields['user'].value}&phone=${this.userFields['phone'].value}`+
                    `&email=${this.userFields['email'].value}`+
                    `&deliveryType=${this.selectDelivery}`+
                    `&deliveryAddress=${this.userFields['address'].value}`+
                    `&orderItems=${JSON.stringify(newJson)}`+
                    `&payType=${this.selectPayment}`+
                    `&orderDetails=${this.orderDetails}`;
                    
        this.$store.dispatch('showLoading');
        this.$API.post('placeOrder/', post).then(r => {
          let orderId = r.data.data

          this.$API.get(`getOrder/${orderId}`).then(r => {
            this.$store.dispatch('successCheckout', {orderId: orderId}) 
            this.$store.dispatch('hideLoading');
            this.$router.push({path: 'cart/success'})
          })
        }).catch(err => {
          this.$store.dispatch('hideLoading');
        });
      }, 
      deliveryMehods: function(){
        this.$API.get('getDelivery').then(r => {
          this.delivery = r.data.data
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
      
      this.$store.dispatch('showLoading');
      this.deliveryMehods()
      this.paymentMehods()

      //поля для заполнения данных юзера
      this.$set(this.userFields, 'user', {name: 'ФИО', value: '', require: true, error: false})
      this.$set(this.userFields, 'phone', {name: 'Телефон', value: '', require: true, error: false})
      this.$set(this.userFields, 'email', {name: 'Email', value: '', require: true, error: false})
      this.$set(this.userFields, 'address', {name: 'Адрес', value: '', require: true, error: false})

			this.$API.get("clients/current").then(r => {
				if (r.data.data != null){
					this.$store.dispatch('login', r.data.data);
          this.userFields.user.value = this.$store.getters.getName;
          this.userFields.email.value = this.$store.getters.getEmail;
          this.userFields.phone.value = this.$store.getters.getPhone;
          this.userFields.address.value = this.$store.getters.getCity;
				}
			})

      //запрос на получение данных корзины
      let post = []
      this.$store.getters.cartProducts.forEach(x=>post.push(x.id))
      const bodyPost = `?items_list=[${post.join(',')}]`
      
      this.products = [];
      this.$API.get('getItems' + bodyPost).then(r => {
        this.$store.dispatch('hideLoading');
        
        let ids = [];

        r.data.data.forEach(item => {
          ids.push(item.cost_id);
          let tempQuantity = this.$store.getters.cartProducts.filter((x) => { if (item.cost_id == x.id) {return x.quantity} });

          if (tempQuantity.length > 0) {
            this.products.push({
              cost_id: item.cost_id, 
              name: item.item_name, 
              article: item.artikul, 
              description: item.item_description, 
              price: item.item_cost, 
              currency: item.currency, 
              image: this.loadImage(item.thumbnail),
              quantity: this.$store.getters.cartProducts.filter((x) => {if (item.cost_id == x.id) {return x.quantity} })[0].quantity
            });
          }
        });
        
        this.$store.dispatch('verificationCart', ids);
      }).catch(err => {
        this.$store.dispatch('hideLoading');
      });
    }
  }
</script>

<style>
  .table__cart{
    width: 100%;
  }
  .table-header{
    background: #ededed;
  }
  .table__cart td, .table__cart th{
    padding: 10px 5px;
    border-bottom: 1px solid #ededed;
  }
  .table__cart img{
    max-width: 100%;
    max-height: 100px;
  }
  .table__cart__picture{
    text-align: center;
    width: 200px;
  }
  .table__cart__title-item{
    font-weight: 600;
    text-decoration: none;
    color: inherit;
  }
  .table__cart__quantity{
    text-align: center;
  }
  .table__cart__price{
    text-align: center;
    width: 100px;
  }
  .table__cart__quantity{
    width: 130px;
  }
  .table__cart__quantity input{
    height: 22px;
    width: 50px;
    text-align: center;
  }
  .quantity_minus, .quantity_plus{
    background: #801f25;
    width: 22px;
    height: 22px;
    color: #fff;
    cursor: pointer; 
    text-align: center;
    border: 0;
  }
  .cart-methods-section{
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .delivery-section, .payment-section, .data-info-section{
    margin-bottom: 10px;
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
  .btn_cart{    
    margin: 5px 0 20px;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 3px;
    font-weight: 600;
  }
  .simplecheckout-left-column{
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 10px;
  }
  .simplecheckout-right-column{
    width: 50%;
    padding: 10px;
  }
  .checkout-heading{
    background: #ededed;
    padding: 10px;
    font-weight: 600;
    width: 100%;
  }
  .row__customer_group{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px 0 0;
    width: 100%;
  }
  .row__customer_group label{
    margin-right: 10px;
    min-width: 100px;
  }
  .row__customer_group input{
    border-radius: 3px;
    width: 100%;
    padding: 7px 5px;
    outline: none;
    border: 1px solid #ccc;
  }
  input.error-val{
    border: 1px solid red;
  }
  .cart__footer{
    text-align: right;
    font-size: 11px;
  }
  .table__cart__remove{
    color: red;
    font-weight: 600;
  }
  .table__cart__remove_btn{
    cursor: pointer;
  }
  .cart-comment__title{
    font-weight: 600;
    padding: 5px 0 10px;
  }
  .cart-comment textarea{
    width: 100%;
    max-width: 100%;
    min-height: 60px;
    max-height: 100px;
  }
  
  @media (max-width: 768px){
    .simplecheckout-left-column, .simplecheckout-right-column{
      width: 100%;
    }
    .cart-methods-section{
      flex-direction: column;
    }
    .simplecheckout-left-column{
      align-items: flex-start;
    }
    .table__cart__picture{
      width: 130px;
    }
    .table__cart__price{
      width: auto;
    }
  }
  @media (max-width: 480px) {
    .table__cart__description-item{
      font-size: 10px;
    }
    .table__cart__picture {
      width: 100px;
    }
    .table__cart__quantity input[data-v-414b8b7a] {
      height: 22px;
      width: 34px;
    }
    .table__cart tr{
      display: block;
      width: 100%;
      border-bottom: 1px solid;
    }
    .table__cart th{
      display: none;
    }
    .table__cart td{
      display: inline-block;
      border-bottom: 0;
      padding: 3px 5px;
    }
    .table__cart__picture{
      width: 30%;
    }
    .table__cart__description{
      width: 68%;
    }
  }
  @media screen and (max-width: 375px) {
    .cart-methods-section{
      flex-direction: column;
    }
    .simplecheckout-left-column, .simplecheckout-right-column{
      width: 100%;
    }
  }
</style>