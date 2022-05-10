/**
 * THIS FILE IS NOT USED ANYMORE. I STILL NEED TO MIGRATE SOME METHODS ELSEWHERE
 */


import Vue from 'vue';
import { createMachine, interpret, state, transition } from 'robot3';

// import { highPerfInit } from './app.js'
import { container, canvasEl, canvasTimeline, t0, canvasStats } from './app.js'
import Projects from './projects.js'
import { selectedNavigator, keyboardMap, Settings } from './constants.js'
import { displayProjectImageOnScreen } from './libs/custom/miscellaneous.js'

// import * as THREE from './build/three.module.js';
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from './libs/CSS3DRenderer.js';

// import * as Timeline from './app.js';
import * as tl from './timeline.js';



let selectPerf = false; // previously true
const URLPrefix = "../dist/assets/img/projects";
// Window computer ANGLE (Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0)
// Macbook pro Intel Iris Pro OpenGL Engine



const date = new Date;
const hour = date.getHours();
export const settings = new Settings({currentEnv: 1, isItNight: hour > 18 });
const domElTimeline = document.getElementById("DOMElTimeline");
const scaleEl = document.getElementById("scale");

const canvasScene = document.getElementById("canvasScene");

const brightnessDiv = document.getElementById("brightness");

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


const filteredList = Projects.list.filter(e => e.onlyTimeline === false);

let legendState = createMachine({
  off: state(
    transition('toggle', 'on')
    // transition name, target
  ),
  on: state(
    transition('toggle', 'off')
  )
});

const service = interpret(legendState, () => {
  legendMenu.legendState = service.machine.current
  console.log(service.machine.current);
});

console.log(service);


export const optionMenu = new Vue({
  el: "#optionMenu",
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
    isDarkMode: false,
    brightness: 90
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
      // legendMenu.showLegendForDetail = false;
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
        // console.log("settings.isDebugMode", this.isDebugMode);
        // settings.isDebugMode = this.isDebugMode;
        settings.isDebugMode = !settings.isDebugMode
        canvasStats.style.display = settings.isDebugMode ? "block" : "none";
      } else {}
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
      // console.log("this.analyticsOn", this.analyticsOn);
      settings.analyticsOn = this.analyticsOn;
      // console.log(window['ga-disable-UA-90932543-3']);
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
    },
    updateBrightness: function (e){
      this.brightness = parseInt(e.target.value, 10);
      brightnessDiv.style.opacity = (100 - this.brightness) / 100;
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

const detailText = document.querySelector("#details .text .scrollbar")
const detailImages = document.querySelector("#details .images .scrollbar")

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
      window.history.pushState( {} , '', `?project=${prj.name.toLowerCase().replaceAll(' ', '_')}` );

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
        });
      }
      legendMenu.showLegendForDetail = true;
      domElTimeline.classList.add("blurred")
      this.isOpen = true;
      setTimeout( () => {
        detailText.scrollTop = 0;
        detailImages.scollTop = 0;
      }, 120)
    },
    close: function () {
      window.history.pushState( {} , '', `` );
      domElTimeline.classList.remove("blurred")
      // legendMenu.showLegend = false;
      legendMenu.showLegendForDetail = false;
      legendMenu.showLegend = true;
      settings.isDetailOpen = false;
      detailText.scrollTop = 0;
      detailImages.scollTop = 0;
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

const filters = {
  techno: {name: "techno", id:"techno"},
  software: {name: "software", id:"software"},
  timeline: {name: "timeline", id:"timeline"},
  all: {name: "grid", id:"all"}
}

export const legendMenu = new Vue({
  el: "#legend",
  data: {
    showLegend: true,
    legendState: null,
    keyMap: {
      ...settings.keyboardConfig
    },
    showLegendForDetail: false,
    selectedFilter: "techno",
    filterItems: filters,
    HUDoff: false
  },
  mounted(){
    this.legendState = service.machine.current
  },
  methods: {
    applyFilter: function(key){
      settings.prevFilter = settings.currFilter;
      settings.currFilter = key;
      this.selectedFilter = settings.currFilter;
      tl.transform( tl.targets[key], 2000 );
      console.log(this.legendState)
    },
    resetCamera: function () {
      tl.resetCamera(1200 );
    },
    close: function() {
      console.log(this.legendState)
      closeAllMenus();
    },
    menu: function (){
      console.log(this.legendState)
      optionMenu.open();
    },
    HUD: function (){
      console.log(this.legendState)
      minimizeHUD();
    }
  }
})

document.querySelector('#optionMenu > div').classList.remove("hide");
document.querySelector('#intro > div').classList.remove("hide");


domElTimeline.addEventListener("dblclick", evt => {
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

  if (keyName === settings.keyboardConfig.hud[0]) {
    minimizeHUD()
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

function minimizeHUD () {
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

function highPerfInit(){}
