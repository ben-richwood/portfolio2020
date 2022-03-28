<template lang="html">
	<div>
		<div id="brightness" :style="`opacity: ${brightness}`" />
		<Canvas ref="canvas" @clickProject="openProject($event)" />
		<OptionMenu />
		<ProjectDetail ref="projectDetail" />
		<Legend ref="legend" @applyFilter="applyFilter" />
	</div>
</template>

<script>
	import Canvas from "./Canvas.vue"
	import ProjectDetail from "./ProjectDetail.vue"
	import Legend from "./Legend.vue"
	import OptionMenu from "./OptionMenu.vue"
	import { sound } from "../utilis.js";

	export default {
		components: { Legend, Canvas, OptionMenu, ProjectDetail },
		data(){
			return{
				isMenuOpen: false,
				selectedProject: null
			}
		},
		computed: {
			brightness(){
				return (100 - this.$store.state.brightness) / 100
			}
		},
		methods:{
			start(){
				sound.project();
				this.$refs.legend.displayLegend()
				this.$refs.canvas.start()
			},
			applyFilter(){
				// this.$refs.legend.displayLegend()
				this.$refs.canvas.applyFilter()
				console.log("this.$store.settings.currFilter:", this.$store.state.currentFilter);
			},
			openProject(id){
				this.selectedProject = id
				this.$refs.projectDetail.open(id)
			},
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
