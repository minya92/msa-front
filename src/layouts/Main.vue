<template>
	<div id="app">
		<div class="content-box">
			<header>
				<div class="header-top flex-vc">
					<div class="container-fluid header-top-section">
						<router-link to="/" class="header-logo flex-vc">
							<img src="../assets/img/logo_header.png">
						</router-link>
						<div class="header-top-section-menu">
							<router-link to="/contacts">Контакты</router-link>
						</div>
						<div class="hbox-phone">
							<a v-for="phone in phoneHeader" :href="'tel:' + phone" :key="phone"><icon name="phone"></icon>{{phone}}</a>
						</div>
						<div class="login-section" v-if='$store.getters.isAuthorized'>
							<router-link to="/profile">Личный кабинет</router-link>
								<ul class="user-link_menu">
									<li><router-link to="/profile">Профиль</router-link></li>
									<li><router-link :to="{name: 'Order'}">История покупок</router-link></li>
									<li @click.prevent="logout"><a>Выйти</a></li>
								</ul>
						</div>
						<!--div class="login-section" v-else>
							<a @click.prevent='showAuth=true'>Вход</a> / <a @click.prevent='showRegistry=true'>Регистрация</a>
						</div-->
						<minicart></minicart>
					</div>
				</div>
				<div class="header-bottom flex-vc">
					<div class="container-fluid header-bottom-section">
						<div style="display: flex; align-items: baseline;">
							<div id="show-modal-findmoto"  @click="showFinderMoto = true">
								<span><div class="menu_icon"></div>{{lang.find_menu}}</span>
								<findMoto v-if="showFinderMoto" @close="showFinderMoto = false"></findMoto>
							</div>
							<!--router-link to="/catalog" id="catalog-menu">
								<span><div class="menu_icon"></div>{{lang.catalog}}</span>
							</router-link-->
						</div>
						<searchForm></searchForm>
						<div class="need__future" style="width: 320px"></div>
					</div>
				</div>
			</header>
			<div class="bg__theme_two">
				<breadcrumbs class="container-fluid"></breadcrumbs>
			</div>
			<slot></slot>
		</div>
		<!--auth v-if="showAuth" @close="showAuth=false"></auth-->
		<!--registry v-if="showRegistry" @close="showRegistry=false"></registry-->
		<footer-theme></footer-theme>
</div>
</template>

<script>
	import findMoto from '@/components/FindMoto'
	import searchForm from '@/components/Search'
	import auth from '@/components/auth/Auth'
	import registry from '@/components/auth/Registry'
	import style from '@/assets/css/style.css'
	import Breadcrumbs from '@/components/Breadcrumbs'
	import minicart from '@/components/cart/Minicart'
	import footerTheme from './FooterTheme'
	export default{
		name: 'app',
		components: {
			findMoto, 
			searchForm, 
			auth, 
			registry, 
			Breadcrumbs, 
			minicart, 
			footerTheme
		},
		data() {
			return{
				lang: {
					find_menu: 'Подбор по мото',
					catalog: 'Каталог',
				},
				showAuth: false,
				phoneHeader: ['+7 (910) 684-44-88'],
				showRegistry: false,
				showFinderMoto: false
			}
		},
		methods:{
			logout: function(){
				this.$API.get('?__type=18').then(r => {
					this.$store.dispatch('logout')
        });
			}
		},
		filters: {
			emptyName: function(name){
				return name ? name : 'лк'
			}
		},
		created(){
		}
	}
</script>
<style>
header>div{
	display: inline-block;
}
.header-top{
	background: #000;
	color: #fff;
}
.header-top a{
	color: #fff;
	text-decoration: none;
}
.header-top-section{
	display: flex;
	align-items: center;
	padding: 0 15px;
}
.header-top-section .header-logo{
	flex: 1;
}

.header-logo img{
	max-height: 35px;
}
.header-top-section .header-top-section-menu{
	flex: 2;
	display: flex;
	justify-content: center;
}
.header-top-section .hbox-phone{
	flex: 2;
}
.header-top-section .login-section{
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
.user-link_menu{
	display: none;
	min-width: 140px;
	padding: 10px 18px;
	list-style: none;
	position: absolute;
	right: 0px;
	top: 100%;
	z-index: 100;
	text-align: right;
	border-top: 4px solid #C4141E;
	border-bottom: 4px solid #C4141E;
	background: #fff;
	box-shadow: 0px 7px 7px 0px #333;
}
.user-link_menu li{
	margin: 5px 0;
}
.user-link_menu a{
	color: #9B9B9B;
}
.user-link_menu a:hover{
	color: #000;
}
.login-section>a:hover .user-link_menu{
	display: block;
}
.header-top-section .mini-cart{
	flex: 1;
	display: flex;
	justify-content: flex-end;
}
.minicart__img{
	position: relative;
	margin-right: 10px;
}
.minicart__count{
	position: absolute;
	background: #801f25;
	color: #fff;
	border-radius: 50%;top: -4px;
    right: -3px;
    font-size: 10px;
    min-width: 14px;
    min-height: 14px;
    z-index: 1;
    text-align: center;
}
.header-top-section-menu a:hover, .hbox-phone a:hover{
	color: #ff0000;
}
.header-top-section-menu a{
	padding-right: 30px;
}
.hbox-phone a{
	padding-right: 10px;
}
.hbox-phone .fa-icon{
	vertical-align: middle;
	margin-right: 5px;
	width: 18px;
	height: 18px;
}
.hbox-phone a{
	color: #fff;
	text-decoration: none;
	font-size: 16px;
}
.mini-cart img{
	vertical-align: bottom;
	margin-right: 5px;
	width: 18px;
	height: 18px;
}
.login-section a{
	cursor: pointer;
}
.header-bottom{
	height: 60px;
	position: relative;
}
.header-bottom-section{
	display: flex;
	align-items: center;
	padding: 0 15px;
	justify-content: space-between;
}

header .search_input{
	position: relative;
}
header .search_input label {
	position: absolute;
	right: 10px;
	top: 5px;
}
header .search_input input[type="text"]{
	border-radius: 15px;
	height: 30px;
	padding: 0 25px;
	font-size: 14px;
	width: 460px;
	max-width: 100%;
	border: 1px solid #000;
	outline: none;
}

@media (min-width: 769px) and (max-width: 960px){
	.header-top-section .hbox-phone, .header-top-section .header-top-section-menu{
		flex: none;
	}
}
@media (min-width: 481px) and (max-width: 768px){
	.header-top-section .hbox-phone, .header-top-section .header-top-section-menu{
		flex: none;
	}
	header .search_input input[type="text"]{
		width: 100%;
	}
	.need__future{
		display: none;
	}
}

@media (max-width: 480px){
	.header-top{
		height: auto;
	}
	.header-top-section{
		display: block;
	}
	.header-top-section .mini-cart{
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.hbox-phone{
		display: flex;
		justify-content: center;
	}
	.header-top-section-menu a, .hbox-phone a{
		padding: 5px 10px;
	}
	.header-top-section .login-section {
		justify-content: center;
		padding: 10px;
	}
	.need__future{
		display: none;
	}
	header .search_input input[type="text"]{
		width: 100%;
	}
}

@media (max-width: 375px){
	.header-bottom{
		height: auto;
	}
	.header-bottom-section{
		flex-direction: column;
	}
	.header-bottom-section>div{
		padding: 5px 0;
	}
}
</style>
