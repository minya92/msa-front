<template>
  <div id="app" :class="headerFixedScroll ? 'fixed' : ''">
    <div class="content-box">
      <Header />
      <div class="bg__theme_two">
        <breadcrumbs class="container-fluid"></breadcrumbs>
      </div>
      <nuxt />
    </div>
    <!--auth v-if="showAuth" @close="showAuth=false"></auth-->
    <!--registry v-if="showRegistry" @close="showRegistry=false"></registry-->
    <Footer />
  </div>
</template>

<script>
import auth from '@/components/auth/Auth';
//import registry from '@/components/auth/Registry';
import Breadcrumbs from '@/components/Breadcrumbs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
  name: 'app',
  components: {
    auth,
    //registry,
    Breadcrumbs,
    Header,
    Footer
  },
  data() {
    return {
      showAuth: false,
      showRegistry: false,
      headerFixedScroll: false
    };
  },

  methods: {
    handleScroll() {
      this.headerFixedScroll = window.scrollY > 35;
    }
  },

  mounted() {
    //window.addEventListener('scroll', this.handleScroll);
  }
};
</script>

<style>
header > div {
  display: inline-block;
}
.header-top {
  background: #000;
  color: #fff;
}
.header-top a {
  color: #fff;
  text-decoration: none;
}
.header-top-section {
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.header-top-section .header-logo {
  flex: 1;
}

.header-logo img {
  max-height: 35px;
}
.header-top-section .header-top-section-menu {
  flex: 2;
  display: flex;
  justify-content: center;
}
.header-top-section .hbox-phone {
  flex: 2;
}
.header-top-section .login-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
}
.header-top-section .login-section a {
  padding: 0 3px;
}
.header-top-section .login-section a:hover {
  color: #ff0000;
}
.user-link_menu {
  display: none;
  min-width: 140px;
  padding: 10px 18px;
  list-style: none;
  position: absolute;
  right: 0px;
  top: 100%;
  z-index: 100;
  text-align: right;
  border-top: 4px solid #c4141e;
  border-bottom: 4px solid #c4141e;
  background: #fff;
  box-shadow: 0px 7px 7px 0px #333;
}
.user-link_menu li {
  margin: 5px 0;
}
.user-link_menu a {
  color: #9b9b9b;
}
.user-link_menu a:hover {
  color: #000;
}
.login-section > a:hover .user-link_menu {
  display: block;
}
.header-top-section .mini-cart {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.header-top-section-menu a:hover,
.hbox-phone a:hover {
  color: #ff0000;
}
.header-top-section-menu a {
  padding-right: 30px;
}
.hbox-phone a {
  padding-right: 10px;
}
.hbox-phone .fa-icon {
  vertical-align: middle;
  margin-right: 5px;
  width: 18px;
  height: 18px;
}
.hbox-phone a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
}
.login-section a {
  cursor: pointer;
}
.header-bottom {
  padding: 10px 0;
  position: relative;
  border-top: black solid;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  width: 100%;
  background: #fff;
}
.header-bottom .mini-cart {
  opacity: 0;
  visibility: hidden;
}
#app.fixed .header-bottom .mini-cart {
  opacity: 1;
  visibility: visible;
}
.header-bottom-section {
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;
}
.fixed .header-bottom {
  position: fixed;
  z-index: 90;
  top: 0;
}
.fixed .mini-cart {
  color: #000 !important;
}
.fixed .mini-cart svg path,
.fixed .mini-cart svg polyline {
  fill: #000;
}

header .search_input {
  position: relative;
}
header .search_input label {
  position: absolute;
  right: 10px;
  top: 5px;
}
header .search_input input[type='text'] {
  border-radius: 15px;
  height: 30px;
  padding: 0 25px;
  font-size: 14px;
  width: 460px;
  max-width: 100%;
  border: 1px solid #000;
  outline: none;
}

@media (min-width: 769px) and (max-width: 960px) {
  .header-top-section .hbox-phone,
  .header-top-section .header-top-section-menu {
    flex: none;
  }
}
@media (max-width: 768px) {
  .header-top-section .hbox-phone,
  .header-top-section .header-top-section-menu {
    flex: none;
  }
  header .search_input input[type='text'] {
    width: 100%;
  }
  .header-bottom .mini-cart {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .header-top {
    height: auto;
  }
  .header-top-section {
    display: block;
  }
  .header-top-section .mini-cart {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .hbox-phone {
    display: flex;
    justify-content: center;
  }
  .header-top-section-menu a,
  .hbox-phone a {
    padding: 5px 10px;
  }
  .header-top-section .login-section {
    justify-content: center;
    padding: 10px;
  }
  header .search_input input[type='text'] {
    width: 100%;
  }
  .header-bottom {
    padding: 5px 0;
  }
  #catalog-menu > span,
  #show-modal-findmoto > span {
    font-size: 14px;
  }
  #catalog-menu .menu_icon,
  #show-modal-findmoto .menu_icon {
    width: 30px;
    height: 30px;
  }
}
</style>
