<template>
	<div id="app">
		<router-view></router-view>
		<div id="win_popup" v-if="visiblePopup" :class="statusPopup ? 'is-failed' : 'is-success'">{{messagePopup}}</div>
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
		},
		computed:{
			visiblePopup: function(){
				return this.$store.getters.popupState.visible;
			},
			statusPopup: function(){
				return this.$store.getters.popupState.error;
			},
			messagePopup: function(){
				return this.$store.getters.popupState.message;
			}
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