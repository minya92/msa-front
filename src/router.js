import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/pages/Home'
import Contacts from '@/pages/Contacts'
import PageNotFound from '@/pages/404'
import Catalog from '@/pages/Catalog'
import Product from '@/pages/Product'
import Profile from '@/pages/profile/Profile'
import HistoryBuy from '@/pages/profile/HistoryBuy'
import Review from '@/pages/Review'
import Information from '@/pages/Information'

import Cart from '@/pages/cart/Cart'
import Checkout from '@/pages/cart/Checkout'
import SuccessCheckout from '@/pages/cart/Success'

import DoAuth from '@/components/auth/DoAuth'

// роуты приложения 
const routes = [
    { path: '/', component: Home },
    { path: '/doAuth', component: DoAuth },
    { path: '/contacts', component: Contacts },
    { path: '/catalog', name: 'catalog', component: Catalog, meta: {breadcrumb: 'Каталог товаров'}},
    { path: '/catalog/types=:types', component: Catalog, meta: {breadcrumb: 'Каталог товаров'}},
    { path: '/catalog/search=:searchDetails', component: Catalog, meta: {breadcrumb: 'Каталог товаров'}},
    { path: '/product/:id', component: Product, meta: {breadcrumb: 'Продукт'} },
    { path: '/profile', component: Profile, meta: {breadcrumb: 'Личный кабинет'},
      children: [
        { path: 'historybuy', name: 'HistoryBuy', component: HistoryBuy, meta: {breadcrumb: 'История заказов' }}
      ]  
    },
    { path: '/cart', component: Cart, meta: {breadcrumb: 'Корзина'} },
    { path: '/checkout', component: Checkout, meta: {breadcrumb: 'Оформление заказа'} },
    { path: '/cart/success', component: SuccessCheckout, meta: {breadcrumb: 'Оформление заказа'}, props: { name: 'world' }},
    { path: '/review/', component: Review, meta: {breadcrumb: 'Отзывы', title: 'Отзывы'} },
    { path: '/info/', component: Information, meta: {breadcrumb: 'Информация', title: 'Информация'} },
    { path: "*", component: PageNotFound }
  ]


// экспорт роутера 
export default new Router({ 
  mode: 'history',
  base: __dirname,
  routes, 
  linkActiveClass: 'current' 
})