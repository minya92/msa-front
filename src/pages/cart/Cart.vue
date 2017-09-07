<template>
  <main-layout>
    <div v-if="$store.getters.cartProducts.length" class="content-fluid">
      <table class="table__cart" cellpadding="5" cellspacing="0" border="0">
        <tbody>
          <tr class="table-header">
            <th class="table__cart__picture">{{lang.picture}}</th>
            <th>{{lang.description}}</th>
            <th class="table__cart__quantity">Количество</th>
            <th class="table__cart__price">Цена</th>
            <th></th>
          </tr>
          <tr v-for="(product, index) in products">
            <td class="table__cart__picture"><img :src="product.image"></td>
            <td>
              <div class="table__cart__title-item">{{product.name}}</div>
              <div>{{product.description}}</div>
            </td>
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
        <div class="simplecheckout-left-column">
            <div class="checkout-heading">Покупатель</div>
            <div class="row__customer_group" v-for="field in Object.keys(userFields)">
              <label :class="userFields[field].require ? 'require' : ''">{{userFields[field].name}}</label>
              <input v-model="userFields[field].value"  :class="userFields[field].error ? 'error-val' : ''"/>
            </div>
        </div>
        <div class="simplecheckout-right-column">
          <div class="delivery-section">
            <div class="checkout-heading">Способ получения заказа</div>
            <div class="delivery-block" v-for="deliv in delivery" v-if="total >= deliv.minOrderSum">
              <input type="radio" :value="deliv.id" v-model="selectDelivery">
              <label class="delivery-block__title" :for="deliv.id">{{deliv.deliveryName}}</label>
              <div class="delivery-block__description">{{deliv.deliveryDefinition}}</div>
            </div>
          </div>
          <div class="payment-section">
            <div class="checkout-heading">Способ оплаты</div>
            <div class="delivery-block" v-for="payment in payments" v-if="total >= payment.minOrderSum">
              <input type="radio" :value="payment.id" v-model="selectPayment">
              <label class="delivery-block__title" :for="payment.id">{{payment.payName}}</label>
              <div class="delivery-block__description">{{payment.payDefinition}}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button class="btn_theme btn_cart" @click="sendOrder()">Оформить заказ</button>
      </div>
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
        selectDelivery: 0,
        selectPayment: 0,
        lang:{
          emptyCart: 'Корзина пустая',
          toCatalog: 'Перейти в каталог',
          picture: 'Изображение',
          description: 'Описание'
        },
        delivery: [],
        payments: [],

        userFields: []
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
        const deliverCost = delivery.deliverCost ? delivery.deliverCost : 0
        return delivery.deliveryName + ': ' + deliverCost
      }
    },
    methods: {
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
      sendOrder: function(){
        if (!this.validateUser()) 
          return  
          
        let newJson = []
        this.$store.getters.cartProducts.forEach(x => newJson.push({itemsCount: x.quantity, cost_id: x.id}))

        let post = `phone=${this.userFields['phone'].value}`+
                    `&email=${this.userFields['email'].value}`+
                    `&deliveryType=${this.selectDelivery}`+
                    `&deliveryAddress=${this.userFields['address'].value}`+
                    `&orderItems=${JSON.stringify(newJson)}`+
                    `&payType=${this.selectPayment}`;
                    
        this.$API.post('placeOrder/', post).then(r => {
          let orderId = r.data.data
          this.$API.get(`getOrder/${orderId}`).then(r => {
            this.$store.dispatch('successCheckout', {orderId: orderId}) 
            this.$router.push({path: 'cart/success'})
          })
        })
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
      this.deliveryMehods()
      this.paymentMehods()

      //поля для заполнения данных юзера
      this.$set(this.userFields, 'user', {name: 'ФИО', value: '', require: true, error: false})
      this.$set(this.userFields, 'phone', {name: 'Телефон', value: '', require: true, error: false})
      this.$set(this.userFields, 'email', {name: 'Email', value: '', require: true, error: false})
      this.$set(this.userFields, 'address', {name: 'Адрес', value: '', require: false, error: false})

      //запрос на получение данных корзины
      let post = []
      this.$store.getters.cartProducts.forEach(x=>post.push(x.id))
      const bodyPost = `?items_list=[${post.join(',')}]`
      
      this.products = [];
      let $forBlock = this
      this.$API.get('getItems' + bodyPost).then(r => {
        r.data.data.forEach(function(item){
          $forBlock.products.push({
            id: item.cost_id, 
            name: item.item_name, 
            article: item.artikul, 
            description: item.item_description, 
            price: item.item_cost, 
            currency: item.currency, 
            image: $forBlock.loadImage(item.thumbnail),
            quantity: $forBlock.$store.getters.cartProducts.filter((x) => {if (item.cost_id == x.id) {return x.quantity} })[0].quantity
          });
        })
      })
    }
  }
</script>

<style scoped>
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
    display: inline-block;
    color: #fff;
    cursor: pointer; 
    text-align: center;
  }
  .cart-methods-section{
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
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
    float: right;
    overflow: hidden;
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
  }
  .row__customer_group{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px 0 0;
  }
  .row__customer_group label{
    margin-right: 10px;
  }
  .row__customer_group input{
    border-radius: 3px;
    width: 400px;
    padding: 7px 5px;
    outline: none;
    border: 1px solid #ccc;
  }
  input.error-val{
    border: 1px solid red;
  }
</style>