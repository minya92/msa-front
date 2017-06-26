<template>
  <div id="yandex_map">
    <div id="map" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script src="https://api-maps.yandex.ru/1.1/index.xml" type="text/javascript"></script>
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=Map" type="text/javascript"></script>
<script>
  export default {
    name: 'yandex_map',
    data() {
      return {
        
      }
    },
    created() {
      ymaps.ready(() => {
        const map = new window.ymaps.Map("map", {
          center: [55.76, 37.64],
          zoom: 7
        }); 
      })
    },
    mounted() {
      // Создает экземпляр карты и привязывает его к созданному контейнеру
      var map = new YMaps.Map(document.getElementById("yandex_map"));

            // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
            map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
            map.addControl(new YMaps.Zoom());

            // Создает стиль
            var s = new YMaps.Style();

            // Создает стиль значка метки
            s.iconStyle = new YMaps.IconStyle();
            s.iconStyle.href = "../assets/img/map_pin.svg";
            s.iconStyle.size = new YMaps.Point(18, 29);
            s.iconStyle.offset = new YMaps.Point(-9, -29);
            // Создает и добавляет метку на карту
            var placemark = new YMaps.Placemark(map.getCenter(), { style: s });
            map.addOverlay(placemark);
          }
        }
      </script>

      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
        .modal_box{
          box-shadow: 0 0 5px rgb(0,0,0);
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .modal_box_close{
          background: url(../assets/img/close.svg);
        }
      </style>
