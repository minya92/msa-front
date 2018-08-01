<template>
  <transition name="find-fade">
    <div id="find_moto">
      <div class="find-moto__header">
        <button class="find-moto__close" @click.stop="$emit('close')"></button>
        <div class="find-moto__title">Подбор запчастей по каталогу</div>
      </div>
      <div class="find-moto__content">
        <div class="moto-box-selection">
          <div class="form-group">
            <div class="title-group">Выберите марку:</div>
            <div class="slider-marks">
              <div :class="['slider-mark', currentMark == mark.marks_models_id ? 'current' : '']"
                v-for="mark in marks"
                @click="clearModel(); currentMark = mark.marks_models_id"
                :key="mark.marks_models_id"
              >
              <img v-if="mark.thumbnail" :src="mark.thumbnail" :title="mark.mm_name">
              <div v-else>{{mark.mm_name}}</div>
            </div>
          </div>
        </div>

        <div class="form-group" v-if="models">
          <div class="title-group">Выберите модель:</div>
          <div class="slider-marks">
            <div v-for="model in models"
              :class="['slider-mark', currentModel == model.marks_models_id ? 'current' : '']"
              @click="clearYear(); currentModel = model.marks_models_id"
              :key="model.marks_models_id"
            >
            <img v-if="model.thumbnail"  :src="model.thumbnail" :title="model.mm_name">
            <div v-else>{{model.mm_name}}</div>
          </div>
        </div>
      </div>

      <div class="form-group" v-if="years && years.length > 0">
        <div class="title-group">Выберите год:</div>
        <div class="years slider-marks">
          <div v-for="year in years" 
            :class="['slider-mark', currentYear == year.marks_models_id ? 'current' : '']" 
            @click="currentYear = year.marks_models_id"
            :key="year.marks_models_id"
          >{{year.mm_name}}</div>
        </div>
      </div>
      <div class="result-count">Выбрано: {{countDetail}}</div>
      <button class="primary btn_theme search-detail" v-if="currentMark" @click.stop="showMore()">Показать</button>
    </div>
  </div>
</div>
  </transition>
</template>

<script>
  export default {
    name: 'find_moto',
    data() {
      return {
        currentMark: null,
        currentModel: null,
        currentYear: null,
        years: null,
        marks: null,
        models: null,
        paramNextPrev: {
          totalProducts: 0,
          perItems: 6,
          currentItems: 0,
          indexResultItems: 1
        },
        countDetail: 0,
        currentIdByQueryMark: ''
      }
    },
    mounted() {    
      this.currentMark = this.$route.query.mark || null;
      this.currentModel = this.$route.query.model || null;
      this.currentYear = this.$route.query.year || null;

      this.$API.get('/getMarks').then(response => {
        if (response.data.code != 0){ }
          this.marks = response.data.data;

        this.paramNextPrev.totalProducts = this.marks ? this.marks.length : 0;
        //this.NextIsActive();
      })
    },
    watch: {
      '$route' (to, from) {
        this.getItemsMaxMinCost();
      },
      currentMark(val) {
        if (!val) return;

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
    methods: {
      clearModel() {
        this.models = null;
        this.currentModel = null;

        this.clearYear();
      },
      clearYear() {
        this.years = null;
        this.currentYear = null;
      },
      totalDetails: function(param){
        this.$API.get(`getItemsCount?mark_model=${param}`).then(r => {
          this.countDetail = r.data.data
        })
      },

      NextIsActive: function(){
        return (this.paramNextPrev.perItems*this.paramNextPrev.indexResultItems < this.paramNextPrev.totalProducts);
      },
      PrevIsActive: function(){
        return (this.paramNextPrev.indexResultItems > 1);
      },
      nextResult: function(){
        if (this.NextIsActive()){
          this.paramNextPrev.currentItems = this.paramNextPrev.perItems*this.paramNextPrev.indexResultItems;
          this.paramNextPrev.indexResultItems++;
        }
      },
      prevResult: function(){
        if (this.PrevIsActive()){
          this.paramNextPrev.currentItems -= this.paramNextPrev.perItems;
          this.paramNextPrev.indexResultItems--;
        }
      },
      // showMore: function(index){
      //   return index >= this.paramNextPrev.currentItems && index < this.paramNextPrev.perItems*this.paramNextPrev.indexResultItems;
      // }
      showMore() {
        let query = Object.assign({}, this.$route.query);
        console.log(query)
        this.currentYear ? query.year = this.currentYear : delete query.year;
        this.currentModel ? query.model = this.currentModel : delete query.model;
        this.currentMark ? query.mark = this.currentMark : delete query.mark;
        console.log(query)
        
          this.$router.push({
          path: `/catalog`, 
          query: query
        });
        
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>
  .find-moto__header {
    background: #801f25;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: #fff;
  }
  .find-moto__title {
    font-size: 1.8em;
    margin-left: 20px;
  }
  .find-moto__close{
    background: url(../assets/img/close.svg);
    margin: 6px;
    border: 2px solid #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-size: cover;
  }
  #find_moto{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: #fff;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }
  .find-moto__content {
    padding: 20px;
    overflow: auto;
  }
  .find-fade-enter-active {
    transition: all .3s ease;
  }
  .find-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .find-fade-enter, .find-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
  .title-group{
    padding-bottom: 15px;
  }
  .slider-mark img{
    max-height: 100%;
    max-width: 100%;
  }
  .slider-marks{
    margin-right: -40px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
  }
  .slider-mark{
    display: flex;
    width: 16.66%;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #e7e7e7;
  }
  .years .slider-mark{
    width: 10%;
  }
  .slider-mark:hover, .slider-mark.current{
    border: 1px solid #801f25;
    cursor: pointer;
  }
  .prev-next{
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
  }
  .prev-result, .next-result{
    background: #801f25;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .prev-result:not(.disabled):hover, .next-result:not(.disabled):hover{
    box-shadow: 0 0px 6px rgba(103, 70, 70, 0.7);
    cursor: pointer;
  }
  .prev-result.disabled, .next-result.disabled{
    background: #fff;
    color: #000;
    border: 1px solid #000;
  }
  .prev-result{
    margin-right: 5px;
  }
  .result-count{
    font-weight: 600;
    font-size: 30px;
    padding: 10px 0
  }
  #find_moto .search-detail{
    width: 220px;
    height: 50px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    justify-content: center;
    text-decoration: none;
    align-items: center;
  }
  
  @media screen and (max-width: 960px) {
    .slider-mark{
      width: 20%;
    }
  }
  @media screen and (max-width: 768px) {
    .slider-mark{
      width: 25%;
    }
  }
  @media screen and (max-width: 480px) {
    .find-moto__content {
      padding: 10px;
      overflow: auto;
    }
    .find-moto__title {
      font-size: 1.4em;
    }
    .slider-mark{
      width: 33.33%;
      font-size: 11px;
    }
    .years .slider-mark{
      width: auto;
    }
    .result-count {
      font-size: 18px;
    }
    #find_moto .search-detail{
      font-size: 12px;
      padding: 10px;
      height: auto;
      width: 100%;
    }
    .title-group {
      padding-bottom: 10px;
    }
    .form-group {
      margin-bottom: 10px;
    }
  }
</style>
