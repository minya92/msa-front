<template>
  <div class="block-review" v-if="!isSendSuccess">
    <div class="block-review__title">Оставить отзыв </div>
    <div class="block-review__vote">
      <span>Оценка</span>
      <div class="reviewStars-input">
        <label :class="rating >= 1 ? 'active' : ''" @mouseover="rating = 1"></label>
        <label :class="rating >= 2 ? 'active' : ''" @mouseover="rating = 2"></label>
        <label :class="rating >= 3 ? 'active' : ''" @mouseover="rating = 3"></label>
        <label :class="rating >= 4 ? 'active' : ''" @mouseover="rating = 4"></label>
        <label :class="rating >= 5 ? 'active' : ''" @mouseover="rating = 5"></label>
      </div>
    </div>
    <textarea 
      placeholder="введите отзыв" 
      rows="5" 
      resize="horizontal" 
      maxlength="1000" 
      v-model="message"
    ></textarea>
    <button  v-if='$store.getters.isAuthorized' @click="sendReview" class="primary">Отправить</button>
    <div v-else>
      <div>Авторизируйтесь, чтобы оставить отзыв.</div> 
      <button @click="showAuth = true" class="primary">Авторизоваться</button>
      <button @click="showRegistry = true" class="primary">Регистрироваться</button>
    </div>
		<auth v-if="showAuth" @close="showAuth=false"></auth>
		<registry v-if="showRegistry" @close="showRegistry=false"></registry>
  </div>
  <div class="review__send-success" v-else>
    Спасибо за Ваш отзыв!
  </div>
</template>

<script>
	import auth from '@/components/auth/Auth'
	import registry from '@/components/auth/Registry'
  export default {
    components: {
      auth, registry
    },
    data() {
      return {
        message: '', 
        rating: 5,
        isSendSuccess: false,
				showAuth: false,
				showRegistry: false
      }
    },
    methods: {
      sendReview: function() {
        if (!this.validate()) return;
        
        let post = `message_text=${this.message}
                    &author_email=${this.$store.getters.getEmail}
                    &author_name=${this.$store.getters.getName}
                    &rank=${this.rating}`;

        this.$store.dispatch('showLoading');
        this.$API.post('reviews', post).then(r => {
          this.isSendSuccess = true;
          this.$store.dispatch('hideLoading');
        }).catch(err =>{
          this.$store.dispatch('hideLoading');
        });
      },
      validate: function() {
        return this.message.length > 5 ? true : false
      }
    }
  }
</script>

<style scoped>
.block-review{
  margin: 15px 0;
}
.block-review__title{
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
}
textarea{
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

  .reviewStars-input {
    overflow: hidden;
    zoom: 0.5;  
    position: relative;
    display: inline-block;
  }
  .reviewStars-input label {
    background: url('http://positivecrash.com/wp-content/uploads/ico-s71a7fdede6.png') no-repeat;
    background-position: 0 0;
    height: 40px;
    width: 43px;
    cursor: pointer;
    margin-right: 10px;
    display: inline-block;
  }
  .reviewStars-input label.active {
    background-position: 0 -40px;
    height: 40px;
    width: 43px;
  }
  .reviewStars-input .star-0 {
    left: 0px;
  }
  .reviewStars-input .star-1 {
    left: 53px;
  }
  .reviewStars-input .star-2 {
    left: 106px;
  }
  .reviewStars-input .star-3 {
    left: 159px;
  }
  .reviewStars-input .star-4 {
    left: 212px;
  }
  .reviewStars-input .star-5 {
    left: 265px;
  }

  .block-review__vote{
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  .block-review__vote span{
    margin-right: 10px;
  }
  .review__send-success{
    font-weight: 600;
    padding: 10px 0;
  }
</style>