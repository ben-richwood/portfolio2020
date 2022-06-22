<template lang="html">
	<div :class="{'start': initClass}" class="tuto user-select-none" v-if="anyTuto">
		<div class="flex f-column f-center f-align-center tuto-container">
			<h2 class="tc" style="margin: 0 0 10vh;">Tutorial</h2>
			<div class="flex f-column f-md-row f-center tl" style="width:100%;">
				<div class="blocks">
					<h3 :class="{'faded': tutoSeen.pan}">1. <b>Left click</b> to drag and pan the map</h3>
					<h3 :class="{'faded': tutoSeen.zoom}">2. Use the <b>mouse wheel</b> to zoom in and out </h3>
					<h3 :class="{'faded': tutoSeen.project}">3. <b>Double click</b> on an item to open the project</h3>
				</div>
				<div class="blocks">
					<div class="full-width with-frame">
						<div class="pan-container" v-if="currentTuto === 0">
							<div class="tuto-pan">
								<div class="pointer absolute">
									<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img">
										<title>Pan icon</title>
										<desc>Pan the map with the left click</desc>
										<g> <path d="M141.666,58.333c9.21,0,16.668,7.457,16.668,16.667c0,14.282-2.523,28.436-7.457,41.823l-8.287,22.481 c-0.611,1.978-0.924,4.047-0.924,6.12v8.741c0,2.302-1.865,4.168-4.166,4.168H70.833c-2.301,0-4.167-1.866-4.167-4.168v-8.716 c0-1.198-0.522-2.352-1.418-3.14l-24.621-21.538c-4.636-4.046-7.293-9.906-7.293-16.063v-0.043 c0-11.784,9.549-21.333,21.333-21.333h3.667V61.208c0-9.371,6.451-17.703,15.471-19.255c5.409-0.938,10.668,0.487,14.738,3.679 c3.226-2.527,7.22-3.966,11.457-3.966c5.516,0,10.578,2.42,14.061,6.419c2.685-1.458,5.709-2.252,8.855-2.252 c8.125,0,15.065,5.203,17.623,12.541C140.914,58.347,141.289,58.333,141.666,58.333z"/> <path fill="#FFFFFF" d="M133.334,150v-4.575c0-2.907,0.437-5.805,1.364-8.79l8.358-22.692C147.651,101.477,150,88.299,150,75 c0-4.607-3.727-8.333-8.334-8.333c-0.924,0-1.864,0.183-2.852,0.549c-2.579,0.955-5.359-0.806-5.599-3.545 c-0.469-5.372-4.917-9.504-10.3-9.504c-2.643,0-5.127,1.014-7.066,2.822c-2.033,1.897-5.32,1.306-6.566-1.181 C107.508,52.262,103.963,50,100,50c-3.216,0-6.183,1.505-8.174,4.055c-1.668,2.137-4.9,2.138-6.568,0.001 c-2.387-3.057-6.105-4.573-10.034-3.892c-4.877,0.839-8.557,5.593-8.557,11.044V87.5c0,2.301-1.865,4.167-4.167,4.167h-7.833 c-7.182,0-13,5.818-13,13v0.043c0,3.754,1.619,7.322,4.443,9.788l24.634,21.55c2.701,2.375,4.256,5.807,4.256,9.403V150H133.334z" /> </g>
									</svg>
								</div>
							</div>
						</div>
						<div class="tc" v-else-if="currentTuto === 1">
							<img src="/assets/img/scroll.svg" alt="Scroll icon" />
						</div>
						<div class="tuto-dbclick" v-else>
							<div class="element detail node">
	              <div class="name into-detail corners node major">
	                <div class="desc node job-main" data-id="18">Identidy and branding for BLISS</div>
	                <div class="techno node tl">Developping company brand and culture</div>
	              </div>
	            </div>
							<div class="pointer absolute">
	              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img">
	                <path d="M166.6,87.8c0-0.8-0.399-4.8-4-8.8c-3.8-4.4-9.8-6.8-17.6-7.4c-0.8-1.2-1.8-2.4-3.4-3.6c-4.399-3.4-11.199-5.2-20-5.4
	                	c-0.8-1-2.199-2.2-3.8-3.4c-4-2.8-9-4.4-15.2-5V38c0-1.6,0.2-8.4-4.399-13.2c-2-2.2-5.8-4.8-12.2-4.8c-6.6,0-10.4,2.6-12.6,4.8
	                	c-4.2,4.6-4.2,10.6-4.2,12V94c-3.8-4-8-8.4-10.4-10c-5-3.8-14.4-1.8-19.8,2.2c-5.2,3.8-7,9.6-5,15.2c3.6,10,12.6,20,14.8,22.399
	                	c2,3.8,11,20.4,19,26.4C72,153.4,75.2,166.6,76,175l0.4,4.4H152V159.6c1-2.8,3.4-8.8,6-11.6c6.2-6.2,8.2-21.8,8.2-26.6V88
	                	L166.6,87.8z"/>
	                <path fill="#FFFFFF" d="M156.8,121c0,5.8-2.399,16.8-5.399,19.8C146.2,146,143,156,142.8,157l-0.2,0.6V169.2H85.4
	                	c-0.4-2.2-0.8-5-1.6-8c-2.4-9.601-5.6-15.8-9.8-19c-5.8-4.4-14-18.601-16.6-23.8L57,117.8l-0.4-0.6c0-0.2-9.8-10.2-13.2-19.4
	                	c-0.4-1.2-0.4-2.2,1-3.6c2.6-2.4,7.6-3,8.8-2.6c3,2.4,12.2,12.2,17.4,18l8.6,9.601V36.6v-0.2v-0.2c0-0.8,0.2-3.4,1.6-4.8
	                	c1-1.2,2.8-1.8,5.4-1.8c2.2,0,3.8,0.6,5,1.6c1.6,1.8,1.8,5,1.8,6.2v21.4l0,0v30.4h9.8V64c9,1,11.601,4.8,12,5.4l0.4,1v18.8h9.8V72.6
	                	c8.4,0.8,11.6,3.4,12.4,4.6v19h9.8V81.6c8.6,1.2,10,5.8,10.2,6.8V121H156.8z"/>
	              </svg>
							</div>
						</div>
						<div v-else>
							OTHER
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				initClass: "",
			}
		},
		computed:{
			tutoSeen(){
				return this.$store.state.tuto
			},
			currentTuto() {
				let idx = 0;
				if(this.$store.state.tuto.pan) idx = 1
				if(this.$store.state.tuto.zoom) idx = 2
				return idx
			},
			anyTuto(){
				if (Object.values(this.tutoSeen).some(e => e === false)) {
					return true
				}
				return false
			}
		},
		methods: {
			updateTuto(val){
				this.$store.commit("tutoWatched", val)
			},
			start(){
				if (this.anyTuto){
					this.initClass = "start"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tuto{
		$transition: cubic-bezier(0.5, 0, 0.75, 0);
		position:fixed;
		width: 100vw;
		height: 100vh;
		z-index:200;
		top:0;
		left: 0;
		background-color: #000000AA;
		pointer-events: none;
		opacity: 0;
		.tuto-container{
			width: 96%;
			max-width: 1200px;
			margin: 0 auto;
			height: 100%;
		}
		.blocks{
			flex-basis:50%;
		}
		h3{
			font-size: 1.6rem;
			&:before{
				content: "";
				height: 3px;
				width: 100%;
				position: absolute;
				left:0;
				top: 15px;
				transform-origin: 0 50%;
				transform: translateY(50%) scaleX(0);
				background-color: #EEE;
			}
			&.faded:before{
				transform: translateY(50%) scaleX(1);
				transition: transform .6s .3s $transition;
			}
		}
		&.start{
			opacity: 1;
			transition: opacity .35s 1s $transition;
			h3{
				// transform: translateX(20px);
				animation-name: lineTransition;
				animation-duration: .4s;
				animation-timing-function: $transition;
				animation-direction: normal;
				animation-fill-mode: both;
				animation-iteration-count: 1;
				&:nth-child(2) { animation-delay: 1.1s; }
				&:nth-child(3) { animation-delay: 1.25s; }
				&:nth-child(4) { animation-delay: 1.5s; }
			}
		}
	}
	.full-width{
		width: 100%;
		max-width: 550px;
		margin-left: auto;
    overflow: hidden;
	}
	.tuto-dbclick .element{
		transform: translate(65%, 30%) scale(0.7);
		z-index: -1;
	}
	@media (max-width: 576px) {
		.tuto{
			.tuto-container .flex.f-column.f-md-row.f-center{
				display: block;
			}
			.blocks{
				flex-basis:100%;
			}
			h3{
				margin: 1.6rem 0;
			}
		}
	}
</style>
