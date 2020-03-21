<template>
  <div class="content-fluid">
    <h1>{{ $route.meta.title }}</h1>
    <div>
      <div class="faq__problem" v-for="(faq, index) in faqList" :key="index">
        <FaqItem :item="faq"></FaqItem>
      </div>

      <button
        @click="$router.push({ name: 'contact-us' })"
        class="primary btn_theme"
      >
        Задать вопрос
      </button>
    </div>
  </div>
</template>

<script>
import FaqItem from '@/components/FaqItem';
import { apiFactory } from '@/api';
const apiInfo = apiFactory.get('info');

export default {
  components: {
    FaqItem
  },
  data() {
    return {
      toggled: false
    };
  },
  async asyncData() {
    let faqList = [];
    try {
      faqList = await apiInfo.getFaq();
    } catch {}

    return { faqList };
  }
};
</script>

<style scoped>
.faq__problem {
  margin-bottom: 20px;
}
</style>
