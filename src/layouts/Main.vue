<template>
	<div id="app">
		<div class="content-box">
			<header>
				<div class="header-top flex-vc">
					<div class="container-fluid header-top-section">
						<router-link to="/" class="header-logo flex-vc">
							<img src="../assets/img/logo_header.png">
							<span>MSA MOTO</span>
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
						<div class="login-section" v-if='this.$authenticated'>
							<router-link to="/profile">Личный кабинет</router-link>
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
							<div id="show-modal-findmoto" @click="showModal=true">
								<img src="../assets/img/parts.svg">Поиск запчастей
							</div>
							<findMoto v-if="showModal" @close="showModal=false"></findMoto>
							<router-link to="/catalog" id="catalog-menu">
								<img src="../assets/img/menu.svg">Каталог
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
			<div class="container-fluid">
				<div class="footer-top">
					<ul>
						<li><router-link to="/review">Отзывы</router-link></li>
						<li><a>Напишите нам</a></li>
						<li><router-link to="/info">Информация</router-link></li>
						<li><a>Вопрос и ответ</a></li>
						<li><a>Статус заказа</a></li>
					</ul>
				</div>
				<div class="footer-bottom">
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
	export default{
		name: 'app',
		components: {findMoto, searchForm, auth, registry},
		data() {
			return{
				showModal: false,
				showAuth: false,
				showRegistry: false,
				copyright: "2017 MSA MOTO - все права защищены",
				phoneHeader: ['8-495-000-00-00', '8-495-000-00-00'],
				phoneFooter: ['8-495-000-00-00', '8-495-000-00-00']
			}
		},
		methods:{
		},
		created(){
//console.log(this.$breadcrumbs);
}
}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	html,
	body {
		height: 100%;
	}
	body{
		font-size: 14px;
		line-height: 1.42857143;
	}
	h1{ font-size: 36px;}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.flex-vc{
		display: flex;
		align-items: center;
	}
	.content-box {
		flex: 1 0 auto;
	}
	#footer {
		flex: 0 0 auto;
	}
	.container-fluid{
		max-width: 1400px;
		width: 100%;
	}
	header .container-fluid>div{
		display: inline-block;
	}
	.header-top{
		background: #000;
		height: 35px;
		color: #fff;
	}
	.header-top a{
		color: #fff;
		text-decoration: none;
	}
	.header-top-section, .header-bottom-section{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;
	}
	.header-top-section-menu a{
		padding-right: 30px;
	}
	.hbox-phone a{
		padding-right: 50px;
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
	#catalog-menu{
		padding-left: 60px;
		text-decoration: none;
		color: inherit;
	}
	#show-modal-findmoto img, #catalog-menu img{
		padding-right: 15px;
	}
	#show-modal-findmoto, #catalog-menu{
		cursor: pointer;
	}
	header #search_form input {
		color: #000;
	}

	.swiper-button-prev, .swiper-container-rtl .swiper-button-next{
		background-color: rgba(128,31,37,0.4);
	}

  .breadcrumbs{
    font-size: 11px;
    background: #801f25;
    height: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-bottom: 15px;
  }
  .padding-delmiter{
    padding: 0 5px;
  }
  .content-fluid{
    width: 1160px;
    margin: 30px auto;
  }
  .f-col{
  	flex-direction: column;
  }

	footer{
		border-top: 13px solid #801f25;
	}
	.footer-top{
		background: #262626;
		color: #9b9b9b;
		display: flex;
		justify-content: center;
		height: 68px;
		align-items: center;
	}
	.footer-top ul{
		display: flex;
		width: 1160px;
		justify-content: space-around;
		list-style: none;
		font-size: 12px;
	}
	.footer-top ul li:before{
		content: '\2022';
		font-size: 46px;
		vertical-align: middle;
		margin-bottom: 5px;
		display: inline-block;
		margin-right: 7px;
	}
	.footer-top a{
		text-decoration: none;
		color: inherit;
	}
	.footer-top li:hover a, .footer-top li:hover:before{
		color: #ccc;
		font-weight: 600;
	}
	.footer-bottom{
		background: #000;
		color: #787878;
		display: flex;
		align-items: center;
		height: 154px;
	}
	.fbox-c {
		flex: 2;
		border-left: 1px solid #787878;
		border-right: 1px solid #787878;
		height: 100%;
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.fbox-lr {
		flex: 1;
		display: flex;
		justify-content: center;
		text-align: center;
		font-size: 12px;
	}
	.fbox-l-container{
		display: flex;
		width: 180px;
		justify-content: space-around;
	}
	.fbox-r-container{
		width: 180px;
	}
	.fbox-r-container span{
		clear: both;
		display: block;
		margin-top: 5px;
	}
	.copyright{
		font-size: 12px;
	}
	.fbox-c-phone{
		margin: 15px 0;
	}
	.fbox-c-phone .fa-icon{
		vertical-align: bottom;
		margin-right: 5px;
		width: 18px;
		height: 18px;
	}
	.fbox-c-phone a{
		color: #9b9b9b;
		text-decoration: none;
		margin: 0 15px;
		font-size: 16px;
	}
	.fbox-c-menu{
		margin: 15px 0;
	}
	.fbox-c-menu a{
		color: #9b9b9b;
		text-decoration: none;
		margin: 0 15px;
		font-size: 12px;
		cursor: pointer;
	}
	.fbox-c a:hover{
		color: #ccc;
	}
	footer #search_form input {
		background: #ccc;
	}
</style>