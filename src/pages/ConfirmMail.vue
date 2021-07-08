<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{$route.meta.title}}</h1>
      <div>{{res}}</div>
    </div>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main.vue';

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
        res: ""
      }
    },
    created() {
      this.$store.dispatch('showLoading');

      this.$API.get('confirmEmail/'+this.$route.params.confirmation).then(r => {
        var result = r.data;
        if (result) {
          this.res = 'Спасибо за подтверждение электронной почты!';
        }
        this.$store.dispatch('hideLoading');
      }).catch(err => {
        this.res = err.response.data.error;
        this.$store.dispatch('hideLoading');
      });
    }
  }
</script>
