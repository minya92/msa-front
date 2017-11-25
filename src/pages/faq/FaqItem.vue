<template>
  <div>
    <div class="faq__question" @click="toggleItem">
      <span class="faq__question__text">{{faqItem.question}}</span>            
    </div>
    <div class="faq__answer" v-show="toggled">{{faqItem.answer}}</div>
  </div>
</template>

<script>
  export default {
    props:{
      faqItem: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        toggled: false
      }
    },
    methods: {
      toggleItem: function() {
        this.toggled = !this.toggled;
      }
    }
  }
</script>

<style scoped>
.faq__question{
  background: #eee;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
}
.faq__question:hover .faq__question__text{
  cursor: pointer;
}
.faq__question__text{
  border-bottom: 1px dotted #801f25;
}
.faq__answer{
  padding: 10px;
}
</style>