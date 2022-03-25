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

	<link type="text/css" rel="stylesheet" href="./assets/css/main.css?v=0.1.1" defer>
	<!-- <link type="text/css" href="./assets/css/main.css" rel="preload" as="style"> -->
	<link href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap" rel="stylesheet" rel="preload" as="style">
	<style type="text/css">
    .absolute{
    	position: absolute;
    	top: 0;
    	left: 0;
    	z-index: 10;
    }
    .relative{
    	position: relative;
    }
    .d-none{
      display: none;
    }
    .pointer-none{
      pointer-events: none;
    }
    .tc{text-align: center !important;}
    .tl{text-align:left !important;}
    .tr{text-align:right !important;}
		body{
			height: 100vh;
			margin: 0;
			background: rgb(237,237,237);
			background: linear-gradient(90deg, rgba(237,237,237,1) 0%, rgba(171,171,171,1) 100%);
		  color: #fff;
      line-height: 1;
		  font-family: 'Inter var', 'Ubuntu', 'Open Sans', 'Segoe UI', 'Helvetica Neue', 'Droid Sans Serif', 'Roboto', Arial, sans-serif;
		  font-size: 14px;
		  letter-spacing: -0.007em;
		  line-height: 20px;
		  /* For hardware acceleration */
		  transform: translate3d(0, 0, 0);
      overflow-y: hidden;
		}
		#canvasScene{
			width:100%;
			height:100%;
			z-index: 10
		}
		.hide, .ieDetected{ display:none; }
		.intro-second-part.hide{ display: block; }
		#intro{
			width:100%;
			/* height:100vh; */
			z-index:500;
			background-color: rgba(0,0,0,.97);
			transform-style: preserve-3d;
			opacity: 1;
      height: 100vh;
      overflow-y: auto;
      scroll-behavior: smooth;
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
		}
		.light h3, .light h2, .light label, .light button{
			color: #555;
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
		h2, .breathe{
			line-height: 1;
			font-size: 3rem;
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
			/* font-family: 'Ubuntu', 'Open Sans', 'Segoe UI', 'Helvetica Neue', 'Droid Sans Serif', 'Roboto', Arial, sans-serif; */
      font-family: 'Inter var', 'Ubuntu', 'Open Sans', 'Segoe UI', 'Helvetica Neue', 'Droid Sans Serif', 'Roboto', Arial, sans-serif;
      font-weight: 600;
      font-weight: 1.3rem;
      letter-spacing: 0.3px;
      line-height: 1.9;
      font-size: 1.6rem;
		}
		.popup p{
			font-weight: 300;
			font-size: 1.2rem;
			word-spacing: 0.2rem;
			line-height: 2;
			color: #9e9e9e;
	    text-align: justify;
      font-family: 'Inter var', 'Ubuntu', 'Open Sans', 'Segoe UI', 'Helvetica Neue', 'Droid Sans Serif', 'Roboto', Arial, sans-serif;
      font-weight: 400;
      letter-spacing: 0.3px;
		}
		.header{
			position: fixed;
			top: 2rem;
			right: 1rem;
			z-index: 510;
			display: inline-block;
	    text-align: right;
			width: 200px;
		}
		@media screen and (min-width: 768px){
		  .header {
		    right: 3rem;
		    top: 3rem;
		  }
	  }
		.header a{
			color: white;
			background: linear-gradient(90deg, #11507d 0%, #1875bb 100%);
			padding: 0.6rem 0.7rem;
			border-radius: 2px;
			position: relative;
		}

		.header a:hover{
			text-decoration: none;
		}
		.header span{
			z-index: 15;
		}
		.header svg{
			max-width: 15px;
			transform: rotate(90deg) translateY(6px);
			margin-left: 1rem;
			display: inline-block;
		}

		#loadingText, #ExploreWork-btn{
			margin-top: 2rem;
		}
		#loadingText{
			font-family: 'Fira Code', 'Source Code Pro', 'consolas', 'DejaVu Sans Mono', 'Source Code Pro', 'Courier New', courier, monospace;
		}
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
		#notCompatible {
			width: 100%;
			padding: 10px;
			box-sizing: border-box;
			text-align: center;
			-moz-user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;
			user-select: none;
			z-index: 200;
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
	</style>
</head>
	<body class="relative">
		<noscript>
		 This website heavily uses javascript. You need to enable it if you want to see the content
		</noscript>

    <div class="header">
      <a class="scroll" href="#ExploreWork-btn">
        <span>
          Projects <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet"><polyline style="fill:none;stroke:#FFFFFF;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="49.69,17.2 150.79,99.66 54.24,181.29 "/></svg>
        </span>
      </a>
    </div>
    <div id="app">
      <router-view></router-view>
    </div>
    <?php include "./modules/intro.php" ?>
    <div class="visuallyhidden">
			<?php include("./assets/img/techno-icons.svg"); ?>
		</div>

		<div class="ieDetected">
      Internet Explorer is not supported. Please switch to Chrome or Firefox.
    </div>

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
	</body>
</html>
