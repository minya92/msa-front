<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{$route.meta.title}}</h1>
      <div>Вы можете связаться с нами заполнив следующую форму</div>
      <div class="form-group">
        <label>{{name.headerText}}</label>
        <input type="text" v-model="name.value">
        <span v-if="name.showError" class="text-error">{{name.textError}}</span>
      </div>
      <div class="form-group">
        <label>{{email.headerText}}</label>
        <input type="text" v-model="email.value">
        <span v-if="email.showError" class="text-error">{{email.textError}}</span>
      </div>
      <div class="form-group">
        <label>{{message.headerText}}</label>
        <textarea placeholder="введите сообщение" rows="5" resize="horizontal" maxlength="1000" v-model="message.value"></textarea>
        <span v-if="message.showError" class="text-error">{{message.textError}}</span>
      </div>
      <button @click="sendMessage" class="primary">Отправить</button>
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
        name: { 
          headerText: 'Имя',
          value: '',
          textError: "Введите имя",
          showError: false
        },
        email: { 
          headerText: 'Email',
          value: '',
          textError: "Введите email",
          showError: false
        },
        message: { 
          headerText: 'Сообщение',
          value: '',
          textError: "Введите сообщение",
          showError: false
        }
      }
    },
    methods: {
      sendMessage: function(){
        this.$API.post('feedback',
          {
            message_text: this.message.value, 
            author_email: this.email.value, 
            author_name: this.name.value
          }
        ).then(r => {
              console.log(r.data)
        });
      }
    }
  }
</script>

<style scoped>
.form-group label{
  display: block;
  padding-bottom: 5px;
  font-weight: 600;
}
.form-group input{
  width: 340px;
  height: 30px;
  display: block;
  padding: 0 10px;
  border: 2px solid #dbdfe4;
  border-radius: 4px;
}
.form-group textarea{
  overflow: hidden;
  word-wrap: break-word;
  resize: none;
  width: 100%;
  padding: 5px;
  outline: none;
  background: #fff;
  border: 2px solid #dbdfe4;
  position: relative;
  border-radius: 4px;
}
</style>