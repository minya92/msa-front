<template>
  <modal-fade @close="closeForm" v-if="product.id">
    <div class="oc-modal">
      <div class="head-text">Быстрое оформление заказа</div>
      <h2>{{ product.name }}</h2>
      <div class="oc-item">
        <div class="oc-item-image">
          <img :src="imageItem" :alt="product.name">
          <div class="oc-price">
            <div>Цена:</div>
            <span>{{ product.price }} {{ product.currency }}</span>
          </div>
        </div>
        <div class="oc-action-block" v-if="status == 0">
          <div class="oc-info">После отправки заказа наши менеджеры свяжутся с Вами с ближайшее время</div>
          <div class="v-block">
            <label>ФИО</label>
            <text-field
              v-model="userFields.user"
              name="user" 
              data-vv-as="ФИО"
              placeholder="Иванов Сергей Александрович"
              :message="errors.has('user') ? errors.first('user') : ''"
            />
          </div>
          <div class="v-block">
            <label>Email</label>
            <text-field
              v-model="userFields.email"
              name="email" 
              data-vv-as="Email"
              placeholder="useremail@mail.ru"
              :message="errors.has('email') ? errors.first('email') : ''"
            />
          </div>
          <div class="v-block">
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
          <div class="v-block">
            <label>Адрес</label>
            <textarea
              v-model="userFields.address"
              name="address"
              rows="4"
              placeholder="Адрес доставки или другой комментарий к заказу"
            />
          </div>
          <div>
            Нажимая кнопку "Оформить заказ", Вы соглашаетесь c условиями
            <router-link :to="{name: 'PrivacyPolicy'}" target= '_blank'>политики конфиденциальности</router-link>
          </div>
          <div class="form-group">
            <button class="btn_theme oc-buy" @click="buy()">Оформить заказ</button>
          </div>
        </div>

        <div class="oc-action-block" v-else-if="status == -1">
          <div  class="oc-info">Не удалось выполнить заказ. Свяжитесь с нашими менеджерами, они Вам помогут.</div>
        </div>

        <div class="oc-action-block" v-else-if="status == 1">
          <div  class="oc-info">Заказ отправлен. Наши менеджеры свяжутся с Вами с ближайшее время.</div>
        </div>
      </div>
    </div>
  </modal-fade>
</template>

<script>
  const FAILED = -1;
  const SUCCESS = 1;
  const DEFAULT = 0;
  import ModalFade from '@/layouts/Modal.vue'
  import TextField from '@/components/elements_ui/text-field'

  export default {
    components: {ModalFade, TextField},
    props: {
      product: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        userFields: {
          user: '',
          email: '',
          phone: '',
          address: ''
        },
        status: DEFAULT
      }
    },
    computed: {
      imageItem() {
        let image = this.product.full_image || this.product.image || '';
        return this.$SERVER_URL + image;
      },
      getStatus() {
        return status;
      }
    },
    methods: {
      buy: function(){
        this.$validator.validateAll();
        if (!this.validate()) return;

        let newJson = []
        newJson.push({itemsCount: 1, cost_id: this.product.id});

        let post = `fio=${this.userFields.user}&phone=${this.userFields.phone}`+
                    `&email=${this.userFields.email}`+
                    `&orderItems=${JSON.stringify(newJson)}`+
                    `&orderDetails=${this.userFields.address}`;
                    
        this.$store.dispatch('showLoading');
        this.$API.post('placeOrder/', post).then(r => {
          this.status = SUCCESS;
          this.$store.dispatch('hideLoading');
        }).catch(err => {
          this.status = FAILED;
          this.$store.dispatch('hideLoading');
        });
      },
      closeForm: function(){
        this.$emit('close');
      },
      validate: function() {
        return !Object.keys(this.$validator.flags).some(x => { 
                return !this.$validator.flags[x].valid
              })
      },
    }
  }
</script>

<style scoped>
  .v-block {
    display: block;
    margin-top: 8px;
  }
  .oc-modal{
    max-width: 720px;
  }
  .oc-modal h2 {
    font-size: 20px;
    margin-bottom: 14px;
  }
  .oc-item {
    display: flex;
    flex-wrap: wrap;
  }
  .oc-item-image {
    margin-right: 14px;
    min-width: 200px;
    max-width: 360px;
    text-align: center;
  }
  .oc-price span {
    font-size: 18px;
    font-weight: 600;
  }
  .oc-action-block {
    flex: 1 0 100px;
    max-width: 400px;
  }
  .oc-info {
    color: #999;
    font-size: 14px;
    font-style: italic;
    padding: 2px 14px;
    margin-left: 7px;
    border-left: 1px #BBB solid;
    line-height: 18px;
  }
  .oc-buy {
    padding: 14px 10px;
  }
  .oc-item textarea {
    width: 100%;
    padding: 8px 10px;
  }
  @media screen and (max-width: 375px) {
    .oc-modal{
      width: 100%;
    }
  }
</style>