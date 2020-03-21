<template>
  <div class="content-fluid">
    <h1>{{ $route.meta.title }}</h1>
    <ul class="list-review">
      <li v-for="(review, index) in reviews" :key="index">
        <div class="reviewStars-input">
          <label :class="review.msg_rank >= 1 ? 'active' : ''"></label>
          <label :class="review.msg_rank >= 2 ? 'active' : ''"></label>
          <label :class="review.msg_rank >= 3 ? 'active' : ''"></label>
          <label :class="review.msg_rank >= 4 ? 'active' : ''"></label>
          <label :class="review.msg_rank >= 5 ? 'active' : ''"></label>
        </div>
        <div>
          <span class="list-review__name">{{ review.author_name }}</span>
          <span class="list-review__date" v-if="review.msg_datetime">{{
            review.msg_datetime | getDate
          }}</span>
        </div>
        <div v-html="review.message_text"></div>
      </li>
    </ul>
    <review-comment></review-comment>
  </div>
</template>

<script>
import ReviewComment from '@/components/ReviewComment';
import { apiFactory } from '@/api';
const apiReview = apiFactory.get('review');
export default {
  components: {
    ReviewComment
  },

  filters: {
    getDate: function(datetext) {
      var date = new Date(datetext);
      if (date)
        return `${('0' + date.getDate()).slice(-2)}.${(
          '0' +
          (date.getMonth() + 1)
        ).slice(-2)}.${date.getFullYear()}`;

      return '';
    }
  },

  async asyncData() {
    let reviews = await apiReview.get();
    return { reviews };
  }
};
</script>

<style scoped>
.list-review {
  list-style: none;
}
.list-review li {
  padding: 20px 0;
  border-bottom: 1px solid #e7e7e7;
}
.list-review__name {
  padding-right: 10px;
  font-weight: 600;
}
.list-review__date {
  color: #ccc;
}

.reviewStars-input {
  overflow: hidden;
  zoom: 0.5;
  position: relative;
  display: inline-block;
}
.reviewStars-input label {
  background: url('http://positivecrash.com/wp-content/uploads/ico-s71a7fdede6.png')
    no-repeat;
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
</style>
