<template>
  <ul class="breadcrumbs" v-if="breadcrumbs.length">
    <li>
      <router-link to="/">Главная страница</router-link>
    </li>
    <li v-for="crumb in breadcrumbs" :key="crumb">
      &nbsp;/&nbsp;<router-link :to="linkProp(crumb)">{{
        crumb | crumbText
      }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: []
    };
  },
  created: function() {
    var crumbs = [];

    var matched = this.$route.matched;

    matched.forEach(function(route) {
      var hasBreadcrumb = route.meta && route.meta.breadcrumb;

      if (hasBreadcrumb) {
        crumbs.push(route);
      }
    });
    this.breadcrumbs = crumbs;
  },
  methods: {
    linkProp: function(crumb) {
      if (crumb.name || (crumb.handler && crumb.handler.name)) {
        return {
          name: crumb.name || crumb.handler.name,
          params: this.$route.params
        };
      }

      return {
        path: crumb.path,
        params: this.$route.params
      };
    }
  },
  filters: {
    crumbText: function(crumb) {
      return crumb.meta.breadcrumb;
    }
  }
};
</script>
