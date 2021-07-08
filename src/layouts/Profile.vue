<template>
	<main-layout>
		<div id="profile" class="content-fluid">
			<aside v-if="$store.getters.isAuthorized">
				<h2>Личный кабинет</h2>
				<ul class="aside__nav_vertical">
					<li>
						<router-link :to="{name: 'Order'}">История заказов</router-link>
					</li>
					<li>
						<router-link :to="{name: 'Profile'}">Профиль</router-link>
					</li>
				</ul>
			</aside>
			<aside v-else>
				<button class="test btn_theme" @click="showAuth=true">авторизоваться</button>
				<button class="test btn_theme" @click="showRegistry=true">регистрироваться</button>
			</aside>
			<div class="content-section">
				<slot></slot>
			</div>
		</div>
		<auth v-if="showAuth" @close="showAuth=false"></auth>
		<registry v-if="showRegistry" @close="showRegistry=false"></registry>
	</main-layout>
</template>

<script>
	import MainLayout from '@/layouts/Main'
	import auth from '@/components/auth/Auth'
	import registry from '@/components/auth/Registry'

	export default{
		name: 'profile',
		components: {MainLayout, auth, registry},
		data() {
			return{
				showAuth: false,
				showRegistry: false,
			}
		},
		created(){
		}
	}
</script>

<style>
	#profile{
		display: flex;
	}
	.test{
    padding: 5px 10px;
		margin-bottom: 5px;
		width: 100%;
	}
</style>