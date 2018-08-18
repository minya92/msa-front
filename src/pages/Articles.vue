<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{title}}</h1>
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
        title: 'Заголовок',
        infoText: 'Текст'
      }
    },
    created: function(){
      var article = this.$route.params.id
      this.$API.get('getPage/'+article).then(r => {
        debugger
        var page = r.data.data[article];
        this.title = page.title;
        this.infoText = page.text;
      })
    }
  }
</script>

<style scoped>
</style>
