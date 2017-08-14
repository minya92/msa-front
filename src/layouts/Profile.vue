<template>
	<main-layout>
		<div id="profile" class="content-fluid">
			<aside>
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
</style>