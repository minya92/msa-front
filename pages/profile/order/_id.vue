<template>
  <profile-layout v-if="!notFound">
    <div class="head-strip">
      <span>Заказ №{{ dataOrder.order_id }}</span>
      <span>{{ statusName }}</span>
    </div>
    <table class="table__items" cellpadding="5" cellspacing="0" border="0">
      <tbody>
        <tr class="table-header">
          <th class="table__items__picture">Изображение</th>
          <th>Описание</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Сумма</th>
        </tr>
        <tr v-for="(product, index) in dataOrder.contents" :key="index">
          <td class="table__items__picture">
            <router-link :to="'/product/' + product.item_cost_id"
              ><img :src="product.thumbnail"
            /></router-link>
          </td>
          <td>
            <router-link
              class="table__items__title-item"
              :to="'/product/' + product.item_cost_id"
            >
              {{ product.item_name }}</router-link
            >
            <!--div>{{product.type_description}}</div-->
          </td>
          <td class="txtcenter">{{ product.item_cost }}</td>
          <td class="txtcenter">{{ product.items_count }}</td>
          <td class="txtcenter">{{ product.final_cost }}</td>
        </tr>
      </tbody>
    </table>
    <div class="fw">
      <ul class="history-list">
        <li v-for="history in dataOrder.history" :key="history.ord_history_id">
          {{ history.s_date | getDate }} - {{ history.status_name }}
        </li>
      </ul>
    </div>
    <div class="color--primary" v-html="statusOrder"></div>
  </profile-layout>
  <profile-layout v-else>
    Заказ не найден.
  </profile-layout>
</template>

<script>
import ProfileLayout from '@/layouts/Profile.vue';
import { apiFactory } from '@/api';
const apiOrder = apiFactory.get('order');

export default {
  components: {
    ProfileLayout
  },

  filters: {
    getDate: function(datetext) {
      var date = new Date(datetext);
      if (date)
        return `${('0' + date.getDate()).slice(-2)}.${(
          '0' +
          (date.getMonth() + 1)
        ).slice(-2)}.${date.getFullYear()} ${('0' + date.getHours()).slice(
          -2
        )}:${('0' + date.getMinutes()).slice(-2)}`;

      return '';
    }
  },
  computed: {
    statusName() {
      return typeof this.dataOrder.status != 'undefined'
        ? this.dataOrder.status.status_name
        : '';
    },
    statusOrder() {
      return this.dataOrder.status && this.dataOrder.status.full_message
        ? `<strong>Последнее действие:</strong> ${this.dataOrder.status.full_message}`
        : '';
    }
  },

  async asyncData({ route }) {
    let dataOrder = {};
    let notFound = false;
    try {
      dataOrder = await apiOrder.getOrder(route.params.id);
    } catch {
      notFound = true;
    }

    return { dataOrder, notFound };
  }
};
</script>

<style>
.head-strip {
  padding: 5px 10px;
  background: #eee;
  font-weight: 600;
  margin-bottom: 5px;
}
.table__items {
  width: 100%;
}
.table__items a {
  text-decoration: none;
  color: inherit;
}
.table__items td {
  padding: 3px 5px;
}
.history-list {
  list-style: none;
}
</style>
