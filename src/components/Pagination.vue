<template id="pagination-template">
  <div class="pagination">
    <div class="pagination-box">
      <div class="pagination-left">
        <a href="#" v-if="hasPrev()" @click.prevent="changePage(prevPage)">&larr;</a>
      </div>
      <div class="pagination-mid">
        <ul>
          <li v-if="hasFirst()"><a href="#" @click.prevent="changePage(1)">1</a></li>
          <li v-if="hasFirst()">...</li>
          <li v-for="page in pages">
            <a href="#" @click.prevent="changePage(page)" :class="{ current: current == page }">
              {{ page }}
            </a>
          </li>
          <li v-if="hasLast()">...</li>
          <li v-if="hasLast()"><a href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a></li>
        </ul>
      </div>
      <div class="pagination-right">
        <a href="#" v-if="hasNext()" @click.prevent="changePage(nextPage)">&rarr;</a>
      </div>
    </div>
    <div class="total_items">{{this.total}} товаров</div>
    <button class="upTop redBtn" @click="upTop">Наверх</button>
  </div>
</template>

<script>
  export default {
    name: 'pagination-template',
    props: {
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      perPage: {
        type: Number,
        default: 9
      },
      pageRange: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {

      }
    },
    computed: {
      pages: function() {
        var pages = []

        for(var i = this.rangeStart; i <= this.rangeEnd; i++) {
          pages.push(i)
        }

        return pages
      },
      rangeStart: function() {
        var start = this.current - this.pageRange

        return (start > 0) ? start : 1
      },
      rangeEnd: function() {
        var end = this.current + this.pageRange

        return (end < this.totalPages) ? end : this.totalPages
      },
      totalPages: function() {
        return Math.ceil(this.total/this.perPage)
      },
      nextPage: function() {
        return this.current + 1
      },
      prevPage: function() {
        return this.current - 1
      }
    },
    methods: {
      hasFirst: function() {
        return this.rangeStart !== 1
      },
      hasLast: function() {
        return this.rangeEnd < this.totalPages
      },
      hasPrev: function() {
        return this.current > 1
      },
      hasNext: function() {
        return this.current < this.totalPages
      },
      changePage: function(page) {
        this.$emit('page-changed', page)
      },
      upTop: function(){
          window.scrollTo(0,0);
      }
    }
  }
</script>
<style scoped>
  .pagination {
    width: 100%;
    height: 44px;
    display: flex;
    margin: 30px auto 30px;
    padding: 0 15px;
    max-width: 900px;
    justify-content: space-between;
  }
  .pagination-box{
    display: flex;
  }
  .pagination-right a {
    float: right;
  }
  .pagination a, .pagination span {
    display: block;
    text-align: center;
    line-height: 21px;
    height: 21px;
    width: 21px;
    color: #000;
    font-size: 14px;
  }

  .pagination a {
    text-decoration: none;
    margin: 0 1px;
    transition: all .2s ease-in-out;
  }
  .pagination a:hover, .pagination a.current {
    background: #000;
    color: #fff;
  }
  .pagination-mid {
    display: flex;
  }
  .pagination-mid ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .pagination-mid li {
    display: inline-block;
  }
  .upTop{
    width: 65px;
    height: 21px;
  }
</style>