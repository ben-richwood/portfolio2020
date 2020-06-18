// First, let's load THREE components
import * as THREE from './build/three.module.js';
// import THREELib from "three-js";
// var THREE = THREELib(); // return THREE JS

import Stats from './libs/stats.module.js'; // for testing only

import { Popup, Sidebar, settings, keyboardMap } from './components.js';

// import { OrbitControls } from './libs/OrbitControls.js'; // Custom OrbitContrls
import { WEBGL } from './libs/WebGL.js';
import { GLTFLoader } from './libs/GLTFLoader.js'; // load the 3D model
import { SVGLoader } from './libs/SVGLoader.js';

// For HDR background image and illumination
import { RGBELoader } from './libs/RGBELoader.js';
import { EquirectangularToCubeGenerator } from './libs/EquirectangularToCubeGenerator.js';
import { PMREMGenerator } from './libs/PMREMGenerator.js';
import { PMREMCubeUVPacker } from './libs/PMREMCubeUVPacker.js';
// import { RectAreaLightUniformsLib } from './libs/RectAreaLightUniformsLib.js';

// import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';


// import * as Timeline from './timeline.js';

// Custom lib
import * as MAT from './libs/custom/materialList.js'
import * as TEST from './libs/custom/testing.js'
import { logStyle, mobilecheck, msieversion, displayProjectImageOnScreen, dayLight, nightLight, distanceVector } from './libs/custom/miscellaneous.js'

// import * as Timeline from './timeline.js'
import * as Timeline from './timeline.js'

// VUS JS MODULE
// import Vue from 'vue';

// TWEEN - for animation
import { TWEEN } from './libs/tween.module.min.js'




// For STATS screen (option menu) and performance measurement
export const t0 = performance.now();

// Keyboard config - CONTROL option menu


let rendererStats;

const svgLoader = new SVGLoader()

// All objects used for the THREE scene
export let container, canvasEl, canvasTimeline, stats;
export let controls
export let scene, renderer;
export let cssScene, rendererCSS; // 2nd "canvas", used by CSS3DRenderer to display DOM element in 3D env
// export const DOMElMain = document.getElementById( 'DOMElMain' );
let time, clock, bgTexture, fog;
let grid, groundMesh;
export let camera;
export let box;

// LIGHTS
let light, hemiLight, hemiLightHelper, dirLight, dirLightHeper, hemiLightCode, hemiLightCodeHelper

// DOM element for CSS3DRenderer
export let screenGraphic;

let designLogo, codeLogo
var groupDesign = new THREE.Group();
var groupCode = new THREE.Group();

let previousEnvVar = -1, curEnvVar = -1;

// const speed = Math.PI/4;
// let idleTimer = 8000;
let isIdleTime = false;
var tempT = 0;
let loaded = false;

// sound when switching to coding environment
var orbSound = new Audio('assets/orb.mp3');

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

// let updateTweenAnimation, onCompleteTweenAnimation;
let cameraPosition;
let tweenZoomIn;
// const targetCameraTween = { x: 2, y: 1, z: 0 }; // To llok at the screen when opening a project
export const targetCameraTween = new THREE.Vector3(2, 1.4, 0.7); // To llok at the screen when opening a project


// const paradeAcross = document.getElementById("paradeAcross");

// init();

function init (){
  firstConfigCheck();
  // container = document.getElementById('canvasScene');
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

  Popup.ieDetected = msieversion();
  Popup.config = rendererEval;
  Popup.isMobile = isMobile;
  // Popup.isMobile = true; // for testing purpose
  console.log(`%c${rendererEval}`, logStyle);
  console.warn(debugInfo);
}

// To manage asset loading progress
//////////////////////////////////////////////////////
/*
var manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  // Updating the progress bar based on laded assets
  let progress = itemsLoaded / itemsTotal;
  Popup.progress = progress;
};

manager.onError = function ( url ) {
  throw new Error( 'There was an error loading with the URL ' + url );
};

manager.onLoad = function ( ) {
  console.warn("loaded")
  Popup.isReadyToStart = true;
}
*/

if ( WEBGL.isWebGLAvailable() ) {
  Popup.isReadyToStart = true;
  init()
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.getElementById( 'notCompatible' ).appendChild( warning );
}

  /////////////////////////////////////////////////////////////////////////
 //	           	 Initialize the scene, camera and renderer              //
////////////////////////////////////////////////////////////////////////



export function readyToLaunch(){
  for (let obj in objectScene) {
    let ob = objectScene[obj];
    if(ob.whichScene === -1){
      ob.obj.visible = false;
    }
  }
    /////////////////////////////////////////////////////////////////////////
   //	         	 Light it up! (from custom/miscellaneous.js)              //
  /////////////////////////////////////////////////////////////////////////
  // Generating Design lights
  let allLights;
  if (settings.isItNight){
    allLights = nightLight(settings);
  } else {
    allLights = dayLight(settings);
  }

  if (allLights.length > 0) {
    let idx = 0;
    allLights.forEach(function(e) {
      objectScene[`light-${idx}`] = {obj: e, whichScene: 1}
      scene.add( e );
      idx++;
    })
  }

  // let selectedObject = scene.getObjectByName("02_ocean");
  // scene.remove( selectedObject );
  // selectedObject = scene.getObjectByName("02_servers");
  // scene.remove( selectedObject );


  // generating Coding light
  /*
  let targetObject = new THREE.Object3D();
  targetObject.position.set(5, 1.5, .5);
  // targetObject.visible = false;
  scene.add(targetObject);
  */



  dirLight = new THREE.DirectionalLight( 0xcccccc, .6 ); // color, intensity
  // dirLight.color.setHSL( 0.1, 1, 0.95 );
  dirLight.position.set( 5, 0, 1);
  dirLight.target.position.set( 5, 1.5, .5 );
  scene.add (dirLight);

  let light1 = new THREE.PointLight( 0x888888, .2, 6 ); // color, intensity, distance, decay
  light1.position.set( 3, 4, 0);
  scene.add (light1);

  if(settings.isDebugMode){
    dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 1 );
    scene.add(dirLightHeper);
  }
  // objectScene["02_coding_dirLight"] = {obj: dirLight, whichScene: -1}
  // scene.add (dirLight);


  let selectedObject = scene.getObjectByName("02_servers");
  scene.remove( selectedObject );
  selectedObject = scene.getObjectByName("02_ocean");
  scene.remove( selectedObject );

  delete objectScene["02_servers"];
  delete objectScene["02_ocean"];

  console.log("ready To Launch",scene);

  // playAnimation();
}


export function playAnimation() {
  settings.isPaused = false;
  canvasEl.style.filter = "none";
  if (settings.isTimelineOn){
    Timeline.animate();
  } else {
    animate();
    if(settings.isDebugMode){
      TEST.testing(scene);
    }
    // requestAnimationFrame( animate );
  }
}


export function pauseAnimation () {
  canvasEl.style.filter = "blur(10px)";
  settings.isPaused = true;
}

export function playTimelineAnim () {
  // settings.isTimelineOn
  // requestAnimationFrame( Timeline.animate );
}


// TO BE DELETED
// function setupTween() {
//   console.log("setupTween()");
//   TWEEN.removeAll();
// }


export function animate (time) {
  requestAnimationFrame( animate );
  if (settings.isPaused) return
// function animate () {
  // var t = Date.now() * 0.0005;
  time *= 0.0006; // convert to seconds
  let speedy = .08 * Math.cos( 3 * time );
  let zOffset = -.3;
  let easeFactor = .08;

  if(settings.isCameraTransiting){
    TWEEN.update();
  } else {
    if (settings.isConfigHigh){
      box.position.y = easeFactor * speedy + 1.4;
      box.position.z = easeFactor * Math.sin( time ) - zOffset;
      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
      camera.lookAt( box.position );
      // other way: camera.target.set( box.position.x, box.position.y, box.position.z );
    } else { }
  }

  if (settings.isTimelineOn) {
    Timeline.renderer.render( Timeline.scene, Timeline.camera );
  } else {
    renderer.render(scene, camera);
    if (settings.currentEnv === 1){
      rendererCSS.render( cssScene, camera );
    }
  }
  if (settings.isDebugMode) {
    stats.update();
    rendererStats.update(renderer);
  }
  curEnvVar = Math.sign(camera.position.x);

  if (loaded && curEnvVar != previousEnvVar) {
    switchEnvironment(curEnvVar)
  }
  previousEnvVar = curEnvVar;
}

function onWindowResize() {
  var aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
