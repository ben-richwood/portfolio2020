// import * as THREE from './build/three.module.js';
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'
import App from './Components/App.vue'


import * as THREE from "three";
import { WEBGL } from './libs/WebGL.js';
// import { settings } from './components.js';
import { keyboardMap, SETTINGS, GPURegex } from './constants.js';
import { PROJECT } from './projects.js';

// Custom lib
import * as MAT from './libs/custom/materialList.js'
import * as TEST from './libs/custom/testing.js'
import { logStyle, mobilecheck, msieversion, displayProjectImageOnScreen, dayLight, nightLight, distanceVector, blueLogs, orangeLogs } from './libs/custom/miscellaneous.js'

import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import doNotTrack from 'analytics-plugin-do-not-track'

let analytics;

// import { Timeline } from './timeline.js'

// For STATS screen (option menu) and performance measurement
export const t0 = performance.now();
let t1, t2;

// All objects used for the THREE scene
export let canvasTimeline, stats;
// export const DOMElMain = document.getElementById( 'DOMElMain' );
let time, clock, bgTexture, fog;
let grid, groundMesh;
export let camera;
export let box;

// const speed = Math.PI/4;
// let idleTimer = 8000;
let isIdleTime = false;
var tempT = 0;
let loaded = false;


// Shallow copy of all the scene objects
// For easier manipulation
// export var objectScene = {};

// used to position camera cand control target
// const worldOrigin = [0.1, 1, 0.1];
// const cameraDefaultPosition = [4.08, 2, 2.7];

// testing graphic cards and user's config
const canvasTest = document.createElement('canvas');
let gl, debugInfo, vendor, rendererEval;

const env = ENV;
const debug = DEBUG;
const three_version = THREE_VERSION;
const vue_version = VUE_VERSION;

// init();

let timeline;
// settings = new Settings()
// settings.debug = debug
store.commit('updateSettings', {debug})
let app;

function init (){
  firstConfigCheck();
  if(debug) initDebug();
  /* Initialize analytics */
  if(!debug){
    analytics = Analytics({
      app: 'portfolio2020',
      version: 100,
      plugins: [
        googleAnalytics({
          trackingId: 'UA-90932543-3',
          anonymizeIp: true
        }),
        doNotTrack()
      ]
    })
    // does nothing if DNT on
    analytics.page();
    analytics.plugins.disable('google')
  }

  /*
  timeline = new Timeline(settings);
  timeline.animate();
  */
  if(!debug) console.clear();
  branding()

  Vue.use(VueRouter)
  app = new Vue({
    el: '#app',
    store,
    render: h => h(App)
  })

  document.getElementById("ExploreWork-btn").addEventListener('click', (e) => {
    launchMap(true);
  }, true)
}

function firstConfigCheck() {
  try {
    gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
  } catch (e) {}

  if (gl) {
    debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    rendererEval = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    store.commit('updateSettings', {GPU: rendererEval})
    // gl.getParameter(debugInfo.MAX_TEXTURE_SIZE)
    // In particular, note that usage of textures in vertex shaders is only possible if webgl.getParameter(webgl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) is greater than zero. Typically, this fails on current mobile hardware.
  }
  /*
  let isMobile = mobilecheck();
  settings.isMobile = isMobile;
  settings.GPU = rendererEval;
  */
}

function initDebug(){
  t1 = performance.now();
  console.groupCollapsed('Package versions')
  console.log(`%cThree.jsJS%cv${ three_version }`, 'font-size: 110%; background-color: #666; color:white; padding: 0 5px;', 'font-size: 110%; background-color: rgb(120, 250, 228); color:#666; padding: 0 5px;');
  console.log(`%cVue.jsJS%cv${ VUE_VERSION }`, 'font-size: 110%; background-color: #666; color:white; padding: 0 5px;', 'font-size: 110%; background-color: rgb(120, 250, 228); color:#666; padding: 0 5px;');
  console.groupEnd();
  console.groupCollapsed('Performance monitoring')
  console.log(`%cdebug mode? %c${store.state.settings.debug}`, '', orangeLogs);
  console.log(`Total initialization took:`);
  console.log(`%c${ (t1 - t0).toFixed() } milliseconds.`, blueLogs);
  console.log(`%cIs your device a mobile/tablet? %c${store.state.settings.isMobile}`, '', blueLogs);
  console.log(`%c${store.state.settings.GPU}`, blueLogs);
  console.table({debugInfo, vendor, rendererEval})
  console.log(GPURegex.test(store.state.settings.GPU) ? "High Performance" : "Low Performance")
  console.groupEnd();
}

function branding(){
  console.log(
"                     _        _               \n" +
"                    | |      | |              \n" +
" _ __ ___   __ _  __| | ___  | |__  _   _     \n" +
"| '_ ` _ \\ / _` |/ _` |/ _ \\ | '_ \\| | | |    \n" +
"| | | | | | (_| | (_| |  __/ | |_) | |_| |    \n" +
"|_|_|_| |_|\\__,_|\\__,_|\\___| |_.__/ \\__, |  _ \n" +
"|  __ \\(_)    | |                    __/ | | |\n" +
"| |__) |_  ___| |____      _____   _|___/__| |\n" +
"|  _  /| |/ __| '_ \\ \\ /\\ / / _ \\ / _ \\ / _` |\n" +
"| | \\ \\| | (__| | | \\ V  V / (_) | (_) | (_| |\n" +
"|_|  \\_\\_|\\___|_| |_|\\_/\\_/ \\___/ \\___/ \\__,_|\n",

)
}

function launchMap(e) {
  // settings.analyticsOn = document.getElementById("analyticsCheckbox").checked;
  let analyticsOn = document.getElementById("analyticsCheckbox").checked
  store.commit('updateSettings', {analyticsOn})
  // optionMenu.analyticsOn = settings.analyticsOn;

  if (analyticsOn && !debug){
    analytics.plugins.enable('google')
  }

  store.commit('updateSettings', {analyticsOn, isConfigHigh: e, isPaused: false})
  // optionMenu.gpu = settings.GPU;
  if (e){
    if (store.state.settings.isConfigHigh) {
      // settings.lateInit()
    }
    // document.removeEventListener('keyup', (event) => {}, false);
  }
  // console.log(app);
  document.querySelector('.header').style.display = "none";
  app.$root.$children[0].start()
  // selectPerf = false;
}

window.addEventListener('load', (event) => {
  console.log("FULLY LOADED");
  if ( WEBGL.isWebGLAvailable() ) {
    init()
  } else {
    var warning = WEBGL.getWebGLErrorMessage();
    document.getElementById( 'notCompatible' ).appendChild( warning );
  }
});
