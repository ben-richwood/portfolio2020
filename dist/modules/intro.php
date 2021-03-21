<div id="intro">
  <div class="popup highlight container">

    <div class="header">
			<a class="scroll" href="#ExploreWork-btn">
        <span>
  				Projects <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet"><polyline style="fill:none;stroke:#FFFFFF;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="49.69,17.2 150.79,99.66 54.24,181.29 "/></svg>
        </span>
			</a>
		</div>

    <!-- <div v-show="displayConfig"> -->
    <div class="row">
      <div class="col-12">
        <h2 class="tc">Ben's portfolio</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-2 margin-section"></div>
      <div class="col-12 col-md-6 margin-section">
        <!-- <div class="tagline"><p>I'm <span class="highlight--tag">project manager</span> and <span class="highlight--tag">digital producer</span> who puts <span class="highlight--tag">code</span> and <span class="highlight--tag">design</span> into my daily work.</p></div> -->
        <div class="tagline"><p>I'm a <span class="highlight--tag">Creative and Technical Digital Project Manager</span> with <span class="highlight--tag">coding</span> and <span class="highlight--tag">design</span> background.</p></div>

      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-1 margin-section"></div>
      <div class="col-12 col-md-10 margin-section">
        <div>
          <!-- <p>While my main job is Project manager and Digital Producer, I use code and design capabilities to prototype ideas, lead preliminary researches and feasibilities studies (<span class="abbr" title="Proof Of Concept">POC</span>), automate and improve internal tools.</p>
          <p>I also work on freelance contracts.</p>
          <p>This portfolio has been designed with a single idea in mind: to show evidence and examples of project I made for every skills I state in my portfolio.</p> -->

          <p><b>Self-learner</b> and <b>curious</b>, passionate about the digital world, I have the chance to develop my hard and soft skills through collaborations with my clients, business partners and colleagues around various technologies in line with the latest IT trends & Digital market.</p>

          <p class="mt-10">I use code and design skills to prototype ideas, lead preliminary researches and feasibilities studies (<span class="abbr" title="Proof Of Concept">POC</span>), automate and improve internal tools. Delivering game changing digital projects and can be relied upon to <b>always have the customer’s best interest at heart</b>.</p>

          <!-- <p class="mt-10">Always focusing on customer satisfaction by delivering a tailor-made approach and to leverage client expertise for organic business growth.</p> -->

          <p class="mt-10">Trough my activities as a digital producer, lead developer and freelancer, I work with <b>top 500 world’s largest companies and government organizations</b>.</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 margin-section">
        <h2>Coding</h2>
      </div>
      <div class="col-12 col-md-6 margin-section">
        <h3 class="borderline">Main stack</h3>
        <?php
          $arrImg = array("js", "vue", "react", "ruby");
          $count = count($arrImg);
          for( $i = 0; $i<$count; $i++ ) { ?>
            <svg xmlns="http://www.w3.org/2000/svg" class="techno-svg large" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <use xlink:href="#<?php echo $arrImg[$i]; ?>"/>
            </svg>
        <?php } ?>
        <p>I'm a fullstack developer, with a focus on frontend - delivering high-end and interactive interfaces.<br/>I'm mostly working with <b>Vue</b>, and sometimes <b>React</b>. For small projects and quick bootstrap, I set up <a target="_blank" class="color-link" href="https://github.com/alpinejs/alpine/">AlpineJS</a>.<br/>Regarding backend, I'm working with <b>Ruby on Rails</b> for large applications; and I use <b>Flask</b> to quickly set up a micro framework for smaller projects.</p>
      </div>
      <div class="col-12 col-md-6 margin-section">
        <h3 class="borderline">Secondary</h3>
        <?php
          $arrImg = array("python", "nodejs", "php", "wordpress");
          $count = count($arrImg);
          for( $i = 0; $i<$count; $i++ ) { ?>
            <svg xmlns="http://www.w3.org/2000/svg" class="techno-svg" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <use xlink:href="#<?php echo $arrImg[$i]; ?>"/>
            </svg>
        <?php } ?>
        <p>I occasionally worked with PHP <b>Laravel</b> and <b>NodeJS</b> (<b>Express</b>), and more largely with Python scripts for many sorts of automations.</p>
      </div>
      <div class="col-12 col-md-6"></div>
      <div class="col-12 col-md-6 margin-section">
        <h3 class="borderline">Others</h3>
        <?php
          $arrImg = array("bash", "unity");
          $count = count($arrImg);
          for( $i = 0; $i<$count; $i++ ) { ?>
            <svg xmlns="http://www.w3.org/2000/svg" class="techno-svg" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <use xlink:href="#<?php echo $arrImg[$i]; ?>"/>
            </svg>
        <?php } ?>
        <p>Among others, I worked with Android Studio and Xcode to prototype native mobile apps. And <a target="_blank" class="color-link" href="https://unity3d.com/">Unity</a> for AR app</p>
      </div>
    </div>

    <div class="row">
      <div class="col-12 margin-section">
        <h2>Design</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-2 margin-section">
        <?php
          $arrImg = array("illustrator", "photoshop", "indesign", "sketch");
          $count = count($arrImg);
          for( $i = 0; $i<$count; $i++ ) { ?>
            <svg xmlns="http://www.w3.org/2000/svg" class="techno-svg" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <use xlink:href="#<?php echo $arrImg[$i]; ?>"/>
            </svg>
        <?php } ?>
      </div>
      <div class="col-12 col-md-10 margin-section">
        <h3 class="borderline">Software</h3>
        <p>I made lots of webdesigns - especiallly for freelance; besides that, I use design software for my daily work as project manager/digital producer for many sorts of documents - wireframes, fllows, sitemaps, diagrams, technical approaches...</p>
      </div>
      <div class="col-12 col-md-2 margin-section">
        <?php
          $arrImg = array("blender");
          $count = count($arrImg);
          for( $i = 0; $i<$count; $i++ ) { ?>
            <svg xmlns="http://www.w3.org/2000/svg" class="techno-svg" style="transform: scale(1.5);" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <use xlink:href="#<?php echo $arrImg[$i]; ?>"/>
            </svg>
        <?php } ?>
      </div>
      <div class="col-12 col-md-6 margin-section">
        <h3 class="borderline">3D</h3>
        <p>I started 3D modeling as a hobbit, with <a target="_blank" class="color-link" href="https://www.blender.org/">Blender</a>. I'm using EEVEE for fast rendering, especially for animations; and occasionnaly Cycle for single shots.<br/>Some of my work on my <a target="_blank" class="color-link" href="https://www.artstation.com/richwood" class="color-link">ArtStation</a></p>
        <p>I also tried Rhino3D during my studies, and Keyshot for renders.</p>
        <p>In a near future, I would like to experiement with <a target="_blank" class="color-link" href="https://www.sidefx.com/products/houdini-apprentice/" class="color-link">Houdini Apprentice</a>.</p>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-10 margin-section">
        <h3 class="borderline">Clients</h3>
        <p>Some clients I worked with</p>
        <p>HM (Her Majesty - UK Government), BOSCH ASEAN, Spotify, Suntory PepsiCo and local Vietnamese clients</p>
        <div class="">
          <?php
          $arrImg = array("gov-uk", "bosch", "spotify", "pepsi", "tuborg");
          $count = count($arrImg);
          for( $i = 0; $i<$count; $i++ ) { ?>
            <svg xmlns="http://www.w3.org/2000/svg" class="techno-svg very-large" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <use xlink:href="#<?php echo $arrImg[$i]; ?>"/>
              </svg>
          <?php } ?>
        </div>
      </div>
    </div>

  </div>

  <div class="light">
    <div class="popup container">

      <div class="row">
        <div class="col-12 margin-section">
          <h2>Projects</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 margin-section">
          <p>The project page (link below) is an interactive map, where you can explore the different projects I worked on, and sort them by skills. I listed 20 of my most important projects over these 5 last years.</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <h3 class="borderline">Legend</h3>
        </div>
      </div>
      <div class="row margin-section">
        <div class="col-6">
          <b>Colors</b>
          <div style="padding-left: 2rem; margin-top: 1.5rem">
            <div class="major legend-item" style="max-width: 130px;">Major projects</div>
            <div class="minor legend-item" style="max-width: 130px;">Minor projects</div>
          </div>
        </div>
        <div class="col-6">
          <b>Icons</b>
          <div class="flex f-column f-start" style="align-items: flex-start;padding-left: 2rem;margin-top: 1.5rem">
            <div class="flex f-row f-start">
              <svg class="techno-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img"><path fill="#888" d="M44.667,157h111v12h-123V45h12V157z M166.667,34v114h-113V34H166.667z M144.568,90L112.81,51H77.766l31.759,39l-31.759,39
                h35.044L144.568,90z"/>
              </svg>
              <label for="">Main job</label>
            </div>
            <div class="flex f-row f-start">
              <svg class="techno-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img">
                <path fill="#888" d="M12.507,90.288c-5.826-5.658-5.464-11.451,0-15.879l79.419-45.681c5.666-4.056,10.39-4.056,15.878,0l79.42,45.681 c6.358,5.482,5.642,11.275,0,15.879l-79.42,45.685c-4.615,3.306-10.213,3.723-15.878,0L12.507,90.288z M9.238,116.211 c0,4.423-0.894,7.734,3.269,11.784l79.419,45.68c5.666,3.724,11.263,3.306,15.878,0l79.42-45.68 c4.277-3.479,3.383-6.897,3.383-11.874v-3.213l-81.822,46.014c-5.195,3.638-11.509,4.1-17.868,0L9.238,112.998V116.211z"/></svg>
              <label for="">Freelance<br/> contract</label>
            </div>
            <div class="flex f-row f-start">
              <svg class="techno-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img"><path fill="#888" d="M35.897,33.829v120.673c0,6.107,4.955,11.054,11.063,11.054h83.228c6.112,0,11.068-4.946,11.068-11.054V134.92 l27.778-19.138c5.912-4.275,11.067-7.413,11.067-13.521V53.917c0-6.1-4.955-11.055-11.067-11.055h-27.778v-9.033l-60.747,0v44.228 h4.439l7.511,9.85v26.024l0,0H57.261V87.907l7.503-9.849h4.444V33.83L35.897,33.829z M163.749,96.972l-22.492,18.003V94.44V59.207 h22.492V96.972z"/></svg>
              </svg>
              <label for="">Personal <br/>project</label>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-2"></div>
        <div class="col-12 col-md-10 margin-section">
          <h3 class="borderline">Interaction</h3>
          <div>
            <p>To interact with the map, it's very much like Google Maps. Use the following controls:</p>
          </div>
        </div>
      </div>
      <div class="only-mobile">
        <div class="col-12 col-md-6">
          <p class="tc"><b>Two fingers</b> to pan and zoom the map</p>
          <div class="tuto-pan">
            <div class="pan-container">

              <img src="../assets/img/touchNpan.svg" alt="hand gesture - one finger to pan and zoom">

              <div class="element detail node">
                <div class="name into-detail corners node major">
                  <div class="desc node job-main" data-id="18">Identidy and branding for BLISS</div>
                  <div class="techno node" data-id="18">Developping company brand and culture</div>
                </div>
              </div>


            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 tc">
          <p class="tc"><b>Double tap</b> to open a project</p>
          <div class="tuto-dbclick">
            <img src="../assets/img/touch.svg" alt="hand gesture - one finger to pan and zoom">
          </div>
        </div>
      </div>
      <div class="only-desktop">
        <div class="row">
        <div class="col-12 col-md-6">
          <p class="tc"><b>Left click</b> to drag and pan the map</p>
          <div class="tuto-pan">
            <div class="pan-container">

              <div class="element detail node">
                <div class="name into-detail corners node major">
                  <div class="desc node job-main" data-id="18">Identidy and branding for BLISS</div>
                  <div class="techno node" data-id="18">Developping company brand and culture</div>
                </div>
              </div>

              <div class="pointer">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img">
                  <title>Pan icon</title>
                  <desc>Pan the map with the left click</desc>
                  <g> <path d="M141.666,58.333c9.21,0,16.668,7.457,16.668,16.667c0,14.282-2.523,28.436-7.457,41.823l-8.287,22.481 c-0.611,1.978-0.924,4.047-0.924,6.12v8.741c0,2.302-1.865,4.168-4.166,4.168H70.833c-2.301,0-4.167-1.866-4.167-4.168v-8.716 c0-1.198-0.522-2.352-1.418-3.14l-24.621-21.538c-4.636-4.046-7.293-9.906-7.293-16.063v-0.043 c0-11.784,9.549-21.333,21.333-21.333h3.667V61.208c0-9.371,6.451-17.703,15.471-19.255c5.409-0.938,10.668,0.487,14.738,3.679 c3.226-2.527,7.22-3.966,11.457-3.966c5.516,0,10.578,2.42,14.061,6.419c2.685-1.458,5.709-2.252,8.855-2.252 c8.125,0,15.065,5.203,17.623,12.541C140.914,58.347,141.289,58.333,141.666,58.333z"/> <path fill="#FFFFFF" d="M133.334,150v-4.575c0-2.907,0.437-5.805,1.364-8.79l8.358-22.692C147.651,101.477,150,88.299,150,75 c0-4.607-3.727-8.333-8.334-8.333c-0.924,0-1.864,0.183-2.852,0.549c-2.579,0.955-5.359-0.806-5.599-3.545 c-0.469-5.372-4.917-9.504-10.3-9.504c-2.643,0-5.127,1.014-7.066,2.822c-2.033,1.897-5.32,1.306-6.566-1.181 C107.508,52.262,103.963,50,100,50c-3.216,0-6.183,1.505-8.174,4.055c-1.668,2.137-4.9,2.138-6.568,0.001 c-2.387-3.057-6.105-4.573-10.034-3.892c-4.877,0.839-8.557,5.593-8.557,11.044V87.5c0,2.301-1.865,4.167-4.167,4.167h-7.833 c-7.182,0-13,5.818-13,13v0.043c0,3.754,1.619,7.322,4.443,9.788l24.634,21.55c2.701,2.375,4.256,5.807,4.256,9.403V150H133.334z" /> </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 tc">
          <p class="tc"><b>Double click</b> to open a project</p>
          <div class="tuto-dbclick">
            <div class="element detail node">
              <div class="name into-detail corners node major">
                <div class="desc node job-main" data-id="18">Identidy and branding for BLISS</div>
                <div class="techno node tl">Developping company brand and culture</div>
              </div>
            </div>
            <div class="pointer">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img">
                <path d="M166.6,87.8c0-0.8-0.399-4.8-4-8.8c-3.8-4.4-9.8-6.8-17.6-7.4c-0.8-1.2-1.8-2.4-3.4-3.6c-4.399-3.4-11.199-5.2-20-5.4
                	c-0.8-1-2.199-2.2-3.8-3.4c-4-2.8-9-4.4-15.2-5V38c0-1.6,0.2-8.4-4.399-13.2c-2-2.2-5.8-4.8-12.2-4.8c-6.6,0-10.4,2.6-12.6,4.8
                	c-4.2,4.6-4.2,10.6-4.2,12V94c-3.8-4-8-8.4-10.4-10c-5-3.8-14.4-1.8-19.8,2.2c-5.2,3.8-7,9.6-5,15.2c3.6,10,12.6,20,14.8,22.399
                	c2,3.8,11,20.4,19,26.4C72,153.4,75.2,166.6,76,175l0.4,4.4H152V159.6c1-2.8,3.4-8.8,6-11.6c6.2-6.2,8.2-21.8,8.2-26.6V88
                	L166.6,87.8z"/>
                <path fill="#FFFFFF" d="M156.8,121c0,5.8-2.399,16.8-5.399,19.8C146.2,146,143,156,142.8,157l-0.2,0.6V169.2H85.4
                	c-0.4-2.2-0.8-5-1.6-8c-2.4-9.601-5.6-15.8-9.8-19c-5.8-4.4-14-18.601-16.6-23.8L57,117.8l-0.4-0.6c0-0.2-9.8-10.2-13.2-19.4
                	c-0.4-1.2-0.4-2.2,1-3.6c2.6-2.4,7.6-3,8.8-2.6c3,2.4,12.2,12.2,17.4,18l8.6,9.601V36.6v-0.2v-0.2c0-0.8,0.2-3.4,1.6-4.8
                	c1-1.2,2.8-1.8,5.4-1.8c2.2,0,3.8,0.6,5,1.6c1.6,1.8,1.8,5,1.8,6.2v21.4l0,0v30.4h9.8V64c9,1,11.601,4.8,12,5.4l0.4,1v18.8h9.8V72.6
                	c8.4,0.8,11.6,3.4,12.4,4.6v19h9.8V81.6c8.6,1.2,10,5.8,10.2,6.8V121H156.8z"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 margin-section">
          <p>And the mouse <b>wheel</b> to zoom in and out</p>
        </div>
      </div>
      </div>


      <div class="row" style="margin-top:4rem;margin-bottom:4rem">
        <!-- <div class="col-12 tc"> -->
        <div class="col-12 col-md-2"></div>
        <div class="col-12 col-md-6">
          <!-- <div id="readyToStart" v-show="isReadyToStart"> -->
          <div id="loadingText">Downloading assets...</div>
          <div id="readyToStart" class="disabled">
            <div class="containerSheen">
              <button id="ExploreWork-btn" class="button">Explore the interactive project map</button>
            </div>
          </div>
          <!-- <div class="ripple-container">
            <span class="ripple"></span>
          </div> -->
        </div>
      </div>

      <div class="row">
        <!-- <div class="col-12 col-md-2"></div> -->
        <div class="col-12 col-md-10">
          <h3 class="borderline">Analytics</h3>
          <details>
            <summary>Expand details</summary>
            <div>
              <p class="mb">Privacy does matter to me. I hate being tracked when browsing and visiting websites.</p>
              <p class="mb">In the meantime, I would like to have some inkling about how many people visit my website. So I opted for Google Analytics.</p>
              <p class="mb">Analytics wil start as soon as you start the project map, unless you uncheck the checkbox below.</p>
              <p>More about privacy on the option menu (Space bar)</p>
            </div>
          </details>
          <div style="margin-top: .8rem;">
            <input type="checkbox" name="analyticsCheckbox" value="analyticsCheckbox" id="analyticsCheckbox" checked><label style="margin-left: 1rem;" for="analyticsCheckbox">Accept analytics</label>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div id="notCompatible"></div>
</div>
