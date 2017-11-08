<template>
  <transition name="modal-fade" mode="out-in">
    <div class="modal-frame" @click.prevent="$emit('close')">
      <div class="modal-content-section" @click.stop>
        <a class="modal_box_close" @click="$emit('close')"></a>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal-frame',
    data() {
      return {
      }
    }
  }
</script>

<style>
  .modal-frame{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    text-align: center;
    z-index: 100;
  }
  .modal-frame img{
    max-width: 100%;
    max-height: 100%;
  }
  .modal-frame:after {
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
    content: '';
  }
  .modal-content-section{
    display: inline-block;
    position: relative;
    box-shadow: 0 10px 20px rgba(0,0,0,0.4);
    background: #fff;
    vertical-align: middle;    
    text-align: left;
    padding: 20px 40px;
    /*width: 420px;*/
    max-height: 96%;
    max-width: 96%;
    overflow: auto;
  }
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
  .modal-frame .head-text{
    font-size: 24px;
    padding: 12px 0;
    text-align: center;
  }
  .modal-frame input, .modal-frame button{
    width: 340px;
    height: 30px;
    display: block;
    padding: 0 10px;
  }
  .modal-frame input[type='text']{
    padding: 0 15px;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .modal-frame input[type='password']{
    padding: 0 15px;
    font-size: 30px;
    letter-spacing: 5px;
  }
  .modal-frame button{
    text-transform: uppercase;
    font-size: 14px;
    margin: 10px 0;
  }
  .modal-frame label{
    display: block;
    padding-bottom: 5px; 
  }
  .form-group{
    margin: 5px 0;
  }
  @media screen and (max-width: 375px) {
    .modal-content-section{
      padding: 10px;
    max-height: 96%;
    max-width: 90%;
    }
    .modal-frame input, .modal-frame button{
      width: 100%;
    }
  }
</style>
