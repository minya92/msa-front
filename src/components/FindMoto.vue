<template>
  <transition name="find-fade">
    <div id="find_moto">
      <a class="modal_box_close" @click="$emit('close')"></a>
      <h2>{{lang.findParts}}</h2>
      <div class="moto-box-selection">
        <div class="form-group">          
          <div class="title-group">{{lang.selectMark}}</div>
          <div class="prev-next">
            <div :class="['prev-result', PrevIsActive() ? '' : 'disabled']" @click="prevResult"><</div>
            <div :class="['next-result', NextIsActive() ? '' : 'disabled']" @click="nextResult">></div>
          </div>
          <div class="slider-marks">
            <div :class="['slider-mark', currentMark === index ? 'current' : '']" 
            v-for="(mark, index) in marks" 
            v-if="showMore(index)"  
            @click="selectMark(index)">
            <img :src="'img/suzuki_color.png'" :title="mark.mm_name">
          </div>
        </div>
      </div>
      <div class="form-group" v-if="models.length">          
        <div class="title-group">{{lang.selectModel}}</div>
        <div class="slider-marks">
          <div :class="['slider-mark', currentModel === index ? 'current' : '']" 
          v-for="(model, index) in models" 
          v-if="showMore(index)"  
          @click="selectModel(index)">
          <img :src="'img/suzuki_color.png'" :title="model.mm_name">
        </div>
      </div>
    </div>
    <div class="form-group" v-if="years.length">  
      <div class="title-group">{{lang.selectYear}}</div>
      <div class="years">        
        <div v-for="year in years" :class="[currentYear === year ? 'current' : '']" @click="selectYear(year)">{{year}}</div>
      </div>
    </div>
    <div class="result-count">Всего запчастей: 33</div>
    <button class="redBtn" @click="moreBtn">{{lang.moreInfo}}</button>
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
          findParts: 'Поиск запчастей',
          selectMark: 'Выберите марку:',
          selectModel: 'Выберите модель:',
          selectYear: 'Выберите год:',
          moreInfo: "Подробнее"
        },
        paramNextPrev: {
          totalProducts: 0,
          perItems: 6,
          currentItems: 0,
          indexResultItems: 1
        }
      }
    },
    created() {
      this.$apiHTTP.get('/getMarks').then(response => {
        if (response.data.code != 0){ }

          this.marks = response.data.data;

        this.paramNextPrev.totalProducts = this.marks.length;
        this.NextIsActive();
      }).catch(e => {
        console.log('error api');
      });

      this.getYears();
    },
    methods: {
      getYears: function() {
      },
      selectMark: function(item) {
        this.currentMark = item;
        this.$apiHTTP.get('/getMarks').then(response => {
          if (response.data.code != 0){ }

            this.models = response.data.data;
        }).catch(e => {
          console.log('error api');
        });
      },
      selectModel: function(item) {
        this.currentModel = item;
        this.years = [];
        var to = this.endDate;
        for (var y = this.startDate; y >= to; y--) {
          this.years.push(y);
        }
      },
      selectYear: function(item) {
        this.currentYear = item;
        console.log(this.currentYear);
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

<style scoped>
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
    top: 75px;
  }
  #find_moto:before{
    content: '';
    border: 9px solid transparent;
    border-bottom: 9px solid #fff;
    position: absolute;
    top: -18px;
    left: 45px;
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
    margin: 20px 0;
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
    margin-bottom: 30px;
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
  #find_moto button{
    width: 220px;
    height: 50px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
  }
</style>
