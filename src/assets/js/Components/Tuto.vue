<template lang="html">
	<div :class="{'start': initClass}" class="tuto" v-if="anyTuto">
		<div class="tuto-container flex f-column f-center">
			<h2>Tutorial</h2>
			<h3 :class="{'faded': tutoSeen.pan}">1. <b>Left click</b> to drag and pan the map</h3>
			<div class="full-width" v-if="!tutoSeen.pan">
				<div class="tuto-pan">
					<div class="pan-container">
						<div class="pointer absolute">
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img">
								<title>Pan icon</title>
								<desc>Pan the map with the left click</desc>
								<g> <path d="M141.666,58.333c9.21,0,16.668,7.457,16.668,16.667c0,14.282-2.523,28.436-7.457,41.823l-8.287,22.481 c-0.611,1.978-0.924,4.047-0.924,6.12v8.741c0,2.302-1.865,4.168-4.166,4.168H70.833c-2.301,0-4.167-1.866-4.167-4.168v-8.716 c0-1.198-0.522-2.352-1.418-3.14l-24.621-21.538c-4.636-4.046-7.293-9.906-7.293-16.063v-0.043 c0-11.784,9.549-21.333,21.333-21.333h3.667V61.208c0-9.371,6.451-17.703,15.471-19.255c5.409-0.938,10.668,0.487,14.738,3.679 c3.226-2.527,7.22-3.966,11.457-3.966c5.516,0,10.578,2.42,14.061,6.419c2.685-1.458,5.709-2.252,8.855-2.252 c8.125,0,15.065,5.203,17.623,12.541C140.914,58.347,141.289,58.333,141.666,58.333z"/> <path fill="#FFFFFF" d="M133.334,150v-4.575c0-2.907,0.437-5.805,1.364-8.79l8.358-22.692C147.651,101.477,150,88.299,150,75 c0-4.607-3.727-8.333-8.334-8.333c-0.924,0-1.864,0.183-2.852,0.549c-2.579,0.955-5.359-0.806-5.599-3.545 c-0.469-5.372-4.917-9.504-10.3-9.504c-2.643,0-5.127,1.014-7.066,2.822c-2.033,1.897-5.32,1.306-6.566-1.181 C107.508,52.262,103.963,50,100,50c-3.216,0-6.183,1.505-8.174,4.055c-1.668,2.137-4.9,2.138-6.568,0.001 c-2.387-3.057-6.105-4.573-10.034-3.892c-4.877,0.839-8.557,5.593-8.557,11.044V87.5c0,2.301-1.865,4.167-4.167,4.167h-7.833 c-7.182,0-13,5.818-13,13v0.043c0,3.754,1.619,7.322,4.443,9.788l24.634,21.55c2.701,2.375,4.256,5.807,4.256,9.403V150H133.334z" /> </g>
							</svg>
						</div>
					</div>
				</div>
				<!-- <button @click="updateTuto({pan: true})">Seen</button> -->
			</div>
			<h3 :class="{'faded': tutoSeen.zoom}"> 2. Use the <b>mouse wheel</b> to zoom in and out </h3>
			<div class="full-width" v-if="!tutoSeen.zoom">
				<!-- <button @click="updateTuto({zoom: true})">Seen</button> -->
			</div>
			<h3 :class="{'faded': tutoSeen.project}">3. <b>Double click</b> to open a project</h3>
			<div class="full-width" v-if="!tutoSeen.project">
				<!-- <button @click="updateTuto({project: true})">Seen</button> -->
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
		h3{
			font-size: 1.6rem;
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
				&:nth-child(1) { animation-delay: 1.1s; }
				&:nth-child(3) { animation-delay: 1.25s; }
				&:nth-child(5) { animation-delay: 1.5s; }
			}
		}
	}
	.tuto-container{
		width: 80%;
		margin: 0 auto;
		height: 100%;
	}
	.full-width{ width: 100%}
</style>
