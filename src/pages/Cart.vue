<template>
  <main-layout>
    <div class="container-fluid breadcrumbs">
      <template>
        <span>Главная страница <span class="padding-delmiter">/</span> {{this.$breadcrumbs[0].meta.breadcrumb}}</span>
      </template>
    </div>
    <div class="content-fluid catalog-section">
      <table class="table__cart">
        <tbody>
          <tr>
            <th class="table__cart__picture">Изображение</th>
            <th>Описание</th>
            <th class="table__cart__quantity">Количество</th>
            <th class="table__cart__price">Цена</th>
            <th></th>
          </tr>
          <tr v-for="(product, index) in products">
            <td class="table__cart__picture"><img :src="product.image"></td>
            <td>{{product.name}}</td>
            <td class="table__cart__quantity">
              <div class="quantity_minus" @click="quantityMinus(product)">-</div>
              <input :value="product.quantity">
              <div class="quantity_plus" @click="quantityPlus(product)">+</div>
            </td>
            <td class="table__cart__price">{{product.price}}</td>
            <td class="table__cart__remove">
              <div class="" @click="removeItem(index)">x</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main'

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
        products: [],
        counter: 1,
      }
    },
    methods: {
      loadImage: function(image){
        if (!image){
          return 'img/default.jpg';
        }

        return image;
      },
      quantityMinus: function(product){
        if (product.quantity > 1)
          product.quantity--;
      },
      quantityPlus: function(product){
        product.quantity++;
      },
      removeItem: function(index){
        console.log(this.products);
        this.products.splice(index,1);
        console.log(this.products);
      }
    },
    created: function(){
      var products = [];
      var data = {"code":0,"data":[{"artikul":null,"bar_code":null,"cost":550,"currency":"RUB","description":null,"id":149623112236800,"images":[{"full":null,"small":null}],"name":"Test","quantity":1001},{"artikul":null,"bar_code":14587523459,"cost":415,"currency":"RUB","description":null,"id":149881145875500,"images":[{"default":true,"full":"img/149917599470300","small":"img/thumbnail/149917599470300"}],"name":"Пластик 509","quantity":1001},{"artikul":null,"bar_code":456789,"cost":7500,"currency":"RUB","description":null,"id":149907069744900,"images":[{"full":null,"small":null}],"name":"Тестовый товар","quantity":149907064859000}],"error":null};
      for (var i = 0; i < data.data.length; i++){
        var item = data.data[i];
        products.push({
          id: item.id, 
          name: item.name, 
          article: item.artikul, 
          description: item.description, 
          price: item.cost, 
          currency: item.currency, 
          image: this.loadImage(item.images.full),
          quantity: item.quantity
        });
      }

      this.products = products;
    }
  }
</script>

<style>
  .table__cart{
    width: 100%;
  }
  .table__cart img{
    max-width: 100%;
    max-height: 100px;
  }
  .table__cart__picture{
    text-align: center;
    width: 200px;
  }
  .table__cart__quantity{
    text-align: center;
  }
  .table__cart__price{
    text-align: center;
  }
  .table__cart__quantity input{
    height: 22px;
    width: 50px;
  }
  .quantity_minus, .quantity_plus{
    background: #801f25;
    width: 22px;
    height: 22px;
    display: inline-block;
    color: #fff;
    cursor: pointer; 
    text-align: center;
  }
</style>