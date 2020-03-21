<template>
  <div id="search_form">
    <div class="search_input">
      <input
        type="text"
        v-model="searchText"
        placeholder="Поиск запчастей"
        @keyup="searchItemsCount"
        @keyup.enter="searchItems"
      />
      <label for="search" v-if="searchText.length == 0">
        <svg
          data-v-c3e4eec0=""
          version="1.1"
          role="presentation"
          width="14.857142857142858"
          height="16"
          viewBox="0 0 1664 1792"
          class="fa-icon"
        >
          <path
            d="M1152 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zM1664 1664q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"
          ></path>
        </svg>
      </label>
      <label v-else for="search" style="color: #801f25" @click="clear">
        <svg
          data-v-c3e4eec0=""
          version="1.1"
          role="presentation"
          width="12.571428571428571"
          height="16"
          viewBox="0 0 1408 1792"
          class="fa-icon"
        >
          <path
            d="M1298 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"
          ></path>
        </svg>
      </label>
      <div
        class="search_input__result"
        v-if="totalSearch > 0 && searchText.length > 0"
      >
        Найдено: {{ totalSearch }}
        <button class="btn_theme" @click="searchItems">Показать</button>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';

export default {
  name: 'search_form',
  data() {
    return {
      searchText: '',
      totalSearch: 0
    };
  },
  methods: {
    searchItemsCount: debounce(function() {
      if (this.searchText.length < 3) {
        this.totalSearch = 0;
        return;
      }

      this.$API
        .post('getItemsCount', `search_string=${this.searchText}`)
        .then(r => {
          this.totalSearch = r.data.data;
        });
    }, 1000),
    searchItems: function() {
      if (this.searchText.length == 0) return;

      this.$router.push({
        name: 'catalog',
        query: {
          search_string: this.searchText
        }
      });

      this.clear();
    },
    clear: function() {
      this.searchText = '';
    }
  }
};
</script>

<style scoped>
.search_input__result {
  position: absolute;
  background: #fff;
  left: 0;
  width: 100%;
  padding: 3px 10px;
  border: 1px solid #eee;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}
.search_input__result button {
  padding: 3px 10px;
  font-size: 12px;
}
</style>
