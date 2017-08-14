<template>
  <modal-fade>
    <a class="modal_box_close" @click="$emit('close')"></a>
    <div class="head-text">Рады вас видеть снова</div>
    <div class="span-grey">Введите телефон или email чтобы продолжить<br>Возможно у вас накопились бонусы</div>
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
      <masked-input v-model="phone.value" mask="\+\7 (111) 1111-11" />
      <span class="text-error" v-if="phone.error">{{phone.textError}}</span>
    </div>
    <div class="form-group">
      <button class="btn_theme" @click="registry">войти</button>
    </div>
    <div class="alt-registry">
      <span class="or-box">или</span>
      <div class="registry-social-block">
        <img src="../assets/img/vk.svg" @click="vkAuth()">
        <img src="../assets/img/fb.svg" @click="fbAuth()">
        <img src="../assets/img/ok.svg" @click="okAuth()">
        <img src="../assets/img/instagram.svg" @click="instAuth()">
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
  import md5 from 'md5'
  import axios from 'axios'


  export default {
    components: {MaskedInput, ModalFade},
    data() {
      return {
        name: {value: '', error: false, require: true, textError: 'Введите ФИО'},
        phone: {value: '', error: false, require: true, textError: 'Введите номер телефона'},
        pass: {value: '', error: false, require: true, textError: 'Пароль должен содержать более 4 символов'},
        rpass: {value: '', error: false, require: true, textError: 'Пароли не совпадают'},
        email: {value: '', error: false, require: true, textError: 'Введите email'},
      }
    },
    created() {
    },
    methods: {
      registry: function(){
        if (this.validate()) return;

        this.$store.dispatch('login',JSON.stringify({login: this.name.value}));
        /*let post = {
          first_name: '',
          last_name: '',
          login: 'harcioger',//this.name,
          password:'password',// md5(this.pass),
          city: '',
          phone: '89999999999',//this.phone,
          reg_date: '',
          birthday: null,
          email: 'harcioger@gmail.com'//this.email
        }
        console.log(post);*/
        var post = 'first_name=&last_name=&login=MrPropper&password='+md5(this.pass)+'&email=email@gmail.com&city=&phone=89999999999&birthday=null';
        this.$API.post('clients/', post).then(response => {
          console.log(response);
        }).catch(e => {
          console.log(e);
        });

      },
      vkAuth: function(){
        axios.get('application/socAuth/settings').then(r => {
          var url = `https://oauth.vk.com/authorize?client_id=${r.vk.client_id}&display=${r.vk.display}&redirect_uri=${r.vk.redirect_uri}&response_type=${r.vk.response_type}&v=${r.vk.v}&revoke=1&scope=${r.vk.scope}`;
          console.log(url);
          window.location = url;
        });
      },
      fbAuth: function(){
        axios.get('application/socAuth/settings').then(r => {
          var url = `https://www.facebook.com/${r.fb.v}/dialog/oauth?client_id=${r.fb.client_id}&redirect_uri=${r.fb.redirect_uri}`;
          console.log(url);
          window.location = url;
        });
      },
      okAuth: function(){
        axios.get('application/socAuth/settings').then(r => {
          var url = `https://connect.ok.ru/oauth/authorize?client_id=${r.ok.client_id}&redirect_uri=${r.ok.redirect_uri}&response_type=${r.ok.response_type}&scope=${r.vk.scope}`;
          console.log(url);
          window.location = url;
        });
      },
      instAuth: function(){
        axios.get('application/socAuth/settings').then(r => {
          var url = `https://api.instagram.com/oauth/authorize/?client_id=${r.inst.client_id}&redirect_uri=${r.inst.redirect_uri}&response_type=code`;
          console.log(url);
          window.location = url;
        });
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
