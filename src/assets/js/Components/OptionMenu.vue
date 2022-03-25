<template lang="html">
	<div id="optionMenu" v-show="isOpen">
		Option menu
	</div>
</template>

<script>
	import { sound } from "../utilis.js";
	export default {
		props: {
			isOpen: {type: Boolean, default: false}
		},
		methods: {
			open(){
				sound.project();
			}
		}
	}
</script>

<style lang="css" scoped>
</style>
