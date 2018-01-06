<template>
  <div class="filter-price">
    <span style="margin-right: 25px;">Цена:</span> 
    <vsc 
      class="vsc" 
      @callback="vscChange" 
      v-bind="dataSlide" 
      v-model="dataSlide.value" 
      v-show="dataSlide.max && dataSlide.min" 
    />
  </div>
</template>

<script>
import lodash from 'lodash'
import vsc from 'vue-slider-component'

export default {
  components: {
    vsc
  },
  props: {
    minPrice: {
      type: Number,
      default: 0
    },
    maxPrice: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      dataSlide:{
        value: [0, 0],
        width: "100%",
        height: 2,
        dotSize: 10,
        min: this.minPrice,
        max: this.maxPrice,
        interval: 1,
        tooltip: "always",
        formatter: "{value} руб.",
        bgStyle: { "backgroundColor": "#e7e7e7" },
        sliderStyle: { "backgroundColor": "#801f25" },
        tooltipStyle: { "backgroundColor": "#fff", 'color': '#000', 'border': '0'},
        processStyle: { "backgroundColor": "#801f25" }
      }
    }
  },
  methods: {
    vscChange: _.debounce(function (e) {
      let query = Object.assign({}, this.$route.query);
      if (e[0] != 0)  query.cost_min = e[0];
      if (e[1] != 0)  query.cost_max = e[1];
      if (e[0] != 0)   query.page = 1;

      this.$router.push({query: query})
    }, 1000),
    getItemsMaxMinCost: function(){
      let query = ''

      if (typeof this.$route.params.types != 'undefined'){
        query += `?types=%5B${this.$route.params.types}%5D`
      }

      this.$API.get('getItemsMaxMinCost'+query).then(r => {
        this.dataSlide.value = [
          typeof this.$route.query.cost_min == 'undefined' ? this.dataSlide.min = r.data.data.min_cost : this.dataSlide.min = Number(this.$route.query.cost_min),
          typeof this.$route.query.cost_max == 'undefined' ? this.dataSlide.max = r.data.data.max_cost : this.dataSlide.max = Number(this.$route.query.cost_max)
        ];

        this.dataSlide.min = r.data.data.min_cost;
        this.dataSlide.max = r.data.data.max_cost;
      })
    },
  },
  watch: {
    '$route' (to, from) {
      this.getItemsMaxMinCost();
    }
  },
  mounted() {
    this.getItemsMaxMinCost();
  }
}
</script>

<style scoped>
.filter-price {
  max-width: 560px;
  width: 100%;
  display: flex;
  align-items: center;
}
.filter-section .vsc{
  margin-right: 40px;
}
.vue-slider-tooltip-wrap{
  top: 0 !important;
}
.vue-slider-tooltip:before{
  display: none !important;
}
</style>