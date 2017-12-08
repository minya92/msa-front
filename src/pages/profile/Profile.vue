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
          firstName: {
            label: 'Имя',
            value: '',
            require: true
          },
          lastName: {
            label: 'Фамилия',
            value: '',
            require: true
          },
          middleName: {
            label: 'Отчество',
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
        let post = `phone=${this.userFields['phone'].value}`+
                    `&email=${this.userFields['email'].value}`+
                    `&last_name=${this.userFields['lastName'].value}`+
                    `&middle_name=${this.userFields['middleName'].value}`+
                    `&first_name=${this.userFields['firstName'].value}`+
                    `&city=${this.userFields['address'].value}`;
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
          this.userFields.firstName.value = this.$store.getters.getFirstName;
          this.userFields.lastName.value = this.$store.getters.getLastName;
          this.userFields.middleName.value = this.$store.getters.getMiddleName;
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
