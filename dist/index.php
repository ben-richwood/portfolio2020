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
			}
			#canvasScene, #domEl{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:100%;
				z-index: 10
			}
			div#domEl{
				z-index: 38;
				pointer-events: none;
				display: block;
			}
			div#domEl div.detail:hover{
				color: red;
				pointer-events: initial
			}
			.screenGraphic, div.screenGraphicDefault{
				/* border: 2px solid red; */
				width: 498px;
				height: 310px;
				box-sizing: border-box;
			}
			.screenGraphicPic{
				width: 100%;
				height:auto;
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
			div.screenGraphicDefault{
				background-color: rgba(0,0,0,.97);
			}
			div.screenGraphicDefault > div {
				position: relative;
				width:100%;
				height:100%;
		    /* transform: scaleX(-1); */
			}
			.frameContainer{
				position: relative;
				width: 468px;
				height: 310px;
				background: transparent url(./assets/img/windowFrame.svg) 0px 10px / 100% no-repeat
			}
			.frameContainer img{
				position: absolute;
				max-width: 90%;
				top: 12%;
				left: 6%;
			}

			div.screenGraphicDefault h3{
				transform: translateY(-50%) translateZ(2px);
				z-index: 55;
				position: absolute;
				/* color: rgba(0,0,0,.7); */
				color: rgba(255,255,255,.7);
				top:17%;
				left:20%;
				width:80%;
			}
			div.screenGraphicDefault div.sractchImg{
				position: absolute;
				z-index: 60;
				width:100%;
				height:100%;
				background-image: url(./assets/img/textures/scratchTextures.png);
				opacity: .2;
			}

			div.screenGraphicDefault img{
				position: absolute;
				max-width: 80%;
				left:10%;
				bottom: 10%;
			}
			div.screenGraphicDefault img:nth-of-type(1){
				/* opacity: .7; */
				/* filter: blur(1.6px); */
			}
			div.screenGraphicDefault img:last-child{
				transform: translate(4px, -2px);
			}
			.movingStripe{
				position:absolute;
				z-index: 53;
				top:10%;left:15%;
				width:80%;
				height: 18%;
				background-color: #8EDFC5;
				box-shadow: 0 0 12px #8EDFC5;
				opacity: 0;
				transform: translateY(50%);

				animation-name: movingUpAndDown;
			  animation-duration: 3s;
			  animation-timing-function: ease;
			  animation-delay: .7s;
			  animation-direction: alternate;
			  animation-iteration-count: infinite;
			  animation-fill-mode: none;
			  animation-play-state: running;

				animation-direction: alternate;
			  animation-iteration-count: infinite;
			  animation-fill-mode: none;
			  animation-play-state: running;
			}
			@keyframes movingUpAndDown {
				0% {
					opacity: 0;
					transform: translateY(50%);
				}
				8% {
					opacity: 1;
				}
				12% {
					opacity: 0;
				}
				20% {
					opacity: 1;
				}
				50% {
					transform: translateY(50%);
				}
				55% {
					transform: translateY(120%);
				}
				80%{opacity: 1;}
				88% {
					opacity: 0;
				}
				94% {
					opacity: 1;
				}
				100% {
					opacity: 0;
					transform: translateY(120%);
				}
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
				/* transform: translate(-44%, -50%) translateZ(100px) rotateY(8deg) rotateX(6deg) scale(.92); */
				animation-name: animatePopup3D;
			  animation-duration: .7s;
			  animation-timing-function: ease;
			  animation-delay: .7s;
			  animation-direction: normal;
			  animation-iteration-count: 1;
			  animation-fill-mode: forwards;
			  animation-play-state: running;
				transform: translate(-50%, -50%) translateZ(0) rotateY(0) rotateX(0) scale(1.15);
				opacity: 0;
			}
			.popup .tagline p, #loadingText{
				font-weight: 500;
				font-size: 1.4rem;
				word-spacing: 0.5rem;
				line-height: 2;
				text-align: center;
				/* margin-bottom: 2rem; */
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
			}
		</style>
	</head>
	<body>
		<noscript>
		 This website heavily uses javascript. You need to enable it if you want to use it properly
		</noscript>
		<div id="domEl"></div>
		<div id="canvasScene">
			<canvas id="canvas"></canvas>
		</div>
		<!-- <div id="timeline"></div> -->
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
						Choosing <span class="perf-class">High performance</span> turns on better lighting, shadows, particles, some post-processing effects and loads additional libraries. So it will takes a bit more time to download and initiate.<br>
						You can tweak some of the values in the option menu (in the Graphics section).<br>
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
				<h3>{{ content.name }}</h3>
				<span>{{content.category}}</span>
				<div class="">{{ content.techno | arraySpan }}
				</div>
				<div class="">
					<a class="link-call-to-action" :href="content.link">Visit the Website</a>
				</div>
				<div v-html="content.description"></div>
				<div>
					<h4>{{ specTitle }}</h4>
				</div>
				<div v-html="content.speciality"></div>
			</div>
		</div>

		<div class="interactiveButtons displayProjectNames" v-show="isDisplayed" id="paradeAcross">
			<div class="tc"> Project </div>
			<div class="parade-accross">
				<div class="previous">
					<button class="" @click="changeProject(-1)"><img src="./assets/img/arrow.svg" alt="previous project"></button>
				</div>
				<div class="project-title">
					<button class="button" @click="openProject()"><span>{{ currentProject.name }}</span></button>
				</div>
				<div class="next">
					<button class="button" @click="changeProject(1)"><img src="./assets/img/arrow.svg" alt="next project"></button>
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
						<li><button :class="currentSubmenu == 5 ? 'active' : ''" class="large-button left-align" @click="timeline">{{ canvasMenuLabel }}</button></li>
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

		<!-- VUE -->
    <!-- <script src="https://unpkg.com/vue"></script> -->
		<script type="module" src="./assets/js/bundle.js"></script>

	</body>
</html>
