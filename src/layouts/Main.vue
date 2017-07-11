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
							<router-link to="/historybuy">История покупок</router-link>
							<router-link to="/contacts">Контакты</router-link>
						</div>
						<div class="hbox-phone">
							<template v-for="phone in phoneHeader">
								<a :href="'tel:' + phone"><icon name="phone"></icon>{{phone}}</a>
							</template>
						</div>
						<div class="login-section" v-if='$store.state.isAuthorized'>
							<a>{{userName}}
								<ul class="user-link_menu">
									<li><router-link to="/profile">Профиль</router-link></li>
									<li @click.prevent="logout()"><a>Выйти</a></li>
								</ul></a>
							</router-link>
						</div>
						<div class="login-section" v-else>
							<a @click.prevent='showAuth=true'>Вход</a> / <a @click.prevent='showRegistry=true'>Регистрация</a>
						</div>
						<div class="mini-cart">
							<img src="../assets/img/cart_empty.svg">корзина пуста
						</div>
					</div>
				</div>
				<div class="header-bottom flex-vc">
					<div class="container-fluid header-bottom-section">
						<div style="display: flex; align-items: baseline;">
							<div id="show-modal-findmoto">
								<span @click="showModal=true"><div class="menu_icon"></div>{{lang.find_menu}}</span>
								<findMoto v-if="showModal" @close="showModal=false"></findMoto>
							</div>
							<router-link to="/catalog" id="catalog-menu">
								<span><div class="menu_icon"></div>{{lang.catalog}}</span>
							</router-link>
						</div>
						<searchForm></searchForm>
						<div style="width: 320px"></div>
					</div>
				</div>
			</header>
			<slot></slot>
		</div>
		<auth v-if="showAuth" @close="showAuth=false"></auth>
		<registry v-if="showRegistry" @close="showRegistry=false"></registry>
		<footer>
			<div class="footer-top">
				<div class="container-fluid">
					<ul>
						<li><router-link to="/review">Отзывы</router-link></li>
						<li><a>Напишите нам</a></li>
						<li><router-link to="/info">Информация</router-link></li>
						<li><a>Вопрос и ответ</a></li>
						<li><a>Статус заказа</a></li>
					</ul>
				</div>
			</div>
			<div class="footer-bottom">
				<div class="container-fluid">
					<div class="fbox-lr">
						<div class="fbox-l-container">
							<img src="../assets/img/instagram_grey.svg">
							<img src="../assets/img/vk_grey.svg">
							<img src="../assets/img/fb_grey.svg">
							<img src="../assets/img/ok_grey.svg">
						</div>
					</div>
					<div class="fbox-c">
						<div class="fbox-c-phone">
							<template v-for="phone in phoneFooter">
								<a :href="'tel:' + phone"><icon name="phone"></icon>{{phone}}</a>
							</template>
						</div>
						<div class="fbox-c-search"></div>
						<searchForm></searchForm>
						<div class="fbox-c-menu">
							<a>Производители</a>
							<a>Оплата и доставка</a>
							<a>О магазине</a>
						</ul>
					</div>
				</div>
				<div class="fbox-lr">
					<div class="fbox-r-container">
						<img src="../assets/img/logo_footer.png">
						<span class="copyright">&copy; {{copyright}}</span>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>
</template>

<script>
	import findMoto from '../components/FindMoto'
	import searchForm from '../components/Search'
	import auth from '../components/Auth'
	import registry from '../components/Registry'
	import style from '../assets/css/style.css'
	export default{
		name: 'app',
		components: {findMoto, searchForm, auth, registry},
		data() {
			return{
				lang: {
					find_menu: 'Поиск запчастей',
					catalog: 'Каталог'
				},
				userName: 'Личный кабинет',
				showModal: false,
				showAuth: false,
				showRegistry: false,
				copyright: "2017 MSA MOTO - все права защищены",
				phoneHeader: ['+7 (910) 684-44-88'],
				phoneFooter: ['+7 (910) 684-44-88']
			}
		},
		methods:{
			logout: function(){
				this.$store.dispatch('logout');
			}
		},
		created(){
			if (localStorage.getItem('token')){
				this.userName = JSON.parse(localStorage.getItem('token')).login;
				console.log(localStorage.getItem('token'));
			}
		}
	}
</script>