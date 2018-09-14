<template>
  <main-layout>
    <div class="container-fluid">
      <h1>{{$route.meta.title}}</h1>
      <yandex-map :coords="coord"
        zoom="14"
        style="height: 400px;"
        :placemarks="placemarks"
      >
      </yandex-map>

      <p><strong>Адрес: </strong>Забайкальск, ул. Полетная, 1</p>
      <p><strong>Телефон: </strong>+7 (910) 684-44-88</p>
    </div>
  </main-layout>
</template>

<script>
  import yandexMap from 'vue-yandex-maps';
  import MainLayout from '@/layouts/Main.vue'

  export default {
    components: {
      MainLayout, yandexMap
    },
    data(){
      return {
        coord: [49.650584, 117.329040],
        placemarks: [
          {
            coords: [49.650584, 117.329040],
              markerType: 'placemark',
              icon: {content: '../assets/img/map_pin.svg', color: 'green', glyph: '../assets/img/map_pin.svg'},
            properties: {
              hintContent: 'Забайкальск, ул. Полетная, 1',
              markerType: 'placemark',
              balloon: {header: 'header', body: 'body', footer: 'footer'},
              icon: {content: '../assets/img/map_pin.svg', color: 'green', glyph: '../assets/img/map_pin.svg'}
            },
            options: {
              layout: 'default#imageWithContent',
              imageHref: '../assets/img/map_pin.svg',
              imageSize: [43, 55],
              imageOffset: [-22,-55]
            },
            clusterName: "1",
            callbacks: { click: function() {} }
          }
        ]
      }
    }
  }
</script>
