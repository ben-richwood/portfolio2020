<template lang="html">
	<div>
		<div id="brightness" :style="`opacity: ${brightness}`" />
		<Canvas ref="canvas" @clickProject="openProject($event)" />
		<OptionMenu @closeMenu="closeMenu" />
		<ProjectDetail ref="projectDetail" @closeDetail="closeMenu" />
		<Legend :class="{'d-none': displayNone}" ref="legend" @applyFilter="applyFilter" @applySorting="applySorting" />
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
				selectedProject: null,
				displayNone: true
			}
		},
		computed: {
			brightness(){
				return (100 - this.$store.state.brightness) / 100
			}
		},
		methods:{
			closeMenu(){
				this.$refs.canvas.playAnimation()
			},
			start(){
				this.displayNone = false
				sound.project();
				if (!this.$store.state.settings.isMobile) this.$refs.legend.displayLegend()
				this.$refs.canvas.start()
			},
			applySorting(){
				this.$refs.canvas.applySorting()
			},
			applyFilter(){
				this.$refs.canvas.applyFilter()
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
