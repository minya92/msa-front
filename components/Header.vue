<template>
  <header>
    <div class="header-top flex-vc">
      <div class="container-fluid header-top-section">
        <nuxt-link to="/" class="header-logo flex-vc">
          <img src="../assets/img/logo_header.png" />
        </nuxt-link>
        <div class="header-top-section-menu">
          <nuxt-link to="/contacts">Контакты</nuxt-link>
        </div>

        <div class="hbox-phone">
          <a v-for="phone in phoneHeader" :href="'tel:' + phone" :key="phone">
            <svg
              version="1.1"
              role="presentation"
              width="12.571428571428571"
              height="16"
              viewBox="0 0 1408 1792"
              class="fa-icon"
              fill="#fff"
            >
              <path
                d="M1408 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-53-3.5t-57.5-12.5-47-14.5-55.5-20.5-49-18q-98-35-175-83-127-79-264-216t-216-264q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47-12.5-57.5-3.5-53q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z"
              ></path></svg
            >{{ phone }}
          </a>
        </div>

        <div class="login-section" v-if="true /*$store.getters.isAuthorized*/">
          <nuxt-link :to="{ name: 'profile' }">Личный кабинет</nuxt-link>
          <ul class="user-link_menu">
            <li>
              <nuxt-link :to="{ name: 'profile' }">Профиль</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ name: 'profile-order' }"
                >История покупок</nuxt-link
              >
            </li>
            <li @click.prevent="logout"><a>Выйти</a></li>
          </ul>
        </div>
        <!--<div class="login-section" v-else>
							<a @click.prevent='showAuth=true'>Вход</a> / <a @click.prevent='showRegistry=true'>Регистрация</a>
						</div>-->
        <Minicart />
      </div>
    </div>

    <div class="header-bottom flex-vc">
      <div class="container-fluid header-bottom-section">
        <div class="header-bottom-menu">
          <div id="show-modal-findmoto" @click="showFinderMoto = true">
            <span
              ><div class="menu_icon"></div>
              Подбор по мото</span
            >
            <findMoto
              v-if="showFinderMoto"
              @close="showFinderMoto = false"
            ></findMoto>
          </div>
          <nuxt-link to="/catalog" id="catalog-menu">
            <span
              ><div class="menu_icon"></div>
              Каталог</span
            >
          </nuxt-link>
          <div class="search-mobile" @click="visibleSearch = !visibleSearch">
            <svg
              data-v-c3e4eec0=""
              version="1.1"
              role="presentation"
              width="14.857142857142858"
              height="16"
              viewBox="0 0 1664 1792"
              class="fa-icon"
            >
              <path
                d="M1152 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zM1664 1664q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"
              ></path>
            </svg>
          </div>
        </div>
        <searchForm :class="visibleSearch ? 'visible-mobile' : ''"></searchForm>
        <Minicart />
      </div>
    </div>
  </header>
</template>

<script>
import findMoto from '@/components/FindMoto';
import searchForm from '@/components/Search';
import Minicart from '@/components/cart/Minicart';

export default {
  components: {
    findMoto,
    searchForm,
    Minicart
  },

  data() {
    return {
      phoneHeader: ['+7 (914) 471-67-76'],
      visibleSearch: false,
      showFinderMoto: false
    };
  },

  methods: {
    logout() {
      this.$API.get('?__type=18').then(r => {
        this.$store.dispatch('logout');
      });
    }
  },
  filters: {
    emptyName(name) {
      return name ? name : 'лк';
    }
  }
};
</script>
