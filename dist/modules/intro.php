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

        <svg class="warning-symbol" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <use xlink:href="#info"/>
        </svg>
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