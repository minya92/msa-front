import Vue from 'vue'
import Router from 'vue-router'
import Breadcrumbs from 'vue-breadcrumbs'

Vue.use(Router)
Vue.use(Breadcrumbs)

import Home from '@/pages/Home'
import Contacts from '@/pages/Contacts'
import HistoryBuy from '@/pages/HistoryBuy'
import PageNotFound from '@/pages/404'
import Catalog from '@/pages/Catalog'
import Product from '@/pages/Product'
import Profile from '@/pages/Profile'
import Review from '@/pages/Review'
import Information from '@/pages/Information'

// роуты приложения 
const routes = [
    { path: '/', component: Home, meta: {breadcrumb: 'Главная'} },
    { path: '/contacts', component: Contacts },
    { path: '/historybuy', component: HistoryBuy },
    { path: '/catalog/', component: Catalog, meta: {breadcrumb: 'Каталог товаров'}, 
      children: [
        { path: ':id', name: 'product', component: Product }
      ] 
    },
    { path: '/product/:id', component: Product, meta: {breadcrumb: 'Продукт'} },
    { path: '/profile', component: Profile, meta: {breadcrumb: 'Личный кабинет'} },
    { path: '/review/', component: Review, meta: {breadcrumb: 'Отзывы', title: 'Отзывы'} },
    { path: '/info/', component: Information, meta: {breadcrumb: 'Информация', title: 'Информация'} },
    { path: "*", component: PageNotFound }
  ]


// экспорт роутера 
export default new Router({ 
  //mode: 'history',
  base: __dirname,
  routes, 
  //linkActiveClass: 'is-active' 
})