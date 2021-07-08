<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{$route.meta.title}}</h1>

      <div v-if="isSuccessSendRestorePassText">
        Сообщение с восстановлением пароля отправлено на указанную почту
      </div>

      <div class="form-1" v-else-if="$route.query.code">
        <div class="form-1__field">
          <label class="require">Пароль</label>
          <toogle-password v-model="password"></toogle-password>
        </div>
        <div class="form-1__field">
          <label class="require">Повторите пароль</label>
          <toogle-password v-model="rpassword"></toogle-password>
        </div>

        <button @click="setNewPass" class="primary btn_theme">Сохранить</button>
      </div>

      <div class="form-1" v-else>
        <div class="form-1__field">
          <label class="require">Email</label>
          <input type="text" v-model="email" />
        </div>

        <button @click="restorePass" class="primary btn_theme">Восстановить пароль</button>
      </div>
    </div>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main.vue'
  import { doAuth } from '@/components/auth/do-auth'
  import TooglePassword from '@/components/input_components/password'

  export default {
    components: {
      MainLayout, TooglePassword
    },
    data() {
      return {
        password: '',
        rpassword: '',
        email: '',
        isSuccessSendRestorePassText: false
      }
    },
    methods: {
      restorePass: function(){
        if (!this.email) return;

        this.$API.post('clients/restoreRequest', `email=${this.email}`).then(r => {
          this.isSuccessSendRestorePassText = true;
        }).catch(err => {
          this.$store.dispatch('showPopup', {status: false, message: err.response.data.error});
        });
      },
      setNewPass: function(){
        let that = this;
        if (this.password != this.rpassword && this.password.length < 2) return;

        this.$API.post('clients/restorePassword', `password=${this.password}&code=${this.$route.query.code}`).then(r => {
          that.$store.dispatch('showPopup', {status: true, message: 'Пароль успешно изменнен'});

          doAuth(r.data.data, that.password).then(function(){
//            TODO go to home page
            that.$router.go({
                path: '/',
                force: true
              });
          });
        }).catch(err => {
          that.$store.dispatch('showPopup', {status: false, message: err.response.data.error});
        });
      }
    }
  }
</script>

<style scoped>
</style>
