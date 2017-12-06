<template>
  <modal-fade @close="closeForm">
    <div class="modal__auth__content">
      <div class="head-text">{{headerText}}</div>
      <div class="span-grey">{{textFromHeaderText}}</div>
      <div class="form-group">
        <label>{{email.headerText}}</label>
        <input type="text" v-model="email.value" @keyup.enter="submitForm()">
        <span v-if="email.showError" class="text-error">{{email.textError}}</span>
      </div>
      <div class="form-group">
        <label>{{password.headerText}}</label>
        <input type="password" v-model="password.value" @keyup.enter="submitForm()">
        <span v-if="password.showError" class="text-error">{{password.textError}}</span>
      </div>
      <div class="form__error__message" v-if="errorAuth">{{errorText}}</div>
      <div class="form-group">
        <button class="btn_theme" @click="submitForm()">войти</button>
      </div>
      <div class="alt-auth">
        <SocialAuth></SocialAuth>
        <div>
          <a href="#" @click="forgotPassword">Забыли пароль? </a>
        </div>
      </div>
      <div class="moto-box-selection"></div>
    </div>
  </modal-fade>
</template>

<script>
  import ModalFade from '@/layouts/Modal.vue'
  import SocialAuth from '@/components/Social.vue'
  import { doAuth } from '@/components/auth/do-auth'

  export default {
    components: {ModalFade, SocialAuth},
    data() {
      return {
        headerText: 'Рады вас видеть снова',
        textFromHeaderText: 'Введите телефон или email чтобы продолжить. \n Возможно у вас накопились бонусы',
        orText: 'или',
        email: { 
          headerText: 'Номер телефона или email:',
          value: '',
          textError: "Номер телефона или email не верно",
          showError: false
        },
        password: { 
          headerText: 'Пароль:',
          value: '',
          textError: "Номер телефона или email не верно",
          showError: false
        },
        notRegistered: 'Еще не зарегистрированы?',
        errorAuth: false,
        errorText: 'Неправильный электронный адрес или пароль.'
      }
    },
    created() {
      this.$store.dispatch('pathRedirectLogin', this.$route.path);
    },
    methods: {
      submitForm: function(){
        let that = this;
        doAuth(this.email.value, this.password.value).then(r => {
          this.closeForm();
        }).catch(err => {
          this.errorAuth = true;
        });
      },
      closeForm: function(){
        this.$emit('close');
      },
      forgotPassword: function(){
        
      }
    }
  }
</script>

<style scoped>
  .alt-auth{
    text-align: center;
  }
  .modal__auth__content{
    width: 340px;
  }
  @media screen and (max-width: 375px) {
    .modal__auth__content{
      width: 100%;
    }
  }
</style>
