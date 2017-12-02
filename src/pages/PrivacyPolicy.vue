<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{$route.meta.title}}</h1>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '@/layouts/Main'
export default {
  components: {
    MainLayout
  }
}
</script>
