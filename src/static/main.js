// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios';
import yandexMap from 'vue-yandex-maps';
import { swiper, swiperSlide } from 'vue-awesome-swiper'

Vue.use(yandexMap)
Vue.use(VueAwesomeSwiper)
Vue.use(router)

Vue.config.productionTip = false


export const apiHTTP = axios.create({
	baseURL: 'http://msa.4rp.org/api',
	timeout: 1000,
});

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { swiper, 
								swiperSlide, 
								App }
})