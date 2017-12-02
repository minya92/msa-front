<template>
	<div id="app">
		<router-view></router-view>
		<div 
			id="win_popup" 
			v-if="$store.getters.getVisiblePopup" 
			:class="$store.getters.getStatusPopup ? 'is-failed' : 'is-success'"
		>{{$store.getters.getMessagePopup}}</div>
		
		<div id="page-preloader" v-if="$store.getters.isLoading">
			<div class="page-preloader__loader"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		created(){
			this.$API.get("clients/current").then(r => {
				if (r.data.data != null){
					this.$store.dispatch('login', r.data.data);
				}
			})
		}
	}
</script>

<style>
#win_popup{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	color: #fff;
	text-align: center;
	padding: 8px 0;
	border: 1px solid rgba(255, 255, 255, 0.3);
	z-index: 200;
}
.is-success{
 background: #00af6b;
}
.is-failed{
 background: #bf000c;
}
</style>