<template>
</template>

<script>
import { doAuth } from '@/components/auth/do-auth'
export default {
  data() {
    return {

    }
  },
  created() {
    let that = this;
    doAuth(this.$route.query.login, this.$route.query.password).then(function(){
        that.$router.push({path: that.$store.getters.pathRedirectLogin});
    });
  },
  methods: {
    
  }
}
</script>
