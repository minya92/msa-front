<template>
  <div class="container-fluid">
    <h1>{{ $route.meta.title }}</h1>
    <yandex-map
      :coords="coord"
      zoom="14"
      style="height: 400px;"
      v-if="isMounted"
    >
      <ymap-marker
        v-for="(placemark, index) in placemarks"
        :coords="placemark.coords"
        :properties="placemark.properties"
        :marker-id="index"
        :key="index"
      >
      </ymap-marker>
    </yandex-map>

    <p><strong>Адрес: </strong>Забайкальск, ул. Полетная, 1</p>
    <p><strong>Телефон: </strong>+7 (914) 471-67-76, +7 (910) 684-44-88</p>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
export default {
  components: {
    yandexMap,
    ymapMarker
  },
  data() {
    return {
      isMounted: false,
      coord: [49.650584, 117.32904],
      placemarks: [
        {
          coords: [49.650584, 117.32904],
          properties: {
            hintContent: 'Забайкальск, ул. Полетная, 1',
            markerType: 'placemark',
            balloon: { header: 'header', body: 'body', footer: 'footer' }
          }
        }
      ]
    };
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>
