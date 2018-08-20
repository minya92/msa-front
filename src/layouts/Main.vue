<template>
	<div id="app" :class="headerFixedScroll ? 'fixed' : ''">
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
							<a v-for="phone in phoneHeader" :href="'tel:' + phone" :key="phone">
								<svg version="1.1" role="presentation" width="12.571428571428571" height="16" viewBox="0 0 1408 1792" class="fa-icon" fill="#fff">
									<path d="M1408 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-53-3.5t-57.5-12.5-47-14.5-55.5-20.5-49-18q-98-35-175-83-127-79-264-216t-216-264q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47-12.5-57.5-3.5-53q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z"></path> 
								</svg>{{phone}}
							</a>
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
						<div class="header-bottom-menu">
							<div id="show-modal-findmoto"  @click="showFinderMoto = true">
								<span><div class="menu_icon"></div>{{lang.find_menu}}</span>
								<findMoto v-if="showFinderMoto" @close="showFinderMoto = false"></findMoto>
							</div>
							<router-link to="/catalog" id="catalog-menu">
								<span><div class="menu_icon"></div>{{lang.catalog}}</span>
							</router-link>
							<div class="search-mobile" @click="visibleSearch = !visibleSearch">
								<svg data-v-c3e4eec0="" version="1.1" role="presentation" width="14.857142857142858" height="16" viewBox="0 0 1664 1792" class="fa-icon">
									<path d="M1152 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zM1664 1664q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"></path> 
								</svg>
							</div>
						</div>
						<searchForm :class="visibleSearch ? 'visible-mobile' : ''"></searchForm>
						<minicart v-if="headerFixedScroll"></minicart>
						<div class="need__future" v-else style="width: 320px"></div>
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
				phoneHeader: ['+7 (914) 471-67-76'],
				showRegistry: false,
				showFinderMoto: false,
				headerFixedScroll: false,
				visibleSearch: false
			}
		},
		methods: {
			logout() {
				this.$API.get('?__type=18').then(r => {
					this.$store.dispatch('logout')
        });
			},
			handleScroll () {
				this.headerFixedScroll = window.scrollY > 35;
			}
		},
		filters: {
			emptyName(name) {
				return name ? name : 'лк'
			}
		},
		created () {
			window.addEventListener('scroll', this.handleScroll);
		},
		destroyed () {
			window.removeEventListener('scroll', this.handleScroll);
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
.login-section a{
	cursor: pointer;
}
.header-bottom{
	padding: 10px 0;
	position: relative;
  border-top: black solid;
	box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
	width: 100%;
	background: #fff;
}
.header-bottom-section{
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
.fixed .mini-cart svg path, .fixed .mini-cart svg polyline {
	fill: #000;
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
@media  (max-width: 768px){
	.header-top-section .hbox-phone, .header-top-section .header-top-section-menu{
		flex: none;
	}
	header .search_input input[type="text"]{
		width: 100%;
	}
	.need__future{
		display: none;
	}

	.header-bottom  .mini-cart{
		display: none !important;
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
	.header-bottom {
		padding: 5px 0;
	}
	#catalog-menu > span, #show-modal-findmoto > span {
    font-size: 14px;
	}
	#catalog-menu .menu_icon, #show-modal-findmoto .menu_icon{
		width: 30px;
		height: 30px;
	}
}
</style>
