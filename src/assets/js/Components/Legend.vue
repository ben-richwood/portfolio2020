<template lang="html">
  <div>
    <div id="legend" :class="{'mute': mute}">
      <div class="legend only-desktop" :class="{'smaller': HUDoff, 'show': showLegend}">
        <Filtering @applyFilter="applyFilter($event)" />
        <Sorting @applySorting="applySorting($event)" />
      </div>

      <div class="legend legend-mobile only-mobile" :class="{'smaller': HUDoff, 'show': showLegend}">
        <div class="flex f-row f-between tab-title">
          <h3 class="user-select-none" v-for="(title, idx) in tabNames" :key="title" :class="{'faded': tabIdx !== idx}" @click="clickTab(idx)">{{ title }}</h3>
        </div>
        <div :tab="tabIdx" class="flex f-row f-between f-nowrap tabs f-align-start" style="width: 200vw;">
          <Sorting mobile @applySorting="applySorting($event)" />
          <Filtering mobile @applyFilter="applyFilter($event)" />
        </div>
      </div>

      <div class="open-legend only-mobile" @click="showLegend = !showLegend">
        <img src="assets/img/legend.svg" alt="Legend icon" title="open the legend panel" />
      </div>

      <div class="key-legend only-desktop" v-if="showLegendForDetail">
        <div class="key-block openMenu" @click="close">
          <div class="key">{{ keyMap.option[1] }}</div>
          <label for="">Close detail</label>
        </div>
      </div>

      <div class="key-legend only-desktop" v-else>
        <div class="key-blocks" :class="{'smaller': HUDoff, 'show': showLegend}">
          <div class="key-block" @click="openMenu">
            <div class="key user-select-none" style="padding-right:4.5rem;">{{ keyMap.accept[1] }}</div>
            <label class="user-select-none" for="">Open menu</label>
          </div>
          <!-- <div class="key-block">
            <div class="key">{{keyMap.option[1]}}</div>
            <label for="">menu</label>
          </div> -->
          <!-- <div class="key-block">
            <div class="key">C</div>
            <label for="">Console</label>
          </div> -->
        </div>
        <div>
          <div class="key-block" @click="toggleHUD">
            <div class="key" style="max-width:25px;">{{ keyMap.hud[1] }}</div>
            <label class="user-select-none" for="">{{ HUDoff ? 'Display HUD' : 'Minimize HUD'}}</label>
          </div>
        </div>
      </div>
    </div>
    <div id="scale" class="only-desktop d-none" :class="{'mute': mute}">
      <div class="marker" id="scaleMarker"></div>
      <!-- <button @click="resetCamera" class="reset-camera" type="button" name="button" title="Reset the camera">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 1800 200 200" preserveAspectRatio="xMinYMin meet">
        <title>Camera</title>
        <path fill="#11517F" d="M120.758,1851.507c6.511,0,11.789,5.278,11.789,11.789v27.705l17.684-10.159l35.466-20.395v79.105l-35.485-20.415
          l-17.684-10.159v27.705c0,6.512-5.278,11.789-11.789,11.789h-96.16c-6.511,0-11.79-5.277-11.79-11.789v-73.388
          c0-6.511,5.278-11.789,11.79-11.789H120.758 M120.758,1839.718h-96.18c-13.022,0-23.579,10.556-23.579,23.578v73.407
          c0,13.022,10.556,23.579,23.579,23.579h96.18c13.022,0,23.579-10.557,23.579-23.579v-7.328l39.514,22.713
          c1.817,1.123,3.896,1.753,6.032,1.828c4.48,0,7.584-3.576,7.584-9.727v-88.419c0-6.149-3.104-9.726-7.584-9.726
          c-2.135,0.074-4.214,0.703-6.032,1.827l-39.514,22.753v-7.329C144.337,1850.273,133.78,1839.718,120.758,1839.718L120.758,1839.718z
          "/>
        </svg>
      </button> -->
    </div>
  </div>

</template>

<script>
  import { sound } from "../utilis.js";
  import { SingletonTimeline } from '../timeline.js'
  import Sorting from "./LegendSorting.vue"
  import Filtering from "./LegendFiltering.vue"


	export default {
    components: { Sorting, Filtering },
		  data() {
        return {
  		    showLegend: false,
  		    legendState: null,
  		    showLegendForDetail: false,
  		    // selectedFilter: "techno",

  		    HUDoff: false,
          timeline: null,

          tabNames: ["Sorting", "Filtering"],
          tabIdx: 0,
        }
		  },
      computed:{
        mute(){
          return this.$store.state.currentProject !== null || this.$store.state.isMenuOpen
        },
        keyMap() {
          return this.$store.state.settings.keyboardConfig;
        },
      },
		  mounted(){
		    // this.legendState = service.machine.current
        // console.log("this.$store", this.$store.state.settings);
        // this.legendState = service.machine.current
        this.timeline = SingletonTimeline.getInstance();
		  },
		  methods: {
        clickTab(idx){
          // this.$refs.legendTabContent.setAttribute("tab", idx)
          this.tabIdx = idx
        },
        displayLegend(){
          this.showLegend = true
        },
        openMenu(){
          console.log("Open menu");
          this.$store.commit("toggleMenu")
          this.timeline.pauseAnimation()
        },
        toggleHUD(){
          sound.hud();
          this.showLegend = !this.showLegend;
        },
        applySorting: function(key){
          this.$emit("applySorting")
        },
        applyFilter: function(key){
          this.$emit("applyFilter")
        },
        /*
		    resetCamera: function () {
		      tl.resetCamera(1200 );
		    },
		    close: function() {
		      console.log(this.legendState)
		      closeAllMenus();
		    },
		    menu: function (){
		      console.log(this.legendState)
		      optionMenu.open();
		    },
        */
		  }
		}
</script>

<style lang="scss" scoped>
  $transition: cubic-bezier(0.5, 0, 0.75, 0);
  $speed: .38s;
  $delay: .08;
  .legend{
    transform: scale(0);
    transition: transform #{$speed + 0.25} 0s $transition;
    &.show{
      transform: scale(1);
      transition: transform $speed 0.8s $transition;
    }
  }
  .key-blocks{
    .key-block{
      transition: transform $speed .25s $transition;
      transform: translateY(150%);
    }
    &.show{
      .key-block{
        transform: translateY(0);
        $lines: 4;
        $newDelay: $delay * 1;
        @for $i from 1 through $lines {
          &:nth-child(#{$i}) {
            // animation-delay: +#{$i/20 + .25}s;
            transition: transform $speed #{$i * $newDelay + 0.6}s $transition;
          }
        }
      }
    }
  }
  .HUD-legend{
    .legend-icon{
      transform: translateY(150%);
      transition: transform $speed #{$delay}s $transition;
    }
    &.show{
      .legend-icon{
        // transition: transform .35s .8s ease-in-out;
        transform: translateY(0);
        $lines: 4;
        @for $i from 1 through $lines {
          &:nth-child(#{$i}) {
            // animation-delay: +#{$i/20 + .25}s;
            transition: transform $speed #{$i * $delay}s $transition;
          }
        }
      }
    }
  }
  .tab-title{
    padding: .5rem 5vw;
    h3.faded{
      opacity: 0.3;
    }
  }
  .tabs{
    &[tab="0"]{
      transform: translateX(0);
      transition: transform .35s $transition
    }
    &[tab="1"]{
      transform: translateX(-50%);
      transition: transform .35s $transition
    }
  }
  .legend-mobile{
    padding: 1rem;
    box-sizing: border-box;
    transform: translateY(100%);
    transition: transform .35s $transition;
    &.show{
      transform: translateY(0%);
      transition: transform .35s $transition;
    }
  }
  .open-legend{
    position: absolute;
    bottom: 9vw;
    right: 9vw;
    z-index: 120;
    width: 56px;
    height: 56px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 4px 4px 14px #00000018;
    padding: .4rem;
    box-sizing: border-box;
  }
</style>
