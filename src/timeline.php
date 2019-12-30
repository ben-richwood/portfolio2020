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
				padding: 1rem;
				background-color: #11517F;
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
      // import { WEBGL } from './libs/WebGL.js';
      // import { GLTFLoader } from './libs/GLTFLoader.js';
      // import { SVGLoader } from './libs/SVGLoader.js';
      // import { RGBELoader } from './libs/RGBELoader.js';
      // import { EquirectangularToCubeGenerator } from './libs/EquirectangularToCubeGenerator.js';
      // import { PMREMGenerator } from './libs/PMREMGenerator.js';
      // import { PMREMCubeUVPacker } from './libs/PMREMCubeUVPacker.js';
      // import { RectAreaLightUniformsLib } from './libs/RectAreaLightUniformsLib.js';

			var camera, controls, scene, cssScene, renderer, rendererCSS;
			init();
			//render(); // remove when using next line for animation loop (requestAnimationFrame)
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
				controls.minPolarAngle = 0;
        controls.minAzimuthAngle = 0; //- Infinity; // radians
				controls.maxPolarAngle =  0;
				// controls.maxPolarAngle =  Math.PI / 16;
        controls.maxAzimuthAngle = controls.minAzimuthAngle
				// controls.maxPolarAngle =  Math.PI / 2; // FOR TESTING
        // controls.maxAzimuthAngle = Infinity;
				controls.mouseButtons = {
					LEFT: THREE.MOUSE.PAN,// THREE.MOUSE.ROTATE,
					MIDDLE: THREE.MOUSE.DOLLY,
					RIGHT: THREE.MOUSE.PAN
				}

				var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
				geometry.translate( 0, 0.5, 0 );
				var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

				for ( var i = 0; i < 50; i ++ ) {
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.x = Math.random() * 1600;
					mesh.position.y = 0;
					mesh.position.z = Math.random() * 1600 - 400;
					mesh.scale.x = 20;
					mesh.scale.y = Math.random() * 80 + 10;
					mesh.scale.z = 20;
					mesh.updateMatrix();
					mesh.matrixAutoUpdate = false;
          mesh.castShadow = true;
					scene.add( mesh );
				}

				const unit = 20; // unit value for 1 month
				const zOffset = 40;
				const yu = unit * 12; // yearUnit
				const sp = 0 // startingPoint - year 2009
				let startingPoint = sp;
				const yDepth = -50 // default depth

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
						startingYear: 2015,
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
					}
				]

				var timelineMaterial = {
					perso: new LineMaterial( {
						color: 0xcc4444,
						linewidth: 5, // in pixels
						vertexColors: THREE.VertexColors,
						//resolution:  // to be set by renderer, eventually
						dashed: false
					} ),
					today: new THREE.LineBasicMaterial( { color : 0xff0000 } ),
					study: new THREE.LineBasicMaterial( { color : 0x0000ff } ),
					work: new THREE.LineBasicMaterial( { color : 0x00ffff } ),
					freelance: new THREE.LineBasicMaterial( { color : 0x8800ff } )
				}



				const domEl = [{}];

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
					let item = new Float32Array( [
						...branching,
	      		startingPoint + (yu * len), yPos, zPos
	      	] );
					domEl[domEl.length-1].position.push(yPos);
					domEl[domEl.length-1].position.push(zPos);
					var geometry = new THREE.BufferGeometry();

					geometry.addAttribute( 'position', new THREE.BufferAttribute( item, 3 ) );
	        var curveObject = new THREE.Line( geometry, timelineMaterial[cur.group] );
					// curveObject.castShadow = true;
	        scene.add(curveObject);

					let planeGeometry = new THREE.PlaneBufferGeometry( 8, 8 );
					let materialPlane = new THREE.MeshBasicMaterial( {color: 0x11517F, side: THREE.DoubleSide} );
					materialPlane.blending  = THREE.NoBlending;
					let plane = new THREE.Mesh( planeGeometry, materialPlane );
					plane.position.x = startingPoint;
					plane.rotation.x = Math.PI/2;
					// plane.rotation.y = Math.PI;
					// plane.rotation.z = Math.PI;
					scene.add( plane );
				}

				/*
				// Add Today line
        var geometry = new THREE.BufferGeometry();
      	var today = new Float32Array( [
        	(2020-2009) * yu, 0, -200,
        	(2020-2009) * yu, 0, 200,
      	] );
      	// itemSize = 3 because there are 3 values (components) per vertex
      	geometry.addAttribute( 'position', new THREE.BufferAttribute( today, 3 ) );
        // Create the final object to add to the scene
        var curveObject = new THREE.Line( geometry, timelineMaterial.today );
				// curveObject.castShadow = true;
        scene.add(curveObject);
				*/

				geometry = new LineGeometry();
				let color = new THREE.Color( 0xff0000 );
				let positions = [(2020-2009) * yu, 0, -200, (2020-2009) * yu, 0, 200];
				// colors.push( color.r, color.g, color.b );
				let colors = [color.r, color.g, color.b, color.r, color.g, color.b ];

				geometry.setPositions( positions );
				console.log("colors", colors);
				geometry.setColors( colors );
				console.log(geometry);

				let matLine = new LineMaterial( {
					color: 0xffffff,
					linewidth: .003, // in pixels
					// linewidth: 3, // in pixels
					vertexColors: THREE.VertexColors,
					//resolution:  // to be set by renderer, eventually
					dashed: false
				} );

				let line = new Line2( geometry, matLine );
				line.computeLineDistances();
				line.scale.set( 1, 1, 1 );
				scene.add( line );


				// create the object3d for this element
				for (var i = 0, j=domEl.length; i < j; i++) {
					let el = domEl[i];
					if (!el.hasOwnProperty("dom")) continue;
					console.log("domEl:", el);
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