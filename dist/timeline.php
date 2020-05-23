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
				height: 100vh;
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
			.legend{
				position: fixed;
				left: 3rem;
				bottom: 3rem;
				width:30%;
				height: 20vh;
				background: #f5f5f5;
				z-index: 50;
				padding:1rem;
				box-sizing: border-box;
				box-shadow:
				  0 2.8px 2.2px rgba(0, 0, 0, 0.02),
				  0 6.7px 5.3px rgba(0, 0, 0, 0.028),
				  0 12.5px 10px rgba(0, 0, 0, 0.035),
				  0 22.3px 17.9px rgba(0, 0, 0, 0.042),
				  0 41.8px 33.4px rgba(0, 0, 0, 0.05),
				  0 100px 80px rgba(0, 0, 0, 0.07);
			}
			.qub{
				width: 20px;
				height: 20px;
				margin-right:1rem;
			}
			.qub.main{
					background-color: #11517F;
			}
			.qub.work{
					background-color: #00ffff;
			}
		</style>
	</head>

	<body>
		<div id="timeline"></div>
		<div id="domEl"></div>
		<div class="legend">
			<h3 style="margin-top:.3rem;">Legend</h3>
			<div style="display:flex;justify-content:flex-start;flex-direction:row;margin-bottom:1rem;">
				<div class="qub main"> </div>
				<div class="text">Main thread</div>
			</div>
			<div style="display:flex;justify-content:flex-start;flex-direction:row">
				<div class="qub work"> </div>
				<div class="text">Work</div>
			</div>
		</div>
    <script src="https://unpkg.com/vue"></script>
		<script type="module" src="./assets/js/bundle.js"></script>

	</body>
</html>