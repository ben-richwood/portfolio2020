import * as THREE from './build/three.module.js';

import Stats from './libs/stats.module.js'; // for testing only

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
import { displayProjectImageOnScreen } from './libs/custom/miscellaneous.js'

// VUS JS MODULE
import { Popup, Sidebar } from './components.js';

// TweenMax - for animation
// import { TWEEN } from './libs/tween.module.min.js';
let TWEEN;

// var createGeometry = require('three-bmfont-text');
// var loadFont = require('load-bmfont');




// For STATS screen (option menu) and performance measurement
export const t0 = performance.now();

// Keyboard config - CONTROL option menu
export const keyboardMap = {
  kb_default: {
    prev: "ArrowLeft",
    next: "ArrowRight",
    accept: "Space",
    option: "Escape"
  },
  kb_gamer: {
    prev: "a",
    next: "d",
    accept: "e",
    option: "Escape"
  },
  kb_vim: {
    prev: "h",
    next: "l",
    accept: "Space",
    option: "Escape"
  },
}

function Settings (e) {
    // STATES
    this.isPaused = false;
    this.currentEnv = e.currentEnv;
    this.isCameraCloseEnough = true; // to display menu
    this.isCameraFOVUpdates = false; // rendering FOV trnasition
    this.FOVvalue = 70;
    this.zoomLevel = 1;

    // CONFIG
    this.isConfigHigh = false;
    this.isDebugMode = true;
    this.isTweenMaxLoaded = false;

    // OPTIONS
    this.muteSound = false;
    this.linksNewTab = true;
    this.keyboardConfig = {...keyboardMap.kb_default},
    this.GPU = "";

    this.lateInit = function() {
      highPerfInit();
    }
};
export const settings = new Settings({currentEnv: 1});

const svgLoader = new SVGLoader()

// All objects used for the THREE scene
let container, stats;
export let controls
export let canvasEl;
export let scene, renderer;
export let cssScene, rendererCSS; // 2nd "canvas", used by CSS3DRenderer to display DOM element in 3D env
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

// instanciate the server object
let instanciateServer;
let serverMaterial;
let instances = 10;
let vertexPositions; // to store the ocean's geometry

// var objectScene = new Array();
export var objectScene = {};
// used to position camera cand control target
const worldOrigin = [0.1, 1, 0.1];

var canvasTest = document.createElement('canvas');
var gl;
var debugInfo;
var vendor;
var rendererEval;
const logStyle = "background-color:cyan;color:black;";
// const readyToStart = document.getElementById("readyToStart");
const paradeAcross = document.getElementById("paradeAcross");

firstCheck();

function firstCheck() {

  try {
    gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
  } catch (e) {}

  if (gl) {
    debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    rendererEval = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  }

  // let mobileAndTabletcheck = function() {
  function mobilecheck () {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
  let isMobile = mobilecheck();
  msieversion();
  console.log(`%cIs your device a mobile/tablet? ${isMobile}`, logStyle);

  function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    // If Internet Explorer, return version number
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        // alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        console.warn("%cIE browser detected ", parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))), logStyle);
        Popup.ieDetected = true;
    } else  {
      // If another browser, return 0
        console.log("%cno IE", logStyle);
    }
    return false;
  }

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


function init() {
  container = document.getElementById('canvasScene');
  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.15, 90 );
  /* THREE.PerspectiveCamera PARAMS
  * fov — Camera frustum vertical field of view.
  * aspect — Camera frustum aspect ratio.
  * near — Camera frustum near plane.
  * far — Camera frustum far plane.
  */
  camera.position.set( 0.7, 1.15, 0.8 );
  camera.focus = 15;
  scene = new THREE.Scene();
  cssScene = new THREE.Scene();
  if(settings.isDebugMode){
    window.scene = scene;
    window.THREE = THREE;
  }

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
    loader.load( 'computer_v8.4.glb', function ( gltf ) {
      gltf.scene.traverse( function ( child ) {
        // if ( child.isMesh ) {
        //   child.material.envMap = envMap;
        // }
      } );
      const root = gltf.scene;
      scene.add( root );

    } );

  // Background environment for Coding scene
  /*
  new RGBELoader()
    .setDataType( THREE.UnsignedByteType )
    .setPath( 'assets/img/textures/' )
    .load( 'bg.hdr', function ( texture ) {
      scene.background = texture;
    });
    */

    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
		hemiLight.color.setHSL( 0.6, 1, 0.6 );
		hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
		hemiLight.position.set( 0, 2.5, 0 );
		scene.add( hemiLight );
		hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 1 );
		scene.add( hemiLightHelper );

    // hemiLightCode = new THREE.DirectionalLight( 0xffffff, 1 );
		// hemiLightCode.color.setHSL( 0.6, 1, 0.6 );
		// hemiLightCode.position.set( 4, 2, 0 );
    // hemiLightCode.position.multiplyScalar( 3 );
		// scene.add( hemiLightCode );
    //
    // geometry = new THREE.BoxGeometry( 2,2,2);
    // var boxLight = new THREE.Mesh( geometry, MAT.boxMat );
    // boxLight.position.set(12, 3, 0)
    // scene.add( boxLight );
    // // boxLight.visible = false;
    // hemiLightCode.target = boxLight;
    //
		// hemiLightCodeHelper = new THREE.DirectionalLightHelper( hemiLightCode, 1 );
		// scene.add( hemiLightCodeHelper );



    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
		dirLight.color.setHSL( 0.1, 1, 0.95 );
		dirLight.position.set( 2, 1.3, 2 );
		dirLight.position.multiplyScalar( 3 );
		scene.add( dirLight );
		dirLight.castShadow = true;
		dirLight.shadow.mapSize.width = 2048;
		dirLight.shadow.mapSize.height = 2048;
		var d = 2;
		dirLight.shadow.camera.left = - d;
		dirLight.shadow.camera.right = d;
		dirLight.shadow.camera.top = d;
		dirLight.shadow.camera.bottom = - d;
		dirLight.shadow.camera.far = 350;
		dirLight.shadow.bias = - 0.0001;
		dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 1 );
		scene.add( dirLightHeper );

  // ground
  /*
  groundMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
  groundMesh.rotation.x = - Math.PI / 2;
  groundMesh.receiveShadow = false;
  scene.add( groundMesh );
  */

  // The box is used as a camera target; easier to manipulate and debug
  var geometry = new THREE.BoxGeometry( .2,.2,.2);
  box = new THREE.Mesh( geometry, MAT.boxMat );
  box.position.set(worldOrigin[0], worldOrigin[1], worldOrigin[2])
  scene.add( box );
  box.visible = false;

  renderer = new THREE.WebGLRenderer( { antialias: false, stencil: false, precision: 'mediump', depth: true, preserveDrawingBuffer: true, premultipliedAlpha: false } );
  THREE.Cache.enabled = true;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.gammaOutput = true;
  container.appendChild( renderer.domElement );
  canvasEl = container.getElementsByTagName('canvas')[0];

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
  controls.minDistance = .8;
  controls.maxDistance = 20; // 7
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

  // INIT CSS3DRenderer
  // initCSS3DRenderer();

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

  designLogo = loadSVG( 'assets/models/design.svg', 'design', 1, [-1, 3, 1.5], 0.005 ); // [2, 1.8, 1.5], 0.0025
  codeLogo = loadSVG( 'assets/models/code.svg', 'code', -1, [10, 5, .5], 0.01, [0,-Math.PI/2,0] ); // [2, 1.8, 1.5], 0.0025

  controls.update();
  window.addEventListener( 'resize', onWindowResize, false );
  // document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  // stats
  if (settings.isDebugMode) {
    stats = new Stats();
    container.appendChild( stats.dom );
  }

  // animate();
  settings.isPaused = true; // To animate the first frame only
  if (!settings.isPaused){
    // console.log("scene: ", scene);
    TEST.testing(scene);

    requestAnimationFrame( animate );
    // clock = new THREE.Clock();
  }
}

function initCSS3DRenderer() {
  rendererCSS = new CSS3DRenderer();
  rendererCSS.setSize( window.innerWidth, window.innerHeight );
  // rendererCSS.setPixelRatio( window.devicePixelRatio );
  document.getElementById( 'domEl' ).appendChild( rendererCSS.domElement );

  // Container element - to push to CSS3dRenderer
  let elementContainer = document.createElement( 'div' );
  elementContainer.className = 'screenGraphicDefault ';

  // heading + moving stripe
  var element = document.createElement( 'div' );
  var headingEl = document.createElement( 'h3' );
  headingEl.innerText = "Ben's\nportfolio";
  element.appendChild(headingEl);
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

  elementContainer.appendChild(element);

  screenGraphic = new CSS3DObject( elementContainer );
  screenGraphic.position.set(-0.0255, 1.41, .037);
  screenGraphic.scale.multiplyScalar( .002 );
  screenGraphic.rotation.order = 'YXZ'; // Super important to have the correct rotation
  screenGraphic.rotation.set(-( 2 * Math.PI/16) + Math.PI/32, Math.PI/2, 0);
  screenGraphic.updateMatrix();
  cssScene.add(screenGraphic);
}

export function readyToLaunch(){
  console.log("ready To Launch",objectScene);
  for (let obj in objectScene) {
    let ob = objectScene[obj];
    if(ob.whichScene === -1){
      ob.obj.visible = false;
    }
  };
  let selectedObject = scene.getObjectByName("02_ocean");
  scene.remove( selectedObject );
  selectedObject = scene.getObjectByName("02_servers");
  scene.remove( selectedObject );
  objectScene["01_new_ground"].obj.children[0].receiveShadow = true;
  objectScene["01_new_ground"].obj.children[1].receiveShadow = true;
  objectScene["01_new_ground"].obj.receiveShadow = true;
  objectScene["desk_table"].obj.castShadow = true;
  objectScene["desk_table"].obj.children[0].castShadow = true;
  objectScene["desk_table"].obj.children[1].castShadow = true;
  selectedObject = scene.getObjectByName("desk_table");
  console.log(selectedObject)
  playAnimation();
}

export function playAnimation() {
  settings.isPaused = false;
  canvasEl.style.filter = "none";
  animate();
  TEST.testing(scene);
  requestAnimationFrame( animate );
}

export function pauseAnimation () {
  canvasEl.style.filter = "blur(10px)";
  settings.isPaused = true;
}

// Building extra objects geometry for Hight Perf config
// Such as ocean of dots, airborn particles
function highPerfInit() {
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
  // objectScene["blurredAirborneParticules"] = {obj: blurredAirborneParticules, whichScene: 0};

  import('./libs/tween.module.min.js').then((tween) => {
    console.log("%cTweenMax loaded successfully", "background-color:orange;color:black;");
    settings.isTweenMaxLoaded = true;
    TWEEN = tween;
  });
}

function animate (time) {
  if (settings.isPaused) return
// function animate () {
  // var t = Date.now() * 0.0005;
  time *= 0.0006; // convert to seconds

  if (settings.isConfigHigh){
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    camera.lookAt( box.position );
    // other way: camera.target.set( box.position.x, box.position.y, box.position.z );
  }

  let speedy = .08 * Math.cos( 3 * time );
  let zOffset = -.3;
  let easeFactor = .08;
  // if (idleTimer > 7000){
  if (true){
    box.position.y = easeFactor * speedy + 1.4;
    box.position.z = easeFactor * Math.sin( time ) - zOffset;
  } else {
    idleTimer += 30;
  }

  // if (settings.isCameraFOVUpdates) {
  //   console.log("camera.fov:", camera.fov);
  //   // if (camera.fov < settings.FOVvalue)
  //   const newTime = time * 0.08;
  //   camera.fov += newTime * (-1 * settings.currentEnv);
  //   // zoomModel(settings.isCameraFOVUpdates, newTime * 10)
  //   camera.updateProjectionMatrix();
  //   // if (camera.fov < settings.FOVvalue)) {
  //   if (camera.fov >= 75 || camera.fov <= 35) {
  //     settings.isCameraFOVUpdates = false;
  //   }
  // }

  renderer.render( scene, camera );
  // rendererCSS.render( cssScene, camera );
  if (settings.isDebugMode) {
    stats.update();
  }
  curEnvVar = Math.sign(camera.position.x);

  if (loaded && curEnvVar != previousEnvVar) {
    switchEnvironment(curEnvVar)
  }
  // if(settings.isTweenMaxLoaded && tween) TWEEN.update();

  requestAnimationFrame( animate );
  previousEnvVar = curEnvVar;
}

function onWindowResize() {
  var aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove() {
  // display instruction - to move around
  // let d = camera.distanceTo( box )

  // if (isIntroOn) return
  // idleTimer = 0;
}

// Used in OrbisControl to get the distance between the camera & the target
export function distanceVector( v1, v2 ) {
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;
    return Math.sqrt( dx * dx + dy * dy + dz * dz );
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
  makeInstanceLine(bufferServerGeometry, MAT.serverMat, [25,1.5,-3]);

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
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = pos[0];
    cube.position.y = pos[1];
    cube.position.z = pos[2];
    objectScene["02_instanciateServers_" + instanceIdx] = {
      obj: cube,
      whichScene: -1
    }
    instanceIdx++;
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
  let selectedObject = scene.getObjectByName("02_servers");
  scene.remove( selectedObject );
  selectedObject = scene.getObjectByName("02_ocean");
  scene.remove( selectedObject );

  delete objectScene["02_servers"];
  delete objectScene["02_ocean"];

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
  // objectScene["02_ocean"].obj.visible = false;
  // objectScene["02_servers"].obj.visible = false;

  if (sign >= 0) {
    // settings.FOVvalue = 35;
    // if (settings.isConfigHigh) {
    //   objectScene["02_ocean"].obj.visible = false;
    // }
  } else { // Code env
    if (!settings.muteSound) orbSound.play();
    grid.visible = true;
    // settings.FOVvalue = 75;
    // controls.dollyIn(400);
    // if (!settings.isConfigHigh) objectScene["02_ocean02"].obj.visible = false;
    // if (!settings.isConfigHigh) objectScene["airborneParticules"].obj.visible = false;
  }
  console.log("objectScene", objectScene);
  // zoomModel(sign, 4)
  // settings.isCameraFOVUpdates = true
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