import * as THREE from './build/three.module.js';
import { OrbitControls } from './libs/orbis-lite.js';
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';
import { LineMaterial } from './libs/LineMaterial.js';
import { LineGeometry } from './libs/LineGeometry.js';
import { Line2 } from './libs/Line2.js';
import { SVGLoader } from './libs/SVGLoader.js';

import * as MAT from './libs/custom/materialList.js'

import projects from "./projects.js";
import { t0, settings, keyboardMap, zoomModel, objectScene, screenGraphic, container, canvasEl, readyToLaunch, playAnimation, pauseAnimation, stats } from './main.js'

const timeline = projects.list.filter(e => e.onlyTimeline === true);


export let camera, controls, scene, renderer;
export let cssScene, rendererCSS; // 2nd "canvas", used by CSS3DRenderer to display DOM element in 3D env
const svgLoader = new SVGLoader();

// init();
// animate();

export function init() {
  // container = document.getElementById('canvasScene');
  // canvasEl = container.getElementsByTagName('canvas')[0];
  scene = new THREE.Scene();
  cssScene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
  // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  // renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvasEl, stencil: false, precision: 'mediump', depth: true, preserveDrawingBuffer: true, premultipliedAlpha: false } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  // container.appendChild( renderer.domElement );
  // container.getElementsByTagName('canvas')[0] = renderer.domElement;

  rendererCSS = new CSS3DRenderer();
  rendererCSS.setSize( window.innerWidth, window.innerHeight );
  document.getElementById( 'domEl' ).appendChild( rendererCSS.domElement );

  // camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 400, 1000, 100 );
  // controls
  controls = new OrbitControls( camera, renderer.domElement );
  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 1000;
  controls.minAzimuthAngle = 0;
  controls.maxAzimuthAngle = controls.minAzimuthAngle

  controls.minPolarAngle = 0;
  controls.maxPolarAngle =  0; // alternative: Math.PI / 16;
  // FOR TESTING
  // controls.maxPolarAngle =  Math.PI / 2;
  // controls.maxAzimuthAngle = Infinity;
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN, // initial -> THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN
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
  // ( url, name, sceneSign, pos, scaleFac, rot = [0,Math.PI/2,0], mat = undefined )
  const timelineHeading = loadSVG( './assets/img/timeline_title.svg', 'timeline', 1, [400, -950, -500], .6, [-Math.PI/2, Math.PI, Math.PI] );

  // Variables to build the timeline - easier to tweak
  const unit = 20; // unit value for 1 month
  const zOffset = 40;
  const yu = unit * 12; // yearUnit
  const sp = 0 // startingPoint - year 2009
  let startingPoint = sp;
  const yDepth = -50 // default depth
  const timelineMaterial = {
    perso: 0x11517F,
    today: 0xff0000,
    study: 0x11517F,
    work: 0x00ffff,
    freelance: 0x8800ff
  }


  const domEl = [{}];

  let partVert = new THREE.Geometry();

  let crossStartingZ = -900

  for ( var i = 1; i < 8; i ++ ) { // vertical loop
    for ( var j = 1; j < 15; j ++ ) { // horizontal loop
      var star = new THREE.Vector3();
      star.x = startingPoint + (yu * 2 * j);
      star.y = -650;
      star.z = crossStartingZ + ( i * 400 );
      partVert.vertices.push( star );
    }
  }
  const cross = new THREE.Points( partVert, MAT.crossMaterial );
  cross.position.x = 0;
  cross.position.y = 0;
  cross.position.z = 0;
  scene.add( cross );

  const matLine = new LineMaterial( {
    color: 0xffffff,
    linewidth: .003, // in pixels
    vertexColors: THREE.VertexColors,
    //resolution:  // to be set by renderer, eventually
    dashed: false
  } );

  for(let i=0,j=timeline.length;i<j;i++){
    let cur = timeline[i];
    let startingPoint = (cur.startingYear - 2009) * yu;

    var element = document.createElement( 'div' );
    element.className = 'detail';

    var desc = document.createElement( 'div' );
    desc.className = 'desc';
    desc.textContent = cur.name
    element.appendChild( desc );

    let len = cur.hasOwnProperty("len") ? cur.len : 1;

    domEl.push({
      dom:element,
      position: [
        startingPoint + (yu * len)
      ],
      rotation:0
    });

    if(cur.type === "event") {
      continue;
    }
    let branching = [startingPoint, 0,  0];
    let randZ = Math.random() * 20 - 10;
    let zPos = 0;
    let yPos = 0;
    if (cur.thread === "second"){
      zPos = zOffset * randZ;
      yPos = yDepth * (Math.random() * 10 - 5);
      branching = [...branching,
        startingPoint, 0,  zPos,
        startingPoint, yPos, zPos
      ]
    }
    branching = [...branching, startingPoint + (yu * len), yPos, zPos]

    domEl[domEl.length-1].position.push(yPos, zPos);

    buildLine(timelineMaterial[cur.group], branching);

    let planeGeometry = new THREE.PlaneBufferGeometry( 8, 8 );
    let plane = new THREE.Mesh( planeGeometry, MAT.materialPlane );
    plane.position.x = startingPoint;
    plane.rotation.x = Math.PI/2;
    // plane.rotation.y = Math.PI;
    // plane.rotation.z = Math.PI;
    scene.add( plane );
  }

  // create the object3d for this element
  for (var i = 0, j=domEl.length; i < j; i++) {
    let el = domEl[i];
    if (!el.hasOwnProperty("dom")) continue;
    var cssObject = new CSS3DObject( el.dom );
    // we reference the same position and rotation
    cssObject.position.x = el.position[0];
    cssObject.position.y = el.position[1];
    cssObject.position.z = el.position[2];
    cssObject.rotation.x = Math.PI/2;
    cssObject.rotation.y = Math.PI;
    cssObject.rotation.z = Math.PI;
    // add it to the css scene
    cssScene.add(cssObject);
  }

  for (var i = 2009; i < 2021; i++) {
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
  buildLine(0xaaaaaa, [(2020 - 2009) * yu, 0, -200, (2020 - 2009) * yu, 0, 200], matLineDash);

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
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
export function animate() {
  requestAnimationFrame( animate );
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  render();
}
export function render() {
  renderer.render( scene, camera );
  rendererCSS.render( cssScene, camera );
}