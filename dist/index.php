<!DOCTYPE html>
<html lang="en-GB" prefix="og: http://ogp.me/ns#">
	<head>
		<!-- BASIC INFO -->
   	<title>Richwood | portfolio</title>
   	<meta name="author" content="Ben Richwood">
   	<meta name="keywords" content=" Portfolio, Startup developer, Richwood, webdesign, graphist, graphiste, html5, javascript, interactive, webgl, threejs, vuejs, php, CG, Computer Graphic">
		<meta charset="utf-8">

		<!-- FAVICONS -->
   	<link rel="icon" href="assets/img/flavicon.ico">
   	<link rel="apple-touch-icon" href="assets/img/flavicon.ico">

		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link rel="manifest" href="./manifest.json">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

		<link type="text/css" rel="stylesheet" href="./assets/css/main.css">
		<link href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap" rel="stylesheet">
		<style type="text/css">
			body{
				/* perspective: 60em; */
				height: 100vh;
				margin: 0;
				background: rgb(237,237,237);
				background: linear-gradient(90deg, rgba(237,237,237,1) 0%, rgba(171,171,171,1) 100%);
			  color: #fff;
			  font-family: 'Inter var', 'Ubuntu', 'Open Sans', 'Segoe UI', 'Helvetica Neue', 'Droid Sans Serif', 'Roboto', Arial, sans-serif;
			  font-size: 14px;
			  letter-spacing: -0.007em;
			  line-height: 20px;
			  /* For hardware acceleration */
			  transform: translate3d(0, 0, 0);
			}
			#mainScene{
			  display: none;
			}
			#canvasScene{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				z-index: 10
			}
			.hide, .ieDetected{ display:none; }

			.intro-second-part.hide{ display: block; }

			#intro{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100vh;
				z-index:500;
				background-color: rgba(0,0,0,.97);
				transform-style: preserve-3d;
				opacity: 1;
			}
			#intro.no-intro{
				opacity: 0;
				pointer-events: none;
				transition: opacity 1.2s ease-out;
			}
			.popup{
				position:absolute;
				background-color: #222833;
				border: 1px solid #FFF200;
				box-shadow:
				  0 0px 12px rgba(255, 242, 0, 0.5),
				  0 0px 35px rgba(255, 242, 0, 0.1),
					0 0px 117px rgba(255, 242, 0, 0.02);
				  /* 0 0px 35.3px rgba(255, 242, 0, 0.1), */
				padding: 3rem;
				width: 65%;
				max-width: 700px;
				/* height:50%; */
				left:50%;
				top:50%;

				animation-name: animatePopup3D;
			  animation-duration: .7s;
			  animation-timing-function: ease;
			  /* animation-delay: .3s; */
			  animation-direction: normal;
			  animation-iteration-count: 1;
			  animation-fill-mode: forwards;
			  animation-play-state: running;
				transform: translate(-50%, -50%) translateZ(0) rotateY(0) rotateX(0) scale(1.15);
				opacity: 0;
			}
			.tc{text-align: center;}
			.tagline{
				margin: 2rem auto;
			}
			.highlight{
				color: #888;
				transition: color .6s ease;
			}
			.highlight .highlight--tag{
				color: #888;
				transition: color .6s ease;
			}
			.highlight:hover .highlight--tag{
				color: #ededed;
				transition: color .6s ease;
			}
			h2{
			  font-family: $font-body;
				font-size: 2.6rem;
				text-transform: uppercase;
				margin-top: 2.2rem;
				letter-spacing: 0.23rem;
				// font-weight: 500;

			  font-weight: 100;
			  // font-size: 10vw;
			  font-variation-settings: 'wght' 700, 'wdth' 100;
			  // animation: breathe 4000ms 1 forwards;
			  animation-name: breathe;
			  animation-duration: 2s;
			  animation-timing-function: ease;
			  animation-delay: 1.4s;
			  animation-direction: normal;
			  animation-iteration-count: 1;
			  animation-fill-mode: forwards;
			  animation-play-state: running;
			}

			@keyframes breathe {
				0% { font-variation-settings: 'wght' 700, 'wdth' 100; }
				100% { font-variation-settings: 'wght' 100, 'wdth' 85; }
			}
			.popup .tagline p, #loadingText{
				font-weight: 500;
				font-size: 1.4rem;
				word-spacing: 0.5rem;
				line-height: 2;
				text-align: center;
				/* margin-bottom: 2rem; */
			}
			.notice-intro{
				font-size: .75rem;
				line-height: 1.4rem;
				margin: 1.5rem auto;
			}
			#ExploreWork-btn{
				margin-top: 2rem;
			}
			@keyframes animatePopup3D {
				0% {
					transform: translate(-50%, -50%) translateZ(0) rotateY(0) rotateX(0) scale(1.15);
					opacity: 0;
				}

				100% {
					transform: translate(-44%, -50%) translateZ(100px) rotateY(8deg) rotateX(6deg) scale(.92);
					opacity: 1;
				}
			}
			#loadingText{
				font-family: 'Fira Code', 'Source Code Pro', 'consolas', 'DejaVu Sans Mono', 'Source Code Pro', 'Courier New', courier, monospace;
			}
			.popup .tagline p{
				color: #777;
				transition: color .4s ease;
				font-family: 'Ubuntu', 'Open Sans', 'Segoe UI', 'Helvetica Neue', 'Droid Sans Serif', 'Roboto', Arial, sans-serif;
			}
			.popup p{
				font-weight: 300;
				font-size: 1rem;
				word-spacing: 0.2rem;
				line-height: 2;
				color: #9e9e9e;
			}
			#content{/* display:none; */}
			.warning-symbol{
				width: 100px;
				margin-right: 2rem;
				flex-basis: 20%;
				opacity: 0;

				animation-name: blink;
				animation-duration: .2s;
				animation-delay: .7s;
				animation-timing-function: ease;
				animation-direction: normal;
				animation-iteration-count: 5;
				animation-fill-mode: forwards;
				animation-play-state: running;
			}
			@keyframes blink { 0% { opacity: 0 } 100% { opacity: 1; } }
			.abbr {
				position: relative;
				border-bottom: 1px dashed #FFF200;
				cursor:help;
			}
			.abbr:hover:after {
				content: attr(title);
				position: absolute;
				bottom: 150%;
				left: 0;
				display: block;
				padding: 1em;
				font-size: .7rem;
				background: rgba(0,0,0,.9);
				display: block;
				/* max-width: 200px; */
				min-width: 110px;
				/* width: auto; */
				box-sizing: content-box;
		    word-spacing: 0.1rem;
			}
			#info, #notCompatible {
				position: absolute;
				top: 0px;
				width: 100%;
				padding: 10px;
				box-sizing: border-box;
				text-align: center;
				-moz-user-select: none;
				-webkit-user-select: none;
				-ms-user-select: none;
				user-select: none;
				z-index: 1; /* TODO Solve this in HTML */
				pointer-events: none;
				z-index: 200;
			}
			#info{
				background-color: rgba(255,255,255, .4);
				color: #509ceb;
				font-style: italic;
				font-family: 'Rajdhani', 'Avenir Next Condensed', 'Dosis', 'Encode Sans Semi Condensed', 'Arial', sans-serif;
			}
			#readyToStart{
				display: none;
			}
		</style>
	</head>
	<body>
		<noscript>
		 This website heavily uses javascript. You need to enable it if you want to see the content
		</noscript>
		<div class="visuallyhidden">
			<?php include("./assets/img/techno-icons.svg"); ?>
		</div>
		<div id="DOMElTimeline"></div>
		<?php include "./modules/legend.php" ?>
		<div id="canvasScene">
			<!-- <canvas id="mainScene"></canvas> -->
			<canvas id="timeline"></canvas>
		</div>
		<?php include "./modules/intro.php" ?>


		<div id="info">
			Beta version
		</div>

		<?php include "./modules/option-menu.php" ?>
		<?php include "./modules/job-detail.php" ?>

		<script type="text/javascript">
			// loading sentences when loading
			const LoadingPhrases = [
			  "Checking your browser capabilities",
			  "Warming up your system",
			  "Loading librairies",
			  "Preparing hardware acceleration",
			  "Optimizing assets",
			  "Configuring 3d scene",
			  "Fetching data",
			  "Downloading assets",
			  "Mounting components",
			  "Instanciating meshes",
			  "Building up the scene",
			  "Rendering 3d models",
			  "Texturing the models",
			  "Lighting up the scene",
			  "Finetuning the experience"
			];
			let phraseCounter = 0
			var intervalListener = self.setInterval(changeLoadingText, 5000);
			const loadingText = document.getElementById("loadingText");
			function changeLoadingText() {
				loadingText.textContent = LoadingPhrases[phraseCounter] + "...";
				phraseCounter++;
				if (phraseCounter >= LoadingPhrases.length) phraseCounter = 0;
			}
			window.onload = function () {
				window.clearInterval(intervalListener);
				// document.getElementById("readyToStart").addEventListener("click", () => {
				// 	document.getElementById("intro").style.display = "none";
				// }, true)
			}
		</script>

		<script type="module" src="./assets/js/bundle_project.js"></script>
	</body>
</html>
