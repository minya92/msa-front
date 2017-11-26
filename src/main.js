import 'swiper/dist/css/swiper.css'
import Vue from 'vue'
import App from './App'

import router from './router'
Vue.use(router)

import axios from 'axios';
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import config from './config.js'
import store from './vuex/store.js'

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/****/
import { Validator } from 'vee-validate';
Validator.extend('latalpha_num', {
  getMessage: field => 'Поле ' + field + ' может содержать только цифры и латинские буквы.',
  validate: (value, [testProp]) => {      
    return /^([a-z0-9]+)$/gi.test(value);
  }
});
const dictionary = {
  ru: {
    messages: {
      required: function(n) {return n},
      email: function(n) {return "Не корректная запись в поле "+n+"."},
      min: function(n, e) {return "Пожалуйста, введите "+e[0]+" или более символов."},
      max: function(n, e) {return n + " не может быть больше "+e[0]+" символов."},
      latalpha_num:function(n){return "Поле " + n+" может содержать только цифры и латинские буквы."},
      confirmed: function(n, e) {return "Подтверждение пароля не совпадает с ранее введенным паролем"}
    }
  }
};

Validator.updateDictionary(dictionary);

const validator = new Validator({ first_name: 'required' });

validator.setLocale('ru');
/****/

new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: { swiper, 
		swiperSlide, 
		App }
	})