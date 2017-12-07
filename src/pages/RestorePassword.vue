<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{$route.meta.title}}</h1>
      
      <div class="form-1" v-if="$route.query.code">
        <div class="form-1__field">
          <label class="require">Пароль</label>
          <input type="text" v-model="password" />
        </div>
        <div class="form-1__field">
          <label class="require">Повторите пароль</label>
          <input type="text" v-model="rpassword" />
        </div>
        
        <button @click="setNewPass" class="primary">Сохранить</button>
      </div>

      <div class="form-1" v-else>
        <div class="form-1__field">
          <label class="require">Email или телефон</label>
          <input type="text" v-model="email" />
        </div>
        
        <button @click="restorePass" class="primary">Восстановить пароль</button>
      </div>
    </div>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main.vue'

  export default {
    components: {
      MainLayout
    },
    data: () => ({
      password: '',
      rpassword: '',
      email: ''
    }),
    methods: {
      restorePass: function(){
        if (!this.email) return;

        this.$API.post('clients/restore', { }).then({
          
        });
      },
      setNewPass: function(){
        if (this.password != this.rpassword && this.password.length < 2) return;

        this.$API.post('clients/restorePassword', { }).then({
          
        });
      }
    }
  }
</script>

<style scoped>
</style>