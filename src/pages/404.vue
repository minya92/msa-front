<template>
  <div id="errorBox">
    <img src="img/404_pic.png">
    <span>Запрашиваемый документ<br>не найден</span>
  </div>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      MainLayout
    }
  }
</script>
<style>
  #errorBox{
    width: 500px;
    margin: auto;
    font-size: 34px;
    font-weight: bold;
    text-align: center;
  }
  #errorBox img{
    max-width: 100%;
  }
</style>