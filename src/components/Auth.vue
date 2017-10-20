<template>
  <modal-fade @close="$emit('close')">
    <div class="modal__auth__content">
      <div class="head-text">{{headerText}}</div>
      <div class="span-grey" v-html="">{{textFromHeaderText}}</div>
      <div class="form-group">
        <label>{{email.headerText}}</label>
        <input type="text" v-model="email.value">
        <span v-if="email.showError" class="text-error">{{email.textError}}</span>
      </div>
      <div class="form-group">
        <label>{{password.headerText}}</label>
        <input type="password" v-model="password.value">
        <span v-if="password.showError" class="text-error">{{password.textError}}</span>
      </div>
      <div class="form-group">
        <button class="btn_theme" @click="submitForm()">войти</button>
      </div>
      <div class="alt-auth">
        <SocialAuth></SocialAuth>
        <div>
          {{forgotPassword}} / {{notRegistered}}
        </div>
      </div>
      <div class="moto-box-selection"></div>
    </div>
  </modal-fade>
</template>

<script>
  import ModalFade from '../layouts/Modal.vue'
  import SocialAuth from './Social.vue'
  export default {
    components: {ModalFade, SocialAuth},
    data() {
      return {
        headerText: 'Рады вас видеть снова',
        textFromHeaderText: 'Введите телефон или email чтобы продолжить. \n Возможно у вас накопились бонусы',
        orText: 'или',
        email: { headerText: 'Номер телефона или email:',
        value: '',
        textError: "Номер телефона или email не верно",
        showError: false
      },
      password: { headerText: 'Пароль:',
      value: '',
      textError: "Номер телефона или email не верно",
      showError: false
    },
    forgotPassword: 'Забыли пароль',
    notRegistered: 'Еще не зарегистрированы?'
  }
},
created() {
},
methods: {
  submitForm: function(){
    var post = 'j_username=' + this.email.value + '&j_password=' + this.password.value;
    this.$AUTH_URL.get('index.html').then(
      this.$AUTH_URL.post('j_security_check/', post)
    ).then(
      this.$API.get('clients/current')
    ).then(response => {
      if (responce.data != [])
        console.log('Auth ok')
      else
        console.log('Auth fail')
    }).catch(e => {
        console.log(e);
    })
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
