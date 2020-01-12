import Vue from 'vue';

import { t0, settings, keyboardMap, controls, zoomModel, objectScene, scene, cssScene, renderer, rendererCSS, screenGraphic, canvasEl, readyToLaunch, playAnimation, pauseAnimation } from './main.js'
import Projects from './projects.js'
import { displayProjectImageOnScreen } from './libs/custom/miscellaneous.js'

// import THREELib from "three-js";
// var THREE = THREELib(); // return THREE JS
import * as THREE from './build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';



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
const URLPrefix = "../dist/assets/img/textures/projects/";
const GPURegex = /rtx|gtx|Direct3D11/i;
// Window computer ANGLE (Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0)
// Macbook pro Intel Iris Pro OpenGL Engine

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

const tmpList = Projects.list.filter(e => e.onlyTimeline === false);
console.log("tmpList", tmpList);

export const Menu = new Vue({
  el: "#paradeAcross",
  data: {
    projects: [...tmpList],
    currentProjectIdx: 0,
    currentProject: tmpList[0],
    isDisplayed: true
  },
  methods: {
    changeProject: function (direction) {
      console.log(this.projects);
      this.currentProjectIdx += parseInt(direction);
      if(this.currentProjectIdx < 0){
        this.currentProjectIdx = this.projects.length - 1;
      } else if (this.currentProjectIdx >= this.projects.length){
         this.currentProjectIdx = 0;
      } else {

      }
      this.currentProject = this.projects[this.currentProjectIdx];
      let e = this.projects[this.currentProjectIdx]
      Sidebar.content = {...e}

      Sidebar.content.speciality = settings.currentEnv === 1 ? e.design : e.code;
    },
    option: function () {
      optionMenu.open();
      this.isDisplayed = false;
      pauseAnimation();
      // if(Popup.isMobile) settings.isPaused ? playAnimation() : pauseAnimation();
    },
    readMore: function () {
      if(Popup.isMobile) settings.isPaused ? playAnimation() : pauseAnimation();
      // Sidebar.showSidebar = true;
      // const screenImg = displayProjectImageOnScreen (screenGraphic, URLPrefix + "peafowl/"+this.currentProject.screenImg);

      const screenImg = displayProjectImageOnScreen (screenGraphic, URLPrefix + "peafowl/"+this.currentProject.screenImg)
      // Removing the first DOM element - the default screen
      cssScene.children.splice(0,1);
      // adding the new image to the CSS3DRenderer
      cssScene.add(screenImg);
      console.log("cssScene", cssScene);

      if(!Sidebar.displaySidebar) zoomModel(1, 4);
      Sidebar.displaySidebar = !Sidebar.displaySidebar;
    }
  }
});

export const Sidebar = new Vue({
  el: "#sidebar",
  data: {
    showSidebar: false,
    content: {
      ...Menu.currentProject,
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
      Menu.readMore();
    }
  },
  filters: {
    arraySpan: function(arr) {
      return arr.forEach(function(a){a + ", "});
    }
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
    fullConfig: navigator
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
      playAnimation();
    },
    open: function () {
      this.optionsOpen = true;
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
    changeKbConfig: function(e) {
      this.kb_config = e;
      console.log(keyboardMap[this.kb_config]);
      settings.keyboardConfig = {...keyboardMap[this.kb_config]}
      console.log("fired", settings.keyboardConfig);
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
    }
  },
  filters: {
    displayArr: function(e){
      let txt = ""
      console.log(e);
      for(let c in e){
        txt += c.toString() + ": " + e[c] + "  ";
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
    if (keyName === settings.keyboardConfig.prev) {
      console.log("left");
      console.log(Popup.$refs.highPerf);
      Popup.$refs.highPerf.focus();
    } else if (keyName === settings.keyboardConfig.next) {
      Popup.$refs.lowPerf.focus();
    } else {}
  } else {
    if (settings.isCameraCloseEnough) {
      if (keyName === settings.keyboardConfig.prev) {
        Menu.changeProject(-1)
      } else if (keyName === settings.keyboardConfig.next) {
        Menu.changeProject(1)
      } else {}
    } else {
      // return
    }
  }
  if (keyName === settings.keyboardConfig.option) {
    optionMenu.toogle();
  }
}, false);
