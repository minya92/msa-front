<template>
	<div id="app">
		<div class="content-box">
			<header>
				<div class="header-top  flex-vc">
					<div class="container-fluid">
						<router-link to="/" class="header-logo">
							<img src="../assets/image/logo_header.png">
							<span>MSA MOTO</span>
						</router-link>
						<div>
							<router-link to="/historybuy">История покупок</router-link>
							<router-link to="/contacts">Контакты</router-link>
						</div>
					</div>
				</div>
				<div class="header-bottom flex-vc">
					<div class="container-fluid">
						<div>
							<img src="../assets/image/parts.svg">Поиск запчастей
							<findMoto></findMoto>
						</div>
					</div>
				</div>
			</header>
			<slot></slot>
		</div>

		<footer>
			<div class="container-fluid">
				<div class="footer-top">
					<ul>
						<li><a>Отзывы</a></li>
						<li><a>Напишите нам</a></li>
						<li><a>Информация</a></li>
						<li><a>Вопрос и ответ</a></li>
						<li><a>Статус заказа</a></li>
					</ul>
				</div>
				<div class="footer-bottom">
					<div class="fbox-lr">
						<div class="fbox-l-container">
							<img src="../assets/image/instagram_grey.svg">
							<img src="../assets/image/vk_grey.svg">
							<img src="../assets/image/fb_grey.svg">
							<img src="../assets/image/ok_grey.svg">
						</div>
					</div>
					<div class="fbox-c"></div>
					<div class="fbox-lr">
						<div class="fbox-r-container">
							<img src="../assets/image/logo_footer.png">
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
	export default{
		name: 'app',
		components: {findMoto},
		data() {
			return{
				copyright: "2017 MSA MOTO - все права защищены"
			}
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	html,
	body {
		height: 100%;
	}
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
	}
	header{
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
	.header-bottom{
		height: 60px;
		position: relative;
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
</style>