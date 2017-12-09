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
    doAuth(that.$route.query.login, that.$route.query.password).then(function(){
//      TODO return to previous page
        window.location.href = 'http://' + window.location.host;// + '/#' + that.$store.getters.pathRedirectLogin;
//        window.location.reload(true);
    });
  },
  methods: {

  }
}
</script>
