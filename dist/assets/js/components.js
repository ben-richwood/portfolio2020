import { settings, keyboardMap, controls, zoomModel, objectScene, scene, renderer, canvasEl, readyToLaunch, playAnimation, pauseAnimation } from './main.js'
import * as THREE from './build/three.module.js';
import Projects from './projects.js'

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

const tips = [
  "you can parade accross projects by using your keyboard arrow keys",
  "You can adapt the browsing settings in the option panel",
  "Chrome - thanks to its V8 Javascript engine - gives a smooth experience",
  "To get a better experience, you can reduce the number of tabs",
  "There are few Easter eggs hidden on the website. Would you be able to find them? ;)"
]

let selectPerf = true;

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
      let result = /^intel/i.test(this.config);
      if (result) {
        return "Low Performance"
      } else {
        return "High Performance"
      }
    },
    choosePerf: function (e) {
      this.displayConfig = false;
      settings.isConfigHigh = e;
      console.log("isConfigHigh: ", settings.isConfigHigh);
      if (e == 1){
        if (settings.isConfigHigh) {
          // settings.lateInit()
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

export const Menu = new Vue({
  el: "#paradeAcross",
  data: {
    projects: Projects.list,
    currentProject: Projects.list[0].id,
    isDisplayed: true
  },
  methods: {
    changeProject: function (direction) {
      this.currentProject += direction;
      if(this.currentProject < 0) this.currentProject = this.projects.length - 1;
      if(this.currentProject >= this.projects.length) this.currentProject = 0;
      let e = this.projects[this.currentProject]
      Sidebar.content = {...e}
      // Sidebar.content.title = e.name;
      // Sidebar.content.body = e.description;
      // Sidebar.content.code = e.code;
      // Sidebar.content.design = e.design;
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
      Sidebar.displaySidebar = !Sidebar.displaySidebar;
      zoomModel(1, 4);
    }
  }
});

export const Sidebar = new Vue({
  el: "#sidebar",
  data: {
    showSidebar: false,
    content: {
      ...Menu.projects[Menu.currentProject],
      // title: Menu.projects[Menu.currentProject].name,
      // body: Menu.projects[Menu.currentProject].description,
      // code: Menu.projects[Menu.currentProject].code,
      // design: Menu.projects[Menu.currentProject].design,
      // speciality: Menu.projects[Menu.currentProject].design,
      specTitle: "Design"
    },
    displaySidebar: false,
    classAttribute: "design"
  },
  methods: {
    switchEnv: function (sign){
      if(sign >= 0){
        this.content.speciality = this.content.design;
        this.content.specTitle = "Design part";
        this.classAttribute = "design";
      } else {
        this.content.speciality = this.content.code;
        this.content.specTitle = "Coding part";
        this.classAttribute = "code";
      }
    },
    close: function () {
      Menu.readMore();
    }
  }
});

export const optionMenu = new Vue({
  el: "#optionMenu",
  data: {
    currentSubmenu: 0,
    optionsOpen: false,
    kb_config: "kb_default"
  },
  methods: {
    changeSubmenu: function (idx) {
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
    linkBehavior: function () {
      const links = document.querySelectorAll('a[href^="http"]');
      links.forEach(function (e){
        e.target = settings.linksNewTab ? "_blank" : "_self";
      });
      settings.linksNewTab = !settings.linksNewTab;
    },
    muteSound: function () {
      settings.muteSound = !settings.muteSound;
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
