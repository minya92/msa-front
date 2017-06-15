import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Contacts from '@/pages/Contacts'
import HistoryBuy from '@/pages/HistoryBuy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts
    },
    {
      path: '/historybuy',
      name: 'HistoryBuy',
      component: HistoryBuy
    }
  ]
})