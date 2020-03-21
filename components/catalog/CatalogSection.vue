<template>
  <div class="content-section" v-if="products.length > 0">
    <div class="sort-section" v-if="sortBlock">
      Сортировать по:
      <select v-model="selectedSort" @change="changePageFromSort">
        <option value="" selected>по добавлению</option>
        <option value="name">наименованию</option>
        <option value="cost">возрастанию цены</option>
        <option value="costDesc">убыванию цены</option>
      </select>
    </div>
    <div class="products-section">
      <AddToCart
        v-if="showCart"
        @close="showCart = false"
        :product="product"
      ></AddToCart>
      <catalog-item
        v-for="product in products"
        :product="product"
        @addToCart="addToCart"
        :key="product.id"
      ></catalog-item>
    </div>
    <pagination
      :current="currentPage"
      :total="totalProducts"
      :pageSize="pageSize"
      @page-changed="changePage"
      buttonUp
    ></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import AddToCart from '@/components/AddToCart';
import CatalogItem from '@/components/catalog/CatalogItem';
export default {
  components: {
    Pagination,
    AddToCart,
    CatalogItem
  },
  props: {
    sortBlock: {
      type: Boolean,
      default: false
    },
    paginationBlock: {
      type: Boolean,
      default: false
    },
    totalProducts: {
      type: Number,
      required: true
    },
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedSort: '',
      showCart: false,
      pageSize: 12,
      currentPage: 1
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.currentPage = this.$route.query.page
          ? Number(this.$route.query.page)
          : 1;
      }
    }
  },
  methods: {
    changePage: function(page) {
      let query = Object.assign({}, this.$route.query);
      query.sort = this.selectedSort;
      query.page = page;

      this.$router.push({ query: query });
    },
    changePageFromSort: function() {
      let query = Object.assign({}, this.$route.query);
      query.sort = this.selectedSort;
      query.page = 1;

      this.$router.push({ query: query });
    },

    filterQuery() {
      let query = '?';
      window.scrollTo(0, 0);
      if (typeof this.$route.query.cost_min != 'undefined') {
        query += `&cost_min=${this.$route.query.cost_min}`;
      }
      if (typeof this.$route.query.cost_max != 'undefined') {
        query += `&cost_max=${this.$route.query.cost_max}`;
      }
      if (typeof this.$route.params.types != 'undefined') {
        query += `&types=%5B${this.$route.params.types}%5D`;
      }
      //запрос по id года, модели и марки
      let idModel =
        this.$route.query.year ||
        this.$route.query.model ||
        this.$route.query.mark;
      if (!!idModel) {
        query += `&mark_model=${idModel}`;
      }

      if (typeof this.$route.query.search_string != 'undefined') {
        query += `&search_string=${this.$route.query.search_string}`;
      }
      query += `&page=${this.currentPage}&pageSize=${this.pageSize}`;
      query += `&order=${this.selectedSort}`;

      return query;
    },
    addToCart: function(product) {
      this.product = product;
      this.$store.dispatch('addToCart', { product: product, quantity: 1 });
      this.showCart = true;
    }
  }
};
</script>

<style scoped>
.products-section {
  /*margin-right: -40px;*/
  display: flex;
  flex-wrap: wrap;
}
</style>
