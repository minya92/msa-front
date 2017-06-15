<template>
  <main-layout>
  <div class="contacts">
    <div class="container-fluid">
      <yandex-map :coords="[54.62896654088406, 39.731893822753904]"
      zoom="12"
      style="height: 400px;">

      <ymap-marker marker-type="placemark"
      :coords="[54.62896654088406, 39.731893822753904]"
      hint-content="Hint content 1"
      :balloon="{header: 'header', body: 'body', footer: 'footer'}"
      :icon="{color: 'green', glyph: '../assets/image/map_pin.svg'}">
    </ymap-marker>
  </yandex-map>
    </div>
  </div>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      MainLayout
    }
  }
</script>