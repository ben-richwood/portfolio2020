<!DOCTYPE html>
<html lang="en">
	<head>
		<title>three.js webgl - map controls</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link type="text/css" rel="stylesheet" href="./assets/css/main.css">
		<style>
			body {
				background-color: #ccc;
				color: #000;
				font-size: 10px;
			}
			a {
				color: #f00;
			}
			#timeline, #domEl{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				z-index: 10
			}
			div#domEl{
				z-index: 20;
				pointer-events: none;
			}
			div#domEl div.detail:hover{
				color: red;
				pointer-events: initial
			}
			div.detail{
				padding: .5rem 1rem;
				background: rgb(17,80,125);
				background: linear-gradient(90deg, rgba(17,80,125,1) 0%, rgba(24,117,187,1) 100%);
				color: #FFF;
				text-transform: uppercase;
				border: 2px solid #217892;
			}
			div.year{
				font-size: 2rem;
				opacity: .9;
				color: #b7b7b7;
				font-family: "Inter";
				font-weight: 900;
			}
			div.timeline{
				color: #b7b7b7;
				font-family: "Inter";
				font-weight: 900;
				font-size: 6rem;
				/* position: relative; */
			}
			div.containerTimeline{
				position: relative;
			}
			.hr{
				width: 5rem;
				background-color: #a1a1a1;
				height: 12px;
				position: absolute;
				bottom: -4rem;
			}
		</style>
	</head>

	<body>
		<div id="timeline"></div>
		<div id="domEl"></div>
    <script src="https://unpkg.com/vue"></script>

		<script type="module">
      import * as THREE from './assets/js/build/three.module.js';
      import { OrbitControls } from './assets/js/libs/orbis-lite.js';
			import { CSS3DRenderer, CSS3DObject } from './assets/js/libs/CSS3DRenderer.js';
			import { LineMaterial } from './assets/js/libs/LineMaterial.js';
			import { LineGeometry } from './assets/js/libs/LineGeometry.js';
			import { Line2 } from './assets/js/libs/Line2.js';
			import { SVGLoader } from './assets/js/libs/SVGLoader.js';

			import * as MAT from './assets/js/libs/custom/materialList.js'


			let camera, controls, scene, renderer;
			let cssScene, rendererCSS; // 2nd "canvas", used by CSS3DRenderer to display DOM element in 3D env

			const svgLoader = new SVGLoader();
			init();
			animate();

			function init() {
				scene = new THREE.Scene();
				cssScene = new THREE.Scene();
				scene.background = new THREE.Color( 0xcccccc );
				// scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.getElementById('timeline').appendChild( renderer.domElement );

				rendererCSS = new CSS3DRenderer();
				rendererCSS.setSize( window.innerWidth, window.innerHeight );
				// rendererCSS.setPixelRatio( window.devicePixelRatio );
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

				const timeline= [
					{
						label: "geography",
						startingYear: 2009,
						len: 4,
						thread: "main",
						group: "study",
						type: "duration"
					}, {
						label: "certificate",
						startingYear: 2011,
						len: 1,
						thread: "second",
						group: "study",
						type: "duration"
					}, {
						label: "Licence",
						startingYear: 2012,
						thread: "second",
						group: "study",
						type: "event"
					}, {
						label: "maitrise",
						startingYear: 2012,
						len: 1,
						thread: "second",
						group: "study",
						type: "duration"
					}, {
						label: "master",
						startingYear: 2013,
						len: 2,
						thread: "main",
						group: "study",
						type: "duration"
					}, {
						label: "Internship",
						startingYear: 2014.5,
						len: .5,
						thread: "second",
						group: "work",
						type: "duration"
					}, {
						label: "Diplome Master",
						startingYear: 2015,
						thread: "main",
						group: "study",
						type: "event"
					}, {
						label: "freelance",
						startingYear: 2015,
						len: 1,
						thread: "main",
						group: "work",
						type: "duration"
					}, {
						label: "MonMentor",
						startingYear: 2015,
						len: .5,
						thread: "second",
						group: "work",
						type: "duration"
					}, {
						label: "Kicklaws",
						startingYear: 2015.5,
						len: .5,
						thread: "second",
						group: "work",
						type: "duration"
					}, {
						label: "Vietnam",
						startingYear: 2016,
						len: 3,
						thread: "main",
						group: "perso",
						type: "duration"
					}, {
						label: "BLISS",
						startingYear: 2017,
						len: 3,
						thread: "main",
						group: "work",
						type: "duration"
					}, {
						label: "Year of Engineering",
						startingYear: 2017.8,
						len: 1,
						thread: "second",
						group: "work",
						type: "duration"
					}, {
						label: "CCM",
						startingYear: 2019.4,
						len: .6,
						thread: "second",
						group: "work",
						type: "duration"
					}, {
						label: "Identidy and branding",
						startingYear: 2019,
						len: 1,
						thread: "second",
						group: "work",
						type: "duration"
					}, {
						label: "Peafowl Consulting",
						startingYear: 2016.7,
						len: .3,
						thread: "second",
						group: "freelance",
						type: "duration"
					}, {
						label: "Go Mekong Evasion",
						startingYear: 2018.2,
						len: 1,
						thread: "second",
						group: "freelance",
						type: "duration"
					}, {
						label: "Takacorp Studio",
						startingYear: 2018.7,
						len: 1.2,
						thread: "second",
						group: "freelance",
						type: "duration"
					}, {
						label: "Uptime checker",
						startingYear: 2019.1,
						len: .6,
						thread: "second",
						group: "work",
						type: "duration"
					}, {
						label: "ctOS",
						startingYear: 2018.8,
						len: 1.2,
						thread: "second",
						group: "perso",
						type: "duration"
					}, {
						label: "Tool Explorer",
						startingYear: 2019.7,
						len: .2,
						thread: "second",
						group: "perso",
						type: "duration"
					}, {
						label: "What's next",
						startingYear: 2020,
						len: 5,
						thread: "main",
						group: "perso",
						type: "duration"
					}
				]

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
				console.log("partVert", partVert);
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
					desc.textContent = cur.label
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
				/*
				const timelineTitle = document.createElement( 'div' );
				timelineTitle.className = 'timeline';
				let hr = document.createElement( 'div' );
				hr.className = "hr";
				let container = document.createElement( 'div' );
				container.className = 'containerTimeline';
				container.textContent = "Timeline";
				container.appendChild(hr);

				timelineTitle.appendChild(container);

				let timelineTitlecssObject = new CSS3DObject( timelineTitle );
				// we reference the same position and rotation
				timelineTitlecssObject.position.x = 400;
				timelineTitlecssObject.position.y = -850;
				timelineTitlecssObject.position.z = 200;
				timelineTitlecssObject.rotation.x = Math.PI/2;
				timelineTitlecssObject.rotation.y = Math.PI;
				timelineTitlecssObject.rotation.z = Math.PI;
				// add it to the css scene
				cssScene.add(timelineTitlecssObject);
				*/

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
			function animate() {
				requestAnimationFrame( animate );
				controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
				render();
			}
			function render() {
				renderer.render( scene, camera );
				rendererCSS.render( cssScene, camera );
			}
		</script>

	</body>
</html>