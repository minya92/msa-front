<template>
  <modal-fade @close="closeForm">
    <div class="popup_registry">
      <div class="head-text">Регистрация</div>
      <div class="form-group">
        <label>Ваше имя</label>
        <input type="text" v-model="firstName.value" />
        <span class="text-error" v-if="firstName.error">{{
          firstName.textError
        }}</span>
      </div>
      <!--div class="form-group">
        <label>Введите фамилию</label>
        <input type="text" v-model="lastName.value">
        <span class="text-error" v-if="lastName.error">{{lastName.textError}}</span>
      </div>
      <div class="form-group">
        <label>Введите отчество</label>
        <input type="text" v-model="middleName.value">
        <span class="text-error" v-if="middleName.error">{{middleName.textError}}</span>
      </div-->
      <div class="form-group">
        <label>Email:</label>
        <input type="text" v-model="email.value" />
        <span class="text-error" v-if="email.error">{{ email.textError }}</span>
      </div>
      <div class="form-group">
        <label>Tелефон:</label>
        <masked-input v-model="phone.value" mask="\+\7 (111) 111-11-11" />
        <span class="text-error" v-if="phone.error">{{ phone.textError }}</span>
      </div>
      <div class="form-group">
        <label>Пароль:</label>
        <toogle-password v-model="pass.value"></toogle-password>
        <span class="text-error" v-if="pass.error">{{ pass.textError }}</span>
      </div>
      <div class="form-group">
        <label>Пароль повторно:</label>
        <toogle-password v-model="rpass.value"></toogle-password>
        <span class="text-error" v-if="rpass.error">{{ rpass.textError }}</span>
      </div>
      <div class="form__error__message" v-if="errorAuth">{{ errorText }}</div>
      <div class="form-group">
        <button class="btn_theme" @click="registry">зарегистрироваться</button>
      </div>
      <div class="alt-registry">
        <SocialAuth />
      </div>
      <div class="moto-box-selection"></div>
    </div>
  </modal-fade>
</template>

<script>
import ModalFade from '@/layouts/Modal.vue';
import MaskedInput from 'vue-masked-input';
import md5 from 'md5';
import axios from 'axios';
import SocialAuth from '@/components/Social.vue';
import { doAuth } from '@/components/auth/do-auth';
import TooglePassword from '@/components/input_components/password';

export default {
  components: { MaskedInput, ModalFade, SocialAuth, TooglePassword },
  data() {
    return {
      firstName: {
        value: '',
        error: false,
        require: true,
        textError: 'Введите имя'
      },
      //        lastName: {value: '', error: false, require: true, textError: 'Введите фамилию'},
      //        middleName: {value: '', error: false, require: true, textError: 'Введите отчество'},
      phone: {
        value: '',
        error: false,
        require: true,
        textError: 'Введите номер телефона'
      },
      pass: {
        value: '',
        error: false,
        require: true,
        textError: 'Пароль должен содержать более 4 символов'
      },
      rpass: {
        value: '',
        error: false,
        require: true,
        textError: 'Пароли не совпадают'
      },
      email: {
        value: '',
        error: false,
        require: true,
        textError: 'Введите email'
      },
      errorAuth: false,
      errorText: 'Неправильный электронный адрес или пароль.'
    };
  },
  mounted() {
    this.$store.dispatch('pathRedirectLogin', this.$route.path);
  },
  methods: {
    registry: function() {
      if (this.validate()) return;

      var post = `first_name=${this.firstName.value}&password=${md5(
        this.pass.value
      )}&email=${this.email.value}&phone=${this.phone.value}`;
      //        var post = `first_name=${this.firstName.value}&last_name=${this.lastName.value}&middle_name=${this.middleName.value}&password=${md5(this.pass.value)}&email=${this.email.value}&phone=${this.phone.value}`;
      this.$API
        .post('clients/', post)
        .then(r => {
          if (r.data.data != null) {
            this.$store.dispatch('login', r.data.data);
            doAuth(this.email.value, this.pass.value).then(r => {
              //              TODO alert Спасибо за регистрацию, проверьте почту и подтвердите ваш адрес
              this.$router.go({
                path: this.$route.path,
                force: true
              });
            });
          }
        })
        .catch(err => {
          this.errorText = err.response.data.error;
          this.errorAuth = true;
        });
    },
    closeForm: function() {
      this.$emit('close');
    },
    showPassword: function() {
      //event.target.parentNode.childNodes[0].setAttribute('type','text')
    },
    validate: function() {
      var error = false;
      if (this.firstName.require && !this.firstName.value) {
        this.firstName.error = true;
        error = true;
      } else {
        this.firstName.error = false;
      }

      if (this.phone.require && !this.phone.value) {
        this.phone.error = true;
        error = true;
      } else {
        this.phone.error = false;
      }

      if (this.pass.require && this.pass.value.length < 5) {
        this.pass.error = true;
        error = true;
      } else {
        this.pass.error = false;
      }
      if (this.pass.value != this.rpass.value) {
        this.rpass.error = true;
        error = true;
      } else {
        this.rpass.error = false;
      }
      if (this.email.require && !this.email.value) {
        this.email.error = true;
        error = true;
      } else {
        this.email.error = false;
      }
      return error;
    }
  }
};
</script>

<style scoped>
.popup_registry {
  width: 340px;
}
.alt-registry {
  text-align: center;
}

@media screen and (max-width: 375px) {
  .popup_registry {
    max-width: 100%;
  }
}
</style>
