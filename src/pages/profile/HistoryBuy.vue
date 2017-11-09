<template>
  <profile-layout>
    <div class="head-strip">
      <span>Заказ №{{dataOrder.order_id}}</span>
      <span>{{statusName}}</span>
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
            <router-link :to="'product/'+product.item_cost_id"><img :src="product.image"></router-link></td>
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
    {{dataOrder.details}}
  </profile-layout>
</template>

<script>
  import ProfileLayout from '../../layouts/Profile.vue'

  export default {
    components: {
      ProfileLayout
    },
    data() {
      return {
        dataOrder: {},
      }
    },
    computed: {
      statusName: function(){
        return typeof this.dataOrder.status != 'undefined' ? this.dataOrder.status.status_name : '';
      }
    },
    methods: {
      getOrderInfoById: function(){
      this.$API.get('getOrder/'+this.$route.params.id).then(r => {
        this.dataOrder = r.data.data;
        console.log(r.data.data);
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
</style>
