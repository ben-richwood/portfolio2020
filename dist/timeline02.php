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
				height: 100vh;
				margin: 0;
			  /* background-color: #000; */
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
			#timeline{ display: none; }
			#canvasScene{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				z-index: 10
			}
			div.screenGraphic{
				font-size: 2rem;
				opacity: .9;
				color: #b7b7b7;
				font-family: "Inter";
				font-weight: 900;
				padding: 2rem;
				box-sizing: border-box;
				background-color: rgba(0,0,0,.97);
			}
			#optionMenu{
				display:none;
			}
			.hide, .ieDetected{
				display:none;
			}

			.intro-second-part.hide{
				display: block;
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
				padding: 4rem;
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
			.tagline{
				margin: 2rem auto;
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
				word-spacing: 0.5rem;
				line-height: 2;
				color: #9e9e9e;
			}
			#content{/* display:none; */}
			.warning-symbol{
				width: 100px;
				margin-right: 2rem;
				flex-basis: 30%;
				opacity: 0;

				animation-name: blink;
				animation-duration: .2s;
				animation-delay: 1.4s;
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
			.element{
				/* box-shadow: 0px 0px 12px rgba(0,255,255,0.75); */
				border: 1px solid transparent;
			}
			.element:hover {
				/* box-shadow: 0px 0px 12px rgba(0,255,255,0.75); */
				border: 1px solid rgba(127,255,255,0.75);
			}
		</style>
	</head>
	<body>
		<noscript>
		 This website heavily uses javascript. You need to enable it if you want to use it properly
		</noscript>
		<div id="DOMElTimeline"></div>
			<div id="legend">
				<div class="legend" v-show="showLegend">
					<h3 style="margin-top:.3rem;">Legend</h3>
					<!-- <div class="legend-row">
						<div class="qub main"> </div>
						<div class="text">Main thread</div>
					</div>
					<div class="legend-row">
						<div class="qub work"> </div>
						<div class="text">Work</div>
					</div>
					<div class="legend-row">
						<div class="qub freelance"> </div>
						<div class="text">Freelance</div>
					</div>
					<div class="legend-row">
						<div class="qub study"> </div>
						<div class="text">Study</div>
					</div> -->
					<div class="">
						<button @click="techno">Techno</button>
					</div>
					<div class="">
						<button @click="software">Software</button>
					</div>
					<div class="">
						<button @click="timeline">Timeline</button>
					</div>
					<div class="">
						<button @click="all">All</button>
					</div>
				</div>

				<div class="key-legend">
					<div class="key-block">
						<div class="key" style="padding-right:6rem;">{{ keyMap.accept[0] }}</div>
						<label for="">Show/hide legend</label>
					</div>
					<div class="key-block">
						<div class="key">{{keyMap.option[0]}}</div>
						<label for="">menu</label>
					</div>
					<div class="key-block">
						<div class="key">C</div>
						<label for="">Console</label>
					</div>
					<div class="key-block">
						<div class="key">up</div>
						<label for="">Nav</label>
					</div>
				</div>


			</div>
		<div id="canvasScene">
			<canvas id="mainScene"></canvas>
			<canvas id="timeline"></canvas>
		</div>
		<!-- <div id="timeline"></div> -->
		<div id="intro" :class="{ 'no-intro' : isIntroOff }">
			<div class="popup highlight">

				<div v-show="ieDetected" class="ieDetected">
					Internet Explorer is not supported. Please switch to Chrome or Firefox.
				</div>

				<div v-show="displayConfig">
					<div>
						<h2 class="tc">Ben's portfolio</h2>
						<!-- <p class="mt-30 tc">Hey there, here's my portfolio</p> -->
					</div>
					<div class="tagline"><p>I'm <span class="highlight--tag">project manager</span> and <span class="highlight--tag">digital producer</span> who puts <span class="highlight--tag">code</span> and <span class="highlight--tag">design</span> into my daily work.</p></div>
					<div>
						<p>While my main job is Project manager and Digital Producer, I use code and design capabilities to prototype ideas, lead preliminary researches and feasibilities studies (<span class="abbr" title="Proof Of Concept">POC</span>), automate and improve internal tools.</p>
						<p>I also do freelance work.</p>
						<p>This portfolio has been designed with a single idea in mind: to show evidence and examples of project I made for every skills I state in my portfolio.</p>
					</div>
					<div id="readyToStart" v-show="isReadyToStart">
						<div class="containerSheen">
							<button id="ExploreWork-btn" @click="exploreWork" class="button button--sheen-l"><span>Enter</span></button>
						</div>
					</div>
					<div id="notCompatible"></div>
				</div>

				<div :class="displayConfig ? '' : 'intro-second-part'" class="hide">
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
					<div class="notice-intro">
						Choosing <span class="perf-class">High performance</span> turns on better lighting, shadows, particles, some post-processing effects and loads additional libraries. So it will takes a bit more time to download and initiate.<br>
						You can tweak some of the values in the option menu (in the Graphics section).<br>
						You can also reduce your browser's window size to improve performances.
					</div>
					<div id="loadingText">{{ loadingText }}</div>
					<div id="loading">
						<div class="progress">
							<div ref="loadingBar" class="progressbar" v-bind:style="{ transform: 'scaleX(' + progress + ')' }"></div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<div id="info">
			DEBUG
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
						<!-- <li><button :class="currentSubmenu == 5 ? 'active' : ''" class="large-button left-align" @click="timeline">{{ canvasMenuLabel }}</button></li> -->
						<li><button class="large-button left-align" @click="close"><img class="returnArrow" src="./assets/img/icons/return.svg" alt="back"> Back</button></li>
					</ul>
				</div>
				<div class="rightSettings">
					<div v-if="currentSubmenu == 0" id="config">
						<h3 class="tc">Config</h3>
						<div class="notice">
							<p class="tc">Adjust the general settings at your please</p>
						</div>
						<ul>
							<div class="inputGroup">
						    <input id="radio1" name="radio" @click="changeLinkBehavior" v-model="linksNewTab" type="checkbox"/>
						    <label for="radio1">Open all links in a new tab</label>
						  </div>
						  <div class="inputGroup">
						    <input id="radio2" @click="muteSound" name="radio" type="checkbox"/>
						    <label for="radio2">Mute sound</label>
						  </div>
						</ul>
					</div>
					<div v-else-if="currentSubmenu == 1" id="controls">
						<h3 class="tc">Controls</h3>
						<div class="notice">
							<p class="tc">Change the controls</p>
						</div>
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
						<div class="keyMap">
							<div class="key">{{ keyMap.option[1] }}</div>
							<div class="keyFeature">Open/close option menu</div>
						</div>
						<div class="keyMap">
							<div class="key">{{ keyMap.prev[1] }}</div>
							<div class="keyFeature">Previous project</div>
						</div>
						<div class="keyMap">
							<div class="key">{{ keyMap.next[1] }}</div>
							<div class="keyFeature">Next project</div>
						</div>
						<div class="keyMap">
							<div class="key">{{ keyMap.accept[1] }}</div>
							<div class="keyFeature">open project details</div>
						</div>
						<!-- <img src="./assets/img/icons/keyboard.svg" alt="keyboard configuration"> -->
					</div>
					<div v-else-if="currentSubmenu == 2" id="graphics">
						<h3 class="tc">Graphics</h3>
						<div class="notice">
							<p class="tc">You can switch to low performances if the animation is not smooth. To switch to high perf, please refresh the page</p>
						</div>
						<ul>
							<li>Switch to Low Resolution</li>
							<div class="inputGroup">
								<input id="antialias" v-on:click="changeConfig('antialias')" name="radio" type="checkbox" v-model="antialias" />
								<label for="antialias">Antialias</label>
							</div>
							<div class="inputGroup">
								<input id="precision" v-on:click="changeConfig('precision')" name="radio" type="checkbox" v-model="precision" />
								<label for="precision">Enhanced shader precision</label>
							</div>
							<div class="inputGroup">
								<input id="isShadowEnabled" v-on:click="toggleShadows()" name="radio" type="checkbox" v-model="isShadowEnabled" />
								<label for="isShadowEnabled">Turn on/off shadows</label>
							</div>
						</ul>
					</div>
					<div v-else-if="currentSubmenu == 3" id="stat">
						<h3 class="tc">Stats</h3>
						<div class="notice">
							<p class="tc">Some statistic about your current session</p>
							<p class="tc"><b>Not any of these statistics are saved in any ways.</b></p>
						</div>
						<p>Ellapsed time from beginning of the session: {{ t1 }}</p>
						<p>Your GPU: {{ gpu }}</p>
						<p style="white-space: pre;">{{ fullConfig | displayArr }}</p>
					</div>
					<div v-else-if="currentSubmenu == 4" id="credit">
						<h3 class="tc">Credits</h3>
						<div class="notice">
							<p class="tc">This portfolio is built on these technologies:</p>
						</div>
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
							<li>Timeline: it's largely inspired by the summary ending each mission in Detroit: Become Human</li>
							<li>Lots of help and code snippets from <a href="https://threejs.org/" target="_blank" title="link to ThreeJS official documentation">ThreeJS official documentation</a> and <a href="https://threejsfundamentals.org/" target="_blank" title="link to threejsfundamentals">threejsfundamentals</a> </li>
						</ul>
						<p class="tl">The source code is accessibe on my GitHub:<br><a href="https://github.com/ben-richwood/">Portfolio2020</a></p>
					</div>
				</div>
			</div>
		</div>
		<script type="module" src="./assets/js/bundle_project.js"></script>

	</body>
</html>
