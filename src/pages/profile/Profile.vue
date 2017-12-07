<template>
  <profile-layout  v-if="$store.getters.isAuthorized">
    <h1>{{$route.meta.title}}</h1>
    <div class="form-1">
      <div class="form-1__field" v-for="(field, index) in userFields" :key="index">
        <label :class="field.require ? 'require' : ''">{{field.label}}</label>
        <input type="text" v-model="field.value" />
      </div>
      
      <button @click="saveProfile" class="primary">Сохранить</button>
    </div>
  </profile-layout>
</template>

<script>
  import ProfileLayout from '@/layouts/Profile.vue'

  export default {
    components: {
      ProfileLayout
    },
    data() {
      return {
        userFields: {
          fio: {
            label: 'ФИО',
            value: '',
            require: true
          },
          email: {
            label: 'Email',
            value: '',
            require: true
          },
          phone: {
            label: 'Телефон',
            value: '',
            require: false
          },
          address: {
            label: 'Адрес',
            value: '',
            require: false
          },
        }
      }
    },
    methods: {
      saveProfile: function(){
        let post = `phone=${this.userFields['phone'].value}
                    &email=${this.userFields['email'].value}
                    &first_name=${this.userFields['fio'].value}
                    &city=${this.userFields['address'].value}`;
        this.$API.post('clients/update', post).then(r => {
          this.$store.dispatch('showPopup', {status: false, message: 'Данные сохранены'});
        }).catch(err => {
          this.$store.dispatch('showPopup', {status: true, message: 'Данные несохранены'});
        });
      }
    },
    created(){
			this.$API.get("clients/current").then(r => {
				if (r.data.data != null){
					this.$store.dispatch('login', r.data.data);
          this.userFields.fio.value = this.$store.getters.getName;
          this.userFields.email.value = this.$store.getters.getEmail;
          this.userFields.phone.value = this.$store.getters.getPhone;
          this.userFields.address.value = this.$store.getters.getCity;
				}
			})
    }
  }
</script>

<style scoped>
</style>
