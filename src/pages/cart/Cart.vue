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
              <!--div class="table__cart__description-item">{{ product.description }}</div-->
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
          <div class="v-flex">
            <label>ФИО</label>
            <text-field
              v-model="userFields.user"
              name="user" 
              data-vv-as="ФИО"
              placeholder="Иванов Сергей Александрович"
              :message="errors.has('user') ? errors.first('user') : ''"
            />
          </div>
          <div class="v-flex">
            <label>Email</label>
            <text-field
              v-model="userFields.email"
              name="email" 
              data-vv-as="Email"
              placeholder="useremail@mail.ru"
              :message="errors.has('email') ? errors.first('email') : ''"
            />
          </div>
          <div class="v-flex">
            <label class="require">Телефон</label>
            <text-field
              v-model="userFields.phone"
              name="phone" 
              data-vv-as="Телефон"
              placeholder="+7 (###) ###-##-##"
              :mask="'+7 (###) ###-##-##'"
              v-validate="'required'" 
              :message="errors.has('phone') ? errors.first('phone') : ''"
            />
          </div>
          <div class="v-flex">
            <label>Адрес</label>
            <text-field
              v-model="userFields.address"
              name="address" 
              data-vv-as="Адрес"
              placeholder="" 
              :message="errors.has('address') ? errors.first('address') : ''"
            />
          </div>
        </div>
        <div class="simplecheckout-right-column">
          <payment-methods
            v-model="selectPayment"
            :total="total"
          />
          <shipping-methods
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
  import TextField from '@/components/elements_ui/text-field'

  export default {
    components: {
      MainLayout,
      PaymentMethods, 
      ShippingMethods,
      TextField
    },
    data() {
      return {
        products: [],
        selectDelivery: null,
        selectPayment: null,
        userFields: {
          user: '',
          email: '',
          phone: '',
          address: ''
        },
        orderDetails: ''
      }
    },
    computed: {
      total () {
        var deliveryCost = 0
        if (this.selectDelivery){
          deliveryCost = this.selectDelivery.deliverCost;
        }
        return this.products.reduce((total, p) => {
          return total + p.price * p.quantity + deliveryCost
        }, 0)
      },
      selectPaymentMethods(){
        return this.selectPayment ? this.selectPayment.payName : null;
      },
      selectDeliveryMethods(){
        if (!this.selectDelivery){
          return '';
        }
        const deliverCost = this.selectDelivery.deliverCost ? this.selectDelivery.deliverCost : 0
        return this.selectDelivery.deliveryName + ': ' + deliverCost
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
      validate: function() {
        return !Object.keys(this.$validator.flags).some(x => { 
                return !this.$validator.flags[x].valid
              })
      },
      goCatalog: function(){
        this.$router.push({name: 'catalog'});
      },
      sendOrder: function(){
        this.$validator.validateAll();
        
        if (!this.validate()) {
          window.scroll(0, 60);
          return;
        }

        let newJson = []
        this.$store.getters.cartProducts.forEach(x => newJson.push({itemsCount: x.quantity, cost_id: x.id}))

        let post = `fio=${this.userFields.user}&phone=${this.userFields.phone}`+
                    `&email=${this.userFields.email}`+
                    `&deliveryType=${this.selectDelivery.id}`+
                    `&deliveryAddress=${this.userFields.address}`+
                    `&orderItems=${JSON.stringify(newJson)}`+
                    `&payType=${this.selectPayment.id}`+
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
    },
    created: function(){
      if (!this.$store.getters.cartProducts.length){
        return;
      }

      this.$store.dispatch('showLoading');

			this.$API.get("clients/current").then(r => {
				if (r.data.data != null){
					this.$store.dispatch('login', r.data.data);
          this.userFields.user = this.$store.getters.getName;
          this.userFields.email = this.$store.getters.getEmail;
          this.userFields.phone = this.$store.getters.getPhone;
          this.userFields.address = this.$store.getters.getCity;
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
  .v-flex label{
    margin-right: 10px;
    min-width: 100px;
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
