<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{$route.meta.title}}</h1>
      <div v-html="res"></div>
    </div>
  </main-layout>
  <h1>{{res}}</h1>
</template>

<script>
  import MainLayout from '@/layouts/Main.vue';

  export default {
    components: {
      MainLayout
    },
    data() {
      return {
        res: "Подождите"
      }
    },
    created() {
      let that = this;
      this.$API.get('confirmEmail/'+this.$route.params.confirmation).then(r => {
        console.log('1');
        var result = r.data;
        if (result) {
          this.res = 'Спасибо за подтверждение электронной почты!';
        }
      }).catch(err => {
        console.log(err);
        this.res = 'Ошибка, возможно, Ваш адрес уже подтвержден';
      });
    },
    methods: {

    }
  }
</script>
