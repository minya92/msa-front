<template>
  <transition name="modal-fade" mode="out-in">
    <div class="modal-frame">
      <div class="modal-content-section">
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
    width: 420px;
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
  .span-grey{
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  .text-error{
    font-size: 12px;
    color: #999;
  }
  .modal-frame input{
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
  .modal-frame input[type='button']{
    border: 0;
    background: #801f25;
    text-transform: uppercase;
    font-size: 14px;
    color: #fff;
    outline: 0;
    display: block;
    margin: 10px 0;
  }
  .modal-frame label{
    display: block;
    padding-bottom: 5px; 
  }
  .form-group{
    margin: 5px 0;
  }
  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity .7s
  }
  .modal-fade-enter, .modal-fade-leave-to {
    opacity: 0
  }
</style>
