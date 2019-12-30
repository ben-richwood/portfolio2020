<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Richwood portfolio</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link type="text/css" rel="stylesheet" href="./assets/css/main.css">
		<style type="text/css">
			body{
				perspective: 60em;
			}
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
				width: 60%;
				max-width: 850px;
				/* height:50%; */
				left:50%;
				top:50%;
				transform: translate(-44%, -50%) translateZ(100px) rotateY(8deg) rotateX(6deg) scale(.92);
				/* color: #777; */
			}
			.popup .tagline p, #loadingText{
				font-weight: 500;
				font-size: 1.4rem;
				word-spacing: 0.5rem;
				line-height: 2;
				text-align: center;
				/* margin-bottom: 2rem; */
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
				word-spacing: 0.5rem;
				line-height: 2;
				color: #9e9e9e;
			}
			/* .popup div.tagline p span{
				color: #777;
				transition: color .6s ease;
			}
			.popup:hover div.tagline p span{
				color: #dadada;
				transition: color .6s ease;
			} */
			#content{/* display:none; */}
			.warning-symbol{
				width: 100px;
				margin-right: 2rem;
				flex-basis: 30%;

				animation-name: blink;
				animation-duration: .25s;
				animation-timing-function: ease;
				animation-delay: .5s;
				animation-direction: normal;
				animation-iteration-count: 3;
				animation-fill-mode: forwards;
				animation-play-state: running;
			}
			@keyframes blink { 0% { opacity: 0 } 100% { opacity: 1; } }
			.abbr {
				position: relative;
				border-bottom: 1px dashed #FFF200;
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
			}
			/* canvas{ filter: blur(7px); } */
		</style>
	</head>
	<body>
		<noscript>
		 This website heavily uses javascript. You need to enable it if you want to use it properly
		</noscript>
		<div id="intro" :class="{ 'no-intro' : isIntroOff }">
			<div class="popup highlight">
				<div v-show="ieDetected">
					Internet Explorer is not supported. Please switch to Chrome or Firefox.
				</div>
				<div v-if="displayConfig">
					<h2 class="tc">Ben's portfolio</h2>
					<h3 class="tc">Configuration</h3>
					<div class="flex-row">

						<img src="./assets/img/warning.svg" alt="warning icon" class="warning-symbol">
						<div style="flex-basis: auto;">
							The website has an intensive usage of Javascript - reactive layout and real-time 3d rendering.<br><span class="highlight--tag">{{ config }}</span> (your <span class="abbr" title="Graphics Processing Unit - aka your graphic card">GPU</span>) has been detected on your computer; regarding this, <span class="highlight--tag">{{ whichConfig() }}</span> is recommended for rendering.<br>
							<div v-show="isMobile">Morevoer, you're on mobile or tablet, which will make the animation less smooth.</div>
						</div>
					</div>
					<div class="flex-row mt-30 middleBar">
						<button class="large-button" @click="choosePerf(true)" ref="highPerf">High Performance</button><button class="large-button" @click="choosePerf(false)" ref="lowPerf">Low Performance</button>
					</div>
					<div class="mt-30">
						Choosing <span class="perf-class">High performance</span> turns on better lighting, particles, some post-processing effects and loads an additional library to improve parallel computation for GPU. So it will takes a bit more time to download and initiate.<br>
						You can also reduce your browser's window size to improve performances.
					</div>
					<!-- <div>
            <input type="checkbox" name="rememberPerfQuality" class="styled-checkbox" @click="cookie_config()">
            <label for="remember_config">Remember my performance configuration.</label>
					</div> -->
					<div id="notCompatible"></div>
				</div>
				<div v-else>
					<div>
						<h2 class="tc">Ben's portfolio</h2>
						<p class="mt-30 tc">Hey there, here's my portfolio</p>
					</div>
					<div class="tagline"><p>I'm <span class="highlight--tag">project manager and digital producer</span> who puts <span class="highlight--tag">code</span> and <span class="highlight--tag">design</span> into my daily work.</p></div>
					<div>
						<p>While my main job is Project manager and Digital Producer, I use code and design capabilities to prototype ideas, lead preliminary researches and feasibilities studies (<span class="abbr" title="Proof Of Concept">POC</span>), automate and improve internal tools ("+ see example")</p>
						<p>I also do freelance work.</p>
					</div>
					<div id="loadingText">{{ loadingText }}</div>
					<div id="loading">
						<div class="progress">
							<div ref="loadingBar" class="progressbar" v-bind:style="{ transform: 'scaleX(' + progress + ')' }"></div>
						</div>
					</div>
					<div id="readyToStart" v-show="isReadyToStart">
						<div class="containerSheen">
							<button id="closingPopup" @click="closePopup" class="button button--sheen-l"><span>Explore my works</span></button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="info">
			DEBUG
		</div>
		<div id="sidebar" v-bind:class="{ showSidebar : displaySidebar }">
			<div class="menu" :class="classAttribute">
				<button class="closePanel" @click="close">close</button>
				<h3>{{ content.title }}</h3>
				<div v-html="content.body"></div>
				<div>
					<h3>{{ content.specTitle }}</h3>
				</div>
				<div v-html="content.speciality"></div>
			</div>
		</div>

		<div class="interactiveButtons" v-show="isDisplayed" id="paradeAcross">
			<div class="tc"> Project </div>
			<div class="parade-accross">
				<div class="previous">
					<button class="" @click="changeProject(-1)"><img src="./assets/img/arrow.svg" alt="previous project"></button>
				</div>
				<div class="project-title">
					<button class="button" @click="readMore()"><span>{{ projects[currentProject].name }}</span></button>
				</div>
				<div class="next">
					<button class="" @click="changeProject(1)"><img src="./assets/img/arrow.svg" alt="next project"></button>
				</div>
				<!-- <button class="previous" @click="changeProject(-1)"><</button> -->
				<!-- <div class="project-title">{{ projects[currentProject].name }}</div> -->
				<!-- <button class="next" @click="changeProject(1)">></button> -->
			</div>
			<div class="read-more">
				<button  @click="option">Options</button>
			</div>
		</div>

		<div id="optionMenu" v-show="optionsOpen">
			<div class="menuContainer">
				<div class="leftSubmenuColumn">
					<ul>
						<li><button :class="currentSubmenu == 0 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(0)">Config</button></li>
						<li><button :class="currentSubmenu == 1 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(1)">Controls</button></li>
						<li><button :class="currentSubmenu == 2 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(2)">Graphics</button></li>
						<li><button :class="currentSubmenu == 3 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(3)">Stats</button></li>
						<li><button :class="currentSubmenu == 4 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(4)">Credit</button></li>
						<li><button class="large-button left-align" @click="close"><img class="returnArrow" src="./assets/img/icons/return.svg" alt="back"> Back</button></li>
					</ul>
				</div>
				<div class="rightSettings">
					<div v-if="currentSubmenu == 0" id="config">
						<h3 class="tc">Config</h3>
						<p class="tc">Adjust the general settings at your please</p>
						<ul>
							<li>Open all links in a new tab <button @click="linkBehavior">Switch</button></li>
							<div class="inputGroup">
						    <input id="radio1" name="radio" type="checkbox"/>
						    <label for="radio1">Open all links in a new tab</label>
						  </div>
						  <div class="inputGroup">
						    <input id="radio2" name="radio" type="checkbox"/>
						    <label for="radio2">Mute sound</label>
						  </div>
							<li>Mute sound <button @click="muteSound">Switch</button></li>
						</ul>
					</div>
					<div v-else-if="currentSubmenu == 1" id="controls">
						<h3 class="tc">Controls</h3>
						<p class="tc">Change the controls</p>
						<div class="inputGroup">
							<input id="kb_default" v-on:click="changeKbConfig('kb_default')" value="kb_default" name="radio" type="radio" v-model="kb_config"/>
							<label for="kb_default">Default</label>
						</div>
						<div class="inputGroup">
							<input id="kb_gamer" v-on:click="changeKbConfig('kb_gamer')" value="kb_gamer" name="radio" type="radio" v-model="kb_config"/>
							<label for="kb_gamer">Gamer</label>
						</div>
						<div class="inputGroup">
							<input id="kb_vim" v-on:click="changeKbConfig('kb_vim')" value="kb_vim" name="radio" type="radio" v-model="kb_config" />
							<label for="kb_vim">vim</label>
						</div>
						<?php echo file_get_contents("./assets/img/icons/keyboard.svg"); ?>
						<!-- <img src="./assets/img/icons/keyboard.svg" alt="keyboard configuration"> -->
					</div>
					<div v-else-if="currentSubmenu == 2" id="graphics">
						<h3 class="tc">Graphics</h3>
						<p class="tc">You can switch to low performances if the animation is not smooth. To switch to high perf, please refresh the page</p>
						<ul>
							<li>Switch to Low Resolution</li>
						</ul>
					</div>
					<div v-else-if="currentSubmenu == 3" id="stat">
						<h3 class="tc">Stats</h3>
						<p class="tc">Some statistic about your current session</p>
						<p class="tc"><b>Not any of these statistics are saved in any ways.</b></p>
					</div>
					<div v-else-if="currentSubmenu == 4" id="credit">
						<h3 class="tc">Credits</h3>
						<p class="tc">This portfolio is built on these technologies:</p>
						<ul>
							<li>ThreeJS</li>
							<li>VueJs</li>
							<li>SASS</li>
							<li>Webpack - not fully implemented yet</li>
							<li>GPU.js - not fully implemented yet</li>
							<li>Draco - not fully implemented yet</li>
						</ul>
						<p class="tc">This portfolio is inspired by these references</p>
						<ul>
							<li>Menu, options and overall layout<br>
								<ul>
									<li>A mix of Cyberpunk 2077 & Assassin's Creed: Black Flag </li>
									<li><a href="https://codepen.io/BuddyLReno/pen/boGRPO" title="Pen from Buddy Reno">Codepen</a>: material design-inspired checkboxes</li>
								</ul>
							<li>"Coding" environment: Assassin's Creed: Black Flag</li>
							<li>"Design" environment: Deus Ex (Human Revolution & Mankind Divided), plus the Humming bird cafe in HCMC, Vietnam.</li>
							<li>Timeline: it's inspired by the summary ending each mission in Detroit: Become Human</li>
						</ul>
						<p class="tl">The source code is accessibe on my GitHub:<br><a href="https://github.com/ben-richwood/">Portfolio2020</a></p>
					</div>
				</div>
			</div>
		</div>


		<!-- VUE -->
    <script src="https://unpkg.com/vue"></script>
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenLite.min.js" type='text/javascript'></script> -->

		<script type="module">
			import { Projects, Popup, Menu } from './assets/js/projects.js'

			var canvasTest = document.createElement('canvas');
			var gl;
			var debugInfo;
			var vendor;
			var rendererEval;
			const logStyle = "background-color:cyan;color:black;";

			try {
			  gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
			} catch (e) {
			}

			if (gl) {
			  debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
			  vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
			  rendererEval = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
			}

			// let mobileAndTabletcheck = function() {
			function mobilecheck () {
			  var check = false;
			  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
			  return check;
			};
			let isMobile = mobilecheck();
			msieversion();
			console.log(`%cIs your device a mobile/tablet? ${isMobile}`, logStyle);

			function msieversion() {
		    var ua = window.navigator.userAgent;
		    var msie = ua.indexOf("MSIE ");
				// If Internet Explorer, return version number
		    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		        // alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
						console.warn("%cIE browser detected ", parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))), logStyle);
						Popup.ieDetected = true;
		    } else  {
					// If another browser, return 0
		        console.log("%cno IE", logStyle);
		    }
		    return false;
			}

			Popup.config = rendererEval;
			Popup.isMobile = isMobile;
			// Popup.isMobile = true; // for testing purpose
			console.log(`%c${rendererEval}`, logStyle);
			console.warn(debugInfo);

			// const readyToStart = document.getElementById("readyToStart");
			const paradeAcross = document.getElementById("paradeAcross");

		</script>

		<script type="module" src="./assets/js/main.js"></script>

		<script type="module">
			// import { objectScene } from './assets/js/main.js';
			// import { Menu } from './assets/js/projects.js'

			// settings.sidebarMenu = document.querySelector("#sidebar .menu");
		</script>

	</body>
</html>
