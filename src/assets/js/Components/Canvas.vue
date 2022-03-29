<template lang="html">
	<div>
		<!-- <div class="visuallyhidden">
			<?php include("./assets/img/techno-icons.svg"); ?>
		</div> -->
		<div id="DOMElTimeline" :class="{'blurred': paused}"></div>
		<!-- <?php /* include "./modules/legend.php" */ ?> -->

		<div id="canvasScene" class="absolute">
			<canvas id="timeline"></canvas>
		</div>
		<div id="canvasStats" v-show="$store.state.developerMode" />
	</div>
</template>

<script>
	import TWEEN from '@tweenjs/tween.js'
	import { Timeline, SingletonTimeline } from '../timeline.js'

	let domElTimeline;

	export default {
		data(){
			return {
				timeline: null,
			}
		},
		computed: {
			paused(){
				return this.$store.state.currentProject !== null || this.$store.state.isMenuOpen
			},
		},
		methods: {
			applyFilter(){
				// this.timeline.updatedSettings(this.$store.state.settings)
				this.timeline.transform( this.timeline.targets[this.$store.state.currentFilter], 2000 );
			},
			playAnimation(){
				this.timeline.playAnimation();
			},
			start(){
				// this.timeline.animate();
				this.timeline.playAnimation();
				console.log(this.$store.state.isPaused);

				this.applyFilter()

				document.getElementById("intro").style.display = "none";
				domElTimeline = document.getElementById("DOMElTimeline");

				domElTimeline.addEventListener("dblclick", evt => {
				  if (evt.target.classList.contains("node")){
				    let id = evt.target.getAttribute("data-id");
						this.$store.commit("setProject", id)
						this.timeline.pauseAnimation();
				  }
				}, true);
			}
		},
		mounted(){
			this.timeline = SingletonTimeline.getInstance();
		}
	}
</script>

<style lang="scss">
	#DOMElTimeline, #canvasScene, #timeline{
		width: 100vw;
		height: 100vh;
	}
	#DOMElTimeline{
		filter: blur(0);
	  -webkit-filter: blur(0px);
	  -o-filter: blur(0px);
	  -moz-filter: blur(0px);
		transition: filter .35s ease-in-out;
		&.blurred{
			filter: blur(10px);
		  -webkit-filter: blur(8px);
		  -o-filter: blur(8px);
		  -moz-filter: blur(8px);
			transition: filter .35s ease-in-out;
		}
	}
</style>
