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
      <label for="search" v-if="searchText.length == 0"><icon name="search"></icon></label>
      <label 
        v-else
        for="search" 
        style="color: #801f25"
        @click="clear"><icon name="close"></icon></label>
      <div 
        class="search_input__result" 
        v-if="totalSearch > 0 && searchText.length > 0"
      >Найдено: {{totalSearch}}
        <button class="btn_theme" @click="searchItems">Показать</button>
      </div>
    </div>
  </div>
</template>

<script>
  import lodash from 'lodash'

  export default {
    name: 'search_form',
    data() {
      return {
        searchText: '',
        totalSearch: 0
      }
    },
    methods: {
      searchItemsCount: _.debounce(function(){
        if (this.searchText.length < 3) {
          this.totalSearch = 0;
          return;
        }

        this.$API.post('getItemsCount', `search_string=${this.searchText}`).then(r => {
          this.totalSearch = r.data.data;
        });
      }, 1000),
      searchItems: function(){
        if (this.searchText.length == 0) return;
        
        this.$router.push(
          {
            name: 'catalog', 
            query:{
              search_string: this.searchText
            }
          }
        );
      },
      clear: function(){
        this.searchText = '';
      }
    }
  }
</script>

<style scoped>
.search_input__result{
  position: absolute;
  background: #fff;
  left: 0;
  width: 100%;
  padding: 3px 10px;
  border: 1px solid #eee;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}
.search_input__result button{
  padding: 3px 10px;
  font-size: 12px;
}
</style>
