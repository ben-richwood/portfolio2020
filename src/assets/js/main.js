// THREE JS MODULES
import * as THREE from './build/three.module.js';
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

// VUS JS MODULE
import { Popup, Sidebar } from './projects.js';

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
    this.keyboardConfig = {...keyboardMap.kb_default}

    this.lateInit = function() {
      lateInit();
    }

};
export const settings = new Settings({currentEnv: 1});


const svgLoader = new SVGLoader();

// Progress bar for manager (loading objects & textures)
// const loadingElem = document.getElementById('loading');
// const progressBarElem = loadingElem.getElementsByClassName('progressbar')[0];

let container, stats, controls;
export let canvasEl;
export let scene, renderer;
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
  document.body.appendChild( container );
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
  if(settings.isDebugMode){
    window.scene = scene;
    window.THREE = THREE;
  }
  fog = new THREE.FogExp2( 0x3C5C4A, .09, 15 );
  scene.fog = null
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
  var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  box = new THREE.Mesh( geometry, material );
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
  // controls.target.set( worldOrigin[0], worldOrigin[1], worldOrigin[2]);
  controls.target.set( worldOrigin[0], worldOrigin[1], worldOrigin[2] );
  // auto rotate
  controls.autoRotate = false;
  controls.autoRotateSpeed = 1;
  // controls.target = new THREE.Vector3(.5, .5, .5);
  // Disable panning
  controls.enablePan = false;
  controls.panningMode = 1; // default is 0 = ScreenSpacePanning versus HorizontalPanning
  controls.panSpeed = .2;
  // inertia
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  // Zom properties
  controls.enableZoom = true;
  controls.minDistance = .8;
  controls.maxDistance = 7;
  // controls.zoomSpeed = .40;

  // Constrain horizontal and vertical rotation
  controls.minPolarAngle = Math.PI/8;
  // controls.maxPolarAngle = 2 * Math.PI/4 - (1 * Math.PI/16) ; // Math.PI/2 + Math.PI/8;
  controls.maxPolarAngle = 2 * Math.PI/4
  controls.minAzimuthAngle = - Math.PI/2 - Math.PI/8; //- Infinity; // radians
  controls.maxAzimuthAngle = Math.PI/2 - Math.PI/16; //Infinity; // radian

  // var grid = new THREE.GridHelper( 20, 20, 0x000000, 0x000000 );
  grid = new THREE.GridHelper( 20, 20, 0x000000, 0x000000 );
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  grid.visible = false;
  scene.add( grid );

  // Add 2D textures
  const imgLoader = new THREE.TextureLoader();
  const screenTex = [
    imgLoader.load('assets/img/textures/barry-room.gif')
  ];
  const planeWidth = 1;
  const planeHeight = .6;
  const planeGeo = new THREE.PlaneBufferGeometry(planeWidth, planeHeight);
  const planes = screenTex.map((screenTex) => {
    const planePivot = new THREE.Object3D();
    scene.add(planePivot);
    screenTex.magFilter = THREE.NearestFilter;
    const planeMat = new THREE.MeshBasicMaterial({
      map: screenTex,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    planePivot.add(mesh); // Should attach to another Mesh
    mesh.position.set(0, 1.45, 0);
    // var a = new THREE.Euler(Math.PI, -Math.PI/8, 0, 'ZYX')
    // var b = new THREE.Vector3(1,1,1);
    // console.log(a);
    // console.log(b);
    // console.log(b.applyEuler(a));
    // mesh.rotation.set(b.applyEuler(a));
    // var a = new THREE.Euler(Math.PI, Math.PI/8, 0, 'ZYX');
    // var b = new THREE.Vector3( mesh.position.x, mesh.position.y, mesh.position.z );
    // mesh.position.set(b.applyEuler(a))

    // mesh.rotation.set(new THREE.Euler(0, -Math.PI/8, Math.PI, 'ZYX' ));
    // mesh.rotation.set(new THREE.Euler(Math.PI/2, 0, 0, 'YXZ' ));
    mesh.rotation.order = 'YXZ'; // mesh.eulerOrder = 'YXZ';
    mesh.rotation.x = -( 2 * Math.PI/16) + Math.PI/32;
    mesh.rotation.y = Math.PI/2;
    mesh.rotation.z = 0;
    mesh.updateMatrix();
    return planePivot;
  });

  /*
  const textMaterial = new THREE.MeshStandardMaterial();
  var Texttloader = new THREE.TextureLoader()
        .setPath( 'assets/img/textures/' );
    textMaterial.color = {b: .2, g: .2, r: .2 }
    textMaterial.roughness = .2; // attenuates roughnessMap
    textMaterial.metalness = 1; // attenuates metalnessMap
    textMaterial.map = Texttloader.load( 'pedestrian_overpass_2k.hdr' );
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
    testing();

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
  testing();
  requestAnimationFrame( animate );
}

export function pauseAnimation () {
  canvasEl.style.filter = "blur(10px)";
  settings.isPaused = true;
}

function lateInit() {
  console.log("%clateInit()", "background-color:orange;color:black;");
  var oceanVert = new THREE.Geometry();
  var partVert = new THREE.Geometry();

  var vertexPositions = objectScene["02_ocean"].obj.geometry.attributes.position.array;

  for ( var i = 0; i < vertexPositions.length - 3; i += 3 ) {
    var vertices = new THREE.Vector3();
    vertices.x = vertexPositions[i];
    vertices.y = vertexPositions[i+1];
    vertices.z = vertexPositions[i+2];
    oceanVert.vertices.push( vertices );
  }
  for ( var i = 0; i < 100; i ++ ) {
    var star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread( 7 );
    star.y = THREE.Math.randFloatSpread( 7 );
    star.z = THREE.Math.randFloatSpread( 7 );
    partVert.vertices.push( star );
  }
  var starsMaterial = new THREE.PointsMaterial({
    size: .04,
    map: new THREE.TextureLoader().load("assets/img/spark1.png"),
    blending: THREE.AdditiveBlending,
    transparent: true,
    color: 0xf2f2f2
  });

  var oceanMaterial = new THREE.PointsMaterial({
    size: .12,
    map: new THREE.TextureLoader().load("assets/img/spark1.png"),
    blending: THREE.AdditiveBlending,
    transparent: true,
    color: 0xf2f2f2
  });
  var oceanWave = new THREE.Points( oceanVert, oceanMaterial );
  oceanWave.position.x = 28;

  var airborneParticules = new THREE.Points( partVert, starsMaterial );

  scene.add( oceanWave );
  scene.add( airborneParticules );
  objectScene["02_ocean02"] = {obj: oceanWave, whichScene: -1};
  objectScene["airborneParticules"] = {obj: airborneParticules, whichScene: 0};
  // console.log("oceanWave:",oceanWave);
}

function testing(){
  //axes
  var axes = new THREE.AxesHelper(5);
  scene.add(axes);

  var dirX = new THREE.Vector3( 1, 0, 0 );
  var dirY = new THREE.Vector3( 0, 1, 0 );
  var dirZ = new THREE.Vector3( 0, 0, 1 );

  //normalize the direction vector (convert to vector of length 1)
  dirX.normalize();
  dirY.normalize();
  dirZ.normalize();
  var origin = new THREE.Vector3( 0.13, 0, 0 );
  var arrowHelperX = new THREE.ArrowHelper( dirX, origin, 1, 0xff0000 );
  var arrowHelperY = new THREE.ArrowHelper( dirY, origin, 1, 0x00ff00 );
  var arrowHelperZ = new THREE.ArrowHelper( dirZ, origin, 1, 0x0000ff );
  scene.add( arrowHelperX );
  scene.add( arrowHelperY );
  scene.add( arrowHelperZ );

  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add( grid );

  // Add light
  light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  light.position.set( 0, 200, 0 );
  light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );
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

// function objStruct(obj, lines = [], isLast = true) {
// 	const localPrefix = isLast ? '└─' : '├─';
// 	// lines.push(`${obj.name || '*no-name*'}`);
// 	lines.push(obj.name);
// 	const lastNdx = obj.children.length - 1;
// 	obj.children.forEach((child, ndx) => {
// 		const isLast = ndx === lastNdx;
// 		objStruct(child, lines, isLast);
// 	});
// 	return lines;
// }

function animate (time) {
  if (settings.isPaused) return
// function animate () {
  // var t = Date.now() * 0.0005;
  time *= 0.0006; // convert to seconds

  if (settings.isConfigHigh) controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  let speedy = .08 * Math.cos( 3 * time )
  let xOffset = 0; // 1
  let easeFactor = .08;
  // if (idleTimer > 7000){
  if (true){
    box.position.y = easeFactor * speedy + 1.4;
    box.position.z = easeFactor * Math.sin( time ) - xOffset;
    if (settings.isConfigHigh) camera.lookAt( box.position );
    // camera.target.set( box.position.x, box.position.y, box.position.z );
    // camera.lookAt( box.position );
  } else {
    idleTimer += 30;
  }

  if (settings.isCameraFOVUpdates) {
    console.log("camera.fov:", camera.fov);
    // if (camera.fov < settings.FOVvalue)
    const newTime = time * 0.08;
    camera.fov += newTime * (-1 * settings.currentEnv);
    // zoomModel(settings.isCameraFOVUpdates, newTime * 10)
    camera.updateProjectionMatrix();
    // if (camera.fov < settings.FOVvalue)) {
    if (camera.fov >= 75 || camera.fov <= 35) {
      settings.isCameraFOVUpdates = false;
    }
  }


  /*
  // get the position of the center of the cube
  box.updateWorldMatrix(true, false);
  box.getWorldPosition(tempV);

  // get the normalized screen coordinate of that position
  // x and y will be in the -1 to +1 range with x = -1 being
  // on the left and y = -1 being on the bottom
  tempV.project(camera);
  // ask the raycaster for all the objects that intersect
  // from the eye toward this object's position
  raycaster.setFromCamera(tempV, camera);
  const intersectedObjects = raycaster.intersectObjects(scene.children);
  // We're visible if the first intersection is this object.
  // const show = intersectedObjects.length && objectScene["screen_main"] === intersectedObjects[0].object;
  const show = true;

  if (!show || Math.abs(tempV.z) > 1) {
    // hide the label
    elem.style.display = 'none';
  } else {
    // unhide the label
    elem.style.display = '';

    // convert the normalized position to CSS coordinates
    const x = (tempV.x *  10 + .5) * renderer.domElement.clientWidth;
    const y = (tempV.y * -10 + .5) * renderer.domElement.clientHeight;

    const z = controls.zoom0;
    // const z = .8;

    // console.log(z);
    // console.log(controls.position0);

    // move the elem to that position
    elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px) scale(${z})`;

    // set the zIndex for sorting
    elem.style.zIndex = (-tempV.z * .5 + .5) * 100000 | 0;
  }
  */

  renderer.render( scene, camera );
  if (settings.isDebugMode) {
    stats.update();
  }
  curEnvVar = Math.sign(camera.position.x);

  if (loaded && curEnvVar != previousEnvVar) {
    switchEnvironment(curEnvVar)
  }

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
  // add a condition to check if objects are not in the right child node.
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
  // objectScene.design.obj.visible = false
  objectScene.code.obj.visible = false;

  console.log("scene:",scene);

  // For ocean in background
  // var starsMaterial = new THREE.PointsMaterial( { color: 0xaaaaaa } );
  // var starField = new THREE.Points( objectScene.ocean, starsMaterial );
  // scene.add( starField );
  // objectScene.ocean.material = starsMaterial;




  // let tmpGeo = new THREE.BufferGeometry(objectScene["02_servers"].obj.geometry);
  let instanced = new THREE.BufferGeometry(objectScene["02_servers"].obj.geometry);
  // let instanced = new THREE.InstancedBufferGeometry().copy(objectScene["02_servers"].obj);
  instanced.maxInstancedCount = instances;

  var positions = [];
  var vector = new THREE.Vector4();
  var offsets = [];
  let aOffset = [];
  var indices = [];

	// instanced attributes
	for ( var i = 0; i < instances; i++ ) {
    positions.push( i, 0, 0 );
    offsets.push( 9+(i*4), 0, 0 );
    aOffset.push( i, 0, 0 );
		// offsets
		// offsets.push( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
		// colors
		// colors.push( Math.random(), Math.random(), Math.random(), Math.random() );
		// orientation start
		// vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
		// vector.normalize();
		// orientationsStart.push( vector.x, vector.y, vector.z, vector.w );
		// orientation end
		// vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
		// vector.normalize();
		// orientationsEnd.push( vector.x, vector.y, vector.z, vector.w );
	}
	// let tmpGeo = new THREE.InstancedBufferGeometry();
	// let tmpGeo = new THREE.BufferGeometry();
  // instanced.setIndex( indices );
	// instanced.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
  // instanced.addAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( offsets ), 3 ) );
  // instanced.addAttribute( "aOffset", new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false) );


  // const bufferServerGeometry = new THREE.InstancedBufferGeometry().copy(objectScene["02_servers"].obj);
  const bufferServerGeometry = objectScene["02_servers"].obj.geometry;
  // const bufferServerGeometry = new THREE.BufferGeometry(objectScene["02_servers"].obj.geometry);
  var serverMat = new THREE.LineBasicMaterial( { color: 0x999999 } )

  makeInstancePlain(bufferServerGeometry, objectScene["02_servers"].obj.material,  [6,0,2]);
  makeInstancePlain(bufferServerGeometry, objectScene["02_servers"].obj.material,  [6, 0, -3]);
  makeInstancePlain(bufferServerGeometry, objectScene["02_servers"].obj.material,  [7.5,0,2]);
  makeInstancePlain(bufferServerGeometry, objectScene["02_servers"].obj.material,  [7.5, 0, -3]);

  makeInstanceLine(bufferServerGeometry, serverMat, [9,0,-3]);
  makeInstanceLine(bufferServerGeometry, serverMat, [10.5,0,-3]);

  // var instanciateServers = new THREE.Mesh( instanced, serverMaterial );
  // instanciateServers.position.x = 2;
  // objectScene["02_instanciateServers"] = {
  //   obj: instanciateServers,
  //   whichScene: -1
  // }
	// scene.add( instanciateServers );


  var curve = new THREE.CatmullRomCurve3( [
    new THREE.Vector3( 0, 1.45, 0 ),
    new THREE.Vector3( 3, 1.45, -3 ),
    new THREE.Vector3( 10, 1.45, -3 )
  ], false, "catmullrom", 0 );

  var points = curve.getPoints( 50 );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );

  var material = new THREE.LineBasicMaterial( {
    color : 0x00ff00,
    linewidth: 30
  } );

  var curveObject = new THREE.Line( geometry, material );
  scene.add(curveObject);


  function makeInstancePlain(geometry, material, pos) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = pos[0];
    cube.position.y = pos[1];
    cube.position.z = pos[2];
    scene.add(cube);
    return cube;
  }

  function makeInstanceLine(geometry, material, pos) {
    const edges = new THREE.EdgesGeometry( geometry ); // WireframeGeometry (triangles) or EdgesGeometry
    const line = new THREE.LineSegments( edges, material );
    line.position.x = pos[0];
    line.position.y = pos[1];
    line.position.z = pos[2];
    scene.add(line);
    return line;
  }


  // ADD SERVER WITH LINES
  // var edges = new THREE.EdgesGeometry( objectScene["02_servers"].obj.geometry ); // WireframeGeometry (triangles) or EdgesGeometry

  // var line = new THREE.LineSegments( edges, serverMat );
  // var line02 = new THREE.LineSegments( edges, serverMat );

  // objectScene["02_instanciateServers"] = {
  //   obj: line,
  //   whichScene: -1
  // }
  // scene.add( objectScene["02_instanciateServers"].obj );
  // scene.add( line02 );

  // objectScene["02_servers"] = {obj: line, whichScene: -1};
  let selectedObject = scene.getObjectByName("02_servers");
  console.log("selectedObject", selectedObject);
  scene.remove( selectedObject );

  lateInit();
  loadProjectImages()
};

function switchEnvironment(sign){
  settings.currentEnv = sign;
  // objectScene.design.visible = !objectScene.design.visible;
  // objectScene.code.visible = !objectScene.code.visible;
  Sidebar.switchEnv(sign);

  for (let obj in objectScene) {
    let ob = objectScene[obj];
    if(ob.whichScene === sign || ob.whichScene === 0){
      ob.obj.visible = true;
    } else {
      ob.obj.visible = false;
    }
  }
  objectScene["02_ocean"].obj.visible = false;
  objectScene["02_servers"].obj.visible = false;

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
    if (!settings.isConfigHigh) objectScene["02_ocean02"].obj.visible = false;
    if (!settings.isConfigHigh) objectScene["airborneParticules"].obj.visible = false;
  }

  console.log("objectScene", objectScene);
  /*
  if (sign >= 0) { // Design env
    grid.visible = false;
    scene.fog = null
    objectScene.servers.visible = false;
    objectScene.wall.visible = true;
    objectScene.new_ground.visible = true;
    objectScene.server_cable001.visible = false;
    settings.FOVvalue = 35;
    if (settings.isConfigHigh) {
      objectScene.ocean.visible = false;
    }
  } else { // Code env
    orbSound.play();
    grid.visible = true;
    // scene.fog = fog;
    // objectScene.servers.visible = true;
    objectScene.wall.visible = false;
    objectScene.new_ground.visible = false;
    objectScene.server_cable001.visible = true;
    console.log("settings.sidebarMenu:",settings.sidebarMenu);
    // scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025, 10 );
    // fogBg = new THREE.FogExp2( 0xefd1b5, 0.0025, .7 );
    settings.FOVvalue = 75;
    controls.dollyIn(400);
    if (settings.isConfigHigh) {
      objectScene.ocean.visible = true;
    }
  }
  */
  // zoomModel(sign, 4)
  // settings.isCameraFOVUpdates = true
}

function zoomModel(isZoomOut, scale) {
  if(isZoomOut === 1){
      controls.dollyIn(scale);
  }else{
      controls.dollyOut(scale);
  }
}

function loadProjectImages() {
  // load textures
  const imgLoader01 = new THREE.TextureLoader();
  // imgLoader.setPath
  // const screenTex = [
  //   imgLoader.load('textures/barry-room.gif')
  // ];
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