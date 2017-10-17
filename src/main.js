import 'swiper/dist/css/swiper.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios';
import yandexMap from 'vue-yandex-maps';
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import config from './config.js'
import store from './vuex/store.js'

Vue.component('icon', Icon)

//Vue.use(yandexMap)
Vue.use(VueAwesomeSwiper)
Vue.use(router)

Vue.config.productionTip = false

new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: { swiper, 
		swiperSlide, 
		App }
	})