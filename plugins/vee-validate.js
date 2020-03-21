import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import { Validator } from 'vee-validate';
Validator.extend('latalpha_num', {
  getMessage: field =>
    'Поле ' + field + ' может содержать только цифры и латинские буквы.',
  validate: (value, [testProp]) => {
    return /^([a-z0-9]+)$/gi.test(value);
  }
});
const dictionary = {
  ru: {
    messages: {
      required: function(n) {
        return 'Не заполнено поле ' + n;
      },
      email: function(n) {
        return 'Не корректная запись в поле ' + n + '.';
      },
      min: function(n, e) {
        return 'Пожалуйста, введите ' + e[0] + ' или более символов.';
      },
      max: function(n, e) {
        return n + ' не может быть больше ' + e[0] + ' символов.';
      },
      latalpha_num: function(n) {
        return 'Поле ' + n + ' может содержать только цифры и латинские буквы.';
      },
      confirmed: function(n, e) {
        return 'Подтверждение пароля не совпадает с ранее введенным паролем';
      }
    }
  }
};

Validator.localize(dictionary);

const validator = new Validator({ first_name: 'required' });

validator.localize('ru');
