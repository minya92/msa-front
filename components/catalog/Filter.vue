<template>
  <div class="filter sort-section" v-if="marks">
    <div class="filter__title color--primary">Фильтр</div>

    <div class="filter-row">
      <label>Цена</label>
      <vue-slider
        class="vsc"
        @change="vscChange"
        v-bind="dataSlide"
        v-model="dataSlide.value"
      />
      <div class="filter-price__inputs">
        <input v-model="dataSlide.value[0]" /> -
        <input v-model="dataSlide.value[1]" />
      </div>
    </div>

    <div class="filter-row">
      <label>Марка</label>
      <select v-model="currentMark" @change="clearModel()">
        <option selected disabled value="">Выберите марку</option>
        <option
          v-for="mark in marksActive"
          :value="mark.marks_models_id"
          :key="mark.marks_models_id"
          >{{ mark.mm_name }}</option
        >
      </select>
    </div>

    <div class="filter-row" v-if="models && models.length > 0 && currentMark">
      <label>Модель</label>
      <select v-model="currentModel" @change="clearYear()">
        <option selected disabled value="">Выберите модель</option>
        <option
          v-for="model in modelsActive"
          :value="model.marks_models_id"
          :key="model.marks_models_id"
          >{{ model.mm_name }}</option
        >
      </select>
    </div>

    <div class="filter-row" v-if="years && years.length > 0 && currentModel">
      <label>Год</label>
      <select v-model="currentYear">
        <option selected disabled value="">Выберите год</option>
        <option
          v-for="year in yearsActive"
          :value="year.marks_models_id"
          :key="year.marks_models_id"
          >{{ year.mm_name }}</option
        >
      </select>
    </div>
    <button class="primary btn_theme" v-if="currentMark" @click="showMore()">
      Показать
    </button>
    <button
      class="primary btn_theme_white"
      v-if="currentMark"
      @click="clearFilter()"
    >
      Очистить
    </button>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import { apiFactory } from '@/api';
const apiCatalog = apiFactory.get('catalog');

export default {
  data: () => ({
    currentMark: '',
    currentModel: '',
    currentYear: '',
    years: null,
    marks: null,
    models: null,
    countDetail: 0,
    dataSlide: {
      value: [0, 0],
      contained: true,
      width: '100%',
      height: 2,
      dotSize: 10,
      min: 0,
      max: 0,
      interval: 1,
      tooltip: 'none',
      railStyle: { backgroundColor: '#e7e7e7' },
      dotStyle: { backgroundColor: '#801f25' },
      processStyle: { backgroundColor: '#801f25' }
    }
  }),

  computed: {
    marksActive() {
      return this.marks.filter(x => x.active);
    },
    modelsActive() {
      return this.models.filter(x => x.active);
    },
    yearsActive() {
      return this.years.filter(x => x.active);
    }
  },

  methods: {
    vscChange: debounce(function(e) {
      let query = Object.assign({}, this.$route.query);
      if (e[0] >= 0) query.cost_min = e[0];
      if (e[1] >= 0) query.cost_max = e[1];
      if (e[0] >= 0) query.page = 1;

      this.$router.push({ query: query });
    }, 1000),
    async getItemsMaxMinCost() {
      let query = {};

      if (typeof this.$route.params.types != 'undefined') {
        query.types = this.$route.params.types;
      }

      try {
        let minmax = await apiCatalog.getItemsMaxMinCost(query);
        this.dataSlide.value = [
          typeof this.$route.query.cost_min == 'undefined'
            ? (this.dataSlide.min = minmax.min_cost)
            : (this.dataSlide.min = Number(this.$route.query.cost_min)),
          typeof this.$route.query.cost_max == 'undefined'
            ? (this.dataSlide.max = minmax.max_cost)
            : (this.dataSlide.max = Number(this.$route.query.cost_max))
        ];

        this.dataSlide.min = minmax.min_cost;
        this.dataSlide.max = minmax.max_cost;
      } catch {}
    },
    async totalDetails(param) {
      try {
        this.countDetail = await apiCatalog.getItemsCount({
          mark_model: param
        });
      } catch {}
    },
    clearFilter() {
      this.$router.push({ query: null });

      this.currentMark = null;
      this.currentModel = null;
      this.currentYear = null;
    },
    clearModel() {
      this.models = null;
      this.currentModel = null;

      this.clearYear();
    },
    clearYear() {
      this.years = null;
      this.currentYear = null;
    },
    showMore() {
      let query = Object.assign({}, this.$route.query);
      this.currentYear ? (query.year = this.currentYear) : delete query.year;
      this.currentModel
        ? (query.model = this.currentModel)
        : delete query.model;
      this.currentMark ? (query.mark = this.currentMark) : delete query.mark;

      this.$router.push({
        path: this.$route.path,
        query: query
      });
    },
    async getMarks() {
      await this.getItemsMaxMinCost();
      this.$route.query.year ||
        this.$route.query.model ||
        this.$route.query.mark;

      this.currentMark = this.$route.query.mark || null;
      this.currentModel = this.$route.query.model || null;
      this.currentYear = this.$route.query.year || null;

      try {
        this.marks = await apiCatalog.getMarks();
      } catch {}
    },
    async getCurrentMark(val) {
      this.totalDetails(val);

      try {
        this.models = await apiCatalog.getModels(val);
      } catch {}
    },
    async getCurrentModel(val) {
      if (!val) return;

      this.totalDetails(val);

      try {
        this.years = await apiCatalog.getYears(val);
      } catch {}
    }
  },
  watch: {
    '$route.query'(to, from) {
      this.getMarks();
    },
    currentMark(val) {
      if (!val) return;

      this.getCurrentMark(val);
    },
    async currentModel(val) {
      if (!val) return;

      this.getCurrentModel(val);
    },
    currentYear(val) {
      if (!val) return;

      this.totalDetails(val);
    }
  },

  mounted() {
    this.getItemsMaxMinCost();
    this.getMarks();
  }
};
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
.filter-row {
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
