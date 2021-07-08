<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{$route.meta.title}}</h1>
      <div>
        <div class="faq__problem" v-for="(faq, index) in faqList" :key="index">
          <faq-item :faqItem="faq"></faq-item>
        </div>
        
        <button @click="$router.push({name: 'ContactUs'})" class="primary btn_theme">Задать вопрос</button>
      </div>
    </div>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main.vue'
  import FaqItem from './FaqItem'

  export default {
    components: {
      MainLayout, FaqItem
    },
    data() {
      return {
        toggled: false,
        faqList: null      
      }
    },
    created(){
				this.$API.get('FAQ').then(r => {
					this.faqList = r.data.data;
        });
    }
  }
</script>

<style scoped>
.faq__problem{
  margin-bottom: 20px;
}
</style>