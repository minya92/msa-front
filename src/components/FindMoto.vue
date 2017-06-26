<template>
  <transition name="find-fade">
    <div id="find_moto">
      <a class="modal_box_close" @click="$emit('close')"></a>
      <h2>Поиск запчастей</h2>
      <div class="moto-box-selection">
        <div class="">
          <div class="form-group">          
            <label>Выберите год</label>
            <select class="form-control year">
              <option v-for="year in years" :value="year">{{year}}</option>
            </select>
          <div class="form-group">          
            <label>Выберите марку</label>
            <select class="form-control marks">
              <option v-for="mark in marks" :value="mark">{{mark}}</option>
            </select>
          </div>
          </div>
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
        years: [],
        marks: [],
        startDate: '2017',
        endDate: '1950',
        error: false
      }
    },
    created() {
      this.$apiHTTP.get('/getMarks')
      .then(response => {
        if (response.data.code != 0){

        }
        var mks = response.data.data;
        for( var m = 0; m < mks.length; m++){
          if (mks[m].active){
            //mks[m].marks_models_id mks[m].mm_name
            this.marks.push(mks[m].mm_name);
          }
        }
      }).catch(e => {
        console.log('error api');
      });

      this.getYears();
    },
    methods: {
      getYears: function() {
        var to = this.endDate;
        for (var y = this.startDate; y >= to; y--) {
          this.years.push(y);
        }
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
    width: 550px;
    height: 600px;
    z-index: 100;
    left: 20px;
    background: #fff;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    top: 75px;
    bottom: 0;
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
    margin: 25px 0;
  }
</style>
