<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{$route.meta.title}}</h1>
      <div v-html="infoText"></div>
    </div>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main.vue'

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
        infoText: '<h2>Поиск:</h2>\
                  <p>&nbsp;Быстрый способ найти на сайте&nbsp;<span class="wo fr-0 replaced" data-num="0">деталь-воспользоваться</span>&nbsp;кнопкой<span class="wo fr-1 replaced" data-num="1">&nbsp;</span><strong>"ПОИСК ЗАПЧАСТЕЙ"</strong> (сверху с лева). Там встроен фильтр <em>" Фирма -- Модель -- год -- количество товаров ".</em></p>\
                  <h2>Общение с нами:</h2>\
                  <p>&nbsp; По телефону (номер вверху страницы) Вашего звонка ждет оператор. Можно написать сообщение в рубриках <strong>"НАПИШИТЕ НАМ"</strong> или <strong>"ВОПРОС И ОТВЕТ"</strong>&nbsp;<span class="wo fr-2 replaced" data-num="2">(</span>внизу страницы). Тут потребуется минимальная регистрация<span class="wo fr-3 replaced" data-num="3">,</span>&nbsp;с указанием Вашего имени и электронного адреса<span class="wo fr-4 replaced" data-num="4">.</span>&nbsp;Оператор, после сбора информации,<span class="wo fr-5 replaced" data-num="5">&nbsp;</span>даст Вам письменный ответ по электронной почте<span class="wo fr-6 replaced" data-num="6">&nbsp;</span>+<span class="wo fr-7 replaced" data-num="7">&nbsp;</span>продублирует<span class="wo fr-8 replaced" data-num="8">&nbsp;</span>в рубрике <strong>"ВОПРОС И ОТВЕТ"</strong>.<br /><br /></p>\
                  <h2>Пред заказ:</h2>\
                  <p>&nbsp;Положить товар себе в корзину можно указав контактные данные.При оформлении заказа указывается<span class="wo fr-9 replaced" data-num="9">&nbsp;</span>способ оплаты и доставки. Комментарий - приветствуются.&nbsp; Оформленному заказу присваивается номер<span class="wo fr-10 replaced" data-num="10">, на</span>&nbsp;Вашу почту придет оповещение. Присваивается статус, который виден по кнопке -<strong>"СТАТУС ЗАКАЗА"</strong> (внизу с права). Статус&nbsp;<span class="wo fr-11 replaced" data-num="11">будет меняться</span><span class="wo fr-12 replaced" data-num="12">.</span>В начале<span class="wo fr-13 replaced" data-num="13">,</span>это -<em>"СОЗДАН"</em>. <span style="text-decoration: underline;">Оформление заказа не требует немедленной оплаты товара.</span> Этот этап нам нужен для сбора информации о товаре и логистике доставки. Далее Вам звонит оператор для подтверждения заказа<span class="wo fr-14 replaced" data-num="14">.</span>&nbsp;Если телефон не доступен (и такое бывает)<span class="wo fr-15" data-num="15">)</span>), он начинает переписку по почте.</p>\
                  <h2>Заказ:</h2>\
                  <p>&nbsp;Результат согласований (о них ниже) - оплата. Оператор контролирует и оповещает заказчика о переводе денежных средств. Заказ пускается в работу после оплаты товара.<br /><br /></p>\
                  <h2>Доставка:</h2>\
                  <p>&nbsp;Бесплатно доставка осуществляется до города, в которые есть прямые рейсы из Читы<span class="wo fr-16 replaced" data-num="16">.</span>&nbsp;Иначе товар прилетает в Москву, и далее транспортными компаниями попадает к Вам. Бремя оплаты транспортных компаний мы перекладываем на покупателя. Это не колоссальная сумма, если вы не на льдине где-нибудь живете... При поступлении товара на грузовые терминалы аэропорта Вашего города<span class="wo fr-17 replaced" data-num="17">, по</span>&nbsp;телефону с Вами связывается<span class="wo fr-18 replaced" data-num="18">&nbsp;</span>оператор&nbsp;<span class="wo fr-19 replaced" data-num="19">авиа доставки</span>, и сообщает откуда забирать груз. У Вас на руках к этому времени накладная на груз (мы высылаем фото и No накладной), и паспорт для получения.&nbsp;<span class="wo fr-20" data-num="20">Фсе</span>.<br /><br /></p>\
                  <h2>Темы обсуждения с нашими операторами:</h2>\
                  <p>&nbsp;Название предмета заказа, артикул из каталога интернет-магазина, цвет, год выпуска Вашего&nbsp;<span class="wo fr-21" data-num="21">мото</span><span class="wo fr-22 replaced" data-num="22">, город</span>&nbsp;доставки, адрес получения, No паспорта<span class="wo fr-23 replaced" data-num="23">,</span>&nbsp;адрес прописки и No телефона получателя, способ оплаты,<span class="wo fr-24" data-num="24">&nbsp;&nbsp;</span>способ получения заказа, фото детали<span class="wo fr-25 replaced" data-num="25">,</span>либо комплекта с&nbsp;<span class="wo fr-26 replaced" data-num="26">выбранным</span>&nbsp;вариантом цвета (если нет в каталоге на сайте). Может еще чего и забыл, типа какая погода у Вас, да насколько шершавый асфальт<span class="wo fr-27" data-num="27">)</span>) Главное, друзья, в нашем&nbsp;<span class="wo fr-28 replaced" data-num="28">деле-здоровое</span>&nbsp;общение!</p>\
                  <h2>Важная вещь!!!</h2>\
                  <p>&nbsp;Если в нашем каталоге нет искомой модели или фирмы, а Вы уже здесь, то не стесняйтесь спрашивать. Наша&nbsp;<span class="wo fr-29 replaced" data-num="29">работа-помочь</span>&nbsp;решить Вашу&nbsp;<span class="wo fr-30" data-num="30">мото</span>&nbsp;проблему<span class="wo fr-31" data-num="31">)</span>)&nbsp;<span class="wo fr-32 replaced" data-num="32"><strong>Китай</strong>-дело</span>&nbsp;такое<span class="wo fr-33" data-num="33">)</span>)<br /><br /></p>\
                  <h2>С уважением к Вам - коллектив интернет-магазина "MSAmoto".</h2>'
      }
    }
  }
</script>

<style scoped>
</style>
