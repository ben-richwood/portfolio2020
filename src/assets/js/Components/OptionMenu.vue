<template lang="html">
	<div id="optionMenu" v-show="isOpen">
		Option menu
	</div>
</template>

<script>
	export default {
		props: {
			isOpen: {type: Boolean, default: false}
		}
	}
</script>

<style lang="css" scoped>
</style>
