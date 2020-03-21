<template>
  <div id="profile" class="content-fluid">
    <aside v-if="$store.getters.isAuthorized">
      <h2>Личный кабинет</h2>
      <ul class="aside__nav_vertical">
        <li>
          <nuxt-link :to="{ name: 'profile-order' }">История заказов</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ name: 'profile' }">Профиль</nuxt-link>
        </li>
      </ul>
    </aside>
    <aside v-else>
      <button class="test btn_theme" @click="showAuth = true">
        авторизоваться
      </button>
      <button class="test btn_theme" @click="showRegistry = true">
        регистрироваться
      </button>
    </aside>
    <div class="content-section">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/*import auth from '@/components/auth/Auth';
import registry from '@/components/auth/Registry';*/

export default {
  name: 'profile',
  components: {
    //auth,
    //registry
  },
  data() {
    return {
      showAuth: false,
      showRegistry: false
    };
  },
  created() {}
};
</script>

<style>
#profile {
  display: flex;
}
.test {
  padding: 5px 10px;
  margin-bottom: 5px;
  width: 100%;
}
</style>
