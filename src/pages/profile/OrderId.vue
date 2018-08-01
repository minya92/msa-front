<template>
  <profile-layout v-if="!notFound">
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
            <router-link :to="'/product/'+product.item_cost_id"><img :src="product.thumbnail"></router-link></td>
          <td>
            <router-link class="table__items__title-item" :to="'/product/'+product.item_cost_id">
            {{product.item_name}}</router-link>
            <!--div>{{product.type_description}}</div-->
          </td>
          <td class="txtcenter">{{product.item_cost}}</td>
          <td class="txtcenter">{{product.items_count}}</td>
          <td class="txtcenter">{{product.final_cost}}</td>
        </tr>
      </tbody>
    </table>
    <div class="fw">
      <ul class="history-list">
        <li v-for="history in dataOrder.history" :key="history.ord_history_id">{{history.s_date | getDate}} - {{history.status_name}}</li>
      </ul>
      <div class="color--primary">
        {{ statusOrder }}
      </div>
    </div>
  </profile-layout>
  <profile-layout v-else>
    Заказ не найден.
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
        dataOrder: {},
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
    computed: {
      statusName() {
        return typeof this.dataOrder.status != 'undefined' ? this.dataOrder.status.status_name : '';
      },
      statusOrder() {
        return this.dataOrder.status && this.dataOrder.status.full_message ? this.dataOrder.status.full_message : '';
      }
    },
    methods: {
      getOrderInfoById: function(){
        this.$API.get('getOrder/'+this.$route.params.id).then(r => {
          this.dataOrder = r.data.data;
        }).catch(err => {
          //this.notFound = true;
          this.dataOrder = {
        "contents": [
            {
                "artikul": " 10003",
                "final_cost": 51400,
                "full_image": "images/plastic/YAMAHA/YZF_R6/2008-2014/8/Clip2net_170918200237.png",
                "item_cost": 25700,
                "item_cost_id": 151385882243700,
                "item_id": 151233296495901,
                "item_name": "YAMAHA YZF R6 2008-2014",
                "item_on_tp": null,
                "items_count": 2,
                "ord_contents_id": 152042678704500,
                "order_id": 55,
                "thumbnail": "images/plastic-small/YAMAHA/YZF_R6/2008-2014/8/Clip2net_170918200237.jpg",
                "type_description": "Комплекты пластика",
                "usr_context": "msa"
            },
            {
                "artikul": " 10007",
                "final_cost": 25700,
                "full_image": "images/plastic/YAMAHA/YZF_R6/2008-2014/4/IMG_3240.JPG",
                "item_cost": 25700,
                "item_cost_id": 151385882237700,
                "item_id": 151233296496112,
                "item_name": "YAMAHA YZF R6 2008-2014",
                "item_on_tp": null,
                "items_count": 1,
                "ord_contents_id": 152042678704600,
                "order_id": 55,
                "thumbnail": "images/plastic-small/YAMAHA/YZF_R6/2008-2014/4/IMG_3240.JPG",
                "type_description": "Комплекты пластика",
                "usr_context": "msa"
            }
        ],
        "details": "phone:  7 (890) 274-70-70, e-mail: music_master@mail.ru, delivery_type: 151056531944000, delivery_address: 12332куа йа, pay_type: 3, ord_details: false, fio: undefined",
        "history": [
            {
                "comment": null,
                "full_message": "Заказ создан и в ближайшее время будет обработан оперытором",
                "ord_history_id": 152042678703700,
                "ord_statuses_id": 0,
                "order_id": 55,
                "s_date": "2018-03-07T12:46:27.036Z",
                "short_message": "Заказ создан",
                "status_id": 0,
                "status_name": "Создан",
                "usr_context": "msa"
            }
        ],
        "order_id": 55,
        "status": {
            "full_message": "Заказ создан и в ближайшее время будет обработан оперытором",
            "ord_statuses_id": 0,
            "short_message": "Заказ создан",
            "status_name": "Создан"
        }
    }
        })
      }
    },
    watch: {
      $route: function() { this.getOrderInfoById() }
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
