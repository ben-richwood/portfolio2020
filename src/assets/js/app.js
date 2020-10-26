import * as THREE from './build/three.module.js';

import { Popup, Sidebar, settings, keyboardMap } from './components.js';

import { WEBGL } from './libs/WebGL.js';


// Custom lib
import * as MAT from './libs/custom/materialList.js'
import * as TEST from './libs/custom/testing.js'
import { logStyle, mobilecheck, msieversion, displayProjectImageOnScreen, dayLight, nightLight, distanceVector } from './libs/custom/miscellaneous.js'

import * as Timeline from './timeline.js'

// For STATS screen (option menu) and performance measurement
export const t0 = performance.now();

// All objects used for the THREE scene
export let container, canvasEl, canvasTimeline, stats, canvasStats;
export let controls
export let scene, renderer;
export let cssScene, rendererCSS; // 2nd "canvas", used by CSS3DRenderer to display DOM element in 3D env
// export const DOMElMain = document.getElementById( 'DOMElMain' );
let time, clock, bgTexture, fog;
let grid, groundMesh;
export let camera;
export let box;


let previousEnvVar = -1, curEnvVar = -1;

// const speed = Math.PI/4;
// let idleTimer = 8000;
let isIdleTime = false;
var tempT = 0;
let loaded = false;

// sound when switching to coding environment
// var orbSound = new Audio('assets/orb.mp3');

// variables to instanciate multiple servers
let instanciateServer;
let serverMaterial;
let instances = 10;
let vertexPositions; // to store the ocean's geometry later on

// Shallow copy of all the scene objects
// For easier manipulation
export var objectScene = {};

// used to position camera cand control target
const worldOrigin = [0.1, 1, 0.1];
const cameraDefaultPosition = [4.08, 2, 2.7];

// testing graphic cards and user's config
const canvasTest = document.createElement('canvas');
let gl, debugInfo, vendor, rendererEval;

// init();

function init (){
  firstConfigCheck();
  container = document.getElementById('canvasScene');
  canvasStats = document.getElementById('canvasStats');
  canvasEl = document.getElementById('mainScene');
  canvasTimeline = document.getElementById('timeline');
  Timeline.init();
  Timeline.animate();
}

function firstConfigCheck() {
  try {
    gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
  } catch (e) {}

  if (gl) {
    debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    rendererEval = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    // gl.getParameter(debugInfo.MAX_TEXTURE_SIZE)
    // In particular, note that usage of textures in vertex shaders is only possible if webgl.getParameter(webgl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) is greater than zero. Typically, this fails on current mobile hardware.
  }

  let isMobile = mobilecheck();
  console.log(`%cIs your device a mobile/tablet? ${isMobile}`, logStyle);
  settings.isMobile = isMobile;
  settings.GPU = rendererEval;

  console.log(`%c${rendererEval}`, logStyle);
  console.warn(debugInfo);
}

if ( WEBGL.isWebGLAvailable() ) {
  init()
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.getElementById( 'notCompatible' ).appendChild( warning );
}
