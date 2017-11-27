<template>
	<main-layout>
		<div id="profile" class="content-fluid">
			<aside v-if="$store.getters.isAuthorized">
				<h2>Личный кабинет</h2>
				<ul class="aside__nav_vertical">
					<li>
						<router-link :to="{name: 'HistoryBuy'}">История заказов</router-link>
					</li>
					<li>
						<router-link :to="{name: 'Profile'}">Профиль</router-link>
					</li>
				</ul>
			</aside>
			<aside v-else>
				<button class="test btn_theme">авторизоваться</button>
				<button class="test btn_theme">регистрироваться</button>
			</aside>
			<div class="content-section">
				<slot></slot>
			</div>
		</div>
	</main-layout>
</template>

<script>
	import MainLayout from '@/layouts/Main'

	export default{
		name: 'profile',
		components: {MainLayout},
		data() {
			return{
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