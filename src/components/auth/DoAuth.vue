<template>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
    let that = this;
    this.doAuth(this.$route.query.login, this.$route.query.password).then(function(){
        that.$router.push({path: that.$store.getters.pathRedirectLogin});
    });
  },
  methods: {
    doAuth: function(login, pass) {
      return new Promise(function(resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open("get", '/auth', true);
          xhr.withCredentials = true;
          xhr.onreadystatechange = function(evt) {
              if (xhr.readyState == 4) {
                  resolve();
              }
          };
          xhr.send();
      }).then(function(urlParams) {
          return new Promise(function(resolve, reject) {
              var xhr = new XMLHttpRequest();
              var stage = 0;

              var body = 'j_username=' + encodeURIComponent(login) +
                '&j_password=' + encodeURIComponent(pass);

              xhr.open("POST", 'api/j_security_check', true);
              xhr.withCredentials = true;
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

              xhr.onreadystatechange = function(evt) {
                  if (xhr.readyState == 4) {
                        if (xhr.responseText.indexOf('"j_password" id="password"') == -1) {
                            resolve();
                        } else {
                            xhr.abort();
                            reject();
                        }
                  }
              };

              xhr.send(body);
          });
      });
    }
  }
}
</script>
