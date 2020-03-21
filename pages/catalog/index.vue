<template>
  <div>
    <div class="content-fluid catalog-section">
      <aside>
        <Categories :categories="categories" />
        <FilterCatalog />
      </aside>

      <div>
        <catalog-section
          sortBlock
          :products="products"
          :totalProducts="totalProducts"
          paginationBlock
        ></catalog-section>
      </div>
    </div>
    <div class="content-fluid">
      <!--<recent-view></recent-view>-->
    </div>
    <grey-marks class="container-fluid" :items="greyMarks"></grey-marks>
    <action-blocks class="container-fluid"></action-blocks>
  </div>
</template>

<script>
import { apiFactory } from '@/api';
const apiCatalog = apiFactory.get('catalog');

//import RecentView from '@/components/catalog/RecentView';
import GreyMarks from '@/components/catalog/GreyMarks';
import ActionBlocks from '@/components/catalog/ActionBlocks';
import Categories from '@/components/catalog/Categories';
import FilterCatalog from '@/components/catalog/Filter';
import CatalogSection from '@/components/catalog/CatalogSection';

export default {
  components: {
    //RecentView,
    GreyMarks,
    ActionBlocks,
    Categories,
    FilterCatalog,
    CatalogSection
  },

  watchQuery: true,

  async asyncData({ store, route }) {
    let greyMarks = [];
    let categories = [];
    let imgModelsWhite = [];
    try {
      [greyMarks, categories] = await Promise.all([
        apiCatalog.getMarksForBaner(3),
        apiCatalog.getTypes()
      ]);

      categories = categories.map(item => ({
        id: item.items_types_id,
        parentType: item.parent_type,
        name: item.type_description,
        url: item.items_types_id
      }));
    } catch {}

    /////
    let query = Object.assign(
      {
        pageSize: 12
      },
      route.query
    );

    let currentPage = route.query.page ? Number(route.query.page) : 1;
    query.page = currentPage;

    let products = [];
    let totalProducts = 0;
    //     this.$store.dispatch('showLoading');
    try {
      totalProducts = await apiCatalog.getItemsCount(query);
      let res = await apiCatalog.getItems(query);
      for (var i = 0; i < res.length; i++) {
        var item = res[i];
        products.push({
          id: item.cost_id,
          name: item.item_name,
          article: item.artikul,
          description: item.item_description,
          price: item.item_cost,
          currency: item.currency,
          image: store.state.baseUrl + item.thumbnail
        });
      }
    } catch (exp) {
      console.log(exp);
    } finally {
      //     this.$store.dispatch('hideLoading');
    }

    ////

    return { greyMarks, categories, totalProducts, products };
  }
};
</script>
