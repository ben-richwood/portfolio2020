// First, let's load THREE components
import * as THREE from './build/three.module.js';
// import THREELib from "three-js";
// var THREE = THREELib(); // return THREE JS

import Stats from './libs/stats.module.js'; // for testing only

import { Popup, Sidebar, settings, keyboardMap } from './components.js';

import { OrbitControls } from './libs/OrbitControls.js'; // Custom OrbitContrls
import { WEBGL } from './libs/WebGL.js';
import { GLTFLoader } from './libs/GLTFLoader.js'; // load the 3D model
import { SVGLoader } from './libs/SVGLoader.js';

// For HDR background image and illumination
import { RGBELoader } from './libs/RGBELoader.js';
import { EquirectangularToCubeGenerator } from './libs/EquirectangularToCubeGenerator.js';
import { PMREMGenerator } from './libs/PMREMGenerator.js';
import { PMREMCubeUVPacker } from './libs/PMREMCubeUVPacker.js';
// import { RectAreaLightUniformsLib } from './libs/RectAreaLightUniformsLib.js';

import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';


// Custom lib
import * as MAT from './libs/custom/materialList.js'
import * as TEST from './libs/custom/testing.js'
import { logStyle, mobilecheck, msieversion, displayProjectImageOnScreen, dayLight, nightLight, distanceVector } from './libs/custom/miscellaneous.js'

import * as Timeline from './timeline.js'

// VUS JS MODULE
import Vue from 'vue';


// TWEEN - for animation
// import gsap as Tween from "gsap";
import { TWEEN } from './libs/tween.module.min.js'
// import { TWEEN } from './libs/TWEEN.min.js'
// import { TweenMax } from "gsap/TWEEN";

// let Tween;

// var createGeometry = require('three-bmfont-text');
// var loadFont = require('load-bmfont');


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
export const DOMElMain = document.getElementById( 'DOMElMain' );
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


const paradeAcross = document.getElementById("paradeAcross");

firstConfigCheck();

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
var manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  // console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

  // Updating the progress bar based on laded assets
  let progress = itemsLoaded / itemsTotal;
  Popup.progress = progress;
};

manager.onError = function ( url ) {
  console.log( 'There was an error loading ' + url );
};

if ( WEBGL.isWebGLAvailable() ) {
  init();
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.getElementById( 'notCompatible' ).appendChild( warning );
}

if (scene.children.length > 0){
  console.log("scene obj: ", scene.children[9]);
}

export function switchBackToProject() {
  canvasEl = renderer.domElement;
}

  /////////////////////////////////////////////////////////////////////////
 //	           	 Initialize the scene, camera and renderer              //
/////////////////////////////////////////////////////////////////////////
export function init() {
  container = document.getElementById('canvasScene');
  canvasEl = document.getElementById('mainScene');
  canvasTimeline = document.getElementById('timeline');
  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.15, 90 );
  /* THREE.PerspectiveCamera PARAMS
  * fov — Camera frustum vertical field of view.
  * aspect — Camera frustum aspect ratio.
  * near — Camera frustum near plane.
  * far — Camera frustum far plane.
  */
  camera.position.set( cameraDefaultPosition[0], cameraDefaultPosition[1], cameraDefaultPosition[2] );
  camera.focus = 15;
  scene = new THREE.Scene();
  cssScene = new THREE.Scene();
  //if(settings.isDebugMode){
    window.scene = scene;
    window.THREE = THREE;
  // }

  // Fog
  // fog = new THREE.FogExp2( 0x3C5C4A, .09, 15 );
  // fogBg = new THREE.FogExp2( 0xefd1b5, 0.0025, .7 );
  // scene.fog = null

  // Background environment for the design scene
  /*
  new RGBELoader()
    .setDataType( THREE.UnsignedByteType )
    .setPath( 'assets/img/textures/' )
    .load( 'pedestrian_overpass_2k.hdr', function ( texture ) {
      var cubeGenerator = new EquirectangularToCubeGenerator( texture, { resolution: 1024 } );
      cubeGenerator.update( renderer );
      var pmremGenerator = new PMREMGenerator( cubeGenerator.renderTarget.texture );
      pmremGenerator.update( renderer );
      var pmremCubeUVPacker = new PMREMCubeUVPacker( pmremGenerator.cubeLods );
      pmremCubeUVPacker.update( renderer );
      var envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;
      // model
      // var loader = new GLTFLoader().setPath( 'models/gltf/DamagedHelmet/glTF/' );
      // loader.load( 'DamagedHelmet.gltf', function ( gltf ) {
      // var loader = new THREE.OBJLoader( manager );
      var loader = new GLTFLoader(manager).setPath( 'assets/models/' );
      // loader.load( 'computer02.gltf', function ( gltf ) {
      loader.load( 'computer_v8.4.glb', function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            child.material.envMap = envMap;
          }
        } );
        const root = gltf.scene;
        scene.add( root );

      } );
      // pmremGenerator.dispose();
      // pmremCubeUVPacker.dispose();
    } );
    */
    var loader = new GLTFLoader(manager).setPath( 'assets/models/' );
    loader.load( 'computer_v8.9.glb', function ( gltf ) {
      gltf.scene.traverse( function ( child ) {
        // if ( child.isMesh ) {
        //   child.material.envMap = envMap;
        // }
      } );
      const root = gltf.scene;
      scene.add( root );

    } );

  // Background environment for Coding scene

  new RGBELoader()
    .setDataType( THREE.UnsignedByteType )
    .setPath( 'assets/img/textures/' )
    .load( 'bg.hdr', function ( texture ) {
      scene.background = texture;
    });


  // The box is used as a camera target; easier to manipulate and debug
  var geometry = new THREE.BoxGeometry( .2,.2,.2);
  box = new THREE.Mesh( geometry, MAT.boxMat );
  box.position.set(worldOrigin[0], worldOrigin[1]+.4, worldOrigin[2]+.205)
  scene.add( box );
  box.visible = false;


  // renderer = new THREE.WebGLRenderer( { antialias: false, stencil: false, precision: 'mediump', depth: true, preserveDrawingBuffer: true, premultipliedAlpha: false } );

  renderer = new THREE.WebGLRenderer( { antialias: settings.antialias, canvas: canvasEl, stencil: false, precision: settings.precision, depth: true, preserveDrawingBuffer: true, premultipliedAlpha: false } );

  THREE.Cache.enabled = true;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.gammaOutput = true;
  // container.appendChild( renderer.domElement );
  // canvasEl = container.getElementsByTagName('canvas')[0];

  controls = new OrbitControls( camera, renderer.domElement );
  // position the camera
  controls.target.set( worldOrigin[0], worldOrigin[1]+.4, worldOrigin[2]+.205 );
  controls.autoRotate = false;
  controls.autoRotateSpeed = 1;
  // Disable panning
  controls.enablePan = false;
  controls.panningMode = 1; // default is 0 = ScreenSpacePanning versus HorizontalPanning
  controls.panSpeed = .2;
  // Inertia
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  // Zom properties
  controls.enableZoom = true;
  controls.minDistance = 2.4; // .8
  controls.maxDistance = settings.isDebugMode ? 20 : 7;
  // controls.zoomSpeed = .40;

  // Constrain horizontal and vertical rotation
  controls.minPolarAngle = Math.PI/8;
  controls.maxPolarAngle = 2 * Math.PI/4
  controls.minAzimuthAngle = - Math.PI/2 - Math.PI/8; //- Infinity; // radians
  controls.maxAzimuthAngle = Math.PI/2 - Math.PI/16; //Infinity; // radian

  grid = new THREE.GridHelper( 20, 20, 0x000000, 0x000000 );
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  grid.visible = false; // only used on coding environment
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add( grid );

  initCSS3DRenderer();

  /*
  loadFont('../fonts/arial.fnt', function(err, font) {
    // create a geometry of packed bitmap glyphs,
    // word wrapped to 300px and right-aligned
    var geometry = createGeometry({
      font: font,
      text: "My Text"
    })

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load('../fonts/Arial.png', function (texture) {
      // we can use a simple ThreeJS material
      var typefaceMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        color: 0xaaffff
      })

      // now do something with our mesh!
      var mesh = new THREE.Mesh(geometry, typefaceMaterial)
    })
  })
  */

  designLogo = loadSVG( 'assets/models/design.svg', 'design', 1, [-3, 3, 1.5], 0.005 ); // [2, 1.8, 1.5], 0.0025
  codeLogo = loadSVG( 'assets/models/code.svg', 'code', -1, [18, 6.5, -2], 0.01, [0,-Math.PI/2,0] ); // [2, 1.8, 1.5], 0.0025

  controls.update();
  window.addEventListener( 'resize', onWindowResize, false );
  // document.addEventListener( 'mousemove', onDocumentMouseMove, false );



  // stats
  if (settings.isDebugMode) {
    stats = new Stats();
    container.appendChild( stats.dom );

    rendererStats	= new TEST.THREEx.RendererStats();
    rendererStats.domElement.style.position   = 'absolute'
    rendererStats.domElement.style.right  = '0px'
    rendererStats.domElement.style.top    = '48px'
    rendererStats.domElement.style.zIndex    = '100'
    document.body.appendChild( rendererStats.domElement )
  }

  // animate();
  settings.isPaused = true; // To animate the first frame only
  if (!settings.isPaused && settings.isDebugMode){
    TEST.testing(scene);

    requestAnimationFrame( animate );
    // clock = new THREE.Clock();
  }
}

  /////////////////////////////////////////////////////////////////////////
 //  	             	 INITialize CSS3DRenderer scene                     //
/////////////////////////////////////////////////////////////////////////
function initCSS3DRenderer() {
  rendererCSS = new CSS3DRenderer();
  rendererCSS.setSize( window.innerWidth, window.innerHeight );
  // rendererCSS.setPixelRatio( window.devicePixelRatio );
  DOMElMain.appendChild( rendererCSS.domElement );

  // Container element - to push to CSS3dRenderer
  let elementContainer = document.createElement( 'div' );
  elementContainer.className = 'screenGraphicDefault ';

  // heading
  var element = document.createElement( 'div' );
  var headingEl = document.createElement( 'h3' );
  headingEl.innerText = "Ben's\nportfolio";
  element.appendChild(headingEl);

  // SCREEN FRAME
  // var windowFrame = document.createElement( 'img' );
  // windowFrame.src = "./assets/img/windowFrame.svg";
  // element.appendChild(windowFrame);

  // moving stripe
  /*
  var movingStripe = document.createElement( 'div' );
  movingStripe.className = "movingStripe";
  element.appendChild(movingStripe);

  let scratchText = document.createElement( 'div' );
  scratchText.className = "sractchImg";
  element.appendChild(scratchText);
  // var scratchText = document.createElement( 'img' );
  // scratchText.src = "./assets/img/textures/scratchTextures.jpg";
  let barImg = document.createElement( 'img' );
  barImg.src = "./assets/img/textures/bars.svg";
  element.appendChild(barImg);
  barImg = document.createElement( 'img' );
  barImg.src = "./assets/img/textures/bars.svg";
  element.appendChild(barImg);
  */
  elementContainer.appendChild(element);

  screenGraphic = new CSS3DObject( elementContainer );
  screenGraphic.position.set(-0.027, 1.455, .037);
  screenGraphic.scale.multiplyScalar( .002 );
  screenGraphic.rotation.order = 'YXZ'; // Super important to have the correct rotation
  screenGraphic.rotation.set(-( 2 * Math.PI/16) + Math.PI/32, Math.PI/2, 0);
  screenGraphic.updateMatrix();
  cssScene.add(screenGraphic);
}

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
  // Dim the window lights emitter
  if (settings.isItNight){
    objectScene["01_Circlular_window_emitter"].obj.material.emissiveIntensity = .2;
    objectScene["01_Circlular_window_emitter"].obj.material.color = {r: 1, g: 1,b: 0};
    objectScene["01_wall_EMITTER"].obj.material.emissiveIntensity = .2;
    objectScene["01_wall_EMITTER"].obj.material.color = {r: 1, g: 1,b: 0};
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

  playAnimation();
}

export function castShadows() {
  objectScene["01_new_ground"].obj.traverseVisible( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
        child.receiveShadow = true;
    }
  });
  objectScene["01_desk_table"].obj.traverseVisible( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
        child.castShadow = true;
        child.receiveShadow = true;
    }
  });
  objectScene["scren_mac"].obj.traverseVisible( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
        child.castShadow = true;
        // child.receiveShadow = true;
    }
  });
  objectScene["01_Bowl"].obj.traverseVisible( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
        child.castShadow = true;
        // child.receiveShadow = true;
    }
  });
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

export function switchToProject() {
  // renderer
}

export function pauseAnimation () {
  canvasEl.style.filter = "blur(10px)";
  settings.isPaused = true;
}

export function playTimelineAnim () {
  // settings.isTimelineOn
  // requestAnimationFrame( Timeline.animate );
}

// Building extra objects geometry for Hight Perf config
// Such as ocean of dots, airborn particles
export function highPerfInit() {
  console.log("%chighPerfInit()", "background-color:orange;color:black;");
  const oceanVert = new THREE.Geometry();
  const partVert = new THREE.Geometry();
  const largePartVert = new THREE.Geometry();

  for ( var i = 0; i < vertexPositions.length - 3; i += 3 ) {
    const vertices = new THREE.Vector3();
    vertices.x = vertexPositions[i];
    vertices.y = vertexPositions[i+1];
    vertices.z = vertexPositions[i+2];
    oceanVert.vertices.push( vertices );
  }
  for ( var i = 0; i < 100; i ++ ) {
    const particule = new THREE.Vector3();
    particule.x = THREE.Math.randFloatSpread( 7 );
    particule.y = THREE.Math.randFloatSpread( 7 );
    particule.z = THREE.Math.randFloatSpread( 7 );
    partVert.vertices.push( particule );
  }
  for ( var i = 0; i < 100; i ++ ) {
    const particule = new THREE.Vector3();
    particule.x = 35 + THREE.Math.randFloatSpread( 30 );
    particule.y = 6 + THREE.Math.randFloatSpread( 12 );
    particule.z = -15 + THREE.Math.randFloatSpread( 85 );
    largePartVert.vertices.push( particule );
  }

  const oceanWave = new THREE.Points( oceanVert, MAT.oceanMaterial );
  oceanWave.position.x = 28;

  const airborneParticules = new THREE.Points( partVert, MAT.starsMaterial );

  const blurredAirborneParticules = new THREE.Points( largePartVert, MAT.largeStarsMaterial );

  scene.add( oceanWave );
  scene.add( airborneParticules );
  scene.add( blurredAirborneParticules );
  objectScene["02_ocean02"] = {obj: oceanWave, whichScene: -1};
  objectScene["airborneParticules"] = {obj: airborneParticules, whichScene: 0};

  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.PCFSoftShadowMap;
  castShadows();
  // objectScene["blurredAirborneParticules"] = {obj: blurredAirborneParticules, whichScene: 0};
  /*
  import('./libs/tween.module.min.js').then((tween) => {
    console.log("%cTWEEN loaded successfully", "background-color:orange;color:black;");
    settings.isTWEENLoaded = true;
    // TWEEN = tween;
    var Tween = new TWEEN.Tween(position).to(target, 2000);
  });
  */

  setupTween();
}

function setupTween() {
  console.log("setupTween()");
  TWEEN.removeAll();
}

export function zoomInScreen() {
  console.log("zoomInScreen()");
  settings.isCameraTransiting = true;
  controls.minDistance = .2; // .8
  controls.enabled = false;

  let currentCamPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };

  const d = distanceVector(currentCamPos, targetCameraTween);

  let destCamPos = {
    x: settings.currentEnv * targetCameraTween.x,
    y: targetCameraTween.y,
    z: targetCameraTween.z
  };

  let tween = new TWEEN.Tween(currentCamPos)
  .to(destCamPos, Math.ceil(d * 450))
  .delay(100)
  .easing(TWEEN.Easing.Cubic.InOut)
  .onUpdate(function() {
    camera.position.set(this._object.x, this._object.y, this._object.z);
    camera.lookAt( box.position );
  })
  .onComplete(function() {
    settings.isCameraTransiting = false;
    console.log("Tween Anim Done");
    TWEEN.removeAll();
  })
  .start();
}

export function zoomOutScreen() {
  console.log("zoomOutScreen()");
  settings.isCameraTransiting = true;

  let currentCamPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };

  let destCamPos = {
    x: settings.currentEnv * cameraDefaultPosition[0],
    y: cameraDefaultPosition[1],
    z: cameraDefaultPosition[2]
  };
  const d = distanceVector(currentCamPos, destCamPos);

  let tweenBack = new TWEEN.Tween(currentCamPos)
  .to(destCamPos, Math.ceil(d * 450))
  .delay(100)
  .easing(TWEEN.Easing.Cubic.InOut)
  .onUpdate(function() {
    camera.position.set(this._object.x, this._object.y, this._object.z);
    camera.lookAt( box.position );
  })
  .onComplete(function() {
    settings.isCameraTransiting = false;
    controls.minDistance = 2.4;
    controls.enabled = true;
    TWEEN.removeAll();
  })
  .start();
}

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

manager.onLoad = function ( ) {
  console.warn("loaded")
  Popup.isReadyToStart = true;
  console.log("scene:", scene.children[scene.children.length - 1]);
  scene.children[scene.children.length - 1].children.forEach( function (obj) {
    let name = obj.name;
    if (obj.name[1] === "1"){ // design
      objectScene[name] = {obj: obj, whichScene: 1};
    } else if (obj.name[1] === "2"){ // code
      objectScene[name] = {obj: obj, whichScene: -1};
    } else { // both groups
      objectScene[name] = {obj: obj, whichScene: 0};
    }
  });
  console.log("scene objs: ", objectScene);
  loaded = true;
  objectScene.code.obj.visible = false;

  let instanced = new THREE.BufferGeometry(objectScene["02_servers"].obj.geometry);
  instanced.maxInstancedCount = instances;

  var positions = [];
  var vector = new THREE.Vector4();
  var offsets = [];
  let aOffset = [];
  var indices = [];

  // const bufferServerGeometry = new THREE.InstancedBufferGeometry().copy(objectScene["02_servers"].obj);
  const bufferServerGeometry = objectScene["02_servers"].obj.geometry;
  // const bufferServerGeometry = new THREE.BufferGeometry(objectScene["02_servers"].obj.geometry);

  let instanceIdx = 1;
  makeInstancePlain(bufferServerGeometry, objectScene["02_servers"].obj.material,  [6,0,2]);
  makeInstancePlain(bufferServerGeometry, objectScene["02_servers"].obj.material,  [6, 0, -3]);
  makeInstancePlain(bufferServerGeometry, objectScene["02_servers"].obj.material,  [7.5,0,2]);
  makeInstancePlain(bufferServerGeometry, objectScene["02_servers"].obj.material,  [7.5, 0, -3]);

  makeInstancePlain(bufferServerGeometry, objectScene["02_servers"].obj.material,  [6, 0, 4]);
  makeInstancePlain(bufferServerGeometry, objectScene["02_servers"].obj.material,  [6, 0, -5]);

  // Additional servers
  makeInstanceLine(bufferServerGeometry, MAT.serverMat, [9,0,-3]);
  makeInstanceLine(bufferServerGeometry, MAT.serverMat, [10.5,0,-3]);
  makeInstanceLine(bufferServerGeometry, MAT.serverMat, [12,0,-3]);
  makeInstanceLine(bufferServerGeometry, MAT.serverMat, [9,0,2]);
  makeInstanceLine(bufferServerGeometry, MAT.serverMat, [10.5,0,2]);

  // Additional afar servers
  makeInstanceLine(bufferServerGeometry, MAT.serverMat, [13,0,-12]);
  makeInstanceLine(bufferServerGeometry, MAT.serverMat, [25,0,-3]); // 1.5

  // reposition server cables
  objectScene["02_server_cable001"].obj.position.x = 6;
  objectScene["02_server_cable001"].obj.position.z = 5;

  // To display virtual lines that link servers
  var curve = new THREE.CatmullRomCurve3( [
    new THREE.Vector3( 0, 1.45, 0 ),
    new THREE.Vector3( 3, 1.45, -1 ),
    new THREE.Vector3( 10, 1.45, -1 ),
    new THREE.Vector3( 14, 1.45, -1 ),
    new THREE.Vector3( 20, 3, -1 )
  ], false, "catmullrom", 0 );

  var points = curve.getPoints( 50 );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );

  var curveObject = new THREE.Line( geometry, MAT.curveMat );
  scene.add(curveObject);

  function makeInstancePlain(geometry, material, pos, zRot = 0) {
    const cube = new THREE.Mesh(geometry, MAT.newMat);
    cube.position.x = pos[0];
    cube.position.y = pos[1];
    cube.position.z = pos[2];
    objectScene["02_instanciateServers_" + instanceIdx] = {
      obj: cube,
      whichScene: -1
    }
    instanceIdx++;
    cube.material.metalness = 0.2;
    scene.add(cube);
    return cube;
  }

  function makeInstanceLine(geometry, material, pos) {
    const edges = new THREE.EdgesGeometry( geometry ); // WireframeGeometry (triangles) or EdgesGeometry
    const line = new THREE.LineSegments( edges, material );
    line.position.x = pos[0];
    line.position.y = pos[1];
    line.position.z = pos[2];
    objectScene["02_instanciateServersLines_" + instanceIdx] = {
      obj: line,
      whichScene: -1
    }
    instanceIdx++;
    scene.add(line);
    return line;
  }

  vertexPositions = objectScene["02_ocean"].obj.geometry.attributes.position.array;

}; // end of manager.load

function switchEnvironment(sign){
  settings.currentEnv = sign;
  Sidebar.switchEnv(sign);
  for (let obj in objectScene) {
    let ob = objectScene[obj];
    if(ob.whichScene === sign || ob.whichScene === 0){
      ob.obj.visible = true;
    } else {
      ob.obj.visible = false;
    }
  }

  if (sign >= 0) {
    DOMElMain.style.display = "block";
  } else { // Code env
    if (!settings.muteSound) orbSound.play();
    grid.visible = true;
    DOMElMain.style.display = "none";
  }
}

// https://github.com/mrdoob/three.js/blob/master/examples/css3d_periodictable.html
export function zoomModel(isZoomOut, scale) {
  if(isZoomOut === 1){
      controls.dollyIn(scale);
  }else{
      controls.dollyOut(scale);
  }
}

function loadSVG ( url, name, sceneSign, pos, scaleFac, rot = [0,Math.PI/2,0], mat = undefined ) {
  svgLoader.load( url, function ( data ) {
    var paths = data.paths;
    var group = new THREE.Group();
    group.scale.multiplyScalar( scaleFac );
    group.position.set(pos[0], pos[1], pos[2]);
    // group.position.x = - 70;
    // group.position.y = 70;
    group.scale.y *= - 1;
    group.rotation.set(rot[0], rot[1], rot[2]);
    for ( var i = 0; i < paths.length; i ++ ) {
      var path = paths[ i ];
      var fillColor = path.userData.style.fill;
      // var fillColor = 0x000000;
      if (mat === undefined) {
        mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setStyle( fillColor ),
          opacity: path.userData.style.fillOpacity,
          transparent: path.userData.style.fillOpacity < 1,
          side: THREE.DoubleSide,
          depthWrite: true,
          // wireframe: guiData.fillShapesWireframe
        });
      }
      var shapes = path.toShapes( true );
      for ( var j = 0; j < shapes.length; j ++ ) {
        var shape = shapes[ j ];
        var geometry = new THREE.ShapeBufferGeometry( shape );
        var mesh = new THREE.Mesh( geometry, mat );
        group.add( mesh );
      }
      var strokeColor = path.userData.style.stroke;
      // var strokeColor = 0x000000;
      if (mat === undefined) {
        mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setStyle( strokeColor ),
          opacity: path.userData.style.strokeOpacity,
          transparent: path.userData.style.strokeOpacity < 1,
          side: THREE.DoubleSide,
          depthWrite: true,
          // wireframe: guiData.strokesWireframe
        });
      }
      for ( var j = 0, jl = path.subPaths.length; j < jl; j ++ ) {
        var subPath = path.subPaths[ j ];
        var geometry = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData.style );
        if ( geometry ) {
          var mesh = new THREE.Mesh( geometry, mat );
          group.add( mesh );
        }
      }
    }
    scene.add( group );
    objectScene = {...objectScene,
      [name]: {
        obj: group, whichScene: sceneSign
      }
    }
    // objectScene[name].obj = group;
    return group;
  } );
}