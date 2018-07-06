<template>
  <div class="category__v-nav">
    <div class="category__v-menu__title">Каталог</div>
    <ul class="category__nav_vertical">
      <li v-for="catalog in categories">
        <!--<span v-if="catalog.child.length" class="arrow_down" @click="toggle"></span>-->
        <router-link :to="`/catalog/types=${catalog.url}`">{{catalog.name}}</router-link>
        <!--<ul>
          <li v-for="childCatalog in catalog.child">
            <router-link :to="catalog.url">{{childCatalog.name}}</router-link>
          </li>
        </ul>-->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      categories: []
    }
  },
  methods: {
    loadCatalog: function(){
      this.$API.get('getTypes').then(r => {
        var categories = [];

        for (var i = 0; i < r.data.data.length; i++){
          var item = r.data.data[i];
          categories.push({
            id: item.items_types_id,
            parentType: item.parent_type,
            name: item.type_description,
            url: item.items_types_id
          });
        }
          this.categories = categories;
      })
    },
  },
  created(){
    this.loadCatalog();
  }
}
</script>

<style scoped>
.category__nav_vertical {
  margin-bottom: 20px;
}
.category__nav_vertical li{
	list-style: none;
	position: relative;
	padding: 5px 0;
}
.category__nav_vertical li ul{
	display: none;
}
.category__nav_vertical li a{
  text-decoration: none;
  color: inherit;
}
.category__nav_vertical li a.current{
  color: #801f25;
}
.category__v-menu__title{    
	font-size: 20px;
	padding: 20px 0 10px;
}
</style>

