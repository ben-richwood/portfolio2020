import Vue from 'vue';

import { t0, controls, zoomModel, objectScene, scene, cssScene, renderer, rendererCSS, screenGraphic, canvasEl, readyToLaunch, playAnimation, pauseAnimation, animate, zoomInScreen, zoomOutScreen, targetCameraTween, switchBackToProject, castShadows, domEl, init } from './main.js'
import Projects from './projects.js'
import { displayProjectImageOnScreen } from './libs/custom/miscellaneous.js'

// import THREELib from "three-js";
// var THREE = THREELib(); // return THREE JS
import * as THREE from './build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';

import * as Timeline from './timeline.js';

import { TWEEN } from './libs/tween.module.min.js'
// import { TweenMax } from "gsap/TweenMax";

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

// Carousel when loading all the libs
const tips = [
  "you can parade accross projects by using your keyboard arrow keys",
  "You can adapt the browsing settings in the option panel",
  "Chrome - thanks to its V8 Javascript engine - gives a smooth experience",
  "To get a better experience, you can reduce the number of tabs",
  "There are few Easter eggs hidden on the website. Would you be able to find them? ;)"
]

let selectPerf = true;
const URLPrefix = "../dist/assets/img/projects";
const GPURegex = /rtx|gtx|Direct3D11/i;
// Window computer ANGLE (Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0)
// Macbook pro Intel Iris Pro OpenGL Engine

export const keyboardMap = {
  kb_default: {
    prev: ["ArrowLeft", "⟵"],
    next: ["ArrowRight", "⟶"],
    accept: ["Space", "SPACE"],
    option: ["Escape", "ESC"]
  },
  kb_gamer: {
    prev: ["a", "A"],
    next: ["d", "D"],
    accept: ["e", "E"],
    option: ["Escape", "ESC"]
  },
  kb_vim: {
    prev: ["h", "H"],
    next: ["l", "L"],
    accept: ["Space", "SPACE"],
    option: ["Escape", "ESC"]
  },
}



function Settings (e) {
    // STATES
    this.isPaused = false;
    this.currentEnv = e.currentEnv;
    this.isCameraCloseEnough = true; // to display menu
    this.isCameraFOVUpdates = false; // rendering FOV trnasition
    this.FOVvalue = 70;
    this.zoomLevel = 1;
    this.isTimelineOn = false;
    this.isCameraTransiting = false;
    this.isProjectOpen = false;

    // CONFIG
    this.isConfigHigh = false;
    this.isDebugMode = false;
    this.isTWEENLoaded = false;
    this.antialias = false;
    this.precision = 'mediump';
    this.isShadowEnabled = false;

    // OPTIONS
    this.muteSound = false;
    this.linksNewTab = true;
    this.keyboardConfig = {...keyboardMap.kb_default},
    this.GPU = "";

    this.lateInit = function() {
      highPerfInit();
    }
};
export const settings = new Settings({currentEnv: 1});

export const Popup = new Vue({
  el: "#intro",
  data: {
    displayConfig: true,
    config: "",
    isMobile: false,
    ieDetected: false,
    loadingText: "",
    phraseCounter: 0,
    isIntroOff: false,
    isReadyToStart: false,
    progress: 0
  },
  methods: {
    whichConfig: function () {
      // let result = /^intel/i.test(this.config);
      if (GPURegex.test(this.config)){
        return "High Performance"
      } else {
        return "Low Performance"
      }
    },
    choosePerf: function (e) {
      this.displayConfig = false;
      settings.isConfigHigh = e;
      optionMenu.gpu = this.config;
      settings.GPU = this.config;
      if (e == 1){
        if (settings.isConfigHigh) {
          settings.lateInit()
        }
        // document.removeEventListener('keyup', (event) => {}, false);
        // console.log("settings:",settings);
      }
    },
    closePopup: function () {
      window.clearInterval(intervalListener);
      this.isIntroOff = true;
      selectPerf = false;
      settings.isPaused = false;
      readyToLaunch();
      // navigateProjects();
    }
  }
});

const filteredList = Projects.list.filter(e => e.onlyTimeline === false);

export const Menu = new Vue({
  el: "#paradeAcross",
  data: {
    projects: [...filteredList],
    currentProjectIdx: 0,
    currentProject: filteredList[0],
    isDisplayed: true
  },
  methods: {
    changeProject: function (direction) {
      this.currentProjectIdx += parseInt(direction);
      if(this.currentProjectIdx < 0){
        this.currentProjectIdx = this.projects.length - 1;
      } else if (this.currentProjectIdx >= this.projects.length){
         this.currentProjectIdx = 0;
      } else {}
      this.currentProject = this.projects[this.currentProjectIdx];
      let e = this.projects[this.currentProjectIdx]
      Sidebar.content = {...e}
      if (e.link === "") {
        Sidebar.content.link = `<div style="margin: 1rem 0;">Not online preview at the moment</div>`
      } else {
        Sidebar.content.link = `<a class="link-call-to-action" href="${e.link}">Visit the Website</a>`
      }
      Sidebar.content.speciality = settings.currentEnv === 1 ? e.design : e.code;
      loadProjectImage();
    },
    option: function () {
      optionMenu.open();
      this.isDisplayed = false;
      Sidebar.displaySidebar = false;
      pauseAnimation();
      // if(Popup.isMobile) settings.isPaused ? playAnimation() : pauseAnimation();
    },
    openProject: function () {
      if(Popup.isMobile) settings.isPaused ? playAnimation() : pauseAnimation();
      if (settings.isProjectOpen) {
        zoomOutScreen();
        settings.isProjectOpen = false;
      } else {
        zoomInScreen();
        settings.isProjectOpen = true;
      }

      if (!Sidebar.displaySidebar) {
        loadProjectImage();
      }
      Sidebar.displaySidebar = !Sidebar.displaySidebar;
      // if(!Sidebar.displaySidebar) zoomModel(1, 4);
    }
  }
});

function loadProjectImage () {
  const oldFrames = domEl.querySelector('.frameContainer');
  // const oldFrames = domEl.querySelectorAll('.divContainer');
  if (oldFrames && oldFrames.length > 0) {
    oldFrames.forEach(function (e) {
      // let parent = e.parentNode;
      e.parentNode.removeChild( e );
    })
  };
  const screenImg = displayProjectImageOnScreen (screenGraphic, `${URLPrefix}/${Menu.currentProject.slug}/${Menu.currentProject.screenImg}`, domEl)
  // Removing the first DOM element - the default screen
  // let domElToDelete = document.querySelector('#domEl .frameContainer');
  // domElToDelete.parentNode.removeChild( domElToDelete );
  // adding the new image to the CSS3DRenderer
  if (screenImg != null) cssScene.add(screenImg);
}

const selectedNavigator = {
  platforn: navigator.platform,
  vendor: navigator.vendor,
  language: navigator.language,
  hardwareConcurrency: navigator.hardwareConcurrency,
  cookieEnabled: navigator.cookieEnabled,
  doNotTrack: navigator.doNotTrack != null ? "DoNotTrack enabled" : "DoNotTrack not enabled"
}

export const Sidebar = new Vue({
  el: "#sidebar",
  data: {
    content: {
      ...Menu.currentProject,
      link: `<a class="link-call-to-action" href="${Menu.currentProject.link}">Visit the Website</a>`
    },
    specTitle: "Design",
    displaySidebar: false,
    classAttribute: "design"
  },
  methods: {
    switchEnv: function (sign){
      if(sign >= 0){
        this.content.speciality = this.content.design;
        this.specTitle = "Design part";
        this.classAttribute = "design";
      } else {
        this.content.speciality = this.content.code;
        this.specTitle = "Coding part";
        this.classAttribute = "code";
      }
    },
    close: function () {
      Menu.openProject();
    }
  },
  filters: {
    arraySpan: function(arr) {
      return arr.forEach(function(a){a + ", "});
    },
  }
});

export const optionMenu = new Vue({
  el: "#optionMenu",
  data: {
    currentSubmenu: 0,
    optionsOpen: false,
    kb_config: "kb_default",
    t1: performance.now(),
    gpu: "",
    fullConfig: selectedNavigator,
    canvasMenuLabel: "Timeline",
    linksNewTab: true,
    keyMap: {
      ...settings.keyboardConfig
    },
    antialias: false,
    precision: false,
    isShadowEnabled: false
  },
  methods: {
    changeSubmenu: function (idx) {
      if (idx === 3) this.t1 = ((performance.now() - t0) / 1000).toFixed(1) + "sec";
      this.currentSubmenu = idx;
    },
    close: function () {
      this.optionsOpen = false;
      Menu.isDisplayed = true;
      this.currentSubmenu = 0;
      domEl.style.filter = "blur(0px)"
      playAnimation();
    },
    open: function () {
      this.optionsOpen = true;
      Sidebar.showSidebar = false;
      domEl.style.filter = "blur(10px)"
      pauseAnimation();
    },
    toogle: function () {
      if(this.optionsOpen){
        this.close();
      } else {
        // this.open();
        Menu.option();
      }
    },
    timeline: function () {
      if (settings.isTimelineOn) {
        // animate();
        Timeline.renderer.clear()
        domEl.style.display = "none";
        this.canvasMenuLabel = "Timeline"
        init();
        // switchBackToProject();
      } else {
        this.canvasMenuLabel = "Project"
        renderer.clear();
        Timeline.init();
        Timeline.animate();
        this.close();
        domEl.style.display = "block";
      }
      settings.isTimelineOn = !settings.isTimelineOn;
    },
    changeKbConfig: function(e) {
      this.kb_config = e;
      settings.keyboardConfig = {...keyboardMap[this.kb_config]}
      this.keyMap = {...keyboardMap[this.kb_config]};
      // console.log();
    },
    changeLinkBehavior: function () {
      const links = document.querySelectorAll('a[href^="http"]');
      links.forEach(function (e){
        e.target = settings.linksNewTab ? "_blank" : "_self";
      });
      settings.linksNewTab = !settings.linksNewTab;
    },
    muteSound: function () {
      settings.muteSound = !settings.muteSound;
    },
    changeConfig: function(e) {
      if (e === "antialias"){
        this.antialias = !this.antialias;
        renderer.antialias = this.antialias;
      } else if (e === "precision") {
        this.precision = !this.precision;
        renderer.precision = this.precision ? "highp" : "mediump"
      } else {}
      // console.log(renderer);
    },
    toggleShadows: function() {
      settings.isShadowEnabled = !settings.isShadowEnabled;
      this.isShadowEnabled = settings.isShadowEnabled;
      renderer.shadowMapEnabled = this.isShadowEnabled;
      if (this.isShadowEnabled) {
        // renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        castShadows();
      }
    }
  },
  filters: {
    displayArr: function(e){
      let txt = "";
      for(let c in e){
        txt += c.toString() + ": " + e[c] + "\n";
      }
      return txt
    }
  }
})

let phraseCounter = 0
var intervalListener = self.setInterval(changeLoadingText, 5000);

function changeLoadingText() {
  Popup.loadingText = LoadingPhrases[phraseCounter] + "...";
  phraseCounter++;
  if (phraseCounter >= LoadingPhrases.length) phraseCounter = 0;
}

document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  console.log(keyName);
  if (selectPerf) {
    if (keyName === settings.keyboardConfig.prev[0]) {
      Popup.$refs.highPerf.focus();
    } else if (keyName === settings.keyboardConfig.next[0]) {
      Popup.$refs.lowPerf.focus();
    } else {}
  } else {
    if (settings.isCameraCloseEnough) {
      if (keyName === settings.keyboardConfig.prev[0]) {
        Menu.changeProject(-1)
      } else if (keyName === settings.keyboardConfig.next[0]) {
        Menu.changeProject(1)
      } else {}
    } else {
      // return
    }
  }
  if (keyName === settings.keyboardConfig.option[0]) {
    optionMenu.toogle();
  }
}, false);
