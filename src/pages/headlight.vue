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
        infoText: '<h3>angel_eyes</h3>'
      }
    },
    created: function(){
      this.$API.get('getPage/angel_eyes').then(r => {
        debugger
        var page = r.data.data.angel_eyes
        this.infoText = page.text
      })
    }
  }
</script>

<style scoped>
</style>
