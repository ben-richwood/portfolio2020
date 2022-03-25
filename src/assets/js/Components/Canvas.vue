<template lang="html">
	<div>
		<div class="visuallyhidden">
			<?php include("./assets/img/techno-icons.svg"); ?>
		</div>
		<div id="DOMElTimeline"></div>
		<!-- <?php /* include "./modules/legend.php" */ ?> -->

		<div id="canvasScene" class="absolute">
			<canvas id="timeline"></canvas>
		</div>
		<div id="canvasStats" class="d-none"></div>
	</div>
</template>

<script>
	import TWEEN from '@tweenjs/tween.js'
	import { Timeline } from '../timeline.js'

	const legendObj = document.querySelector(".legend");
	const divLegends = document.querySelectorAll("#legend .key-legend > div");
	let domElTimeline;

	export default {
		data(){
			return {
				timeline: null,
			}
		},
		methods: {
			applyFilter(){
				this.timeline.updatedSettings(this.$store.state.settings)
				this.timeline.transform( this.timeline.targets[this.$store.state.settings.currFilter], 2000 );
			},
			start(){
				// this.timeline.animate();
				this.timeline.playAnimation();

				document.getElementById("intro").style.display = "none";
				domElTimeline = document.getElementById("DOMElTimeline");

				domElTimeline.addEventListener("dblclick", evt => {
				  if (evt.target.classList.contains("node")){
				    let id = evt.target.getAttribute("data-id");
				    // detailPopup.open(id);
						console.log(id);
				  }
				}, true);
				/*
				const tweenA = new TWEEN.Tween({scale: 0})
			    .to({scale: 1}, 1000)
			    // .easing(TWEEN.Easing.Quadratic.Out);
			    .onUpdate(function (object) {
			    	legendObj.style.transform = 'scale(' + object.scale + ')'
			    })
			    .onComplete(function () {
			      for(let item of divLegends){
			        item.classList.remove("initially-reduced");
			      }
			    })

			  const tweenB = new TWEEN.Tween({blur: 8})
			    .to({blur: 0}, 2000)
			    .delay(100)
			    .onUpdate(function (object) {
			    	domElTimeline.style.filter = 'blur(' + object.blur + 'px)';
			    })
			    .easing(TWEEN.Easing.Quadratic.In)
			    .onComplete(function () {
			      tl.transform( tl.targets.techno, 2000 );
			    });

			  tweenA.chain(tweenB);

			  tweenA.start();
				*/
			}
		},
		mounted(){
			this.timeline = new Timeline(this.$store.state.settings);
			console.log("this.timeline", this.timeline);
			// this.timeline.animate();
		}
	}
</script>

<style lang="scss">
	#DOMElTimeline, #canvasScene, #timeline{
		width: 100vw;
		height: 100vh;
	}
</style>
