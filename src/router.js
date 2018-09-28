import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '@/pages/Home'
import Contacts from '@/pages/Contacts'
import PageNotFound from '@/pages/404'
import Catalog from '@/pages/catalog/Index'
import Product from '@/pages/product'

import Profile from '@/pages/profile/Profile'
import Order from '@/pages/profile/Order'
import OrderId from '@/pages/profile/OrderId'

import Review from '@/pages/review'
import Information from '@/pages/Information'
import FAQ from '@/pages/faq'
import ContactUs from '@/pages/contact-us'
import Manufactures from '@/pages/Manufactures'
import Headlight from '@/pages/Headlight'
import Articles from '@/pages/Articles'
import PaymentDelivery from '@/pages/PaymentDelivery'
import About from '@/pages/About'

import Cart from '@/pages/cart/Cart'
import Checkout from '@/pages/cart/Checkout'
import SuccessCheckout from '@/pages/cart/Success'

import PrivacyPolicy from '@/pages/PrivacyPolicy'
import RestorePassword from '@/pages/RestorePassword'
import ConfirmMail from '@/pages/ConfirmMail'

import DoAuth from '@/pages/DoAuth'

// роуты приложения
const routes = [
    { path: '/', component: Home },
    { path: '/doAuth', component: DoAuth },
    { path: '/confirmMail/:confirmation', component: ConfirmMail, meta: {breadcrumb: 'Подтверждение адреса e-mail', title: 'Подтверждение адреса e-mail'} },
    { path: '/contacts', component: Contacts, name: 'Contacts', meta: {breadcrumb: 'Контакты', title: 'Контакты'}  },
    { path: '/catalog', name: 'catalog', component: Catalog, meta: {breadcrumb: 'Каталог товаров'}},
    { path: '/catalog/types=:types', component: Catalog, meta: {breadcrumb: 'Каталог товаров'}},
    { path: '/catalog/search=:searchDetails', name: 'catalogSearch', component: Catalog, meta: {breadcrumb: 'Каталог товаров'}},
    { path: '/product/:id', component: Product, meta: {breadcrumb: 'Продукт'} },

    { path: '/profile', name: 'Profile', component: Profile, meta: {breadcrumb: 'Профиль пользователя', title: 'Профиль пользователя'}},
    { path: '/profile/order', name: 'Order', component: Order, meta: {breadcrumb: 'История заказов' }},
    { path: '/profile/order/:id', name: 'OrderId', component: OrderId, meta: {breadcrumb: 'История заказов' }},

    { path: '/cart', component: Cart, meta: {breadcrumb: 'Корзина'} },
    { path: '/checkout', component: Checkout, meta: {breadcrumb: 'Оформление заказа'} },
    { path: '/cart/success', component: SuccessCheckout, meta: {breadcrumb: 'Оформление заказа'}, props: { name: 'world' }},
    { path: '/review', component: Review, name: 'Review', meta: {breadcrumb: 'Отзывы', title: 'Отзывы'} },
    { path: '/faq', component: FAQ, name: 'FAQ', meta: {breadcrumb: 'Вопрос и ответ', title: 'Вопрос и ответ'} },
    { path: '/info', component: Information, name: 'Information', meta: {breadcrumb: 'Правила работы с сайтом MSAmoto', title: 'Правила работы с сайтом MSAmoto'} },
    { path: '/contact-us', component: ContactUs, name: 'ContactUs', meta: {breadcrumb: 'Напишите нам', title: 'Напишите нам'} },
    { path: '/manufactures', component: Manufactures, name: 'Manufactures', meta: {breadcrumb: 'Производители', title: 'Производители'} },
    { path: '/headlight', component: Headlight, name: 'Headlight', meta: {breadcrumb: 'Фары', title: 'Фары'} },
    { path: '/articles/:id', component: Articles, name: 'Article', meta: {breadcrumb: 'Статья', title: 'Статья'} },
    { path: '/payment-delivery', component: PaymentDelivery, name: 'PaymentDelivery', meta: {breadcrumb: 'Оплата и доставка', title: 'Оплата и доставка'} },
    { path: '/about', component: About, name: 'About', meta: {breadcrumb: 'О магазине', title: 'О магазине'} },
    { path: '/privacy_policy', component: PrivacyPolicy, name: 'PrivacyPolicy', meta: {breadcrumb: 'Политика конфиденциальности', title: 'Политика конфиденциальности'} },
    { path: '/restore_password', component: RestorePassword, name: 'RestorePassword', meta: {breadcrumb: 'Восстановление пароля', title: 'Восстановление пароля'} },
    { path: "*", component: PageNotFound }
  ]


// экспорт роутера
export default new Router({
  //mode: 'history',
  base: __dirname,
  routes,
  linkActiveClass: 'current'
})
