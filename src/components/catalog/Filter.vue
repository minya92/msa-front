<template>
  <div class="filter sort-section" v-if="marks">
    <div class="filter__title color--primary">Фильтр</div>


  <div class="filter-row">
    <label>Цена</label> 
    <vsc 
      class="vsc" 
      @callback="vscChange" 
      v-bind="dataSlide" 
      v-model="dataSlide.value" 
      v-show="dataSlide.max" 
    />
    <div class="filter-price__inputs">
      <input v-model="dataSlide.value[0]"> - <input v-model="dataSlide.value[1]">
    </div>
  </div>

    <div class="filter-row">
      <label>Марка</label>
      <select v-model="currentMark" @change="clearModel()">
        <option selected disabled value="">Выберите марку</option>
        <option 
          v-for="mark in marks" 
          v-if="mark.active" 
          :value="mark.marks_models_id"
          :key="mark.marks_models_id"
        >{{ mark.mm_name }}</option>
      </select>
    </div>
    
    <div class="filter-row" v-if="models && models.length > 0 && currentMark">
      <label>Модель</label>
      <select v-model="currentModel" @change="clearYear()">
        <option selected disabled value="">Выберите модель</option>
        <option 
          v-for="model in models" 
          v-if="model.active"
          :value="model.marks_models_id"
          :key="model.marks_models_id"
        >{{ model.mm_name }}</option>
      </select>
    </div>
    
    <div class="filter-row" v-if="years && years.length > 0 && currentModel">
      <label>Год</label>
      <select v-model="currentYear">
        <option selected disabled value="">Выберите год</option>
        <option 
          v-for="year in years" 
          :value="year.marks_models_id"
          :key="year.marks_models_id"
        >{{ year.mm_name }}</option>
      </select>
    </div>
    <button class="primary btn_theme" v-if="currentMark" @click="showMore()">Показать</button>
    <button class="primary btn_theme_white" v-if="currentMark" @click="clearFilter()">Очистить</button>
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
  data: () => ({
    currentMark: '',
    currentModel: '',
    currentYear: '',
    years: null,
    marks: null,
    models: null,
    countDetail: 0,
    dataSlide:{
      value: [0, 0],
      width: "100%",
      height: 2,
      dotSize: 10,
      min: this.minPrice,
      max: this.maxPrice,
      interval: 1,
      tooltip: false,
      formatter: "{value} руб.",
      bgStyle: { "backgroundColor": "#e7e7e7" },
      sliderStyle: { "backgroundColor": "#801f25" },
      processStyle: { "backgroundColor": "#801f25" }
    }
  }),
  methods: {
    vscChange: _.debounce(function (e) {
      let query = Object.assign({}, this.$route.query);
      if (e[0] >= 0)  query.cost_min = e[0];
      if (e[1] >= 0)  query.cost_max = e[1];
      if (e[0] >= 0)   query.page = 1;

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
    totalDetails: function(param){
      this.$API.get(`getItemsCount?mark_model=${param}`).then(r => {
        this.countDetail = r.data.data;
      });
    },
    clearFilter() {
      this.$router.push({query: null})
      
      this.currentMark = null;
      this.currentModel = null;
      this.currentYear = null;
    },
    clearModel() {
      this.model = null;
      this.currentModel = null;

      this.clearYear();
    },
    clearYear() {
      this.years = null;
      this.currentYear = null;
      //delete this.$route.query.year;
    },
    showMore() {
      let query = Object.assign({}, this.$route.query);
      this.currentYear ? query.year = this.currentYear : delete query.year;
      this.currentModel ? query.model = this.currentModel : delete query.model;
      this.currentMark ? query.mark = this.currentMark : delete query.mark;

      this.$router.push({
        path: `/catalog`, 
        query: query
      })
    }
  },
  watch: {
    '$route.query' (to, from) {
      this.getItemsMaxMinCost();
      this.$route.query.year || this.$route.query.model || this.$route.query.mark
      
      this.currentMark = this.$route.query.mark || null;
      this.currentModel = this.$route.query.model || null;
      this.currentYear = this.$route.query.year || null;

      this.$API.get('/getMarks').then(response => {
        if (!response.data.data) return;
        
        this.marks = response.data.data;
      });
    },
    currentMark(val) {
      this.totalDetails(val)

      this.$API.get('/getModels/'+val).then(response => {
        this.models = response.data.data;
      });
    },
    currentModel(val) {
      if (!val) return;

      this.totalDetails(val);

      this.$API.get('/getYears/'+val).then(response => {
        this.years = response.data.data;
      });
    },
    currentYear(val) {
      if (!val) return;

      this.totalDetails(val)
    }
  },
  mounted() {
    this.getItemsMaxMinCost();
    this.$route.query.year || this.$route.query.model || this.$route.query.mark
    
    this.currentMark = this.$route.query.mark || null;
    this.currentModel = this.$route.query.model || null;
    this.currentYear = this.$route.query.year || null;

    this.$API.get('/getMarks').then(response => {
      if (!response.data.data) return;
      
      this.marks = response.data.data;
    })
  }
}
</script>

<style scoped>
.filter {
  border: 1px solid #ededed;
  border-radius: 3px;
  padding: 10px;
}
.filter__title {
  font-weight: 600;
  margin-bottom: 15px;
  font-size: 16px;
}
.filter label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}
.filter button {
  width: 100%;
}
select {
  width: 100%;
}
.filter-row{
  margin-bottom: 15px;
}

.filter-price__inputs {
  display: flex;
  justify-content: space-between;
}
.filter .vsc {
  margin-bottom: 10px;
}
.filter-price__inputs input {
  max-width: 80px;
  padding: 5px 10px;
  text-align: center;
}
</style>