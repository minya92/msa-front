<template>
  <modal-fade>
    <a class="modal_box_close" @click="$emit('close')"></a>
    <div class="head-text">Рады вас видеть снова</div>
    <div class="span-grey">Введите телефон или email чтобы продолжить<br>Возможно у вас накопились бонусы</div>
    <div class="form-group">
      <label>Как вас зовут?</label>
      <input type="text" name="email">
      <span class="text-error">Номер телефона или email не верно</span>
    </div>
    <div class="form-group">
      <label>Пароль:</label>
      <input type="password" name="pass">
      <span class="text-error">Номер телефона или email не верно</span>
    </div>
    <div class="form-group">
      <label>Пароль повторно:</label>
      <input type="password" name="rpass">
      <span class="text-error">Номер телефона или email не верно</span>
    </div>
    <div class="form-group">
      <label>Email:</label>
      <input type="text" name="email">
      <span class="text-error">Номер телефона или email не верно</span>
    </div>
    <div class="form-group">
      <label>Tелефон:</label>
      <masked-input v-model="phone" mask="\+\7 (111) 1111-11" />
      <span class="text-error">Номер телефона или email не верно</span>
    </div>
    <div class="form-group">
      <input type="button" name="submit" value="войти">
    </div>
    <div class="alt-registry">
      <span class="or-box">или</span>
      <div class="registry-social-block">
        <img src="../assets/img/vk.svg">
        <img src="../assets/img/fb.svg">
      </div>
      <div>
        Забыли пароль / Еще не зарегистрированы?
      </div>
    </div>
    <div class="moto-box-selection">
    </div>
  </modal-fade>
</template>

<script>
  import ModalFade from '../layouts/Modal.vue'
  import MaskedInput from 'vue-masked-input'
  export default {
    components: {MaskedInput, ModalFade},
    data() {
      return {
        phone: ''
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style scoped> 
  .alt-registry{
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
  .registry-social-block{
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
