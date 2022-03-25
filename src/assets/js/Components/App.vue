<template lang="html">
	<div>
		<div id="brightness"></div>
		<Canvas ref="canvas" />
		<OptionMenu :isOpen="isMenuOpen" />
		<ProjectDetail :isOpen="selectedProject !== null" />
		<Legend ref="legend" @applyFilter="applyFilter" />
	</div>
</template>

<script>
	import Canvas from "./Canvas.vue"
	import ProjectDetail from "./ProjectDetail.vue"
	import Legend from "./Legend.vue"
	import OptionMenu from "./OptionMenu.vue"

	export default {
		components: { Legend, Canvas, OptionMenu, ProjectDetail },
		data(){
			return{
				isMenuOpen: false,
				selectedProject: null
			}
		},
		methods:{
			start(){
				this.$refs.legend.displayLegend()
				this.$refs.canvas.start()
			},
			applyFilter(){
				// this.$refs.legend.displayLegend()
				this.$refs.canvas.applyFilter()
				console.log("this.$store.settings.currFilter:", this.$store.state.settings.currFilter);
			}
		},
		mounted(){
			// settings.isMobile = isMobile;
		  // settings.GPU = rendererEval;
		}
		// this.$store.state.settings
	}
</script>

<style lang="scss" scoped>
</style>
