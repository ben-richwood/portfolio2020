<template lang="html">
  <svg :title="use" class="techno-svg" :class="{'large': large}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <use :xlink:href="use"/>
  </svg>
</template>

<script>
	export default {
		props: {
			'use': {type: String, required: true},
			'large': {type: Boolean, default: false},
		},
	}
</script>

<style lang="css" scoped>
</style>
