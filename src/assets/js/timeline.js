import * as THREE from './build/three.module.js';
// custom Orbit Control
import { OrbitControls } from './libs/orbis-lite.js';
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';
import { LineMaterial } from './libs/LineMaterial.js';

import * as MAT from './libs/custom/materialList.js'
import Stats from './libs/stats.module.js'; // for testing only
import * as TEST from './libs/custom/testing.js'

import * as Utilis from './libs/custom/miscellaneous.js'

import projects from "./projects.js";
import { t0, keyboardMap, zoomModel, objectScene, container, canvasEl, canvasTimeline, readyToLaunch, canvasStats } from './app.js'

import { settings } from './components.js'

import { TWEEN } from './libs/tween.module.min.js'

const sortedTimeline = projects.list.sort(function (a, b) {
  return a.year - b.year;
});

export let camera, controls, scene, renderer;
export let cssScene, rendererCSS; // 2nd "canvas", used by CSS3DRenderer to display DOM element in 3D env

const canvasCssEl = document.getElementById('DOMElTimeline');

const cameraInitialPosition = { x: 500, y: 1770, z: 327 }

// const svgLoader = new SVGLoader();

// const timelineMaterial = {
//   perso: 0x11517F,
//   today: 0xff0000,
//   study: 0x11517F,
//   work: 0x00ffff,
//   freelance: 0x8800ff
// }

// For timeline
// export const matLine = new LineMaterial( {
//   color: 0xffffff,
//   linewidth: .003, // in pixels
//   vertexColors: THREE.VertexColors,
//   //resolution:  // to be set by renderer, eventually
//   dashed: false
// } );

var objects = [];
export var targets = { techno: [], software: [], skills: [], all: [], timeline: []};
export var symbols = { techno: [], software: [], skills: [], timeline: []};
export var bounds = { techno: [], software: []};



// Variables to build the timeline - easier to tweak
const unit = 20; // unit value for 1 month
let zOffset = 40;
const yu = unit * 12; // yearUnit
const sp = -2400 // startingPoint - year 2009
let startingPoint = sp;
let xOffset = -1000
const yDepth = -50 // default depth

let stats, rendererStats;

// const globalTimeline = document.createElement( 'div' );
// globalTimeline.className = "globalTimeline"

var onWindowResize = Utilis.debounce(function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, 80);

export function init() {
  scene = new THREE.Scene();
  cssScene = new THREE.Scene();
  // scene.background = new THREE.Color( 0xcccccc );
  // scene.background = null;
  renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvasTimeline, stencil: false, precision: 'mediump', depth: true, preserveDrawingBuffer: true, premultipliedAlpha: false, alpha: true } );
  renderer.setClearColor( 0x000000, 0 ); // default
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  rendererCSS = new CSS3DRenderer();
  rendererCSS.setSize( window.innerWidth, window.innerHeight );
  document.getElementById( 'DOMElTimeline' ).appendChild( rendererCSS.domElement );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.x = cameraInitialPosition.x;
  camera.position.y = cameraInitialPosition.y;
  camera.position.z = cameraInitialPosition.z;
  // camera.lookAt(new THREE.Vector3(600,0,327));
  // controls
  controls = new OrbitControls( camera, rendererCSS.domElement );
  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = settings.isMobile ? 300 : 600;
  controls.maxDistance = settings.isMobile ? 2800 : 2000;
  // controls.maxDistance = 2000;
  controls.minAzimuthAngle = 0;
  controls.maxAzimuthAngle = controls.minAzimuthAngle;
  controls.enableZoom = true;
  controls.enablePan = true;

  controls.minPolarAngle = 0;
  controls.maxPolarAngle =  Math.PI / 12; // alternative: Math.PI / 16;
  // FOR TESTING
  // controls.maxPolarAngle =  Math.PI / 2;
  // controls.maxAzimuthAngle = Infinity;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN, // initial -> THREE.MOUSE.ROTATE,
    RIGHT: THREE.MOUSE.PAN
  }
  controls.touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_PAN
  }

  const marker = document.getElementById("scaleMarker");
  const scale = document.getElementById("scale");
  const scaleHeight = scale.clientHeight;

  let intermediate = controls.maxDistance / (controls.maxDistance - controls.minDistance) * 100;
  marker.style.transform = `translateY(${((scaleHeight * intermediate.toFixed(2)) / 100)}px)`;


  const DOMElTimeline = [{}];

  /////////////////////////////////////////////////////////////////////////
 //             	 Building the cross particle grid in bg               //
/////////////////////////////////////////////////////////////////////////

  let partVert = new THREE.Geometry();
  let crossStartingZ = -2000
  for ( var i = 1; i < 8; i ++ ) { // vertical loop
    for ( var j = 1; j < 15; j ++ ) { // horizontal loop
      var star = new THREE.Vector3();
      star.x = startingPoint + (yu * 2.6 * j);
      star.y = -350;
      star.z = crossStartingZ + ( i * 500 );
      partVert.vertices.push( star );
    }
  }
  let cross = new THREE.Points( partVert, MAT.crossMaterial );
  cross.position.x = 0;
  cross.position.y = 0;
  cross.position.z = 0;
  scene.add( cross );

  // same in foreground (blurred)
  partVert = new THREE.Geometry();
  crossStartingZ = -2000
  for ( var i = 1; i < 8; i ++ ) { // vertical loop
    for ( var j = 1; j < 15; j ++ ) { // horizontal loop
      var star = new THREE.Vector3();
      star.x = startingPoint + (yu * 2.6 * j);
      star.y = 500;
      star.z = crossStartingZ + ( i * 500 );
      partVert.vertices.push( star );
    }
  }
  cross = new THREE.Points( partVert, MAT.blurredCrossMaterial );
  cross.position.x = 0;
  cross.position.y = 0;
  cross.position.z = 0;
  scene.add( cross );

  /////////////////////////////////////////////////////////////////////////
 //             	      Building timeline elements                      //
/////////////////////////////////////////////////////////////////////////

  // Display year numbers
  var today = new Date();
  var yyyy = today.getFullYear();
  for (var i = 2009; i <= yyyy; i++) {
    var element = document.createElement( 'div' );
    element.className = `year element symbol hide-symbol`;
    element.textContent = i.toString();

    var cssObject = new CSS3DObject( element );
    cssObject.position.x = ((i - 2009) * yu) + xOffset;
    cssObject.position.y = -30;
    cssObject.position.z = 40;
    cssObject.rotation.x = Math.PI/2;
    cssObject.rotation.y = Math.PI;
    cssObject.rotation.z = Math.PI;

    symbols.timeline.push( cssObject );
    // add it to the css scene
    cssScene.add(cssObject);
  }

  // display timeline axis
  {
    var element = document.createElement( 'div' );
    element.className = `yearlong symbol hide-symbol`;
    // element.style.width = ((yyyy - 2009) * yu * 1.1) + xOffset + "px";
    element.style.width = (20 * yu * 1.1) + xOffset + "px";

    var cssObject = new CSS3DObject( element );
    // we reference the same position and rotation
    cssObject.position.x = xOffset;
    cssObject.position.y = 0;
    cssObject.position.z = 0;
    cssObject.rotation.x = Math.PI/2;
    cssObject.rotation.y = Math.PI;
    cssObject.rotation.z = Math.PI;

    symbols.timeline.push( cssObject );
    // add it to the css scene
    cssScene.add(cssObject);
  }

  // Add symbols
  //////////////////////////////////////////
  for (const [prop, value] of Object.entries(projects.symbols)) {
    for ( let i = 0, j = value.length; i < j; i++ ) {
      let el = value[i];

  		let element = document.createElement( 'div' );
  		element.className = `element symbol ${prop === "techno" ? "" : " hide-symbol"}`;
  		// element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

  		let bg = document.createElement( 'div' );
  		bg.className = 'bg';

      // To use Symbol as "Sprite SVG"
      // https://css-tricks.com/svg-symbol-good-choice-icons/
      var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("preserveAspectRatio","xMidYMid meet");
      let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${el.icon}`);
      use.setAttribute('href', `#${el.icon}`);
      icon.appendChild( use );

  		let wrapper = document.createElement( 'div' );
  		wrapper.className = 'name title';
      wrapper.textContent = el.name;

  		bg.appendChild( icon );
  		element.appendChild( bg );
  		element.appendChild( wrapper );

  		let object = new CSS3DObject( element );
      object.position.x = el.position.x;
      object.position.y = el.position.y;
      object.position.z = el.position.z;
      object.rotation.x = -Math.PI/2;
  		cssScene.add( object );

      symbols[prop].push( object );
  	}
  }
  // Add TITLE
  //////////////////////////////////////////
  {
    let element = document.createElement( 'div' );
    element.className = `timeline-title`;
    let title = document.createElement( 'h1' );
    const year = new Date();
    title.textContent = "Portfolio "+year.getFullYear().toString()
    let subtitle = document.createElement( 'h2' );
    subtitle.textContent = "Projects"
    element.appendChild( title );
    element.appendChild( subtitle );
    let object = new CSS3DObject( element );

    object.position.x = -680;
    object.position.z = -600;
    object.position.y = -200;
    object.rotation.x = -Math.PI/2;
    cssScene.add( object );
  }

     /////////////////////////////////////////////////////////////////////////
   //                   	      Building BOUNDS                           //
  /////////////////////////////////////////////////////////////////////////
  // WARNING - ID - 1
  // TECHNO
  //////////////////////////////////////////
  let jsArr = [2, 3, 5, 15, 16, 17, 18, 19, 20, 23, 25];
  for (var i = 0, j = jsArr.length; i < j; i++) {
    const k = projects.list.find(e => e.id == (jsArr[i] + 1));
    projects.bounds.techno.push({
      start: {...projects.symbols.techno[0].position},
      end: {...k.techno.position}
    })
  }
  let pyArr = [5, 23, 25];
  for (var i = 0, j = pyArr.length; i < j; i++) {
    const k = projects.list.find(e => e.id == (pyArr[i] + 1));
    projects.bounds.techno.push({
      start: {...projects.symbols.techno[1].position},
      end: {...k.techno.position}
    })
  }
  let rorArr = [4, 11];
  for (var i = 0, j = rorArr.length; i < j; i++) {
    const k = projects.list.find(e => e.id == (rorArr[i] + 1));
    projects.bounds.techno.push({
      start: {...projects.symbols.techno[2].position},
      end: {...k.techno.position}
    })
  }
  let phpArr = [0, 1, 3];
  for (var i = 0, j = phpArr.length; i < j; i++) {
    const k = projects.list.find(e => e.id == (phpArr[i] + 1));
    projects.bounds.techno.push({
      start: {...projects.symbols.techno[3].position},
      end: {...k.techno.position}
    })
  }
  // SOFTWARES
  let psArr = [0, 1, 8, 17, 20, 21, 22];
  for (var i = 0, j = psArr.length; i < j; i++) {
    // let k = psArr[i];
    const k = projects.list.find(e => e.id == (psArr[i] + 1));
    projects.bounds.software.push({
      start: {...projects.symbols.software[3].position},
      end: {...k.software.position}
    })
  }
  let inddArr = [0, 1, 8, 17];
  for (var i = 0, j = inddArr.length; i < j; i++) {
    // let k = inddArr[i];
    const k = projects.list.find(e => e.id == (inddArr[i] + 1));
    projects.bounds.software.push({
      start: {...projects.symbols.software[2].position},
      end: {...k.software.position}
    })
  }
  let aiArr = [0, 1, 2, 4, 8, 15, 16, 17, 19];
  for (var i = 0, j = aiArr.length; i < j; i++) {
    // let k = aiArr[i];
    const k = projects.list.find(e => e.id == (aiArr[i] + 1));
    projects.bounds.software.push({
      start: {...projects.symbols.software[0].position},
      end: {...k.software.position}
    })
  }
  let skArr = [16];
  for (var i = 0, j = skArr.length; i < j; i++) {
    // let k = skArr[i];
    const k = projects.list.find(e => e.id == (skArr[i] + 1));
    projects.bounds.software.push({
      start: {...projects.symbols.software[1].position},
      end: {...k.software.position}
    })
  }
  let blArr = [8, 17, 24];
  for (var i = 0, j = blArr.length; i < j; i++) {
    // let k = BlArr[i];
    const k = projects.list.find(e => e.id == (blArr[i] + 1));
    projects.bounds.software.push({
      start: {...projects.symbols.software[4].position},
      end: {...k.software.position}
    })
  }


  // BONDS
  // Largely taken from https://threejs.org/examples/?q=molecu#css3d_molecules
  // I still don't understand the math behind...
  for (const [prop, value] of Object.entries(projects.bounds)) {
  	for ( var i = 0, j = value.length; i < j; i++ ) {
      var tmpVec1 = new THREE.Vector3();
      var tmpVec2 = new THREE.Vector3();
      var tmpVec3 = new THREE.Vector3();
      var tmpVec4 = new THREE.Vector3();
      // var offset = new THREE.Vector3();

      var start = new THREE.Vector3();
      var end = new THREE.Vector3();
      let el = value[i].start
      let elPlus = value[i].end
  		start.x = el.x + 140;
  		start.y = el.y - 10;
  		start.z = el.z;

      end.x = elPlus.x + 200;
      // end.x = elPlus.x + (elPlus.x > el.x ? -100 : 100);
  		end.y = elPlus.y - 10;
  		end.z = elPlus.z + 35; // -35
  		// end.z = elPlus.z + (elPlus.z > el.z ? -35 : 35); // -35

  		// start.multiplyScalar( 75 );
  		// end.multiplyScalar( 75 );

  		tmpVec1.subVectors( end, start );
  		var bondLength = tmpVec1.length(); // - 50

      var bond = document.createElement( 'div' );
  		bond.className = "bond hide-bounds";
      bond.setAttribute("data-symbol", prop);
  		bond.style.height = bondLength + "px";

  		var object = new CSS3DObject( bond );
  		object.position.copy( start );
  		object.position.lerp( end, 0.5 );
      object.element.style.backgroundColor = `hsl(${ Math.random() * (215 - 185) + 185 }, 77%, 41%)`;

  		// object.userData.bondLengthShort = bondLength + "px";
  		// object.userData.bondLengthFull = ( bondLength + 55 ) + "px";

      var axis = tmpVec2.set( 0, 1, 0 ).cross( tmpVec1 );
      var radians = Math.acos( tmpVec3.set( 0, 1, 0 ).dot( tmpVec4.copy( tmpVec1 ).normalize() ) );

  		var objMatrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );
  		object.matrix = objMatrix;
  		object.quaternion.setFromRotationMatrix( object.matrix );

  		object.matrixAutoUpdate = false;
  		object.updateMatrix();

      object.rotation.z = Math.PI / 2;
      object.rotation.y = Math.PI / 2;

      bounds[prop].push( {obj: object} );

  		cssScene.add( object );


      var bond = document.createElement( 'div' );
  		bond.className = "bond hide-bounds";
      bond.setAttribute("data-symbol", prop);
  		bond.style.height = bondLength + "px";

  		var joint = new THREE.Object3D( bond );
  		joint.position.copy( start );
  		joint.position.lerp( end, 0.5 );

  		joint.matrix.copy( objMatrix );
  		joint.quaternion.setFromRotationMatrix( joint.matrix );

  		joint.matrixAutoUpdate = false;
  		joint.updateMatrix();

  		var object = new CSS3DObject( bond );
  		object.rotation.y = Math.PI / 2;
      object.element.style.backgroundColor = `hsl(${ Math.random() * (214 - 200) + 200 }), 77%, 41%`;
      // hsl(206, 77%, 41%)

  		object.matrixAutoUpdate = false;
  		object.updateMatrix();


  		// object.userData.bondLengthShort = bondLength + "px";
  		// object.userData.bondLengthFull = ( bondLength + 55 ) + "px";

  		object.userData.joint = joint;

  		joint.add( object );
      bounds[prop].push( {obj: object} );

  		cssScene.add( joint );
    }
  }


  // Add projects
  for ( let i = 0, j = sortedTimeline.length; i < j; i++ ) {
    let el = sortedTimeline[i];

		let element = document.createElement( 'div' );
		element.className = `element detail node`;
    if (el.ignore){
      element.classList.add("ignore");
    }

    element.setAttribute("data-id", el.id);
		// element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

		let wrapper = document.createElement( 'div' );
		wrapper.className = `name into-detail corners node ${el.major ? "major" : "minor"}`;
    wrapper.setAttribute("data-id", el.id);

		let content = document.createElement( 'div' );
		content.className = `desc node job-${el.cat}`;
    content.textContent = el.name;
    content.setAttribute("data-id", el.id);

    let lengthBar = document.createElement( 'div' );
		lengthBar.className = 'length-bar';
    if(el.timeline && el.timeline.len) {
      // ((i - 2009) * yu) + xOffset
      lengthBar.style.width = (el.timeline.len * yu * 1.15) + "px";
    }

    let techno = document.createElement( 'div' );
    if (el.techno && el.techno.list) {
  		techno.className = 'techno node';
      techno.setAttribute("data-id", el.id);
      // if (settings.isDebugMode) {
      //   techno.textContent = el.techno.position.x + " / " + el.techno.position.z;
      // } else {
        // techno.innerHTML = el.techno.list.join(", ") + "<br/>" + el.summary;
        techno.innerHTML = el.summary;
      // }
    }

		wrapper.appendChild( lengthBar );
		wrapper.appendChild( content );
    if (el.techno && el.techno.list) {
  		wrapper.appendChild( techno );
    }
		element.appendChild( wrapper );


		var object = new CSS3DObject( element );
		object.position.x = Math.random() * 600 - 600;
		object.position.y = Math.random() * 3000;
		object.position.z = Math.random() * 4000 - 2000;
    object.rotation.x = -Math.PI/2;
		cssScene.add( object );

    let na = false;
    if (el.techno && el.techno["n/a"] && el.techno["n/a"] === true) na = true

		// objects.push( object );
    objects.push( object );

    var object = new THREE.Object3D();
    if (el.techno && !el.techno["n/a"] && el.techno.position) {
      object.position.x = el.techno.position.x;
      object.position.y = el.techno.position.y;
      object.position.z = el.techno.position.z;
    }  else {
      object.position.x = 0;
      object.position.z = 0;
    }
    object.rotation.x = -Math.PI/2;

    targets.techno.push( {"n/a": na, obj: object} );
	}

  // TIMELINE
  var vector = new THREE.Vector3();

  let spanOfPreviousJob = 0;
  let zCounter = 0;
  for ( var i = 0, l = objects.length; i < l; i ++ ) {
    let el = sortedTimeline[i];
    // if(el.timeline.type === "event") {
    //   continue;
    // }
    let na = false
    let startingPoint = ((el.timeline.startingYear - 2009) * yu) + xOffset;
    let len = el.timeline.hasOwnProperty("len") ? el.timeline.len : 1;

    if (zCounter > 900){
      zCounter = 150;
    }

    // let zPos = 0;
    let yPos = 0;
    if ( (len + startingPoint) < (spanOfPreviousJob ) ){
      zOffset += 300;
    } else {
      zOffset = 60;
    }
    spanOfPreviousJob = len + startingPoint;
    if (el.timeline.level) zOffset * (el.timeline.level * 20)

    var object = new THREE.Object3D();
    if (el.timeline) {
      if (el.timeline["n/a"] && el.timeline["n/a"] === true) na = true;
      object.position.x = startingPoint;
      object.position.y = Math.random() * 500 - 500;
      object.position.z = zCounter * (i % 2 === 0 ? 1 : -1);
    } else {
      object.position.x = 0;
      object.position.z = 0;
    }
    object.rotation.x = -Math.PI/2;
    targets.timeline.push( {"n/a": na, obj: object} );
    zCounter += 80;

  }

  // SOFTWARE
	for ( var i = 0, l = objects.length; i < l; i ++ ) {
    let el = sortedTimeline[i];
    let na = false
    if (el.software && el.software["n/a"] && el.software["n/a"] === true) na = true;

    if (el.software) {
  		var object = new THREE.Object3D();
      object.position.x = el.software.position.x;
      object.position.y = el.software.position.y;
      object.position.z = el.software.position.z;
    } else {
      object.position.x = 0;
      object.position.z = 0;
    }
    object.rotation.x = -Math.PI/2;
    targets.software.push( {"n/a": na, obj: object} );
	}

  // ALL
  const distNode = 305
  let previousPos = -300
  let previousZ = -500;

	for ( let i = 0, c = 0, l = objects.length; i < l; i ++ ) {
    let el = sortedTimeline[i];
    if (c % 6 === 0){
      previousZ += 210;
      previousPos = -300;
    }

		// var phi = Math.acos( - 1 + ( 2 * i ) / l );
		// var theta = Math.sqrt( l * Math.PI ) * phi;

		var object = new THREE.Object3D();
		// object.position.setFromSphericalCoords( 800, phi, theta );
    if (el.ignore){
      object.position.x = 0;
      object.position.y = 0;
      object.position.z = 0;
    } else {
      object.position.x = previousPos + distNode;
      object.position.y = Math.random() * 150 - 150;
      object.position.z = previousZ;
      c++;
    }

    object.rotation.x = -Math.PI/2;
    // object.lookAt( vector );
    targets.all.push( {"n/a": false, obj: object} );
    // targets.all.push( object );
    if (!el.ignore){
      previousPos = previousPos + distNode;
    }
	}

  // console.log("targets", targets);
  // console.log("symbols", symbols);
  // TEST.testing(scene);

  // stats
  // if (settings.isDebugMode) {
    stats = new Stats();
    stats.showPanel(0);
    canvasStats.appendChild( stats.dom );

    rendererStats	= new TEST.THREEx.RendererStats();
    rendererStats.domElement.style.position   = 'absolute'
    rendererStats.domElement.style.right  = '0px'
    rendererStats.domElement.style.top    = '48px'
    rendererStats.domElement.style.zIndex    = '100'
    canvasStats.appendChild( rendererStats.domElement )

  // }

  // lights
  // var light = new THREE.DirectionalLight( 0xffffff );
  // light.position.set( 1, 1, 1 );
  // scene.add( light );
  // var light = new THREE.DirectionalLight( 0x002288 );
  // light.position.set( - 1, - 1, - 1 );
  // scene.add( light );
  // var light = new THREE.AmbientLight( 0x222222 );
  // scene.add( light );
  window.addEventListener( 'resize', onWindowResize, false );
  // animate();
}


  /////////////////////////////////////////////////////////////////////////
 //                       	 THREE JS LIBS                              //
/////////////////////////////////////////////////////////////////////////

export function animate() {
  if ( !settings.isPaused ){
    requestAnimationFrame( animate );
    TWEEN.update();
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    // var newX = this.target.x + pan.x;
    // var newY = this.target.y + `pan.y;
    if (settings.isDebugMode) {
      stats.update();
      rendererStats.update(renderer);
    }
    render();
  }
}
export function render() {
  renderer.render( scene, camera );
  rendererCSS.render( cssScene, camera );
}

export function playAnimation() {
  settings.isPaused = false;
  canvasCssEl.style.filter = "none";
  animate();
}
export function pauseAnimation() {
  settings.isPaused = true;
  canvasCssEl.style.filter = "blur(10px)";
  animate();
}

export function transform( targets, duration ) {

  if (settings.prevFilter === settings.currFilter){
    return null;
  }

	TWEEN.removeAll();

  // Initial call
  // if (settings.prevFilter === null){ }

  function hideAllBounds ()  {
    if (bounds[settings.prevFilter] && bounds[settings.prevFilter].length > 0){
      for ( let i = 0, j = bounds[settings.prevFilter].length; i < j; i++ ) {
        bounds[settings.prevFilter][i].obj.element.classList.add("hide-bounds");
      }
    }
  }

  if (settings.currFilter === "all"){
    hideAllBounds ();
    for ( let i = 0, j = symbols[settings.prevFilter].length; i < j; i++ ) {
      symbols[settings.prevFilter][i].element.classList.add("hide-symbol");
    }
    // let allBounds = [...bounds.techno, ...bounds.software, ...bounds.timeline];
    // for ( let i = 0, j = allBounds.length; i < j; i++ ) {
    //   allBounds[i].obj.element.classList.add("hide-bounds");
    // }
  } else {

    // Display/hide symbols
    ////////////////////////////////////////////////////////
    if (settings.prevFilter !== "all" && settings.prevFilter !== null){
      for ( let i = 0, j = symbols[settings.prevFilter].length; i < j; i++ ) {
        symbols[settings.prevFilter][i].element.classList.add("hide-symbol");
      }
    }
    for ( let i = 0, j = symbols[settings.currFilter].length; i < j; i++ ) {
      if (symbols[settings.currFilter][i].element.classList.contains("hide-symbol")) symbols[settings.currFilter][i].element.classList.remove("hide-symbol");
    }

    // Display/hide bounds
    ////////////////////////////////////////////////////////
    if (settings.prevFilter !== null){
      hideAllBounds();
    }
    // show the new bonds
    if (bounds[settings.currFilter] && bounds[settings.currFilter].length > 0){
      for ( let i = 0, j = bounds[settings.currFilter].length; i < j; i++ ) {
        if (bounds[settings.currFilter][i].obj.element.classList.contains("hide-bounds")) bounds[settings.currFilter][i].obj.element.classList.remove("hide-bounds");
      }
    }
  }

  // Moving objects
	for ( var i = 0; i < objects.length; i++ ) {
		var object = objects[ i ];
		var target = targets[ i ].obj;

    if (settings.prevFilter === "timeline"){
      object.element.classList.remove("timeline");
    }
    if (settings.currFilter === "timeline"){
      object.element.classList.add("timeline");
    }
    if (targets[ i ]["n/a"] === true){
      object.element.classList.add("hide-el");
    } else {
      if (object.element.classList.contains("hide-el")) object.element.classList.remove("hide-el");


  		new TWEEN.Tween( object.position )
  			.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
  			.easing( TWEEN.Easing.Exponential.InOut )
  			.start();

  		new TWEEN.Tween( object.rotation )
  			.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
  			.easing( TWEEN.Easing.Exponential.InOut )
  			.start();
    }
	}

	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( render )
		.start();
}

export function resetCamera (duration ) {
  // TWEEN.removeAll();
	new TWEEN.Tween( camera.position )
		.to( cameraInitialPosition, Math.random() * duration + duration )
		.easing( TWEEN.Easing.Exponential.InOut )
		.start();

	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( render )
		.start();
}

// function buildLine(color, points,  mat = matLine){
//   let geometry = new LineGeometry();
//   let kuler = new THREE.Color( color );
//   let kulers = [kuler.r, kuler.g, kuler.b];
//   for (let i = 3, j = points.length; i<j ;i+=3){
//     kulers = [...kulers, kuler.r, kuler.g, kuler.b];
//   }
//   geometry.setPositions( points ); // previously positions
//   geometry.setColors( kulers );
//   let curveObject = new Line2( geometry, mat );
//   curveObject.computeLineDistances();
//   curveObject.scale.set( 1, 1, 1 );
//   scene.add(curveObject);
// }
