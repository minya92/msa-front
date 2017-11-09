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
							<router-link v-if='$store.state.isAuthorized' to="/profile/historybuy">История покупок</router-link>
							<router-link to="/contacts">Контакты</router-link>
						</div>
						<div class="hbox-phone">
							<template v-for="phone in phoneHeader">
								<a :href="'tel:' + phone"><icon name="phone"></icon>{{phone}}</a>
							</template>
						</div>
						<div class="login-section" v-if='$store.state.isAuthorized'>
							<a>{{lang.userName | emptyName}}
								<ul class="user-link_menu">
									<li><router-link to="/profile">Профиль</router-link></li>
									<li @click.prevent="logout()"><a>Выйти</a></li>
								</ul></a>
							</router-link>
						</div>
						<div class="login-section" v-else>
							<a @click.prevent='showAuth=true'>Вход</a> / <a @click.prevent='showRegistry=true'>Регистрация</a>
						</div>
						<minicart></minicart>
					</div>
				</div>
				<div class="header-bottom flex-vc">
					<div class="container-fluid header-bottom-section">
						<div style="display: flex; align-items: baseline;">
							<div id="show-modal-findmoto">
								<span><div class="menu_icon"></div>{{lang.find_menu}}</span>
								<findMoto></findMoto>
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
			<div class="bg__theme_two">
				<breadcrumbs class="container-fluid"></breadcrumbs>
			</div>
			<slot></slot>
		</div>
		<auth v-if="showAuth" @close="showAuth=false"></auth>
		<registry v-if="showRegistry" @close="showRegistry=false"></registry>
		<footer>
			<div class="footer-top__ss">Наши каналы:
				<div class="footer-top__ssi">
					<svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<defs>
								<rect id="ing-path-1" x="0" y="0" width="28" height="28" rx="1"></rect>
								<mask id="ing-mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="28" height="28" fill="white">
										<use xlink:href="#ing-path-1"></use>
								</mask>
						</defs>
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								<g>
										<use id="Rectangle-4" stroke="#000000" mask="url(#ing-mask-2)" stroke-width="2" xlink:href="#ing-path-1"></use>
										<path d="M17.5009085,10.946319 C17.0440382,10.946319 16.6736316,10.5762877 16.6736316,10.1198803 C16.6736316,9.66347288 17.0440382,9.29344163 17.5009085,9.29344163 C17.9577788,9.29344163 18.3281853,9.66347288 18.3281853,10.1198803 C18.3281853,10.5762877 17.9577788,10.946319 17.5009085,10.946319 M13.8128549,17.3498858 C11.8540768,17.3498858 10.2635703,15.7609908 10.2635703,13.8041973 C10.2635703,11.8474038 11.8540768,10.2585087 13.8128549,10.2585087 C15.771633,10.2585087 17.3621395,11.8474038 17.3621395,13.8041973 C17.3621395,15.7609908 15.771633,17.3498858 13.8128549,17.3498858 M20.3616852,9.2827779 C20.1855553,8.82956959 19.9507154,8.44567549 19.566432,8.06178139 C19.1821485,7.6778873 18.7978651,7.44328535 18.3441971,7.26733388 C17.906541,7.09671429 17.3995003,6.97941331 16.6682943,6.94742214 C15.9317511,6.91543096 15.6969112,6.90476724 13.8181921,6.90476724 C11.9394731,6.90476724 11.7046332,6.9100991 10.9680899,6.94742214 C10.2315467,6.97941331 9.72984329,7.09671429 9.29218715,7.26733388 C8.83851919,7.44328535 8.45423575,7.6778873 8.06995231,8.06178139 C7.68566886,8.44567549 7.45082898,8.82956959 7.27469907,9.2827779 C7.10390643,9.71999062 6.98648649,10.2265176 6.95446287,10.9569827 C6.92243925,11.6927797 6.91176471,11.9273817 6.91176471,13.8041973 C6.91176471,15.6810129 6.91710198,15.9156148 6.95446287,16.6514118 C6.98648649,17.3872089 7.10390643,17.8884039 7.27469907,18.3256167 C7.45082898,18.778825 7.68566886,19.1627191 8.06995231,19.5466132 C8.45423575,19.9305073 8.83851919,20.1651092 9.29218715,20.3410607 C9.72984329,20.5116803 10.2368839,20.6289812 10.9680899,20.6609724 C11.7046332,20.6929636 11.9394731,20.7036273 13.8181921,20.7036273 C15.6969112,20.7036273 15.9317511,20.6982955 16.6682943,20.6609724 C17.4048376,20.6289812 17.906541,20.5116803 18.3441971,20.3410607 C18.7978651,20.1651092 19.1821485,19.9305073 19.566432,19.5466132 C19.9507154,19.1627191 20.1855553,18.778825 20.3616852,18.3256167 C20.5324779,17.8884039 20.6498978,17.381877 20.6819214,16.6514118 C20.713945,15.9156148 20.7246196,15.6810129 20.7246196,13.8041973 C20.7246196,11.9273817 20.7192823,11.6927797 20.6819214,10.9569827 C20.6498978,10.2211857 20.5324779,9.71999062 20.3616852,9.2827779 Z" id="Fill-1" fill="#000000"></path>
								</g>
						</g>
				</svg>
				<span>Инстаграм</span>
				</div>
				<div class="footer-top__ssi">
					<svg width="29px" height="28px" viewBox="0 0 29 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<defs>
								<rect id="vk-path-1" x="0.823529412" y="0" width="28" height="28" rx="1"></rect>
								<mask id="vk-mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="28" height="28" fill="white">
										<use xlink:href="#vk-path-1"></use>
								</mask>
						</defs>
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								<g>
										<use id="Rectangle-4-Copy-4" stroke="#000000" mask="url(#vk-mask-2)" stroke-width="2" xlink:href="#vk-path-1"></use>
										<path d="M15.999852,9.46850286 C16.0495281,10.8184335 15.9129187,12.2350918 16.0495281,13.4912061 C16.0867852,13.8654994 16.4101324,14.2530941 16.845621,13.7852053 C18.0271153,12.4756206 19.0343729,9.96312686 19.1589333,9.52197333 C19.2210696,9.28148876 19.394895,9.17468038 19.6064709,9.17468038 L22.7527631,9.17468038 C23.1137375,9.17468038 23.7231749,9.37508419 23.2752261,10.310685 C22.466673,11.9811733 21.6461943,12.8097448 20.7259111,14.2799177 C20.464659,14.6942476 20.3524765,15.108445 20.6633635,15.4423924 C21.5712278,16.4182949 22.6409507,17.3932693 23.2379279,18.3692602 C23.6730053,19.1172724 23.262766,19.6919695 22.6409096,19.6919695 L19.8800597,19.6919695 C19.5194965,19.6919695 19.2210285,19.5314697 18.9349795,19.2778164 C18.3379612,18.7705097 17.9025137,18.1155627 17.3680429,17.5408655 C16.870418,17.0197272 16.5223149,17.0326309 16.285901,17.5270339 C16.0867852,17.9015482 16.0619471,18.329533 16.02469,19.1043688 C15.999852,19.4789272 15.763438,19.6384549 15.4401319,19.6919253 L14.0971491,19.6919253 C11.2990422,19.6919253 9.22210274,17.4338362 7.5682329,14.1995794 C6.82181609,12.7294949 6.11306761,11.4064762 5.47883332,9.7225981 C5.42915719,9.41516495 5.60302366,9.17468038 6.02613437,9.17468038 L8.55061135,9.17468038 C8.91121568,9.17468038 9.18484564,9.36169448 9.28419791,9.58887771 C9.99335762,11.3396602 10.8262964,12.9031634 11.5975513,13.83872 C11.7714178,14.0524693 12.0823049,14.1327192 12.2814617,13.83872 C12.6296059,13.3309272 12.5302536,10.4709196 12.3311379,10.0832808 C11.9829526,9.37508419 11.3983944,9.60222324 11.3983944,9.46850286 C11.4232325,9.05430552 11.9332765,8.68005638 13.8235191,8.66666667 C15.2911035,8.66666667 15.9749728,8.81382095 15.999852,9.46850286" id="Fill-1" fill="#000000"></path>
								</g>
						</g>
				</svg>
				<span>Вконтакте</span>
				</div>
				<div class="footer-top__ssi">
					<svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<defs>
							<rect id="fb-path-1" x="0" y="0" width="28" height="28" rx="1"></rect>
							<mask id="fb-mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="28" height="28" fill="white">
									<use xlink:href="#fb-path-1"></use>
							</mask>
						</defs>
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<use id="Rectangle-4-Copy-2" stroke="#000000" mask="url(#fb-mask-2)" stroke-width="2" xlink:href="#fb-path-1"></use>
							<path d="M11.6670168,10.1229846 L11.6670168,12.4640977 L9.32352941,12.4640977 L9.32352941,15.1933907 L11.6670168,15.1933907 L11.6670168,22.0952381 L14.4598653,22.0952381 L14.4598653,15.1933907 L16.8033527,15.1933907 L17.1311391,12.4640977 L14.4598653,12.4640977 L14.4598653,10.5231975 C14.4598653,9.94100767 14.9337181,9.46787565 15.5287041,9.46787565 L17.2647188,9.46787565 L17.2647188,6.99327809 L15.7469606,6.93275281 C15.3220509,6.90852666 14.8722883,6.88426039 14.4598653,6.93275281 C12.881119,7.15098877 11.6670168,8.4975058 11.6670168,10.1229846 Z" id="Page-1" fill="#010101"></path>
						</g>
					</svg>
					<span>facebook</span>
				</div>
				<div class="footer-top__ssi">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28px" height="28px" viewBox="0 0 28 28" version="1.1">
    <defs/>
    <g id="graphics" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Group-5">
            <g id="instagram-copy" stroke="#000000">
                <rect id="Rectangle-4" x="0.5" y="0.5" width="27" height="27" rx="1"/>
            </g>
            <g id="if_icon-social-youtube_211929" transform="translate(7.000000, 9.000000)" fill-rule="nonzero" fill="#000000">
                <path d="M13.9091221,2.20821052 C13.9091221,1.03640069 13.003919,0.0937447864 11.8854052,0.0937447864 C10.3703523,0.0260402184 8.82521712,0 7.24726492,0 C7.16522234,0 7.08317977,0 7.00113719,0 C6.91909461,0 6.83705204,0 6.75500946,0 C5.17979201,0 3.63192208,0.0260402184 2.11686918,0.0937447864 C1.00109015,0.0937447864 0.0958870631,1.04160874 0.0958870631,2.21341857 C0.02751825,3.14045034 -0.00256402781,4.06748212 0.00017072472,4.9945139 C-0.00256402781,5.92154567 0.02751825,6.84857745 0.0931523106,7.77821325 C0.0931523106,8.95002308 0.998355397,9.90049105 2.11413443,9.90049105 C3.7057604,9.97079964 5.33840765,10.0020479 6.99840244,9.99944388 C8.66113197,10.0046519 10.2883097,9.97340366 11.8826704,9.90049105 C13.0011842,9.90049105 13.9063873,8.95002308 13.9063873,7.77821325 C13.9720214,6.84857745 14.0021037,5.92154567 13.9993689,4.99190987 C14.0048384,4.0648781 13.9747561,3.13784632 13.9091221,2.20821052 Z M6,7 L6,3 L9,4.99898219 L6,7 Z" id="Shape"/>
            </g>
        </g>
    </g>
</svg>
					<span>youtube</span>
				</div>
			</div>
			<div class="footer-top">
				<ul class="footer-top__menu container-fluid">
					<li><router-link to="/review">Отзывы</router-link></li>
					<li><a>Напишите нам</a></li>
					<li><router-link to="/info">Информация</router-link></li>
					<li><a>Вопрос и ответ</a></li>
					<li><a>Статус заказа</a></li>
				</ul>
			</div>
			<div class="footer-bottom">
				<div class="container-fluid footer-bottom__content">
					<div class="fbox-lr">
						<div class="fbox-l-container">
							<a target="_blank" href="https://www.facebook.com/msa.moto.3"><img src="../assets/img/fb_grey.svg"></a>
              <a target="_blank" href="https://www.youtube.com/channel/UCAqrLCG9-BwvSQPqpyvqSqQ"><img src="../assets/img/youtube_grey.svg"></a>
              <a target="_blank" href="https://www.instagram.com/msa_moto/"><img src="../assets/img/instagram_grey.svg"></a>
							<!--img src="../assets/img/ok_grey.svg"-->
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
						<router-link to="/">
							<img src="../assets/img/logo_footer.png">
						</router-link>
						<span class="copyright">&copy; {{copyright}}</span>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>
</template>

<script>
	import findMoto from '@/components/FindMoto'
	import searchForm from '@/components/Search'
	import auth from '@/components/Auth'
	import registry from '@/components/Registry'
	import style from '@/assets/css/style.css'
	import Breadcrumbs from '@/components/Breadcrumbs'
	import minicart from '@/components/cart/Minicart'
	export default{
		name: 'app',
		components: {findMoto, searchForm, auth, registry, Breadcrumbs, minicart},
		data() {
			return{
				lang: {
					find_menu: 'Поиск запчастей',
					catalog: 'Каталог',
					userName: 'Личный кабинет',
				},
				showAuth: false,
				showRegistry: false,
				copyright: "2017 MSA MOTO - все права защищены",
				phoneHeader: ['+7 (914) 141-09-02'],
				phoneFooter: ['+7 (914) 141-09-02']
			}
		},
		methods:{
			logout: function(){
				this.$store.dispatch('logout')
			}
		},
		filters: {
			emptyName: function(name){
				return name ? name : this.lang.userName
			}
		},
		created(){
			if (localStorage.getItem('token')){
				this.userName = JSON.parse(localStorage.getItem('token')).login
				//console.log(localStorage.getItem('token'));
			}
		}
	}
</script>
<style>
.footer-top__ssi svg{
	cursor: pointer;
}
.footer-top__ssi svg rect{
	stroke: #fff;
}
.footer-top__ssi svg path{
	fill: #fff;
}
.footer-top__ssi:hover svg rect{
	stroke: #801f25;
	fill: #fff;
}
.footer-top__ssi:hover svg path{
	fill: #801f25;
}
</style>
