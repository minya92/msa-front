<template>
  <div class="bottom-action">
    <div
      class="block-action"
      v-for="(blockAction, index) in blockActions"
      :key="index"
    >
      <div
        class="block-action-img"
        :style="{ backgroundImage: 'url(' + blockAction.image + ')' }"
      ></div>
      <div class="transbackground"></div>
      <div class="block-action-text-content">
        <h2>{{ blockAction.headerText }}</h2>
        <span>{{ blockAction.footerText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blockActions: [
        {
          headerText: 'Более 5 лет на рынке',
          footerText:
            'Фирма MSA MOTO на протяжении многих лет занималась оптовой торговлей пластика ведущих мото брендов мира. Настало время выйти с предложениями на широкий рынок. Мы рады видеть Вас в нашем интернет магазине',
          image: 'img/article_1.png'
        },
        {
          headerText: 'Более 7000 вариантов расцветки пластика',
          footerText:
            'Даже если в магазине нет определенной расцветки для обтекателей Вашей мечты - задавайте вопросы, мы готовы к новым вызовам!',
          image: 'img/article_2.png'
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.block-action-img {
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 290px;
}
.bottom-action {
  display: flex;
}
.block-action {
  flex: 1;
  position: relative;
}
.block-action-text-content {
  position: absolute;
  z-index: 2;
  top: 90px;
  text-align: center;
  color: #fff;
  max-width: 600px;
  margin: auto;
  left: 0;
  right: 0;
  padding: 20px;
}
.block-action-text-content h2 {
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 20px;
}
.block-action-text-content > span {
  font-size: 14px;
}
@media (max-width: 768px) {
  .block-action-text-content {
    top: 40px;
  }
  .block-action-text-content h2 {
    font-size: 22px;
  }
}
@media (max-width: 480px) {
  .bottom-action {
    display: block;
  }
  .block-action-text-content {
    top: 25px;
  }
  .block-action-img {
    height: 200px;
    background-size: cover;
  }
  .block-action-text-content h2 {
    font-size: 20px;
    padding-bottom: 0px;
  }
  .block-action-text-content > span {
    font-size: 14px;
  }
}
@media (max-width: 375px) {
  .block-action-text-content h2 {
    font-size: 16px;
    padding-bottom: 0px;
  }
  .block-action-text-content > span {
    font-size: 11px;
  }
  .block-action-text-content {
    top: 0px;
  }
  .block-action-img {
    height: 140px;
    background-size: cover;
  }
}
</style>
