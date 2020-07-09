import Vue from 'vue';

// import { t0, controls, zoomModel, objectScene, scene, cssScene, renderer, rendererCSS, screenGraphic, canvasEl, canvasTimeline, DOMElMain, readyToLaunch, playAnimation, pauseAnimation, animate, zoomInScreen, zoomOutScreen, targetCameraTween, switchBackToProject, castShadows, init, highPerfInit } from './main.js'
import { highPerfInit } from './main_timeline.js'
import { container, canvasEl, canvasTimeline } from './main_timeline.js'
import Projects from './projects.js'
import { displayProjectImageOnScreen } from './libs/custom/miscellaneous.js'

// import THREELib from "three-js";
// var THREE = THREELib(); // return THREE JS
import * as THREE from './build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';

import * as Timeline from './main_timeline.js';
import * as tl from './timeline.js';
import { TWEEN } from './libs/tween.module.min.js'

// import { TWEEN } from './libs/tween.module.min.js'
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
    this.isTimelineOn = true;
    this.isCameraTransiting = false;
    this.isProjectOpen = false;

    // CONFIG
    this.isConfigHigh = false;
    this.isDebugMode = true;
    this.isTWEENLoaded = false;
    this.antialias = false;
    this.precision = 'mediump';
    this.isShadowEnabled = false;
    this.isItNight = e.isItNight;
    this.isTimelineLoaded = false;
    this.currFilter = "techno";
    this.prevFilter = "techno";
    this.isDetailOpen = false;

    // OPTIONS
    this.muteSound = false;
    this.linksNewTab = true;
    this.keyboardConfig = {...keyboardMap.kb_default},
    this.GPU = "";

    this.lateInit = function() {
      highPerfInit();
    }
};

const date = new Date;
const hour = date.getHours();
export const settings = new Settings({currentEnv: 1, isItNight: hour > 18 });
const domElTimeline = document.getElementById("DOMElTimeline");

// The only way I found to embed <symbols> with Vue is with components
Vue.component('svg-symbol', {
  props: ['use'],
  template: `<svg :title="use" class="techno-svg" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <use :xlink:href="use"/>
  </svg>`
})

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
      settings.isConfigHigh = e;
      optionMenu.gpu = this.config;
      settings.GPU = this.config;
      this.isIntroOff = true;
      selectPerf = false;
      settings.isPaused = false;
      tl.transform( tl.targets.techno, 2000 );
    },
    exploreWork: function () {
      this.displayConfig = false;
    }
  }
});

const filteredList = Projects.list.filter(e => e.onlyTimeline === false);


const selectedNavigator = {
  platforn: navigator.platform,
  vendor: navigator.vendor,
  language: navigator.language,
  hardwareConcurrency: navigator.hardwareConcurrency,
  cookieEnabled: navigator.cookieEnabled,
  doNotTrack: navigator.doNotTrack != null ? "DoNotTrack enabled" : "DoNotTrack not enabled"
}


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
      detailPopup.blurred = false;
      // Menu.isDisplayed = true;
      this.currentSubmenu = 0;
      // canvasEl.style.filter = "blur(0px)"
      container.style.filter = "blur(0px)";
      domElTimeline.style.filter = "blur(0px)";
      // Menu.isDisplayed = true;
      Timeline.playAnimation();
    },
    open: function () {
      this.optionsOpen = true;
      detailPopup.blurred = true;
      // Sidebar.showSidebar = false;
      container.style.filter = "blur(10px)";
      domElTimeline.style.filter = "blur(10px)";
      Timeline.pauseAnimation();
    },
    toogle: function () {
      if(this.optionsOpen){
        this.close();
      } else {
        // this.open();
        this.open();
      }
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

export const detailPopup = new Vue ({
  el: "#details",
  data: {
    isOpen: false,
    name: "",
    icons: "",
    data: "",
    images: [],
    blurred: false
  },
  // template: 'svg-symbol',
  methods: {
    open: function (id) {
      settings.isDetailOpen = true;
      let prj = Projects.list.find(e => e["id"] === parseInt(id) );
      this.name = prj.name;
      legendMenu.showLegend = false;
      this.icons = [];
      this.images = [];
      let htmlToPrint = "";
      if (prj.techno && prj.techno.list && prj.techno.list.length > 0) {
        prj.techno.list.forEach((item, i) => {
          // this.icons += `<span class="techno-item">${item}</span>`
          // this.icons += `<span class="techno-item">${item}</span>`
          /*
          var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          icon.setAttribute("preserveAspectRatio","xMidYMid meet");
          let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
          use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${item}`);
          use.setAttribute('href', `#${item}`);
          icon.appendChild( use );
          this.icon += icon
          */
          console.log("item", item);
          this.icons.push(`#${item.toLowerCase()}`);

          // <svg class="" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          //   <use xlink:href="#camera"/>
          // </svg>
        });
      }

      if (prj.year) {
        htmlToPrint += `<p>${prj.year}</p>`
      }
      htmlToPrint += prj.description;

      if (prj.code) {
        htmlToPrint += `<h3>Code</h3>${prj.code}`
      }
      if (prj.design) {
        htmlToPrint += `<h3>Design</h3>${prj.design}`
      }
      if (prj.link) {
        htmlToPrint += `<div><a href="${prj.link}" ${settings.linksNewTab ? "target='_blank'" : ""} class="case-link" title="Link to ${prj.name}">See the website</a></div>`
      }
      this.data = htmlToPrint

      if (prj.images && prj.images.length > 0) {
        let counter = 0;
        prj.images.forEach((item, i) => {
          this.images.push({
            id: counter,
            src: item,
            srcJpg: `assets/img/projects/${item}.jpg`,
            srcJp2: `assets/img/projects/${item}.jp2`,
            srcWebp: `assets/img/projects/${item}.webp`,
          });
          counter++;
        });
      }
      console.log("this.images", this.images);
      legendMenu.showLegendForDetail = true;
      domElTimeline.classList.add("blurred")
      this.isOpen = true;
    },
    close: function () {
      domElTimeline.classList.remove("blurred")
      // legendMenu.showLegend = false;
      legendMenu.showLegendForDetail = false;
      legendMenu.showLegend = true;
      settings.isDetailOpen = false;
      this.isOpen = false;
    }
  }
})

export const legendMenu = new Vue({
  el: "#legend",
  data: {
    showLegend: true,
    keyMap: {
      ...settings.keyboardConfig
    },
    showLegendForDetail: false,
    selectedFilter: "techno"
  },
  methods: {
    techno: function () {
      settings.prevFilter = settings.currFilter;
      settings.currFilter = "techno"
      this.selectedFilter = settings.currFilter;
      tl.transform( tl.targets.techno, 2000 );
    },
    software: function () {
      settings.prevFilter = settings.currFilter;
      settings.currFilter = "software"
      this.selectedFilter = settings.currFilter;
      tl.transform( tl.targets.software, 2000 );
    },
    timeline: function () {
      settings.prevFilter = settings.currFilter;
      settings.currFilter = "timeline"
      this.selectedFilter = settings.currFilter;
      tl.transform( tl.targets.timeline, 2000 );
    },
    all: function () {
      settings.prevFilter = settings.currFilter;
      settings.currFilter = "all"
      this.selectedFilter = settings.currFilter;
      tl.transform( tl.targets.all, 2000 );
    },
    resetCamera: function () {
      tl.resetCamera(1200 );
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

document.querySelector('#optionMenu > div').classList.remove("hide");
document.querySelector('#intro > div').classList.remove("hide");

domElTimeline.addEventListener("click", evt => {
  // console.log(evt);
  if (evt.target.classList.contains("node")){
    let id = evt.target.getAttribute("data-id");
    detailPopup.open(id);
  }
}, true)

document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  const keyCode = event.code
  console.log(keyName, keyCode);
  if (selectPerf) {
    if (keyName === settings.keyboardConfig.prev[0]) {
      Popup.$refs.highPerf.focus();
    } else if (keyName === settings.keyboardConfig.next[0]) {
      Popup.$refs.lowPerf.focus();
    } else {}
  } else {
    if (settings.isCameraCloseEnough) {
      if (keyName === settings.keyboardConfig.prev[0]) {
        // Menu.changeProject(-1)
      } else if (keyName === settings.keyboardConfig.next[0]) {
        // Menu.changeProject(1)
      } else {}
    } else {
      // return
    }
  }
  if (keyName === settings.keyboardConfig.option[0]) {
    if (settings.isDetailOpen) {
      detailPopup.close();
    }
  }
  if (keyCode === settings.keyboardConfig.accept[0]) {
    optionMenu.toogle();
    // if (settings.isDetailOpen) {
    // detailPopup.close();
    // } else {
      // legendMenu.showLegend = !legendMenu.showLegend;
    // }
  }
}, false);
