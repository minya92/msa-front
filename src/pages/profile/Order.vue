<template>
  <profile-layout v-if="!notFound">
    <div v-for="dataOrder in dataOrders">
      <div class="head-strip">
        <span>Заказ №{{dataOrder.order_id}}</span>
        <span>{{dataOrder.status.status_name}}</span>
      </div>
      <table class="table__items" cellpadding="5" cellspacing="0" border="0" v-if="typeof dataOrder.contents != 'undefined'">
        <tbody>
          <tr class="table-header">
            <th class="table__items__picture">Изображение</th>
            <th>Описание</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Сумма</th>
          </tr>
          <tr v-for="(product, index) in dataOrder.contents">
            <td class="table__items__picture">
              <router-link :to="'product/'+product.item_cost_id"><img :src="product.thumbnail"></router-link></td>
            <td>
              <router-link class="table__items__title-item" :to="'product/'+product.item_cost_id">
              {{product.item_name}}</router-link>
              <div>{{product.type_description}}</div>
            </td>
            <td class="txtcenter">{{product.item_cost}}</td>
            <td class="txtcenter">{{product.items_count}}</td>
            <td class="txtcenter">{{product.final_cost}}</td>
          </tr>
        </tbody>
      </table>
      
      <ul class="history-list">
        <li v-for="history in dataOrder.history" :key="history.ord_history_id">{{history.s_date | getDate}} - {{history.status_name}}</li>
      </ul>
    </div>
  </profile-layout>
  <profile-layout v-else>
    Заказы не найдены.
  </profile-layout>
</template>

<script>
  import ProfileLayout from '@/layouts/Profile.vue'

  export default {
    components: {
      ProfileLayout
    },
    data() {
      return {
        dataOrders: [],
        notFound: false
      }
    },
    filters: {
      getDate: function(datetext) {
        var date = new Date(datetext)
        if (date) return `${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`

        return ''
      }
    },
    methods: {
      getOrderInfoById: function(){
        this.$API.get('getOrderHistory').then(r => {
          this.dataOrders = r.data.data;
        }).catch(err => {
          this.notFound = true;
        })
      }
    }, 
    created(){
      this.getOrderInfoById();
    }
  }
</script>

<style>
  .head-strip{
    padding: 5px 10px;
    background: #eee;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .table__items{
    width: 100%;
  }
  .table__items a{
    text-decoration: none;
    color: inherit;
  }
  .table__items td{
    padding: 3px 5px;
  }
  .history-list{
    list-style: none;
  }
</style>
