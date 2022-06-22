<template lang="html">
	<div>
		<div id="brightness" :style="`opacity: ${brightness}`" />
		<Canvas ref="canvas" @clickProject="openProject($event)" />
		<OptionMenu @closeMenu="closeMenu" />
		<ProjectDetail ref="projectDetail" @closeDetail="closeMenu" />
		<Legend :class="{'d-none': displayNone}" ref="legend" @applyJobTypeFilter="applyJobTypeFilter" @applyFilter="applyFilter" @applySorting="applySorting" />
		<Tuto ref="tuto" />
	</div>
</template>

<script>
	import Canvas from "./Canvas.vue"
	import ProjectDetail from "./ProjectDetail.vue"
	import Legend from "./Legend.vue"
	import OptionMenu from "./OptionMenu.vue"
	import Tuto from "./Tuto.vue"
	import { sound } from "../utilis.js";

	export default {
		components: { Legend, Canvas, OptionMenu, ProjectDetail, Tuto },
		data(){
			return{
				// isMenuOpen: false,
				selectedProject: null,
				displayNone: true
			}
		},
		computed: {
			brightness(){
				return (100 - this.$store.state.brightness) / 100
			},
		},
		mounted(){
			// settings.isMobile = isMobile;
		  // settings.GPU = rendererEval;
			// Keyboard navigation
			window.addEventListener('keyup', event => {
			  const keyName = event.key;
			  const keyCode = event.code

				console.log(keyName);
				console.log("keyCode", keyCode);

				// No shortcuts as long as the tuto is on
				if (Object.values(this.$store.state.tuto).some(e => e === false)) return

			  if (keyCode === this.$store.state.settings.keyboardConfig.hud[0]) {
					this.$store.commit("toggleLegend")
			  }
			  // escape keys
			  if (keyCode === this.$store.state.settings.keyboardConfig.esc[0]) {
					this.$store.commit("escape")
					this.closeMenu()
			  }
			  // SPACE BAR KEY BY DEFAULT
			  if (keyCode === this.$store.state.settings.keyboardConfig.menu[0]) {
					this.$store.commit("toggleMenu")
					// this.$refs.canvas.playAnimation()
			  }
			}, false);
		},
		methods:{
			closeMenu(){
				this.$store.commit("setPauseState", false)
				// this.$refs.canvas.playAnimation()
			},
			start(){
				this.displayNone = false
				sound.project();
				if (!this.$store.state.settings.isMobile) this.$store.commit("toggleLegend")
				this.$refs.canvas.start()
				this.$refs.tuto.start()
			},
			applySorting(){
				this.$refs.canvas.applySorting()
			},
			applyFilter(){
				this.$refs.canvas.applyFilter()
			},
			applyJobTypeFilter(){
				this.$refs.canvas.applyJobTypeFilter()
			},
			openProject(id){
				this.selectedProject = id
				this.$refs.projectDetail.open(id)
			},
		},

		// this.$store.state.settings
	}
</script>

<style lang="scss" scoped>
</style>
