<template>
  <div class="block-review">
    <div class="block-review__title">Оставить отзыв </div>
    <div class="block-review__vote">
      <span>Оценка</span>
      <div class="reviewStars-input">
        <label :class="review.rating >= 1 ? 'active' : ''"></label>
        <label :class="review.rating >= 2 ? 'active' : ''"></label>
        <label :class="review.rating >= 3 ? 'active' : ''"></label>
        <label :class="review.rating >= 4 ? 'active' : ''"></label>
        <label :class="review.rating >= 5 ? 'active' : ''"></label>
      </div>
    </div>
    <textarea placeholder="введите отзыв" rows="5" resize="horizontal" maxlength="1000"></textarea>
    <button  v-if='$store.getters.isAuthorized' @click="sendReview" class="primary">Отправить</button>
    <div v-else>
      <div>Авторизируйтесь, чтобы оставить отзыв.</div> 
      <button @click="sendReview" class="primary">Авторизоваться</button>
      <button @click="sendReview" class="primary">Регистрироваться</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        review: {
          text: '', 
          rating: 5
        }
      }
    },
    methods: {
      sendReview: function() {

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
</style>