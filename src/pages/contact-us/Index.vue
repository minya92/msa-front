<template>
  <main-layout>
    <div class="content-fluid">
      <h1>{{ $route.meta.title }}</h1>
      <div v-if="!isSendSuccess">
        <div>Вы можете связаться с нами заполнив следующую форму</div>
        <div class="form-group">
          <label class="require">Имя</label>
          <input 
            type="text" 
            maxlength="40"
            v-validate="{ required: true, min: 4, max: 40 }" 
            name="name" 
            v-model="name"
            data-vv-as="Имя"
            placeholder="Имя" 
            @keyup.enter="sendMessage"
          >
          <span v-if="errors.has('name')" class="text-error">{{ errors.first('name') }}</span>
        </div>
        <div class="form-group">
          <label class="require">Email</label>
          <input
            type="text" 
            maxlength="40"
            v-validate="'required|email'" 
            name="email" 
            v-model="email"
            @input="email = email.trim()"
            placeholder="Email" 
            @keyup.enter="sendMessage"
          >
          <span v-if="errors.has('email')" class="text-error">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <label class="require">Сообщение</label>
          <textarea 
            v-validate="'required|min:10'" 
            name="message" 
            v-model="message"
            placeholder="Введите сообщение" 
            data-vv-as="Сообщение"
            rows="5" 
            resize="horizontal" 
            maxlength="1000"
          />
          <span v-if="errors.has('message')" class="text-error">{{ errors.first('message') }}</span>
        </div>
        <button @click="sendMessage" class="primary btn_theme">Отправить</button>
      </div>
      <div v-else>
        <p>Ваше сообщение успешно отправлено!</p>
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
    data() {
      return {
        name: '',
        email: '',
        message: '',
        isSendSuccess: false
      }
    },
    methods: {
      sendMessage: function(){
        this.$validator.validateAll()
        if (!this.validate()) return;

        let post = `message_text=${this.message}
                    &author_email=${this.email}
                    &author_name=${this.name}`;

        this.$store.dispatch('showLoading');
        this.$API.post('feedback', post).then(r => {
          this.isSendSuccess = true;
          this.$store.dispatch('hideLoading');
        }).catch(err => {
          this.$store.dispatch('hideLoading');
        });
      },
      validate: function() {
        return !Object.keys(this.$validator.flags).some(x => { 
                return !this.$validator.flags[x].valid
              })
      }
    },
    created(){
			this.$API.get("clients/current").then(r => {
				if (r.data.data != null){
					this.$store.dispatch('login', r.data.data);
          this.name = this.$store.getters.getName;
          this.email = this.$store.getters.getEmail;
				}
			})
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
  max-width: 100%;
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