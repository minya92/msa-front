<template>
  <modal-fade>
    <div class="alt-registry">
      <span class="or-box">или</span>
      <div class="social-block">
        <a class="vk" @click="vkAuth()"></a>
        <a class="fb" @click="fbAuth()"></a>
        <a class="ok" @click="okAuth()"></a>
        <a class="in" @click="instAuth()"></a>
      </div>
    </div>
  </modal-fade>
</template>

<script>
  import axios from 'axios'


  export default {
    data() {
      return {}
    },
    created() {
    },
    methods: {
      vkAuth: function(){
        debugger
        this.$API.get('socAuth/settings').then(r => {
          debugger
          var url = `https://oauth.vk.com/authorize?client_id=${r.data.vk.client_id}&display=${r.data.vk.display}&redirect_uri=${r.data.vk.redirect_uri}&response_type=${r.data.vk.response_type}&v=${r.data.vk.v}&revoke=1&scope=${r.data.vk.scope}`;
          console.log(url);
          window.location = url;
        });
      },
      fbAuth: function(){
        this.$API.get('socAuth/settings').then(r => {
          var url = `https://www.facebook.com/${r.data.fb.v}/dialog/oauth?client_id=${r.data.fb.client_id}&redirect_uri=${r.data.fb.redirect_uri}`;
          console.log(url);
          window.location = url;
        });
      },
      okAuth: function(){
        axios.get('socAuth/settings').then(r => {
          var url = `https://connect.ok.ru/oauth/authorize?client_id=${r.data.ok.client_id}&redirect_uri=${r.data.ok.redirect_uri}&response_type=${r.data.ok.response_type}&scope=${r.data.vk.scope}`;
          console.log(url);
          window.location = url;
        });
      },
      instAuth: function(){
        axios.get('socAuth/settings').then(r => {
          var url = `https://api.instagram.com/oauth/authorize/?client_id=${r.data.inst.client_id}&redirect_uri=${r.data.inst.redirect_uri}&response_type=code`;
          console.log(url);
          window.location = url;
        });
      }
    }
  }
</script>

<style scoped>
  .alt-registry{
    text-align: center;
  }
  .or-box{
    line-height: 20px;
    font-size: 14px;
    text-transform: uppercase;
  }
  .or-box:before, .or-box:after{
    content: '';
    display: inline-block;
    height: 1px;
    width: 25%;
    background: #ccc;
    vertical-align: middle;
    margin: 0 10px;
  }
  .registry-social-block{
    margin: 12px 0;
  }
  .social-block a{
    display: inline-block;
    height: 30px;
    width: 30px;
  }
  .social-block .vk{
    background: url(../assets/img/vk.svg) no-repeat;
  }
  .social-block .vk:hover{
    background: url(../assets/img/vk_hover.svg) no-repeat;
  }

  .social-block .fb{
    background: url(../assets/img/fb.svg) no-repeat;
  }
  .social-block .fb:hover{
    background: url(../assets/img/fb_hover.svg) no-repeat;
  }

  .social-block .ok{
    background: url(../assets/img/ok.svg) no-repeat;
  }
  .social-block .ok:hover{
    background: url(../assets/img/ok_hover.svg) no-repeat;
  }

  .social-block .in{
    background: url(../assets/img/instagram.svg) no-repeat;
  }
  .social-block .in:hover{
    background: url(../assets/img/instagram_hover.svg) no-repeat;
  }
</style>
