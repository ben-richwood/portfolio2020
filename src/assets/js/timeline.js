import * as THREE from './build/three.module.js';
import { OrbitControls } from './libs/orbis-lite.js';
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';
import { LineMaterial } from './libs/LineMaterial.js';
import { LineGeometry } from './libs/LineGeometry.js';
import { Line2 } from './libs/Line2.js';
import { SVGLoader } from './libs/SVGLoader.js';

import * as MAT from './libs/custom/materialList.js'
import Stats from './libs/stats.module.js'; // for testing only
import * as TEST from './libs/custom/testing.js'

import * as Utilis from './libs/custom/miscellaneous.js'

import projects from "./projects.js";
// import { t0, keyboardMap, zoomModel, objectScene, screenGraphic, container, canvasEl, canvasTimeline, readyToLaunch, playAnimation, pauseAnimation, stats } from './main.js'
import { t0, keyboardMap, zoomModel, objectScene, screenGraphic, container, canvasEl, canvasTimeline, readyToLaunch } from './main_timeline.js'

import { settings } from './components.js'

// import gsap as Tween from "gsap";
import { TWEEN } from './libs/tween.module.min.js'

const timeline = projects.list.filter(e => e.onlyTimeline === true);

export let camera, controls, scene, renderer;
export let cssScene, rendererCSS; // 2nd "canvas", used by CSS3DRenderer to display DOM element in 3D env
const svgLoader = new SVGLoader();

const timelineMaterial = {
  perso: 0x11517F,
  today: 0xff0000,
  study: 0x11517F,
  work: 0x00ffff,
  freelance: 0x8800ff
}

// For timeline
export const matLine = new LineMaterial( {
  color: 0xffffff,
  linewidth: .003, // in pixels
  vertexColors: THREE.VertexColors,
  //resolution:  // to be set by renderer, eventually
  dashed: false
} );

var objects = [];
export var targets = { techno: [], software: [], skills: [], all: []};
export var symbols = { techno: [], software: [], skills: []};



// Variables to build the timeline - easier to tweak
const unit = 20; // unit value for 1 month
const zOffset = 40;
const yu = unit * 12; // yearUnit
const sp = 0 // startingPoint - year 2009
let startingPoint = sp;
const yDepth = -50 // default depth

let stats, rendererStats;

const globalTimeline = document.createElement( 'div' );
globalTimeline.className = "globalTimeline"

var onWindowResize = Utilis.debounce(function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, 80);

export function init() {
  scene = new THREE.Scene();
  cssScene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
  renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvasTimeline, stencil: false, precision: 'mediump', depth: true, preserveDrawingBuffer: true, premultipliedAlpha: false } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  rendererCSS = new CSS3DRenderer();
  rendererCSS.setSize( window.innerWidth, window.innerHeight );
  document.getElementById( 'DOMElTimeline' ).appendChild( rendererCSS.domElement );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 400, 1000, 100 );
  // controls
  controls = new OrbitControls( camera, rendererCSS.domElement );
  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = settings.isDebugMode ? 2500 : 1000;
  controls.minAzimuthAngle = 0;
  controls.maxAzimuthAngle = controls.minAzimuthAngle

  controls.minPolarAngle = 0;
  controls.maxPolarAngle =  Math.PI / 16; // alternative: Math.PI / 16;
  // FOR TESTING
  // controls.maxPolarAngle =  Math.PI / 2;
  // controls.maxAzimuthAngle = Infinity;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN, // initial -> THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN
  }
  // ( url, name, sceneSign, pos, scaleFac, rot = [0,Math.PI/2,0], mat = undefined )
  const timelineHeading = loadSVG( './assets/img/timeline_title.svg', 'timeline', 1, [400, -950, -500], .6, [-Math.PI/2, Math.PI, Math.PI] );

  const DOMElTimeline = [{}];
  let partVert = new THREE.Geometry();
  let crossStartingZ = -1200

  /////////////////////////////////////////////////////////////////////////
 //             	 Building the cross particle grid in bg               //
/////////////////////////////////////////////////////////////////////////
  for ( var i = 1; i < 8; i ++ ) { // vertical loop
    for ( var j = 1; j < 15; j ++ ) { // horizontal loop
      var star = new THREE.Vector3();
      star.x = startingPoint + (yu * 2.6 * j);
      star.y = -650;
      star.z = crossStartingZ + ( i * 500 );
      partVert.vertices.push( star );
    }
  }
  const cross = new THREE.Points( partVert, MAT.crossMaterial );
  cross.position.x = 0;
  cross.position.y = 0;
  cross.position.z = 0;
  scene.add( cross );

  console.log("timeline: ", timeline);

  let previousXpos = 0
  for(let i=0,j=timeline.length;i<j;i++){
    continue;
    let cur = timeline[i];
    let startingPoint = (cur.timeline.startingYear - 2009) * yu;
    let len = cur.hasOwnProperty("len") ? cur.len : 1;

    if(cur.type === "event") {
      continue;
    }

    let branching = [startingPoint, 0,  0];
    let zPos = 0;
    let yPos = 0;
    let randZ = (cur.group === "work" ? 1 : -1) * Math.random() * 10
    if (cur.thread === "second"){
      zPos = zOffset * randZ;
      // yPos = yDepth * (Math.random() * 10 - 5);
      branching = [...branching,
        startingPoint, 0,  zPos,
        startingPoint, yPos, zPos
      ]
    }
    // if (cur.thread === "main") zPos = -1 * (cur.level * 20);
    branching = [...branching, startingPoint + 10, yPos, zPos]

    const divSubContainer = constructDOMEl(cur, 1, [startingPoint, yPos, zPos]);

    DOMElTimeline.push({
      dom:divSubContainer,
      position: [
        startingPoint + (yu * len)
      ],
      rotation:0,
      thread: cur.thread,
      level: 1
    });

    DOMElTimeline[DOMElTimeline.length-1].position.push(yPos, zPos);

    if (cur.hasOwnProperty("children") && cur.children.length > 0){
      cur.children.forEach(function(e){
        console.log("children", e);
        let newStartingPoint = (e.timeline.startingYear - 2009) * yu;
        let subLevel = e.level ? e.level : 2;
        let subDivSubContainer = constructDOMEl(e, subLevel, [newStartingPoint, 0, 0]);

        DOMElTimeline.push({
          dom:subDivSubContainer,
          position: [
            newStartingPoint + (yu * len), 0, 0
          ],
          rotation:0,
          thread: e.thread,
          level: e.level ? e.level : 2
        });
      })
    }

    buildLine(timelineMaterial[cur.group], branching);

    // Add node dot
    let planeGeometry = new THREE.PlaneBufferGeometry( 8, 8 );
    let plane = new THREE.Mesh( planeGeometry, MAT.materialPlane );
    plane.position.x = startingPoint;
    plane.rotation.x = Math.PI/2;

    scene.add( plane );
    previousXpos = startingPoint;
  }


  // buildLine(timelineMaterial.perso, [0, 0, 0, 12 * yu, 0, 0]);

  // create the object3d for each element
  for (var i = 0, j=DOMElTimeline.length; i < j; i++) {
    continue;
    let el = DOMElTimeline[i];
    if (!el.hasOwnProperty("dom")) continue;
    globalTimeline.appendChild(el.dom)

    /*
    var cssObject = new CSS3DObject( el.dom );
    // we reference the same position and rotation
    cssObject.position.x = el.position[0];
    cssObject.position.y = el.position[1];
    cssObject.position.z = el.position[2] + (-2 * (el.level * 20));
    // cssObject.rotation.order = 'YXZ';
    // cssObject.rotation.set(Math.PI/2, Math.PI, Math.PI/2);

    cssObject.rotation.x = Math.PI/2;
    cssObject.rotation.y = Math.PI;
    cssObject.rotation.z = Math.PI;

    // add it to the css scene
    cssScene.add(cssObject);
    */
  }

  // const cssObjectGlobal = new CSS3DObject( globalTimeline );
  // cssObjectGlobal.position.x = 0;
  // cssObjectGlobal.position.y = 0;
  // cssObjectGlobal.position.z = 0;
  // // cssObject.rotation.order = 'YXZ';
  // // cssObject.rotation.set(Math.PI/2, Math.PI, Math.PI/2);
  //
  // cssObjectGlobal.rotation.x = Math.PI/2;
  // cssObjectGlobal.rotation.y = Math.PI;
  // cssObjectGlobal.rotation.z = Math.PI;

  // cssScene.add(cssObjectGlobal)

  // Display year numbers
  for (var i = 2009; i < 2021; i++) {
    continue;
    var element = document.createElement( 'div' );
    element.className = 'year';
    element.textContent = i.toString();

    var cssObject = new CSS3DObject( element );
    // we reference the same position and rotation
    cssObject.position.x = (i - 2009) * yu;
    cssObject.position.y = -50;
    cssObject.position.z = 40;
    cssObject.rotation.x = Math.PI/2;
    cssObject.rotation.y = Math.PI;
    cssObject.rotation.z = Math.PI;
    // add it to the css scene
    cssScene.add(cssObject);
  }

  // Adding line to mark TODAY
  // const matLineDash = new LineMaterial( {
  const matLineDash = new LineMaterial( {
    color: 0xffffff,
    linewidth: .001,
    vertexColors: THREE.VertexColors,
    dashed: true, dashSize: .03, gapSize: 10
    //resolution:  // to be set by renderer, eventually
  } );
  // buildLine(0xaaaaaa, [(2020 - 2009) * yu, 0, -200, (2020 - 2009) * yu, 0, 200], matLineDash);


  /////////////////////////////////////////////////////////////////////////
 //             	        WHAT's NEXT ELEMENT                           //
/////////////////////////////////////////////////////////////////////////
  // creating what's next
  /*
  const WNContainer = document.createElement( 'div' );
  WNContainer.className = "wNContainer";
  const blinkingDot = document.createElement( 'div' );
  blinkingDot.className = "blinkingDot";

  const divSubContainer = document.createElement( 'div' );
  divSubContainer.className = "detail";
  var element = document.createElement( 'div' );
  element.className = 'into-detail';

  var desc = document.createElement( 'div' );
  desc.className = 'desc';
  desc.textContent = "What's next";

  element.appendChild( desc );
  divSubContainer.appendChild( element );
  WNContainer.appendChild( blinkingDot );
  WNContainer.appendChild( divSubContainer );
  */

  // var cssObjectWN = new CSS3DObject( WNContainer );
  // cssObjectWN.position.x = 12 * yu; // 2021
  // cssObjectWN.position.y = 0;
  // cssObjectWN.position.z = 0;
  // cssObjectWN.rotation.x = Math.PI/2;
  // cssObjectWN.rotation.y = Math.PI;
  // cssObjectWN.rotation.z = Math.PI;
  // add it to the css scene
  // cssScene.add(cssObjectWN);
  // buildLine(timelineMaterial.perso, [11 * yu, 0, 0, 12 * yu, 0, 0], matLineDash);


  for (const [prop, value] of Object.entries(projects.symbols)) {
    for ( let i = 0, j = value.length; i < j; i++ ) {
      let el = value[i];

  		let element = document.createElement( 'div' );
  		element.className = `element symbol ${prop === "techno" ? "" : " hide-symbol"}`;
  		// element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

  		let bg = document.createElement( 'div' );
  		bg.className = 'bg';

      let icon = document.createElement( 'img' );
  		icon.src = `assets/img/techno-icons/${el.icon}`;
  		icon.alt = name + " icon";

  		let wrapper = document.createElement( 'div' );
  		wrapper.className = 'name title';

  		// wrapper.textContent = el.name;
  		wrapper.innerHTML = `${el.name}<br/>${el.position.x} / ${el.position.z}`;
  		// element.appendChild( content );
  		bg.appendChild( icon );
  		element.appendChild( bg );
  		element.appendChild( wrapper );


  		let object = new CSS3DObject( element );
      object.position.x = el.position.x;
      object.position.z = el.position.z;
      object.rotation.x = -Math.PI/2;
  		cssScene.add( object );

      symbols[prop].push( object );
  	}
  }

  console.log("symbols", symbols);


  for ( let i = 0, j = projects.list.length; i < j; i++ ) {
    let el = projects.list[i];

		let element = document.createElement( 'div' );
		element.className = 'element detail';
		// element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

		let wrapper = document.createElement( 'div' );
		wrapper.className = 'name into-detail';

		let content = document.createElement( 'div' );
		content.className = 'desc';
    content.textContent = el.name;

    let techno = document.createElement( 'div' );
    if (el.techno && el.techno.list) {
  		techno.className = 'techno';
      // techno.textContent = el.techno.list.join(", ");
      techno.textContent = el.techno.position.x + " / " + el.techno.position.z;
    }

		wrapper.appendChild( content );
    if (el.techno && el.techno.list) {
  		wrapper.appendChild( techno );
    }
		element.appendChild( wrapper );


		var object = new CSS3DObject( element );
		object.position.x = Math.random() * 600 - 600;
		object.position.y = Math.random() * 4000 - 2000;
		object.position.z = Math.random() * 4000 - 2000;
    object.rotation.x = -Math.PI/2;
		cssScene.add( object );

		objects.push( object );

    var object = new THREE.Object3D();
    if (el.techno) {
      object.position.x = el.techno.position.x;
      object.position.z = el.techno.position.z;
    }  else {
      object.position.x = 0;
      object.position.z = 0;
    }
    object.rotation.x = -Math.PI/2;
    targets.techno.push( object );
	}

  // SOFTWARE
  var vector = new THREE.Vector3();

	for ( var i = 0, l = objects.length; i < l; i ++ ) {
    let el = projects.list[i];

		// var phi = Math.acos( - 1 + ( 2 * i ) / l );
		// var theta = Math.sqrt( l * Math.PI ) * phi;

    if (el.software) {
  		var object = new THREE.Object3D();
  		// object.position.setFromSphericalCoords( 800, phi, theta );
  		// vector.copy( object.position ).multiplyScalar( 2 );
      object.position.x = el.software.position.x;
      object.position.z = el.software.position.z;
    } else {
      object.position.x = 0;
      object.position.z = 0;
    }
    object.rotation.x = -Math.PI/2;
    // object.lookAt( vector );
    targets.software.push( object );
	}

  // ALL
  var vector = new THREE.Vector3();

  const distNode = 200
  let previousPos = -300
  let previousZ = -400;

  console.log("objects.length", objects.length, objects.length % 6);
	for ( var i = 0, l = objects.length; i < l; i ++ ) {
    let el = projects.list[i];
    if (i % 6 === 0){
      previousZ += 130;
      previousPos = -300;
    }

		// var phi = Math.acos( - 1 + ( 2 * i ) / l );
		// var theta = Math.sqrt( l * Math.PI ) * phi;

		var object = new THREE.Object3D();
		// object.position.setFromSphericalCoords( 800, phi, theta );
		// vector.copy( object.position ).multiplyScalar( 2 );
    object.position.x = previousPos + distNode;
    object.position.z = previousZ;

    object.rotation.x = -Math.PI/2;
    // object.lookAt( vector );
    targets.all.push( object );

    previousPos = previousPos + distNode;
	}

  // TIMELINE
  var vector = new THREE.Vector3();

	for ( var i = 0, l = objects.length; i < l; i ++ ) {
    let el = projects.list[i];

		var object = new THREE.Object3D();
    if (el.timeline) {
      object.position.x = (el.timeline.startingYear - 2009) * yu;
  		object.position.z = (Math.random() * 400) - 200;
    } else {
      object.position.x = 0;
      object.position.z = 0;
    }

    object.rotation.x = -Math.PI/2;
		targets.software.push( object );
	}

  console.log("targets", targets);
  TEST.testing(scene);

  // stats
  if (settings.isDebugMode) {
    stats = new Stats();
    document.getElementById("canvasScene").appendChild( stats.dom );

    rendererStats	= new TEST.THREEx.RendererStats();
    rendererStats.domElement.style.position   = 'absolute'
    rendererStats.domElement.style.right  = '0px'
    rendererStats.domElement.style.top    = '48px'
    rendererStats.domElement.style.zIndex    = '100'
    document.getElementById("canvasScene").appendChild( rendererStats.domElement )

  }



  // lights
  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );
  var light = new THREE.DirectionalLight( 0x002288 );
  light.position.set( - 1, - 1, - 1 );
  scene.add( light );
  var light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );

  transform( targets.techno, 2000 );
  //
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
    if (settings.isDebugMode) {
      stats.update();
      rendererStats.update(renderer);
    }
    render();
  }
}
export function render() {
  // renderer.render( scene, camera );
  rendererCSS.render( cssScene, camera );
}

export function playAnimation() {
  settings.isPaused = false;
  canvasEl.style.filter = "none";
  animate();
}
export function pauseAnimation() {
  settings.isPaused = true;
  canvasEl.style.filter = "blur(10px)";
  animate();
}

export function transform( targets, duration ) {
	TWEEN.removeAll();
  if (settings.currFilter !== "all"){
    if (settings.prevFilter != settings.currFilter){
      for ( let i = 0, j = symbols[settings.prevFilter].length; i < j; i++ ) {
        symbols[settings.prevFilter][i].element.classList.add("hide-symbol");
      }
      for ( let i = 0, j = symbols[settings.currFilter].length; i < j; i++ ) {
        if (symbols[settings.currFilter][i].element.classList.contains("hide-symbol")) symbols[settings.currFilter][i].element.classList.remove("hide-symbol");
      }
    }
  }
	for ( var i = 0; i < objects.length; i++ ) {
		var object = objects[ i ];
		var target = targets[ i ];

		new TWEEN.Tween( object.position )
			.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

		new TWEEN.Tween( object.rotation )
			.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();
	}
	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( render )
		.start();
}

function loadSVG ( url, name, sceneSign, pos, scaleFac, rot = [0,Math.PI/2,0], mat = undefined ) {
  svgLoader.load( url, function ( data ) {
    var paths = data.paths;
    var group = new THREE.Group();
    group.scale.multiplyScalar( scaleFac );
    group.position.set(pos[0], pos[1], pos[2]);
    // group.position.x = - 70;
    // group.position.y = 70;
    // group.scale.x = scaleFac;
    // group.scale.y = scaleFac;
    // group.scale.z = scaleFac;
    // group.scale.set(scaleFac,scaleFac,scaleFac)
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
    return group;
  } );
}

function buildLine(color, points,  mat = matLine){
  let geometry = new LineGeometry();
  let kuler = new THREE.Color( color );
  let kulers = [kuler.r, kuler.g, kuler.b];
  for (let i = 3, j = points.length; i<j ;i+=3){
    kulers = [...kulers, kuler.r, kuler.g, kuler.b];
  }
  geometry.setPositions( points ); // previously positions
  geometry.setColors( kulers );
  let curveObject = new Line2( geometry, mat );
  curveObject.computeLineDistances();
  curveObject.scale.set( 1, 1, 1 );
  scene.add(curveObject);
}

function constructDOMEl (el, level, pos) {
  let len = el.hasOwnProperty("len") ? el.len : 1;
  const divSubContainer = document.createElement( 'div' );
  divSubContainer.className = `${el.thread === "main" ? "main-thread" : ""} detail`;
  if (el.thread === "main") {
    divSubContainer.style.cssText = `left: ${pos[0]}px; top: ${-1 * level * 40}px;`;
  } else {
    // let offset = el.group === "work" ? -1 : 1;
    let offset = -1;
    divSubContainer.style.cssText = `left: ${pos[0] + 10}px; top: ${pos[2] + (offset * 20)}px; transform: translate3D(0, 0, ${pos[1]})`;
  }

  var element = document.createElement( 'div' );
  element.className = 'into-detail';

  var desc = document.createElement( 'div' );
  desc.className = 'desc';
  desc.textContent = el.name
  desc.style.width = `calc(${len * yu}px - .5rem)`;

  element.appendChild( desc );
  divSubContainer.appendChild( element );

  return divSubContainer;
}