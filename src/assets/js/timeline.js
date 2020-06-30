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

// const svgLoader = new SVGLoader();

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
const sp = -2400 // startingPoint - year 2009
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
  camera.position.set( -1500, 1770, 327 );
  camera.position.x = -1500;
  camera.position.y = 1770;
  camera.position.z = 327;
  camera.lookAt(new THREE.Vector3(600,0,327));
  // controls
  controls = new OrbitControls( camera, rendererCSS.domElement );
  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  // controls.maxDistance = settings.isDebugMode ? 2500 : 1000;
  controls.maxDistance = 2000;
  controls.minAzimuthAngle = 0;
  controls.maxAzimuthAngle = controls.minAzimuthAngle

  controls.minPolarAngle = 0;
  controls.maxPolarAngle =  Math.PI / 12; // alternative: Math.PI / 16;
  // FOR TESTING
  // controls.maxPolarAngle =  Math.PI / 2;
  // controls.maxAzimuthAngle = Infinity;
  controls.mouseButtons = {
    // LEFT: THREE.MOUSE.PAN, // initial -> THREE.MOUSE.ROTATE,
    LEFT: null, // Keep it for click
    // MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN
  }
  // loadSVG( url, name, sceneSign, pos, scaleFac, rot = [0,Math.PI/2,0], mat = undefined )
  // const timelineHeading = loadSVG( './assets/img/timeline_title.svg', 'timeline', 1, [400, -950, -500], .6, [-Math.PI/2, Math.PI, Math.PI] );

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
  const cross = new THREE.Points( partVert, MAT.crossMaterial );
  cross.position.x = 0;
  cross.position.y = 0;
  cross.position.z = 0;
  scene.add( cross );


  /////////////////////////////////////////////////////////////////////////
 //             	            Building timeline                         //
/////////////////////////////////////////////////////////////////////////
/*
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
  */

  /////////////////////////////////////////////////////////////////////////
 //             	      Building bonds between nodes                    //
/////////////////////////////////////////////////////////////////////////

{
  // function buildLine(color, points,  mat = matLine)
  let branching = [
    600, 1, 60,
    800, 0, -140
  ]
  // buildLine(timelineMaterial.perso, branching);
}

  //time Line
  // buildLine(timelineMaterial.perso, [0, 0, 0, 12 * yu, 0, 0]);

  buildLine(timelineMaterial.perso, [0, 0, -800, 0, 0, 800]);

  // create the object3d for each project
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

  		// if (settings.isDebugMode) {
      //   wrapper.innerHTML = `${el.name}<br/>${el.position.x} / ${el.position.z}`;
      // } else {
        wrapper.textContent = el.name;
      // }

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

  {
    let element = document.createElement( 'div' );
    element.className = `timeline-title`;
    let title = document.createElement( 'h1' );
    title.textContent = "Portfolio"
    let subtitle = document.createElement( 'h2' );
    subtitle.textContent = "Projects"
    element.appendChild( title );
    element.appendChild( subtitle );
    let object = new CSS3DObject( element );

    object.position.x = -480;
    object.position.z = -600;
    object.position.y = 1;
    object.rotation.x = -Math.PI/2;
    cssScene.add( object );
  }

  let jsArr = [2, 3, 5, 15, 16, 18, 19, 20];
  for (var i = 0, j = jsArr.length; i < j; i++) {
    let k = jsArr[i];
    projects.bounds.techno.push({
      start: {...projects.symbols.techno[0].position},
      end: {...projects.list[k].techno.position}
    })
  }
  let pyArr = [5];
  for (var i = 0, j = pyArr.length; i < j; i++) {
    let k = pyArr[i];
    projects.bounds.techno.push({
      start: {...projects.symbols.techno[1].position},
      end: {...projects.list[k].techno.position}
    })
  }
  let rorArr = [4, 11, 12];
  for (var i = 0, j = rorArr.length; i < j; i++) {
    let k = rorArr[i];
    projects.bounds.techno.push({
      start: {...projects.symbols.techno[2].position},
      end: {...projects.list[k].techno.position}
    })
  }
  let phpArr = [0, 1, 3];
  for (var i = 0, j = phpArr.length; i < j; i++) {
    let k = phpArr[i];
    projects.bounds.techno.push({
      start: {...projects.symbols.techno[3].position},
      end: {...projects.list[k].techno.position}
    })
  }

  console.log("projects.bounds", projects.bounds);
  // BONDS
	for ( var i = 0, j = projects.bounds.techno.length; i < j; i++ ) {
    var tmpVec1 = new THREE.Vector3();
    var tmpVec2 = new THREE.Vector3();
    var tmpVec3 = new THREE.Vector3();
    var tmpVec4 = new THREE.Vector3();
    // var offset = new THREE.Vector3();

    var start = new THREE.Vector3();
    var end = new THREE.Vector3();
    let el = projects.bounds.techno[i].start
    let elPlus = projects.bounds.techno[i].end
		start.x = el.x + 120;
		start.y = el.y - 10;
		start.z = el.z;

    end.x = elPlus.x + 100;
		end.y = elPlus.y - 10;
		end.z = elPlus.z - 35;

		// start.multiplyScalar( 75 );
		// end.multiplyScalar( 75 );

		tmpVec1.subVectors( end, start );
		var bondLength = tmpVec1.length(); // - 50

    var bond = document.createElement( 'div' );
		bond.className = "bond";
		bond.style.height = bondLength + "px";

		var object = new CSS3DObject( bond );
		object.position.copy( start );
		object.position.lerp( end, 0.5 );

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

		cssScene.add( object );

		// objects.push( object );

    var bond = document.createElement( 'div' );
		bond.className = "bond";
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

		object.matrixAutoUpdate = false;
		object.updateMatrix();

		// object.userData.bondLengthShort = bondLength + "px";
		// object.userData.bondLengthFull = ( bondLength + 55 ) + "px";

		object.userData.joint = joint;

		joint.add( object );
		cssScene.add( joint );

		// objects.push( object );
    }



  for ( let i = 0, j = projects.list.length; i < j; i++ ) {
    let el = projects.list[i];

		let element = document.createElement( 'div' );
		element.className = 'element detail node';
    element.setAttribute("data-id", el.id);
		// element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

		let wrapper = document.createElement( 'div' );
		wrapper.className = 'name into-detail node';
    wrapper.setAttribute("data-id", el.id);

		let content = document.createElement( 'div' );
		content.className = 'desc node';
    content.textContent = el.name;
    content.setAttribute("data-id", el.id);

    let techno = document.createElement( 'div' );
    if (el.techno && el.techno.list) {
  		techno.className = 'techno';
      // if (settings.isDebugMode) {
      //   techno.textContent = el.techno.position.x + " / " + el.techno.position.z;
      // } else {
        techno.innerHTML = el.techno.list.join(", ") + "<br/>" + el.summary;
      // }
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

    let na = false;
    if (el.techno && el.techno["n/a"] && el.techno["n/a"] === true) na = true

		// objects.push( object );
    objects.push( object );

    var object = new THREE.Object3D();
    if (el.techno && !el.techno["n/a"] && el.techno.position) {
      object.position.x = el.techno.position.x;
      object.position.z = el.techno.position.z;
    }  else {
      object.position.x = 0;
      object.position.z = 0;
    }
    object.rotation.x = -Math.PI/2;

    targets.techno.push( {"n/a": na, obj: object} );
	}
  console.log(targets);

  // SOFTWARE
  var vector = new THREE.Vector3();

	for ( var i = 0, l = objects.length; i < l; i ++ ) {
    let el = projects.list[i];
    let na = false
    if (el.software && el.software["n/a"] && el.software["n/a"] === true) na = true;

    if (el.software) {
  		var object = new THREE.Object3D();
      object.position.x = el.software.position.x;
      object.position.z = el.software.position.z;
    } else {
      object.position.x = 0;
      object.position.z = 0;
    }
    object.rotation.x = -Math.PI/2;
    // object.lookAt( vector );
    // targets.software.push( object );
    targets.software.push( {"n/a": na, obj: object} );
	}

  // ALL
  var vector = new THREE.Vector3();

  const distNode = 235
  let previousPos = -300
  let previousZ = -400;

  console.log("objects.length", objects.length);
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
    targets.all.push( {"n/a": false, obj: object} );
    // targets.all.push( object );

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
  renderer.render( scene, camera );
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

  console.log(settings.currFilter, targets.length, objects.length);
  console.log(targets);

	TWEEN.removeAll();
  if (settings.currFilter !== "all"){
    if (settings.prevFilter != settings.currFilter){
      if (settings.prevFilter !== "all"){
        for ( let i = 0, j = symbols[settings.prevFilter].length; i < j; i++ ) {
          symbols[settings.prevFilter][i].element.classList.add("hide-symbol");
        }
      }
      for ( let i = 0, j = symbols[settings.currFilter].length; i < j; i++ ) {
        if (symbols[settings.currFilter][i].element.classList.contains("hide-symbol")) symbols[settings.currFilter][i].element.classList.remove("hide-symbol");
      }
    }
  } else {
    for ( let i = 0, j = symbols[settings.prevFilter].length; i < j; i++ ) {
      symbols[settings.prevFilter][i].element.classList.add("hide-symbol");
    }
  }
	for ( var i = 0; i < objects.length; i++ ) {
		var object = objects[ i ];
		var target = targets[ i ].obj;

    if (targets[ i ]["n/a"] === true){
      object.element.classList.add("hide-el");
    } else {
      // console.log("object", object);
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