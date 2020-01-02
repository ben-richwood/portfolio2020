// THREE JS MODULES
import * as THREE from './build/three.module.js';
// Custom lib
import * as MAT from './libs/custom/materialList.js'
import * as TEST from './libs/custom/testing.js'

import Stats from './libs/stats.module.js';
import { OrbitControls } from './libs/OrbitControls.js';
import { WEBGL } from './libs/WebGL.js';
import { GLTFLoader } from './libs/GLTFLoader.js';
import { SVGLoader } from './libs/SVGLoader.js';
import { RGBELoader } from './libs/RGBELoader.js';
import { EquirectangularToCubeGenerator } from './libs/EquirectangularToCubeGenerator.js';
import { PMREMGenerator } from './libs/PMREMGenerator.js';
import { PMREMCubeUVPacker } from './libs/PMREMCubeUVPacker.js';
import { RectAreaLightUniformsLib } from './libs/RectAreaLightUniformsLib.js';

import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';

// VUS JS MODULE
import { Popup, Sidebar } from './components.js';

// import { TWEEN } from './libs/tween.module.min.js';

export const t0 = performance.now();


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
    this.currentEnv = e.currentEnv;
    this.isCameraCloseEnough = true; // to display menu
    this.isCameraFOVUpdates = false; // rendering FOV trnasition
    this.FOVvalue = 70;
    this.zoomLevel = 1;
    // this.sidebarMenu = Sidebar.classAttribute; // reprensent the DOM sidebar element
    this.isConfigHigh = false;
    this.isDebugMode = true;

    this.isPaused = false;

    this.muteSound = false;
    this.linksNewTab = true;
    this.keyboardConfig = {...keyboardMap.kb_default},
    this.GPU = "";

    this.lateInit = function() {
      highPerfInit();
    }

};
export const settings = new Settings({currentEnv: 1});


const svgLoader = new SVGLoader();

// Progress bar for manager (loading objects & textures)
// const loadingElem = document.getElementById('loading');
// const progressBarElem = loadingElem.getElementsByClassName('progressbar')[0];

let container, stats;
export let controls
export let canvasEl;
export let scene, renderer;
export let cssScene, rendererCSS; // 2nd "canvas", used by CSS3DRenderer to display DOM element in 3D env
let time, clock, light, bgTexture, fog;
let grid, groundMesh;
export let camera;
export let box;

let designLogo, codeLogo
var groupDesign = new THREE.Group();
var groupCode = new THREE.Group();


let previousEnvVar = -1, curEnvVar = -1;

// const speed = Math.PI/4;
// let idleTimer = 8000;
let isIdleTime = false;
var tempT = 0;
let loaded = false;

var orbSound = new Audio('assets/orb.mp3');

let instanciateServer;
let serverMaterial;
let instances = 10;

// var objectScene = new Array();
export var objectScene = {};

const worldOrigin = [0.1, 1, 0.1];

var manager = new THREE.LoadingManager();
  manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
  let progress = itemsLoaded / itemsTotal;
  // progressBarElem.style.transform = "scaleX(" + progress + ")";
  Popup.progress = progress;
};

manager.onError = function ( url ) {
  console.log( 'There was an error loading ' + url );
};

init();
if ( WEBGL.isWebGLAvailable() ) {
  // Initiate function or other initializations here
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.getElementById( 'notCompatible' ).appendChild( warning );
  // return;
}
// console.log("scene: ", scene);
if (scene.children.length > 0){
  console.log("scene obj: ", scene.children[9]);
}


function init() {
  container = document.createElement( 'div' );
  document.getElementById('canvasScene').appendChild( container );
  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.15, 90 );
  /* THREE.PerspectiveCamera PARAMS
  * fov — Camera frustum vertical field of view.
  * aspect — Camera frustum aspect ratio.
  * near — Camera frustum near plane.
  * far — Camera frustum far plane.
  */
  camera.position.set( 0.7, 1.35, 0.64 );
  camera.focus = 15;
  scene = new THREE.Scene();
  cssScene = new THREE.Scene();
  if(settings.isDebugMode){
    window.scene = scene;
    window.THREE = THREE;
  }
  fog = new THREE.FogExp2( 0x3C5C4A, .09, 15 );
  scene.fog = null

  rendererCSS = new CSS3DRenderer();
  rendererCSS.setSize( window.innerWidth, window.innerHeight );
  // rendererCSS.setPixelRatio( window.devicePixelRatio );
  document.getElementById( 'domEl' ).appendChild( rendererCSS.domElement );

  // fogBg = new THREE.FogExp2( 0xefd1b5, 0.0025, .7 );
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
      loader.load( 'computer_v7.glb', function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            child.material.envMap = envMap;
          }
        } );
        const root = gltf.scene;
        scene.add( root );

      } );
      pmremGenerator.dispose();
      pmremCubeUVPacker.dispose();
    } );

  new RGBELoader()
    .setDataType( THREE.UnsignedByteType )
    .setPath( 'assets/img/textures/' )
    .load( 'bg.hdr', function ( texture ) {
      scene.background = texture;
    });

  // ground
  /*
  groundMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
  groundMesh.rotation.x = - Math.PI / 2;
  groundMesh.receiveShadow = false;
  scene.add( groundMesh );
  */

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
  controls.target.set( worldOrigin[0], worldOrigin[1], worldOrigin[2] );
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
  controls.maxDistance = 7;
  // controls.zoomSpeed = .40;

  // Constrain horizontal and vertical rotation
  controls.minPolarAngle = Math.PI/8;
  controls.maxPolarAngle = 2 * Math.PI/4
  controls.minAzimuthAngle = - Math.PI/2 - Math.PI/8; //- Infinity; // radians
  controls.maxAzimuthAngle = Math.PI/2 - Math.PI/16; //Infinity; // radian

  grid = new THREE.GridHelper( 20, 20, 0x000000, 0x000000 );
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  grid.visible = false;
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add( grid );

  // INIT CSS3DRenderer
  var element = document.createElement( 'div' );
  element.className = 'screenGraphic';
  element.textContent = "Screen";
  const screenGraphic = new CSS3DObject( element );
  screenGraphic.position.set(-0.025, 1.41, .037);
  screenGraphic.scale.multiplyScalar( .002 );
  screenGraphic.rotation.order = 'YXZ'; // Super important to have the correct rotation
  screenGraphic.rotation.set(-( 2 * Math.PI/16) + Math.PI/32, Math.PI/2, 0);
  screenGraphic.updateMatrix();
  cssScene.add(screenGraphic);

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

  const vertexPositions = objectScene["02_ocean"].obj.geometry.attributes.position.array;

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

  const oceanWave = new THREE.Points( oceanVert, MAT.oceanMaterial );
  oceanWave.position.x = 28;

  const airborneParticules = new THREE.Points( partVert, MAT.starsMaterial );

  scene.add( oceanWave );
  scene.add( airborneParticules );
  objectScene["02_ocean02"] = {obj: oceanWave, whichScene: -1};
  objectScene["airborneParticules"] = {obj: airborneParticules, whichScene: 0};
}

// To show hierarchy
function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
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
  let xOffset = 0; // 1
  let easeFactor = .08;
  // if (idleTimer > 7000){
  if (true){
    box.position.y = easeFactor * speedy + 1.4;
    box.position.z = easeFactor * Math.sin( time ) - xOffset;
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
  rendererCSS.render( cssScene, camera );
  if (settings.isDebugMode) {
    stats.update();
  }
  curEnvVar = Math.sign(camera.position.x);

  if (loaded && curEnvVar != previousEnvVar) {
    switchEnvironment(curEnvVar)
  }
  // TWEEN.update();
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
  // let instanced = new THREE.InstancedBufferGeometry().copy(objectScene["02_servers"].obj);
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

  // console.log("selectedObject", selectedObject);
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