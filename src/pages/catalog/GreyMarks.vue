<template>
  <div class="model-grey">
    <router-link class="models-top-slider-item" v-for="imgModelGrey in imgModelsGrey"
      :key="imgModelGrey.marks_models_id"
      :to="{name:'catalog', query: {mark: imgModelGrey.marks_models_id}}"
    >
      <img :src="$SERVER_URL + imgModelGrey.full_image" :alt="imgModelGrey.mm_name" :title="imgModelGrey.mm_name">
    </router-link>
  </div>
</template>

<script>
export default {
  data(){
    return{
      imgModelsGrey: []
    }
  },
  methods: {
    getMarksBannerGrey: function(){
      this.$API.get('getMarksForBaner/3').then(r => {
        this.imgModelsGrey = r.data.data;
      });
    }
  },
  mounted() {
    this.getMarksBannerGrey();
  }
}
</script>

<style scoped>
.model-grey{
	display: flex;
}
.model-grey img{
	max-height: 100%;
	max-width: 100%;
}
.model-grey>a{
	display: flex;
	border: 1px solid #e7e7e7;
	justify-content: center;
	align-items: center;
	flex: 1;
	padding: 30px 10px;
}
@media (min-width: 769px) and (max-width: 960px) {
  .model-grey>a{
    padding: 20px 10px;
  }
}
@media (max-width: 768px) {
	.model-grey{
		flex-wrap: wrap;
	}
  .model-grey>a{
    padding: 15px 10px;
    min-width: 150px;
    height: 80px;
  }
}
@media (max-width: 480px) {
  .model-grey>a{
    padding: 10px 10px;
    min-width: 100px;
    height: 70px;
  }
}
@media (max-width: 375px){
  .model-grey>a{
    height: 50px;
  }
}
</style>
