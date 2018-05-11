<template>
  <transition name="find-fade">
    <div id="find_moto">
      <h2>{{lang.findParts}}</h2>
      <div class="moto-box-selection">
        <div class="form-group">
          <div class="title-group">{{lang.selectMark}}</div>
          <div class="slider-marks">
            <div :class="['slider-mark', currentMark === mark.marks_models_id ? 'current' : '']"
            v-for="(mark, index) in marks"
            @click="selectMark(mark.marks_models_id)">
            <img v-if="mark.thumbnail" :src="mark.thumbnail" :title="mark.mm_name">
            <div v-else>{{mark.mm_name}}</div>
          </div>
        </div>
      </div>
      <div class="form-group" v-if="models.length">
        <div class="title-group">{{lang.selectModel}}</div>
        <div class="slider-marks">
          <div :class="['slider-mark', currentModel === model.marks_models_id ? 'current' : '']"
          v-for="(model, index) in models"

          @click="selectModel(model.marks_models_id)">
          <img v-if="model.thumbnail"  :src="model.thumbnail" :title="model.mm_name">
          <div v-else>{{model.mm_name}}</div>
        </div>
      </div>
    </div>
    <div class="form-group" v-if="years.length">
      <div class="title-group">{{lang.selectYear}}</div>
      <div class="years">
        <div v-for="year in years" :class="[currentYear === year ? 'current' : '']" @click="selectYear(year)">{{year.mm_name}}</div>
      </div>
    </div>
    <div class="result-count">Выбрано: {{countDetail}}</div>
    <router-link class="btn_theme search-detail"  :to="'/catalog/search='+currentIdByQueryMark">{{lang.moreInfo}}</router-link>
  </div>
</div>
</transition>
</template>

<script>
  export default {
    name: 'find_moto',
    data() {
      return {
        currentMark: '',
        currentModel: '',
        currentYear: '',
        years: [],
        marks: [],
        models: [],
        startDate: '2017',
        endDate: '1990',
        findResultParts: 0,
        lang: {
          findParts: 'Подбор запчастей по каталогу',
          selectMark: 'Выберите марку:',
          selectModel: 'Выберите модель:',
          selectYear: 'Выберите год:',
          moreInfo: "Открыть"
        },
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
    created() {
      this.$API.get('/getMarks').then(response => {
        if (response.data.code != 0){ }
          this.marks = response.data.data;

        this.paramNextPrev.totalProducts = this.marks.length;
        //this.NextIsActive();
      })
    },
    methods: {
      selectMark: function(marksModelsId) {
        this.currentMark = marksModelsId
        this.currentIdByQueryMark = marksModelsId
        this.years = []
        this.totalDetails(this.currentMark)

        this.$API.get('/getModels/'+marksModelsId).then(response => {
          if (response.data.code != 0){ }

          this.models = response.data.data
        })
      },
      selectModel: function(marksModelsId) {
        this.currentModel = marksModelsId
        this.currentIdByQueryMark = marksModelsId
        this.totalDetails(this.currentModel)

        this.$API.get('/getYears/'+marksModelsId).then(response => {
          if (response.data.code != 0){ }

          this.years = response.data.data;
        })
      },
      selectYear: function(item) {
        this.currentYear = item;
        this.currentIdByQueryMark = item.marks_models_id

        this.totalDetails(this.currentIdByQueryMark)
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
      showMore: function(index){
        return index >= this.paramNextPrev.currentItems && index < this.paramNextPrev.perItems*this.paramNextPrev.indexResultItems;
      },
      moreBtn: function(){
        alert("more");
      }
    }
  }
</script>

<style>
  .modal_box_close{
    background: url(../assets/img/close.svg);
    width: 30px;
    height: 30px;
    background-size: cover;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  #find_moto{
    position: absolute;
    width: 760px;
    padding: 20px;
    z-index: 100;
    background: #fff;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    top: 69px;
    display: none;
    border: 1px solid #eee;
  }
  #find_moto:after{
    content: '';
    border: 9px solid transparent;
    border-bottom: 9px solid #fff;
    position: absolute;
    top: -18px;
    left: 45px;
  }
  #find_moto:before{
    content: '';
    border-top: 9px solid transparent;
    position: absolute;
    display: block;
    width: 100%;
    top: -10px;
    left: 0;
  }
  #show-modal-findmoto:hover #find_moto{
    display: block;
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
  #find_moto h2{
    text-align: center;
    font-size: 34px;
  }
  .years{
    display: flex;
    flex-wrap: wrap;
  }
  .years div{
    padding: 3px;
    margin: 3px;
    background: #e7e7e7;
  }
  .years>div:hover, .years>div.current{
    background: #801f25;
    color: #fff;
  }
  .form-group{
    position: relative;
    margin-bottom: 15px;
  }
  .title-group{
    padding-bottom: 15px;
  }
  .slider-mark img{
    max-height: 100%;
    max-width: 100%;
  }
  .form-group .slider-marks{
    margin-right: -40px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
  }
  .form-group .slider-mark{
    display: flex;
    width: 16.66%;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #e7e7e7;
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
  .next-result{

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
  
  @media screen and (max-width: 480px) {
    #find_moto{
      width: 450px;
      padding: 10px;
    }
  }
  @media screen and (max-width: 375px) {
    #find_moto{
      width: 300px;
      left: -10px;
    }
    #find_moto h2 {
      font-size: 24px;
      margin: 10px 0;
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
    .form-group .slider-mark{
      margin-bottom: 5px;
      font-size: 11px;
      padding: 5px;
      width: 33.33%;
    }
    .title-group {
      padding-bottom: 10px;
    }
    .form-group {
      margin-bottom: 10px;
    }
  }
</style>
