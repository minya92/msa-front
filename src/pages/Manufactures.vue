<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{$route.meta.title}}</h1>
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
        
       }
    }
  }
</script>

<style scoped>
</style>