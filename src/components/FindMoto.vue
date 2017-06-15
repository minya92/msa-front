<template>
  <div id="find_moto">
    <a class="modal_box_close" href="javascript:void(0)"></a>
  </div>
</template>

<script>
  import {apiHTTP} from '../main.js'
  export default {
    name: 'find_moto',
    data() {
      return {
        posts: [],
        errors: []
      }
    },
    computed: {
      swiper() {
        return '';
      }
    },
    created() {
      apiHTTP.get('/getTypes')
      .then(response => {
        this.posts = response.data;
        console.log(response.data);
      }).catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal_box_close{
    background: url(../assets/image/close.svg);
    width: 30px;
    height: 30px;
    background-size: cover;
    position: absolute;
    right: 0;
    top: 0;
  }
  #find_moto{
    position: absolute;
    width: 550px;
    height: 600px;
    z-index: 100;
    left: 20px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
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
</style>
