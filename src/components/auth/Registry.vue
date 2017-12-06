<template>
  <modal-fade @close="closeForm">
    <div class="head-text">Регистрация</div>
    <div class="form-group">
      <label>Как вас зовут?</label>
      <input type="text" v-model="name.value">
      <span class="text-error" v-if="name.error">{{name.textError}}</span>
    </div>
    <div class="form-group">
      <label>Пароль:</label>
      <input type="password" v-model="pass.value">
      <span class="text-error" v-if="pass.error">{{pass.textError}}</span>
    </div>
    <div class="form-group">
      <label>Пароль повторно:</label>
      <input type="password" v-model="rpass.value">
      <span class="text-error" v-if="rpass.error">{{rpass.textError}}</span>
    </div>
    <div class="form-group">
      <label>Email:</label>
      <input type="text" v-model="email.value">
      <span class="text-error" v-if="email.error">{{email.textError}}</span>
    </div>
    <div class="form-group">
      <label>Tелефон:</label>
      <masked-input v-model="phone.value" mask="\+\7 (111) 111-11-11" />
      <span class="text-error" v-if="phone.error">{{phone.textError}}</span>
    </div>
    <div class="form__error__message" v-if="errorAuth">{{errorText}}</div>
    <div class="form-group">
      <button class="btn_theme" @click="registry">зарегистрироваться</button>
    </div>
    <div class="alt-registry">
      <SocialAuth></SocialAuth>
    </div>
    <div class="moto-box-selection">
    </div>
  </modal-fade>
</template>

<script>
  import ModalFade from '@/layouts/Modal.vue'
  import MaskedInput from 'vue-masked-input'
  import md5 from 'md5'
  import axios from 'axios'
  import SocialAuth from '@/components/Social.vue'


  export default {
    components: {MaskedInput, ModalFade, SocialAuth},
    data() {
      return {
        name: {value: '', error: false, require: true, textError: 'Введите ФИО'},
        phone: {value: '', error: false, require: true, textError: 'Введите номер телефона'},
        pass: {value: '', error: false, require: true, textError: 'Пароль должен содержать более 4 символов'},
        rpass: {value: '', error: false, require: true, textError: 'Пароли не совпадают'},
        email: {value: '', error: false, require: true, textError: 'Введите email'},
        errorAuth: false,
        errorText: 'Неправильный электронный адрес или пароль.'
      }
    },
    created() {
      this.$store.dispatch('pathRedirectLogin', this.$route.path);
    },
    methods: {
      registry: function(){
        if (this.validate()) return;
        
        var post = `login=${this.name.value}&password=${md5(this.pass.value)}&email=${this.email.value}&phone=${this.phone.value}`;
        this.$API.post('clients/', post).then(response => {
          if (r.data.data != null){
            this.$store.dispatch('login', r.data.data);
            this.closeForm();
          }
        }).catch(err => {
          this.errorAuth = true;
        })

      },
      closeForm: function(){
        this.$emit('close');
      },
      validate: function(){
        var error = false;
        if (this.name.require && !this.name.value){
          this.name.error = true;
          error = true;
        } else {
          this.name.error = false;
        }

        if (this.phone.require && !this.phone.value){
          this.phone.error = true;
          error = true;
        } else {
          this.phone.error = false;
        }

        if (this.pass.require && this.pass.value.length < 5){
          this.pass.error = true;
          error = true;
        } else {
          this.pass.error = false;
        }
        if (this.pass.value != this.rpass.value){
          this.rpass.error = true;
          error = true;
        } else {
          this.rpass.error = false;
        }
        if (this.email.require && !this.email.value){
          this.email.error = true;
          error = true;
        } else {
          this.email.error = false;
        }
        return error;
      }
    }
  }
</script>

<style scoped>
  .alt-registry{
    text-align: center;
  }
</style>
