<template>
  <div class="content-fluid">
    <h1>{{ $route.meta.title }}</h1>
    <div v-html="infoText"></div>
  </div>
</template>

<script>
import { apiFactory } from '@/api';
const apiInfo = apiFactory.get('info');

export default {
  async asyncData({ route }) {
    let infoText = '';
    try {
      let page = await apiInfo.getPage(route.fullPath.slice(1));
      infoText = page.manufactures && page.manufactures.text;
    } catch {}

    return { infoText };
  }
};
</script>
