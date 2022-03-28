<template lang="html">
	<div id="details" v-if="project" :class="blurred ? 'blurred' : ''">
	  <div class="only-mobile0" style="position:fixed;top:1rem;right:1rem;z-index:300">
	    <button type="button" class="large-button left-align" name="button" @click="close" style="background-color:#222222BB;min-height:initial;padding: .2rem .5rem .45rem;">
	      <svg class="returnArrow" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
	        <use xlink:href="#return"/>
	      </svg>
	       <span>Back</span>
	    </button>
	  </div>
	  <div class="details-wrapper flex flex-row f-between f-align-start">
	    <div class="text fill-height">
	      <div class="scrollbar">
	        <div class="bg-block no-margin">
	          <h2>{{ project.name }}</h2>
	          <div>
	            <SvgSymbol v-for="(icon, key) in project.iconsTech" :key="key" :use="icon"></SvgSymbol>
	          </div>
	          <div>
	            <SvgSymbol v-for="(icon, key) in project.icons" :key="key" :use="icon" />
	          </div>
	        </div>

	        <div class="flex f-between f-row extra_job-info">
	          <div class="bg-block--secondary font-figure">
	            {{ project.year }}
	          </div>
	          <div class="bg-block--secondary font-figure" v-show="project.category !== null">
	            {{ project.category }}
	          </div>
	        </div>

					<!--
	        <div class="only-mobile" v-if="project.images && project.images.length > 0" v-for="(img, i) in project.images.slice(0, 1)" :key="i">
	          <picture>
	              <source type="image/webp" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcWebp">
	              <source type="image/jp2" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcJp2">
	              <source type="image/jpg" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcJpg">

	              <source type="image/webp" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcWebp">
	              <source type="image/jp2" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcJp2">
	              <source type="image/jpg" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcJpg">

	            <img :src="img.srcJpg" alt="img">
	          </picture>
	        </div>
				-->

	        <div class="bg-block" v-show="project.description !== ''" v-html="project.description"></div>
	        <div class="bg-block" v-show="project.data !== ''" v-html="project.data"></div>
	        <div v-html="project.link"></div>
	      </div>
	    </div>
	    <div class="images fill-height">
	      <div class="only-mobile">
	        <h3>Images</h3>
	      </div>
	        <div class="scrollbar">
	        <div v-for="img in project.images" transition="staggered" stagger="400" :key="img.id">
	          <div class="caption tc" v-show="img.caption">
	            {{ img.caption }}
	          </div>
	          <picture>
	            <!-- <source type="image/webp" media="(min-width: 1400px)" :srcset="img.srcWebp">
	            <source type="image/jp2" :srcset="img.srcJp2">
	            <source type="image/jpg" :srcset="img.srcJpg"> -->

	              <source type="image/webp" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcWebp">
	              <source type="image/jp2" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcJp2">
	              <source type="image/jpg" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcJpg">

	              <source type="image/webp" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcWebp">
	              <source type="image/jp2" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcJp2">
	              <source type="image/jpg" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcJpg">

	            <img :src="img.srcJpg" alt="img">
	          </picture>
	       </div>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>
	import { PROJECTS } from '../projects.js'
	import SvgSymbol from "./SvgSymbol.vue"

	const project_template = {
		name: "",
		year: null,
		description: null,
		category: null,
		link: null,
		images: null,
		icons: null,
		data: null,
		iconsTech: null
	}
	export default {
		props:{
			// isOpen: {type: Boolean, default: false}
		},
		components: { SvgSymbol },
		data(){
			return{
				blurred: false,
				// project: {...project_template}
			}
		},
		computed: {
			isOpen(){
				return this.$store.state.currentProject !== null
			},
			project(){
				return this.$store.getters.getCurrentProject()
			},
		},
		methods: {
			close(){
				this.$store.commit("setProject", null)
			},

		}
	}
</script>

<style lang="css" scoped>
</style>
