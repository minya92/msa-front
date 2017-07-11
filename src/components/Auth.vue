<template>
  <modal-fade>
    <a class="modal_box_close" @click="$emit('close')"></a>
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
      <button @click="submitForm()">войти</button>
    </div>
    <div class="alt-auth">
      <span class="or-box">{{orText}}</span>
      <div class="auth-social-block">
        <a class="vk"></a>
        <a class="fb"></a>
      </div>
      <div>
        {{forgotPassword}} / {{notRegistered}}
      </div>
    </div>
    <div class="moto-box-selection">
    </div>
  </modal-fade>
</template>

<script>
  import ModalFade from '../layouts/Modal.vue'
  export default {
    components: {ModalFade},
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
  }
}
}
</script>

<style scoped>  
  .alt-auth{
    text-align: center;
  }
  .or-box{
    line-height: 20px;
    font-size: 14px;
    text-transform: uppercase;
  }
  .or-box:before, .or-box:after{
    content: '';
    display: inline-block;
    height: 1px;
    width: 25%;
    background: #ccc;
    vertical-align: middle;
    margin: 0 10px;
  }
  .auth-social-block{
    margin: 12px 0;
  }
  .auth-social-block a{
    display: inline-block;
    height: 30px;
    width: 30px;
  }  
  .auth-social-block .vk{
    background: url(../assets/img/vk.svg) no-repeat;
  }
  .auth-social-block .vk:hover{
    background: url(../assets/img/vk_hover.svg) no-repeat;
  }

  .auth-social-block .fb{
    background: url(../assets/img/fb.svg) no-repeat;
  }
  .auth-social-block .fb:hover{
    background: url(../assets/img/fb_hover.svg) no-repeat;
  }
</style>
