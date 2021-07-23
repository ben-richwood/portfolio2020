<!DOCTYPE html>
<html lang="en-GB" prefix="og: http://ogp.me/ns#">
<head>
		<!-- BASIC INFO -->
   	<title>Richwood | portfolio</title>
   	<meta name="author" content="Ben Richwood">
   	<meta name="keywords" content=" Portfolio, Startup developer, Richwood, webdesign, graphist, graphiste, html5, javascript, interactive, webgl, threejs, vuejs, php, CG, Computer Graphic">
   	<meta name="description" content="Check out my new portfolio, with an 3D interactive map of my projects">
		<meta charset="utf-8">

		<!-- FAVICONS -->
   	<link rel="icon" href="assets/img/flavicon.ico">
   	<link rel="apple-touch-icon" href="assets/img/flavicon.ico">

	<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	<link rel="manifest" href="./manifest.json">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://portfolio.richebois.fr/" />
	<meta property="og:title" content="Richwood | portfolio" />
	<meta property="og:description" content="Check out my new portfolio, with an 3D interactive map of my projects" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Portfolio" />

	<meta property="og:image" content="https://portfolio.richebois.fr/assets/img/opengraph/landscape.png" />
	<meta property="og:image:secure_url" content="https://portfolio.richebois.fr/assets/img/opengraph/landscape.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="An overview of the 3d interactive project map" />

	<meta property="og:image" content="https://portfolio.richebois.fr/assets/img/opengraph/square.png" />
	<meta property="og:image:secure_url" content="https://portfolio.richebois.fr/assets/img/opengraph/square.png" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="1200" />
	<meta property="og:image:alt" content="An overview of the 3d interactive project map" />

	<link type="text/css" rel="stylesheet" href="./assets/css/main.css?v=0.1.1">
	<!-- <link type="text/css" rel="preload" href="./assets/css/main.css" as="style"> -->
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
		#canvasStats{
			display: none;
		}
		.hide, .ieDetected{ display:none; }
		.intro-second-part.hide{ display: block; }
		#intro{
			position:absolute;
			top:0;
			left:0;
			width:100%;
			/* height:100vh; */
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
		.margin-section{
			margin-top: 2rem;
			margin-bottom: 2rem;
		}
		.row h3{
			margin-top: 0;
		}
		#intro .container{
	    background: url(assets/css/line.svg) 0 0/100% repeat;
		}
		#intro .container{
			width: 100%;
			max-width: 900px;
			padding-left: 0;
			padding-right: 15px;
			padding-left: 15px;
			margin-right: auto;
			margin-left: auto;
	    box-sizing: border-box;
			/* border-left: 1px solid #888; */
			padding: 5rem 15px;
		}
		#intro .light{
			background-color: #FFF;
			color: black;
			/* padding: 5rem 0 */
		}
		.light h3, .light h2, .light label, .light button{
			color: #555;
		}

		.borderline{
			position: relative;
		}
		.borderline:before{
			content: '';
			width: 3px;
			height: 100%;
			position: absolute;
			left: -16px;
			top: 0;
	    background: linear-gradient(180deg, rgba(17,80,125,1), rgba(24,117,187,1));
		}
		.tc{text-align: center !important;}
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
		@media (hover: none) {
			.highlight .highlight--tag{
				color: #ededed;
			}
		}
		.highlight:hover .highlight--tag{
			color: #ededed;
			transition: color .6s ease;
		}
		h2{
			line-height: 1;
			font-size: 2.6rem;
			text-transform: uppercase;
			margin-top: 2.2rem;
			letter-spacing: 0.23rem;

		  font-weight: 100;
		  font-variation-settings: 'wght' 700, 'wdth' 100;
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
	    text-align: justify;
		}
		.header{
			position: fixed;
			top: 3rem;
			right: 3rem;
			z-index: 510;
			display: inline-block;
	    text-align: right;
			width: 200px;
		}
		.header a{
			color: white;
			background: linear-gradient(90deg, #11507d 0%, #1875bb 100%);
			padding: 0.6rem 0.7rem;
			border-radius: 2px;
			position: relative;
		}
		/* .header a:before{
			content: '';
			background: linear-gradient(309.99deg,#00d4ff,#009ee8 50.5%,#07c 97.86%);
			opacity: 0;
			transition: opacity .3s ease;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
		} */
		.header a:hover{
			text-decoration: none;
		}
		/* .header a:hover:before{
			opacity: 1;
			transition: opacity .3s ease;
		} */
		.header span{
			z-index: 15;
		}
		.header svg{
			max-width: 15px;
			transform: rotate(90deg) translateY(6px);
			margin-left: 1rem;
			display: inline-block;
		}
		#ExploreWork-btn{
			width: 100% !important;
			/* background: linear-gradient(90deg, #11507d 0%, #1875bb 100%); */
			/* color: #11507d; */
			background: linear-gradient(90deg, #11507d 0%, #1875bb 100%);
			color: #FFFFFF;
			padding: 1rem 0;
			position: relative;
			transform-origin: 50% 50%;
			transform: scale(1);
			transition: transform .3s .08s cubic-bezier(0.25, 1, 0.5, 1);;
		}
		#ExploreWork-btn:hover{
			transform: scale(1.1);
			transition: transform .3s cubic-bezier(0.25, 1, 0.5, 1);;
		}
		#ExploreWork-btn:after {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			transform-origin: 50% 50%;
			background-image: url(assets/img/timeline/timeline_nw.svg), url(assets/img/timeline/timeline_ne.svg), url(assets/img/timeline/timeline_sw.svg), url(assets/img/timeline/timeline_se.svg);
			background-position: 0 0, 100% 0, 0 100%, 100% 100%;
			background-size: 12px 12px;
			background-repeat: no-repeat;
			transform: scale(1);
			transition: transform .3s cubic-bezier(0.25, 1, 0.5, 1);;
		}
		#ExploreWork-btn:hover:after {
			transform: scale(1.1, 1.5);
			transition: transform .3s .08s cubic-bezier(0.25, 1, 0.5, 1);;
		}
		#loadingText, #ExploreWork-btn{
			margin-top: 2rem;
		}
		@keyframes animatePopup3D {
		  0% {
		    transform: translate(-44%, -60%) translateZ(0px) rotateY(0) rotateY(16deg) scale(.92);
		    opacity: 0;
		  }

		  100% {
		    transform: translate(-44%, -50%) translateZ(100px) rotateY(0) rotateX(0) scale(1);
		    opacity: 1;
		  }
		}
		#loadingText{
			font-family: 'Fira Code', 'Source Code Pro', 'consolas', 'DejaVu Sans Mono', 'Source Code Pro', 'Courier New', courier, monospace;
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
		#infoBeta, #notCompatible {
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
		#infoBeta{
			display: none;
			background-color: rgba(255,255,255, .4);
			color: #509ceb;
			font-style: italic;
			font-family: 'Rajdhani', 'Avenir Next Condensed', 'Dosis', 'Encode Sans Semi Condensed', 'Arial', sans-serif;
		}
		.techno-svg{
		  display: inline-block;
		  width: 40px;
		  max-height: 30px;
		  margin-right: .4rem;
		}
		.techno-svg.large{
			width: 50px;
			max-height: 45px;
		}
		.techno-svg.very-large{
			width: 80px;
			max-height: 80px;
			margin-right: 1.4rem;
		}
		.disabled{
			opacity: .4;
			cursor: not-allowed;
		}
		svg text, svg tspan{
			font-family: 'Rajdhani', 'Avenir Next Condensed', 'Dosis', 'Encode Sans Semi Condensed', 'Arial', sans-serif;
			color: white;
			fill: white;
		}
		#brightness{
		  position: fixed;
		  z-index: 200;
		  top:0;
		  left: 0;
		  width: 100vw;
		  height: 100vh;
		  background: #000;
		  pointer-events: none;
			opacity: 0;
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
		<div id="canvasStats"></div>
		<?php include "./modules/intro.php" ?>


		<div id="infoBeta">
			Beta version
		</div>

		<div id="brightness"></div>

		<div class="ieDetected">
      Internet Explorer is not supported. Please switch to Chrome or Firefox.
    </div>

		<?php include "./modules/option-menu.php" ?>
		<?php include "./modules/job-detail.php" ?>

		<script type="text/javascript">
			// loading sentences when loading
			const LoadingPhrases = [
			  "Checking your browser capabilities",
			  "Warming up your system",
				"Downloading assets",
				"Fetching data",
			  "Loading librairies",
			  "Preparing hardware acceleration",
			  "Optimizing assets",
				"Tips: use the right click to pan, and left click to select a project ",
				"Tips: you can adapt settings in the option menu (spacebar)",
				"Tips: Too many open tabs may slow down the experience",
			  "Configuring 3d scene",
			  "Mounting components",
			  "Instanciating meshes",
			  "Building up the scene",
				"Chrome - thanks to its V8 Javascript engine - gives a smooth experience",
			  "Rendering 3d models",
			  "Texturing the models",
				"To get a better experience, you can reduce the number of open tabs",
			  "Lighting up the scene",
				"There are few Easter eggs hidden on the website. Would you be able to find them? ;)",
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
				loadingText.style.display = "none";
				document.getElementById("readyToStart").classList.toggle("disabled");
			}
			<?php /*
			const allTabs = document.querySelectorAll(".tabs-nav .subtabs");
			// const allTabContent = document.querySelectorAll(".tabs > div");
			const mainTab = document.querySelector(".tabs");
			allTabs.forEach(function(e){
				e.addEventListener("click", function(evt){
					let currentTab = evt.target.getAttribute("data-tab");
					console.log(currentTab);
					let classTabName = `tabs tab-${currentTab}`;
					mainTab.className = classTabName;
					for (let i = 0; i < allTabs.length; i++ ){
						if (currentTab == i){
							allTabs[i].classList.add("active");
							// allTabContent[i].classList.add("active");
						} else {
							allTabs[i].classList.remove("active");
							// allTabContent[i].classList.remove("active");
						}
					}
				}, true);
			})
			*/ ?>
			// Vanilla JavaScript Scroll to Anchor
			// @ https://perishablepress.com/vanilla-javascript-scroll-anchor/

			// (function() {
			// })();
			scrollTo();

			function scrollTo() {
				const links = document.querySelectorAll('.scroll');
				links.forEach(each => (each.onclick = scrollAnchors));
			}

			function scrollAnchors(e, respond = null) {
				const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
				e.preventDefault();
				var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
				const targetAnchor = document.querySelector(targetID);
				if (!targetAnchor) return;
				const originalTop = distanceToTop(targetAnchor);
				window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
				const checkIfDone = setInterval(function() {
					const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
					if (distanceToTop(targetAnchor) === 0 || atBottom) {
						targetAnchor.tabIndex = '-1';
						// targetAnchor.focus();
						// window.history.pushState('', '', targetID);
						clearInterval(checkIfDone);
					}
				}, 100);
			}
		</script>

		<!-- <script type="module" src="./assets/js/bundle_project.js?v=0.1.0"></script> -->
		<script type="text/javascript">
			var param = window.location.search;
			console.log("param", param)
			if( (navigator.connection && navigator.connection.saveData && param !== "?mode=overrideSaveData") || param === "?mode=saveData"){
				const notCompatible = document.createElement('div');
				notCompatible.className = "not-compatible";
				const warn = document.createElement('P');
		    warn.innerHTML = "Your browser is configured as \"Save data\". However, this website heavily uses javascript and loads lots of external librairies, images etc.<br/>If you want to proceed further anyway, you can click this link:<br/><a class=\"color-link button\" style=\"color: white; -webkit-text-fill-color: white;\" href=\"?mode=overrideSaveData\">Relaunch portfolio</a>"
		      notCompatible.appendChild( warn );
		      document.getElementById('readyToStart').appendChild( notCompatible );
		      document.getElementById('ExploreWork-btn').className = "button disabled";
		      // notCompatible.style.display = "block";
			} else {
				var script = document.createElement('script');

				script.src = './assets/js/bundle_project.js?v=0.1.2';
				// script.setAttribute('defer', true)
				// Loaded successfully
				script.onload = function() {};
				// Loading failed
				script.onerror = function() { };

				// append new script to html
				document.body.appendChild(script);
			}
		</script>
		<!-- <script type="text/javascript" src="./assets/js/bundle_project.js?v=0.1.1"></script> -->
	</body>
</html>
