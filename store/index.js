export const state = () => ({
  baseUrl: 'https://msa-motoplastic.ru/',
  loginInfo: null /*{
    "address": null,
    "birthday": null,
    "bonus_category": null,
    "city": null,
    "city_id": null,
    "client": null,
    "email": 'shmail@mail.ru',
    "email_verefied": null,
    "f_name": "Семен Квертиевич",
    "first_name": "Алексей",
    "inst_user_id": null,
    "last_name": "Кашинцев",
    "login": "vk_12640638",
    "middle_name": null,
    "ok_user_id": null,
    "password": "38688899aa25aa89309da9f4e68e2310",
    "person": 150290718779200,
    "person_id": 150290718779200,
    "phone": 89109109988,
    "reg_date": null,
    "usr_name": null,
    "vk_user_id": 12640638
  },*/,
  pending: false,
  pathRedirectLogin: '/'
});

export const mutations = {};

export const getters = {
  isAuthorized: state => {
    return state.loginInfo != null;
  },
  getName: state => {
    return state.loginInfo != null ? state.loginInfo.f_name : '';
  },
  getFirstName: state => {
    return state.loginInfo != null ? state.loginInfo.first_name : '';
  },
  getLastName: state => {
    return state.loginInfo != null ? state.loginInfo.last_name : '';
  },
  getMiddleName: state => {
    return state.loginInfo != null ? state.loginInfo.middle_name : '';
  },
  getEmail: state => {
    return state.loginInfo != null ? state.loginInfo.email : '';
  },
  getPhone: state => {
    return state.loginInfo != null ? state.loginInfo.phone : '';
  },
  getCity: state => {
    return state.loginInfo != null ? state.loginInfo.city : '';
  },
  pathRedirectLogin: state => {
    return state.pathRedirectLogin;
  }
};

export const actions = {};
