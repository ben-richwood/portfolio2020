import Vue from 'vue';

import { highPerfInit } from './app.js'
import { container, canvasEl, canvasTimeline, t0, canvasStats } from './app.js'
import Projects from './projects.js'
import { displayProjectImageOnScreen } from './libs/custom/miscellaneous.js'

import * as THREE from './build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';

import { TWEEN } from './libs/tween.module.min.js'

// import * as Timeline from './app.js';
import * as tl from './timeline.js';

import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import doNotTrack from 'analytics-plugin-do-not-track'

/* Initialize analytics */
const analytics = Analytics({
  app: 'portfolio2020',
  version: 100,
  plugins: [
    googleAnalytics({
      trackingId: 'UA-90932543-3',
      anonymizeIp: true
    }),
    doNotTrack()
  ]
})

// does nothing if DNT on
analytics.page();

analytics.plugins.disable('google')

// Carousel when loading all the libs
const tips = [
  "you can parade accross projects by using your keyboard arrow keys",
  "You can adapt the browsing settings in the option panel",
  "Chrome - thanks to its V8 Javascript engine - gives a smooth experience",
  "To get a better experience, you can reduce the number of tabs",
  "There are few Easter eggs hidden on the website. Would you be able to find them? ;)"
]

let selectPerf = false; // previously true
const URLPrefix = "../dist/assets/img/projects";
const GPURegex = /rtx|gtx|Direct3D11/i;
// Window computer ANGLE (Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0)
// Macbook pro Intel Iris Pro OpenGL Engine

export const keyboardMap = {
  kb_default: {
    prev: ["ArrowLeft", "⟵"],
    next: ["ArrowRight", "⟶"],
    accept: ["Space", "SPACE"],
    option: ["Escape", "ESC"],
    hud: ["h", "H"]
  },
  kb_gamer: {
    prev: ["a", "A"],
    next: ["d", "D"],
    accept: ["e", "E"],
    option: ["Escape", "ESC"],
    hud: ["h", "F"]
  },
  kb_vim: {
    prev: ["h", "H"],
    next: ["l", "L"],
    accept: ["Space", "SPACE"],
    option: ["Escape", "ESC"],
    hud: [";", ":"]
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
    this.isOptionMenuOpen = false;
    this.isHUDOn = false;

    // CONFIG
    this.isConfigHigh = false;
    this.isDebugMode = false;
    this.isTWEENLoaded = false;
    this.antialias = false;
    this.precision = 'mediump';
    this.isShadowEnabled = false;
    this.isItNight = e.isItNight;
    this.isTimelineLoaded = false;
    this.isMobile = false;

    // Timeline filter options
    this.currFilter = "techno";
    this.prevFilter = null;
    this.isDetailOpen = false;

    this.analyticsOn = true;

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
const scaleEl = document.getElementById("scale");

const canvasScene = document.getElementById("canvasScene");

// The only way I found to embed <symbols> with Vue is with components
Vue.component('svg-symbol', {
  props: ['use'],
  template: `<svg :title="use" class="techno-svg" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <use :xlink:href="use"/>
  </svg>`
});

Vue.component('link-to', {
  props: ["url", "copy", "external"],
  data: function () {
    return {
      linksNewTab: settings.linksNewTab ? '_blank' : '_self'
    }
  },
  template: `<a class="color-link" :target="linksNewTab" :href="url">{{ copy }}</a>`
});

// export const Popup = new Vue({
//   el: "#intro0",
//   data: {
//     displayConfig: true,
//     config: "",
//     isMobile: false,
//     ieDetected: false,
//     // loadingText: "",
//     phraseCounter: 0,
//     isIntroOff: false,
//     isReadyToStart: false,
//     progress: 0
//   },
//   created: function () {
//     this.isReadyToStart = true;
//     // console.log("this.isReadyToStart", this.isReadyToStart);
//     document.getElementById("readyToStart").style.display = "block";
//   },
//   methods: {
//     whichConfig: function () {
//       // let result = /^intel/i.test(this.config);
//       if (GPURegex.test(this.config)){
//         return "High Performance"
//       } else {
//         return "Low Performance"
//       }
//     },
//     // choosePerf: function (e) {
//     exploreWork: function(e) {
//
//     },
//     // exploreWork: function () {
//     //   this.displayConfig = false;
//     // }
//   }
// });

const filteredList = Projects.list.filter(e => e.onlyTimeline === false);


const selectedNavigator = {
  ["Platforn"]: navigator.platform,
  ["Vendor"]: navigator.vendor,
  ["Language"]: navigator.language,
  ["Hardware concurrency"]: navigator.hardwareConcurrency,
  ["Cookie enabled"]: navigator.cookieEnabled,
  ["doNotTrack"]: navigator.doNotTrack != null ? "DoNotTrack detected" : "DoNotTrack not enabled on your browser"
}


export const optionMenu = new Vue({
  el: "#optionMenu",
  // component: ["link"],
  data: {
    currentSubmenu: 3,
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
    isDebugMode: settings.isDebugMode,
    precision: false,
    isShadowEnabled: false,
    linksNewTab: settings.linksNewTab,
    analyticsOn: true,
    emailAddress: `moc.liamg&#064;nimajneb.<span style="display:none">richwood</span>siobehcir`,
    isDarkMode: false
  },
  methods: {
    changeSubmenu: function (idx) {
      if (idx === 4) {
         let time = ((performance.now() - t0) / 1000);
         if (time > 80){
           this.t1 = (time / 60).toFixed(1) + "min"
         } else {
           this.t1 = time.toFixed(1) + "sec"
         }
      }
      this.currentSubmenu = idx;
    },
    close: function () {
      // legendMenu.HUDoff = false;
      legendMenu.showLegend = true;
      settings.isDetailOpen = false;
      this.optionsOpen = false;
      legendMenu.showLegendForDetail = false;
      detailPopup.blurred = false;
      // this.currentSubmenu = 3;
      container.style.filter = "blur(0px)";
      tl.playAnimation();
    },
    open: function () {
      // legendMenu.HUDoff = true;
      legendMenu.showLegend = false;
      legendMenu.showLegendForDetail = true;
      detailPopup.isOpen = false;
      if (settings.analyticsOn){
        analytics.track('key press', {
          category: 'Options menu',
          label: 'menu opening',
          value: 1
        });
      }
      this.optionsOpen = true;
      detailPopup.blurred = true;
      container.style.filter = "blur(10px)";
      tl.pauseAnimation();
    },
    toggle: function () {
      if(settings.isOptionMenuOpen){
        this.close();
      } else {
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
      } else if (e === "debug") {
        console.log("settings.isDebugMode", this.isDebugMode);
        // settings.isDebugMode = this.isDebugMode;
        settings.isDebugMode = !settings.isDebugMode
        canvasStats.style.display = settings.isDebugMode ? "block" : "none";
      } else {}
      // console.log(renderer);
    },
    darkMode: function () {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle("dark-mode");
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
    },
    optout: function (){
      console.log("this.analyticsOn", this.analyticsOn);
      settings.analyticsOn = this.analyticsOn;
      console.log(this.analyticsOn);
      console.log(window['ga-disable-UA-90932543-3']);
      // this.analyticsOn = !this.analyticsOn;
      if (this.analyticsOn){
        window['ga-disable-UA-90932543-3'] = false;
      } else {
        window['ga-disable-UA-90932543-3'] = true;
      }
    },
    displayArr: function (e){
      let txt = `<ul class="ul-2-columns">`;
      for(let c in e){
        txt += "<li>" + c.toString() + ": " + e[c] + "</li>";
      }
      txt += "</ul>"
      return txt;
    }
  },
  filters: {
    displayArr: function(e){
      let txt = "";
      for(let c in e){
        txt += c.toString() + ": " + e[c] + "\n";
      }
      txt += "</ul>"
      return txt
    }
  }
})

export const detailPopup = new Vue ({
  el: "#details",
  data: {
    isOpen: false,
    name: "",
    description: "",
    link: "",
    iconsTech: "",
    icons: "",
    data: "",
    images: [],
    year: null,
    category: null,
    blurred: false
  },
  component: ["link-to"],
  // template: 'svg-symbol',
  methods: {
    open: function (id) {
      settings.isDetailOpen = true;
      let prj = Projects.list.find(e => e["id"] === parseInt(id) );

      if (settings.analyticsOn){
        // Event action - type of action
        analytics.track('click', {
          category: 'Projects', // Typically the object that was interacted with
          label: prj.name,
          value: prj.id
        });
      }

      this.name = prj.name;
      legendMenu.showLegend = false;
      this.icons = [], this.iconsTech = [];
      this.images = [];
      let htmlToPrint = "";
      if (prj.techno && prj.techno.list && prj.techno.list.length > 0) {
        prj.techno.list.forEach((item, i) => {
          this.iconsTech.push(`#${item.toLowerCase()}`);
        });
      }
      if (prj.software && prj.software.list && prj.software.list.length > 0) {
        prj.software.list.forEach((item, i) => {
          this.icons.push(`#${item.toLowerCase()}`);
        });
      }

      this.year = prj.year

      if (prj.category) {
        this.category = prj.category;
      }
      this.description = prj.description;

      if (prj.code) {
        htmlToPrint += `<h3>Code</h3>${prj.code}`
      }
      if (prj.design) {
        htmlToPrint += `<h3>Design</h3>${prj.design}`
      }
      if (prj.link) {
        this.link = `<div><a href="${prj.link}" ${settings.linksNewTab ? "target='_blank'" : ""} class="case-link" title="Link to ${prj.name}">go to the website</a></div>`
      }
      this.data = htmlToPrint

      if (prj.images && prj.images.length > 0) {
        let counter = 0;
        prj.images.forEach((item, i) => {
          let itemUrl = "";
          if (typeof item === "string"){ itemUrl = item }
          else { itemUrl = item.url }
          let newImg = {
            id: counter,
            src: item,
            srcJpg: `assets/img/all-projects/${prj.slug}/${itemUrl}.jpg`,
            large: {
              srcJpg: `assets/img/all-projects/${prj.slug}/${itemUrl}.jpg`,
              srcJp2: `assets/img/all-projects/${prj.slug}/${itemUrl}.jp2`,
              srcWebp: `assets/img/all-projects/${prj.slug}/${itemUrl}.webp`,
            }, mobile: {
              srcJpg: `assets/img/all-projects/${prj.slug}/${itemUrl}-mobile.jpg`,
              srcJp2: `assets/img/all-projects/${prj.slug}/${itemUrl}-mobile.jp2`,
              srcWebp: `assets/img/all-projects/${prj.slug}/${itemUrl}-mobile.webp`,
            }
          }
          if (typeof item === "object"){
            newImg.caption = item.caption;
          }
          this.images.push(newImg);
          counter++;
          console.log(newImg);
        });
      }
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

      this.name = "";
      this.description = "";
      this.link = "";
      this.iconsTech = "";
      this.icons = "";
      this.data = "";
      this.images = [];
      this.year = null;
      this.category = null;
    }
  }
})

const filters = ["techno", "software", "timeline", "all"]

export const legendMenu = new Vue({
  el: "#legend",
  data: {
    showLegend: true,
    keyMap: {
      ...settings.keyboardConfig
    },
    showLegendForDetail: false,
    selectedFilter: "techno",
    HUDoff: false
  },
  methods: {
    applyFilter: function(id){
      settings.prevFilter = settings.currFilter;
      settings.currFilter = filters[id];
      this.selectedFilter = settings.currFilter;
      tl.transform( tl.targets[filters[id]], 2000 );
    },
    resetCamera: function () {
      tl.resetCamera(1200 );
    },
    close: function() {
      closeAllMenus();
    },
    menu: function (){
      optionMenu.open();
    },
    HUD: function (){
      toggleHUD();
    }
  }
})

document.querySelector('#optionMenu > div').classList.remove("hide");
document.querySelector('#intro > div').classList.remove("hide");

function init(e) {
  settings.analyticsOn = document.getElementById("analyticsCheckbox").checked;
  optionMenu.analyticsOn = settings.analyticsOn;

  if (settings.analyticsOn){
    analytics.plugins.enable('google')
  }

  settings.isConfigHigh = e;
  optionMenu.gpu = settings.GPU;
  if (e == 1 && false){
    if (settings.isConfigHigh) {
      settings.lateInit()
    }
    // document.removeEventListener('keyup', (event) => {}, false);
  }
  document.getElementById("intro").style.display = "none";
  settings.isConfigHigh = e;
  selectPerf = false;
  settings.isPaused = false;

  const legendObj = document.querySelector(".legend");
  const divLegends = document.querySelectorAll("#legend .key-legend > div");

  const tweenA = new TWEEN.Tween({scale: 0})
    .to({scale: 1}, 1000)
    // .easing(TWEEN.Easing.Quadratic.Out);
    .onUpdate(function (object) {
    	legendObj.style.transform = 'scale(' + object.scale + ')'
    })
    .onComplete(function () {
      for(let item of divLegends){
        item.classList.remove("initially-reduced");
      }
    })

  const tweenB = new TWEEN.Tween({blur: 8})
    .to({blur: 0}, 2000)
    .delay(100)
    .onUpdate(function (object) {
    	domElTimeline.style.filter = 'blur(' + object.blur + 'px)';
    })
    .easing(TWEEN.Easing.Quadratic.In)
    .onComplete(function () {
      tl.transform( tl.targets.techno, 2000 );
    });

  tweenA.chain(tweenB);

  tweenA.start();
}

document.getElementById("ExploreWork-btn").addEventListener('click', function (e){
  init(true);
}, true)


domElTimeline.addEventListener("dblclick", evt => {
  // console.log(evt);
  if (evt.target.classList.contains("node")){
    let id = evt.target.getAttribute("data-id");
    detailPopup.open(id);
  }
}, true);

var touchtime = 0;
domElTimeline.addEventListener("touchend", evt => {
  if (touchtime == 0) {
    // set first click
    touchtime = new Date().getTime();
  } else {
    // compare first click to this click and see if they occurred within double click threshold
    if (((new Date().getTime()) - touchtime) < 500) {
      // double click occurred
      if (evt.target.classList.contains("node")){
        detailPopup.open(evt.target.getAttribute("data-id"));
      }
      touchtime = 0;
    } else {
      // not a double click so set as a new first click
      touchtime = new Date().getTime();
    }
  }
}, true);

// Keyboard navigation
document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  const keyCode = event.code
  // console.log(keyName, keyCode);

  if (keyName === settings.keyboardConfig.hud[0]) {
    toggleHUD()
  }
  // escape keys
  if (keyName === settings.keyboardConfig.option[0]) {
    closeAllMenus();
  }
  // SPACE BAR KEY BY DEFAULT
  if (keyCode === settings.keyboardConfig.accept[0]) {
    if (settings.isDetailOpen) {
      detailPopup.close();
    }

    legendMenu.showLegend = !settings.isOptionMenuOpen;
    optionMenu.toggle();
    settings.isOptionMenuOpen = !settings.isOptionMenuOpen;

  }
}, false);

function toggleHUD () {
  if (settings.isOptionMenuOpen || settings.isDetailOpen) return
  settings.isHUDOn = !settings.isHUDOn;

  legendMenu.HUDoff = settings.isHUDOn;
  scaleEl.classList.toggle("hideHUD");
}

function closeAllMenus () {
  if (settings.isDetailOpen || settings.isOptionMenuOpen) {
    detailPopup.close();
    legendMenu.showLegend = true;
    if (settings.isOptionMenuOpen){
      optionMenu.close();
      settings.isOptionMenuOpen = false;
    }
    optionMenu.optionsOpen = false;
    return null;
  }
}
