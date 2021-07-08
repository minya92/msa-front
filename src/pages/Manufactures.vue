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
        infoText: '<h3>ZXMT</h3>'
      }
    },
    created: function(){
      this.$API.get('getPage/'+this.$route.fullPath.slice(1)).then(r => {
        debugger
        var page = r.data.data.manufactures
        this.infoText = page.text
      })
    }
  }
</script>

<style scoped>
</style>
