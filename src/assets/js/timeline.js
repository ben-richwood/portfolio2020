import * as THREE from "three";
// import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
// custom Orbit Control
import { OrbitControls } from './libs/orbis-lite.js';
// import { OrbitControls } from './libs/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';
// import { LineMaterial } from './libs/LineMaterial.js';

import * as MAT from './libs/custom/materialList.js'
import Stats from './libs/stats.module.js'; // for testing only
import * as TEST from './libs/custom/testing.js'
import { debounce } from './libs/custom/miscellaneous.js'
import { PROJECTS } from "./projects.js";
import { CAT } from "./constants.js";
import _ from 'lodash';
import store from './store/index.js';

import TWEEN from '@tweenjs/tween.js'

var sortedTimeline = _.cloneDeep(PROJECTS.list).filter(e => {
	if (!e.hasOwnProperty("ignore") || e.ignore !== true) return e
});

// Variables to build the timeline - easier to tweak
const unit = 20; // unit value for 1 month
let zOffset = 40;
const yu = unit * 12; // yearUnit
const sp = -2400 // startingPoint - year 2009
let startingPoint = sp;
let xOffset = -1000
const yDepth = -50 // default depth

// used to offset the elements during the animation
const X_OFFSET = 180;
const Z_OFFSET = 40;
const X_OFFSET_SYMBOL = 100;
const Z_OFFSET_SYMBOL = 20;

const UpdateMatrix = function () {

	const position = new THREE.Vector3();
	const rotation = new THREE.Euler();
	const quaternion = new THREE.Quaternion();
	const scale = new THREE.Vector3();

	return function ( matrix, pos ) {

		position.x = pos.x;
		position.y = pos.y;
		position.z = pos.z;

		rotation.x = -Math.PI/2;
		rotation.y = 0;
		rotation.z = 0;
		quaternion.setFromEuler( rotation );
		scale.x = scale.y = scale.z = 1;
		// scale.x = scale.y = scale.z = Math.random() * 1;
		matrix.compose( position, quaternion, scale );

	};
}();

const randomizeMatrix = function () {

	const position = new THREE.Vector3();
	const rotation = new THREE.Euler();
	const quaternion = new THREE.Quaternion();
	const scale = new THREE.Vector3();

	return function ( matrix ) {

		position.x = Math.random() * 40 - 20;
		position.y = Math.random() * 40 - 20;
		position.z = Math.random() * 40 - 20;

		rotation.x = Math.random() * 2 * Math.PI;
		rotation.y = Math.random() * 2 * Math.PI;
		rotation.z = Math.random() * 2 * Math.PI;

		quaternion.setFromEuler( rotation );

		scale.x = scale.y = scale.z = Math.random() * 1;

		matrix.compose( position, quaternion, scale );

	};

}();

/**
 * Singleton design pattern, to initiate only one Timeline
 */
export const SingletonTimeline = (function () {
    var instance;

    function createInstance() {
      var object = new Timeline();
      return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export class Timeline {

  constructor() {
		this.geoPosition = new THREE.Vector3();
		this.geoRotation = new THREE.Euler();
		this.geoQuaternion = new THREE.Quaternion();
		this.geoScale = new THREE.Vector3();
		this.geoScale.x = this.geoScale.y = this.geoScale.z = 1;
		this.matrix = null;


    this.objects = []; // all the project object of the scene
    this.targets = { techno: [], software: [], skills: [], all: [], timeline: []};
    this.symbols = { techno: [], software: [], skills: [], timeline: []};
    this.bounds = { techno: [], software: [], timeline: []};

    // this.settings = store.state.settings
    this.canvasTimeline = document.getElementById('timeline');
    this.canvasStats = document.getElementById('canvasStats');
    this.canvasCssEl = document.getElementById('DOMElTimeline');

    this.cameraInitialPosition = { x: 500, y: 1770, z: 327 }

    let winW = window.innerWidth;
    let winH = window.innerHeight;

    this.scene = new THREE.Scene();
    this.cssScene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xcccccc );
    // scene.background = null;
    this.renderer = new THREE.WebGLRenderer( { antialias: true, canvas: this.canvasTimeline, stencil: false, precision: 'mediump', depth: true, preserveDrawingBuffer: true, premultipliedAlpha: false, alpha: true } );
    this.renderer.setClearColor( 0x000000, 0 ); // default
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( winW, winH );
		this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.stats = null;

    this.rendererCSS = new CSS3DRenderer(); // 2nd "canvas", used by CSS3DRenderer to display DOM element in 3D env
    this.rendererCSS.setSize( winW, winH );
    this.canvasCssEl.appendChild( this.rendererCSS.domElement );

    this.camera = new THREE.PerspectiveCamera( 45, winW / winH, 1, 10000 );
    this.camera.position.x = this.cameraInitialPosition.x;
    this.camera.position.y = this.cameraInitialPosition.y;
    this.camera.position.z = this.cameraInitialPosition.z;
    // camera.lookAt(new THREE.Vector3(600,0,327));
    // controls
    this.controls = new OrbitControls( this.camera, this.rendererCSS.domElement, store.state.settings );
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = store.state.settings.isMobile ? 300 : 600;
    this.controls.maxDistance = store.state.settings.isMobile ? 2800 : 2000;
    // controls.maxDistance = 2000;
    this.controls.minAzimuthAngle = 0;
    this.controls.maxAzimuthAngle = this.controls.minAzimuthAngle;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;

    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle =  Math.PI / 12; // alternative: Math.PI / 16;
    // FOR TESTING
    // controls.maxPolarAngle =  Math.PI / 2;
    // controls.maxAzimuthAngle = Infinity;
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN, // initial -> THREE.MOUSE.ROTATE,
      RIGHT: THREE.MOUSE.PAN
    }
    this.controls.touches = {
      ONE: THREE.TOUCH.PAN,
      TWO: THREE.TOUCH.DOLLY_PAN
    }

    const marker = document.getElementById("scaleMarker");
    const scale = document.getElementById("scale");
    let scaleHeight, intermediate;
    if(scale) {
      scaleHeight = scale.clientHeight;
      intermediate = this.controls.maxDistance / (this.controls.maxDistance - this.controls.minDistance) * 100;
      marker.style.transform = `translateY(${((scaleHeight * intermediate.toFixed(2)) / 100)}px)`;
    }

    // this.#build3dFloatingElements()
    this.#buildGroundRectangles()

    this.#buildingObjects()
    this.#buildingTimelineElements()
    this.#buildingSymbols()
    this.#buildingBounds()
    if(store.state.settings.debug) this.#stats(store.state.settings.debug)

    window.addEventListener( 'resize', this.#onWindowResize, false );
  }

  #build3dFloatingElements() {
    /////////////////////////////////////////////////////////////////////////
   //             	 Building the cross particle grid in bg               //
  /////////////////////////////////////////////////////////////////////////

    let partVert = new THREE.BufferGeometry();
    // const positions = new Float32Array( 15 * 8 * 3 );
    let crossStartingZ = -2000

    const AMOUNTX = 10
    const AMOUNTY = 15
    const SEPARATION = 700
    const numParticles = AMOUNTX * AMOUNTY * 5;
    const positions = new Float32Array( numParticles * 3 );
    let i = 0;
    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
      for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
        positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
        positions[ i + 1 ] = -350; // y
        positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z
        i += 3;
      }
    }

    partVert.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    // if (this.settings.debug){
    // }
      // Display the center of the scene
      let cross = new THREE.Points( partVert, MAT.crossMaterial );
      cross.position.x = 0;
      cross.position.y = 0;
      cross.position.z = 0;
      this.scene.add( cross );

    i = 0
    const newPositions = new Float32Array( numParticles * 3 );
    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
      for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
        newPositions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
        newPositions[ i + 1 ] = 350; // y
        newPositions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z
        i += 3;
      }
    }
    let newPartVert = new THREE.BufferGeometry();
    newPartVert.setAttribute( 'position', new THREE.BufferAttribute( newPositions, 3 ) );
    let newCross = new THREE.Points( newPartVert, MAT.blurredCrossMaterial );
    newCross.position.x = 0;
    newCross.position.y = 0;
    newCross.position.z = 0;
    this.scene.add( newCross );
  }

  #buildGroundRectangles(){
    const sqLength = 20;
    const sqHeight = 10;
		/*
    const squareShape = new THREE.Shape()
			.moveTo( 0, 0 )
			.lineTo( 0, sqHeight )
			.lineTo( sqLength, sqHeight )
			.lineTo( sqLength, 0 )
			.lineTo( 0, 0 );

		// flat shape
		const geometry = new THREE.ShapeGeometry( squareShape );
		// geometry.computeVertexNormals();
		*/

		const geometry = new THREE.BufferGeometry();
		// vertices because each vertex needs to appear once per triangle.
		const vertices = new Float32Array( [
			-20.0, -20.0,  20.0,
			 20.0, -20.0,  20.0,
			 20.0,  20.0,  20.0,

			 20.0,  20.0,  20.0,
			-20.0,  20.0,  20.0,
			-20.0, -20.0,  20.0
		] );

		// itemSize = 3 because there are 3 values (components) per vertex
		geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    const AMOUNTX = 50
    const AMOUNTY = 25
    const AMOUNTZ = 5
    const SEPARATION = 100
    const numParticles = AMOUNTX * AMOUNTY * AMOUNTZ;
		const colors = [0x0040c0, 0x0040c9, 0x0040d0, 0x0040df, 0x0040f0]

		// let i = 0;

    const geometries = [];

    const material = { color: colors[0], emissive: colors[0], emissiveIntensity:0.5, side: THREE.DoubleSide }
		this.matrix = new THREE.Matrix4();
		const mesh = new THREE.InstancedMesh( geometry, material, numParticles );

		for ( let i = 0; i < numParticles; i ++ ) {
			this.#randomizeMatrix();
			mesh.setMatrixAt( i, this.matrix );
		}
		// console.log(mesh);
		this.scene.add( mesh );

		// addLineShape( shape, color, x, y, z, rx, ry, rz, s );
  }

	#randomizeMatrix(){

		this.geoPosition.x = Math.random() * 4000 - 2000;
		this.geoPosition.y = Math.random() * 4000 - 2000;
		this.geoPosition.z = Math.random() * 4000 - 2000;

		this.geoRotation.x = Math.random() * 2 * Math.PI;
		this.geoRotation.y = Math.random() * 2 * Math.PI;
		this.geoRotation.z = Math.random() * 2 * Math.PI;

		this.geoQuaternion.setFromEuler( this.geoRotation );

		this.matrix.compose( this.geoPosition, this.geoQuaternion, this.geoScale );

	};
    /////////////////////////////////////////////////////////////////////////
   //             	      Building timeline elements                      //
  /////////////////////////////////////////////////////////////////////////
  #buildingTimelineElements(){
    // Display year numbers
    var today = new Date();
    var yyyy = today.getFullYear();
    const totalNberYears = yyyy - 2009
    console.log("totalNberYears", totalNberYears);
    for (var i = 2009; i <= yyyy; i++) {
      var element = document.createElement( 'div' );
      element.className = `font-body user-select-none year element symbol hide-symbol`;
      element.textContent = i.toString();

      var cssObject = new CSS3DObject( element );
      cssObject.position.x = ((i - 2009) * yu) + xOffset;
      cssObject.position.y = -30;
      cssObject.position.z = 40;
      cssObject.rotation.x = Math.PI/2;
      cssObject.rotation.y = Math.PI;
      cssObject.rotation.z = Math.PI;

      this.symbols.timeline.push( cssObject );
      // add it to the css scene
      this.cssScene.add(cssObject);
    }

    // display timeline axis
    {
      var element = document.createElement( 'div' );
      element.className = `yearlong symbol hide-symbol`;
      // element.style.width = ((yyyy - 2009) * yu * 1.1) + xOffset + "px";
      element.style.width = (totalNberYears * yu * 3.1) + xOffset + "px";

      var cssObject = new CSS3DObject( element );
      // we reference the same position and rotation
      cssObject.position.x = xOffset;
      cssObject.position.y = 0;
      cssObject.position.z = 0;
      cssObject.rotation.x = Math.PI/2;
      cssObject.rotation.y = Math.PI;
      cssObject.rotation.z = Math.PI;

      this.symbols.timeline.push( cssObject );
      // add it to the css scene
      this.cssScene.add(cssObject);
    }
  }

  #buildingSymbols(){
    // Add symbols
    //////////////////////////////////////////
    for (const [prop, value] of Object.entries(PROJECTS.symbols)) {
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
        object.position.x = el.position.x + X_OFFSET_SYMBOL;
        object.position.y = el.position.y;
        object.position.z = el.position.z + Z_OFFSET_SYMBOL;
        object.rotation.x = -Math.PI/2;
    		this.cssScene.add( object );

        this.symbols[prop].push( object );
    	}
    }
    // Add TITLE
    //////////////////////////////////////////
    {
      let element = document.createElement( 'div' );
      element.className = `timeline-title user-select-none`;
      let title = document.createElement( 'h1' );
      const year = new Date();
      title.textContent = "Portfolio "+year.getFullYear().toString()
      let subtitle = document.createElement( 'h2' );
      subtitle.textContent = "Projects"
      subtitle.className = "breathe";
      element.appendChild( title );
      element.appendChild( subtitle );
      let object = new CSS3DObject( element );

      object.position.x = -800;
      object.position.z = -600;
      object.position.y = -200;
      object.rotation.x = -Math.PI/2;
      this.cssScene.add( object );
    }

  }

  #buildingBounds(){

       /////////////////////////////////////////////////////////////////////////
     //                   	      Building BOUNDS                           //
    /////////////////////////////////////////////////////////////////////////
    // WARNING - ID - 1
    // TECHNO
    //////////////////////////////////////////
    var boundsConstructor = {techno: [], software: [], }
    let jsArr = [0, 2, 3, 5, 15, 16, 17, 18, 19, 20, 23, 25, 26];
    for (var i = 0, j = jsArr.length; i < j; i++) {
      const k = PROJECTS.list.find(e => e.id == (jsArr[i] + 1));
      boundsConstructor.techno.push({
        start: {...PROJECTS.symbols.techno[0].position},
        end: {...k.techno.position}
      })
    }
    let pyArr = [5, 23, 25];
    for (var i = 0, j = pyArr.length; i < j; i++) {
      const k = PROJECTS.list.find(e => e.id == (pyArr[i] + 1));
      boundsConstructor.techno.push({
        start: {...PROJECTS.symbols.techno[1].position},
        end: {...k.techno.position}
      })
    }
    let rorArr = [4]; // 11
    for (var i = 0, j = rorArr.length; i < j; i++) {
      const k = PROJECTS.list.find(e => e.id == (rorArr[i] + 1));
      boundsConstructor.techno.push({
        start: {...PROJECTS.symbols.techno[2].position},
        end: {...k.techno.position}
      })
    }
    let phpArr = [0, 1, 3];
    for (var i = 0, j = phpArr.length; i < j; i++) {
      const k = PROJECTS.list.find(e => e.id == (phpArr[i] + 1));
      boundsConstructor.techno.push({
        start: {...PROJECTS.symbols.techno[3].position},
        end: {...k.techno.position}
      })
    }
    // SOFTWARES
    let psArr = [0, 1, 8, 17, 20, 21, 22];
    for (var i = 0, j = psArr.length; i < j; i++) {
      // let k = psArr[i];
      const k = PROJECTS.list.find(e => e.id == (psArr[i] + 1));
      boundsConstructor.software.push({
        start: {...PROJECTS.symbols.software[3].position},
        end: {...k.software.position}
      })
    }
    let inddArr = [0, 1, 8, 17];
    for (var i = 0, j = inddArr.length; i < j; i++) {
      // let k = inddArr[i];
      const k = PROJECTS.list.find(e => e.id == (inddArr[i] + 1));
      boundsConstructor.software.push({
        start: {...PROJECTS.symbols.software[2].position},
        end: {...k.software.position}
      })
    }
    let aiArr = [0, 1, 2, 4, 8, 15, 16, 17, 19];
    for (var i = 0, j = aiArr.length; i < j; i++) {
      // let k = aiArr[i];
      const k = PROJECTS.list.find(e => e.id == (aiArr[i] + 1));
      boundsConstructor.software.push({
        start: {...PROJECTS.symbols.software[0].position},
        end: {...k.software.position}
      })
    }
    let skArr = [16];
    for (var i = 0, j = skArr.length; i < j; i++) {
      // let k = skArr[i];
      const k = PROJECTS.list.find(e => e.id == (skArr[i] + 1));
      boundsConstructor.software.push({
        start: {...PROJECTS.symbols.software[1].position},
        end: {...k.software.position}
      })
    }
    let blArr = [8, 17, 20, 24];
    for (var i = 0, j = blArr.length; i < j; i++) {
      // let k = BlArr[i];
      const k = PROJECTS.list.find(e => e.id == (blArr[i] + 1));
      boundsConstructor.software.push({
        start: {...PROJECTS.symbols.software[4].position},
        end: {...k.software.position}
      })
    }


    // BONDS
    // Largely taken from https://threejs.org/examples/?q=molecu#css3d_molecules
    // I still don't understand the math behind...
    for (const [prop, value] of Object.entries(boundsConstructor)) {
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

        this.bounds[prop].push({obj: object});

    		this.cssScene.add( object );

        /*
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
        // this.bounds[prop].push( {obj: object} );

    		this.cssScene.add( joint );
        */
      }
    }
  }

  #buildingObjects(){
    // ALL
    const distNode = 305
    let previousPos = -300
    let previousZ = -500;

    // Add PROJECTS
    let c = 0;
		let zCounter = 0;
		let spanOfPreviousJob = 0
    for ( let i = 0, j = sortedTimeline.length; i < j; i++ ) {

      let el = sortedTimeline[i];
			let na = false

      var element = new ProjectObject(el, this)

      this.cssScene.add( element.cssObj );
      this.objects.push( element );

			// TECHNO
			var object = new THREE.Object3D();
			if (el.techno && el.techno["n/a"] && el.techno["n/a"] === true) na = true

	    if (el.techno && !el.techno["n/a"] && el.techno.position) {
	      object.position.x = el.techno.position.x;
	      object.position.y = el.techno.position.y;
	      object.position.z = el.techno.position.z;
	    }  else {
	      object.position.x = Math.random() * 900 - 450;
	      object.position.z = Math.random() * 900 - 450;
	    }
	    object.rotation.x = -Math.PI/2;
      this.targets.techno.push( {"n/a": na, obj: object} );


			// ALL
      if (c % 6 === 0){
        previousZ += 210;
        previousPos = -300;
      }
      object = new THREE.Object3D();
      object.position.x = previousPos + distNode;
      object.position.y = Math.random() * 900 - 450;
      object.position.z = previousZ;
      c++;

      object.rotation.x = -Math.PI/2;
      // object.lookAt( vector );
      this.targets.all.push( {"n/a": false, obj: object} );
      // targets.all.push( object );
			previousPos = previousPos + distNode;



			// SOFTWARE
      if (el.software && el.software["n/a"] && el.software["n/a"] === true) na = true;

			object = new THREE.Object3D();
      if (el.software) {
        object.position.x = el.software.position.x;
        object.position.y = el.software.position.y;
        object.position.z = el.software.position.z;
      } else {
        object.position.x = Math.random() * 900 - 450; // 0;
        object.position.z = Math.random() * 900 - 450; // 0;
      }
      object.rotation.x = -Math.PI/2;
      this.targets.software.push( {"n/a": na, obj: object} );



			// TIMELINE
			na = false
      let startingPoint = ((el.timeline.startingYear - 2009) * yu) + xOffset;
      let len = el.timeline.hasOwnProperty("len") ? el.timeline.len : 1;

      if (zCounter > 900) zCounter = 150;

      let yPos = 0;
      if ( (len + startingPoint) < (spanOfPreviousJob ) ){
        zOffset += 300;
      } else {
        zOffset = 60;
      }
      spanOfPreviousJob = len + startingPoint;
      if (el.timeline.level) zOffset * (el.timeline.level * 20)

      object = new THREE.Object3D();
      if (el.timeline) {
        if (el.timeline["n/a"] && el.timeline["n/a"] === true) na = true;
        object.position.x = startingPoint;
        // object.position.y = Math.random() * 500 - 500;
        object.position.y = Math.random() * 25 - 25;
        object.position.z = zCounter * (i % 2 === 0 ? 1 : -1);
      } else {
        object.position.x = Math.random() * 900 - 450; // 0;
        object.position.z = Math.random() * 900 - 450; // 0;
      }
      object.rotation.x = -Math.PI/2;
      this.targets.timeline.push( {"n/a": na, obj: object} );
      zCounter += 80;
  	}
  }

  #stats(showAtStartUp = false){
    // stats
    // if (settings.isDebugMode) {
      this.stats = new Stats(false);
      this.stats.showPanel(0);
      this.canvasStats.appendChild( this.stats.dom );

      this.rendererStats	= new TEST.THREEx.RendererStats();
      this.rendererStats.domElement.style.position   = 'absolute'
      this.rendererStats.domElement.style.right  = '0px'
      this.rendererStats.domElement.style.top    = '48px'
      this.rendererStats.domElement.style.zIndex    = '100'
      this.canvasStats.appendChild( this.rendererStats.domElement )
      // if(showAtStartUp) this.rendererStats.domElement.parentNode.style.display = "block";
  }

  #hideAllBounds() {
    if (this.bounds[store.state.previousFilter] && this.bounds[store.state.previousFilter].length > 0){
      for ( let i = 0, j = this.bounds[store.state.previousFilter].length; i < j; i++ ) {
        this.bounds[store.state.previousFilter][i].obj.element.classList.add("hide-bounds");
      }
    }
  }

  #onWindowResize = debounce( () => {
    let winW = window.innerWidth, winH = window.innerHeight;
    this.camera.aspect = winW / winH;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( winW, winH );
    this.rendererCSS.setSize( winW, winH );
  }, 80);

  updatedSettings(newSettings) {
    console.log("state", store);
    // this.settings = newSettings
  }

  animate() {
    if ( !store.state.isPaused ){
      requestAnimationFrame( () => {this.animate()} );
      TWEEN.update();
      // _.once( () => console.log("called ONCE") )
      // _.once( () => console.log(TWEEN) )

      // only required if controls.enableDamping = true, or if controls.autoRotate = true
      this.controls.update();
      if (store.state.settings.debug) {
        this.stats.update();
        this.rendererStats.update(this.renderer);
      }
      this.render();
    }
  }

  render() {
    this.renderer.render( this.scene, this.camera );
    this.rendererCSS.render( this.cssScene, this.camera );
  }

  playAnimation() {
    store.commit("setPauseState", false)
    this.animate();
  }

  pauseAnimation() {
    store.commit("setPauseState", true)
  }

  transform( duration ) {

		if (store.state.previousFilter === store.state.currentFilter) return null;
    let targets = this.targets[store.state.currentFilter]

    TWEEN.removeAll();

		// 1. manage the bounds
		this.#hideAllBounds();
    if (store.state.currentFilter === "all"){
			// Hide Symbols
      for ( let i = 0, j = this.symbols[store.state.previousFilter].length; i < j; i++ ) {
        this.symbols[store.state.previousFilter][i].element.classList.add("hide-symbol");
      }
    } else {

      // Display/hide symbols
      ////////////////////////////////////////////////////////
      if (store.state.previousFilter !== "all" && store.state.previousFilter !== null){
        for ( let i = 0, j = this.symbols[store.state.previousFilter].length; i < j; i++ ) {
          this.symbols[store.state.previousFilter][i].element.classList.add("hide-symbol");
        }
      }
      for ( let i = 0, j = this.symbols[store.state.currentFilter].length; i < j; i++ ) {
        if (this.symbols[store.state.currentFilter][i].element.classList.contains("hide-symbol")) this.symbols[store.state.currentFilter][i].element.classList.remove("hide-symbol");
      }

      // Display/hide bounds
      ////////////////////////////////////////////////////////
      if (this.bounds[store.state.currentFilter] && this.bounds[store.state.currentFilter].length > 0){
        for ( let i = 0, j = this.bounds[store.state.currentFilter].length; i < j; i++ ) {
          if (this.bounds[store.state.currentFilter][i].obj.element.classList.contains("hide-bounds")) this.bounds[store.state.currentFilter][i].obj.element.classList.remove("hide-bounds");
        }
      }
    }

    for ( var i = 0; i < this.objects.length; i++ ) {
      var thisObject = this.objects[ i ];

			thisObject.shouldBeVisible = targets[ i ]["n/a"]
			thisObject.updateVisibility()

      if (targets[ i ]["n/a"] === false){
	    	thisObject.updateCoordinateDisplay()

				var target = targets[ i ].obj;

	      new TWEEN.Tween( thisObject.cssObj.position )
	      .to( { x: target.position.x + X_OFFSET, y: target.position.y, z: target.position.z + Z_OFFSET }, Math.random() * duration + duration )
	      .easing( TWEEN.Easing.Exponential.InOut )
	      .start();

	      new TWEEN.Tween( thisObject.cssObj.rotation )
	      .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
	      .easing( TWEEN.Easing.Exponential.InOut )
	      .start();
	    }

	    new TWEEN.Tween( this )
	    .to( {}, duration * 2 )
	    .onUpdate( () => this.render )
	    .start();
		}
  }

	applyFilter () {
		for ( var i = 0; i < this.objects.length; i++ ) {
			this.objects[i].applyFiler()
		}
	}

  resetCamera (duration=1200 ) {
    // TWEEN.removeAll();
    new TWEEN.Tween( this.camera.position )
    .to( {...this.cameraInitialPosition}, Math.random() * duration + duration )
    .easing( TWEEN.Easing.Exponential.InOut )
    .start();

    new TWEEN.Tween( this )
    .to( {}, duration * 2 )
    .onUpdate( () => this.render )
    .start();
  }

  zoomToProject (project, duration=1200 ) {
    // TWEEN.removeAll();
		if (project[store.state.currentFilter]["n/a"]) return
		console.dir(project[store.state.currentFilter].position)

    new TWEEN.Tween( this.camera.position )
    .to( project[store.state.currentFilter].position, Math.random() * duration + duration )
    .easing( TWEEN.Easing.Exponential.InOut )
    .start();

    new TWEEN.Tween( this )
    .to( {}, duration * 2 )
    .onUpdate( () => this.render )
    .start();
  }
}

class ProjectObject {
  constructor(projectData, timeline) {
		this.timeline = timeline;

    this.projectData = projectData
    this.display = true;
    this.faded = false;
    this.na = false;
    this.currentCoordinates = [0, 0]

    this.DOMEl = this.#buildObject()
		/*
		this.DOMEl.addEventListener("click", evt => {
			this.timeline.zoomToProject(this.projectData)
		}, true)
		*/
		this.DOMEl.addEventListener("dblclick", evt => {
			store.commit("setProject", this.projectData.id)
			store.commit("analyticsTrackProject", {id: this.projectData.id, name: this.projectData.name})
			this.timeline.pauseAnimation();
		}, false)

		this.isVisible = true
    this.cssObj = null
    this.#build3dObj()
  }

  #buildObject(){
    let element = document.createElement( 'div' );
    element.className = `element detail node`;


    element.setAttribute("data-id", this.projectData.id);
    // element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

    let wrapper = document.createElement( 'div' );
    wrapper.className = `name into-detail corners node ${this.projectData.major ? "major" : "minor"}`;
    wrapper.setAttribute("data-id", this.projectData.id);

    let content = document.createElement( 'div' );
    content.className = `desc node job-${this.projectData.cat}`;
    content.textContent = this.projectData.name;
    content.setAttribute("data-id", this.projectData.id);

    let lengthBar = document.createElement( 'div' );
    lengthBar.className = 'length-bar absolute';
    if(this.projectData.timeline && this.projectData.timeline.len) {
      lengthBar.style.width = (this.projectData.timeline.len * yu * 1.15) + "px";
    }

    let techno = document.createElement( 'div' );
    let technoIcons = document.createElement( 'div' );
    let coordinateDiv = document.createElement( 'div' );

    if (this.projectData.techno && this.projectData.techno.list) {
    // console.log("el.techno.list", el.techno.list.length)
      techno.className = 'techno node';
      techno.setAttribute("data-id", this.projectData.id);
      // if (settings.isDebugMode) {
      //   techno.textContent = el.techno.position.x + " / " + el.techno.position.z;
      // } else {
        // techno.innerHTML = el.techno.list.join(", ") + "<br/>" + el.summary;
        techno.innerHTML = this.projectData.summary;
      // }
      technoIcons.className = "techno-icons absolute d-none";
      // console.log("el.techno.list", el.techno.list)
      let techSVG = "";
      for (let i = 0, j = this.projectData.techno.list.length; i < j; i++) {
        techSVG += `<svg title="#${ this.projectData.techno.list[i] }" class="techno-svg" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <use xlink:href="#${ this.projectData.techno.list[i] }"/>
        </svg>`;
      }
      // console.log("techSVG", techSVG)
      technoIcons.innerHTML = techSVG;

      coordinateDiv.className = 'coordinates absolute';
      coordinateDiv.innerHTML = `X: ${this.projectData.techno.position.x}, Y: ${this.projectData.techno.position.y}`
    }

    this.coordinateDOMEl = coordinateDiv

    wrapper.appendChild( lengthBar );
    wrapper.appendChild( content );
    if (this.projectData.techno && this.projectData.techno.list) {
      wrapper.appendChild( techno );
      wrapper.appendChild( technoIcons );
      wrapper.appendChild( coordinateDiv );
    }
    element.appendChild( wrapper );

    return element
  }

  #build3dObj(){
    var cssObj = new CSS3DObject( this.DOMEl );
    cssObj.position.x = Math.random() * 600 - 600;
    cssObj.position.y = Math.random() * 3000;
    cssObj.position.z = Math.random() * 4000 - 2000;
    cssObj.rotation.x = -Math.PI/2;
    // this.cssScene.add( object );

    this.cssObj = cssObj;
  }

  updateCoordinateDisplay(){
		// console.log("this.projectData", this.projectData);
		if (
			!this.projectData.hasOwnProperty(store.state.currentFilter) ||
			store.state.currentFilter === "timeline" ||
			this.projectData[store.state.currentFilter]["n/a"]
		) return
    let {x ,y, z} = this.projectData[store.state.currentFilter].position
    this.currentCoordinates = [x, z]
    this.coordinateDOMEl.innerHTML = `X: ${x}, Y: ${y}`
  }

	set shouldBeVisible(value) {
		this.isVisible = value
		if (value) {
			this.DOMEl.classList.add("hide-el");
		} else {
			this.DOMEl.classList.remove("hide-el");
		}
	}

	applyFiler(){
		// main, freelance, personal

		// if no filter selected, disable
		if (store.state.filtersOn.every(e => e === false)){
			this.DOMEl.classList.remove("fade-project")
			return
		}
		// if some
		let index = CAT.findIndex(e => e === this.projectData["cat"])
		if (index !== -1){
			if (store.state.filtersOn[index] === true){
				this.DOMEl.classList.remove("fade-project")
			} else {
				this.DOMEl.classList.add("fade-project")
			}
		}
	}

	updateVisibility(){
		if (store.state.previousFilter === "timeline"){
			this.DOMEl.classList.remove("timeline");
		}
		if (store.state.currentFilter === "timeline"){
			this.DOMEl.classList.add("timeline");
		}
	}
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
