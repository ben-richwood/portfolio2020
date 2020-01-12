import { settings, keyboardMap, objectScene, scene, renderer, canvasEl, readyToLaunch, playAnimation, pauseAnimation } from './main.js'
import * as THREE from './build/three.module.js';

export const Projects = [
  {
    id: 0,
    name: 'Peafowl Consulting',
    year: 2016,
    description: '<p>Peafowl Consulting is a company which offers tests and trainings to reinforce sale teams and colleagues\' engagement.</p><p>Furthermore, Peafowl Consulting counts few side projects: Peafowl Foundation (charity project), PTalk (entrepreneur talks), Peafowl Cup (sponsored sport events) and punctual events. I draw the graphic guideline and developed the website. I also worked on the logo of the two spin-off projects Peafowl Foundation & P-Talk.</p><p>Finally, I proposed layouts for training supports and internal documents.</p>',
    code: "",
    design: "",
    software: ['AI', 'PS', 'InDD', 'Laser Cut'],
    techno: ['Bootstrap', 'PHP'],
    category: "Freelance",
    link: "http://www.peafowl-consulting.com/",
    path: "projects/peafowl",
    img: ["homepage.jpg", "indesign_capture.png"],
    screenImg: "homepage.jpg"
  }, {
    id: 1,
    name: 'Eneom',
    year: 2016,
    description: '<p>Eneom is a company that sells solutions to save and optimize energy consumption for your home.</p><p> I worked on the website along with the design of the materials. </p>',
    code: "",
    design: "",
    software: ['AI', 'PS'],
    link: "https://www.eneom.fr/",
    techno: ['Bootstrap', 'PHP'],
    category: "Freelance"
  }, {
    id: 2,
    name: 'Go Mékong Evasion',
    year: 2017,
    description: '<p>Go Mékong Evasion (GME) is a travel agency that bring travelers off the beaten track and go into Mekong depths.</p><p> For this client, I realized the graphic identity, through the website and the presentation leaflet.</p><p> Since GME offers off the beaten track trips, I opted for these elements: "gritty/muddy", hand-drawing (traveler notebook), polaroid effect, maps and full size images. And I kept a touch of security to reassure the tourist. </p>',
    code: "I developped the website",
    design: "Leaflet, webdesign and so",
    software: ['AI', 'PS', 'inDD', 'hand drawing'],
    link: "https://www.gomekongevasion.fr/",
    techno: ['Bootstrap', 'PHP', 'Wordpress'],
    category: "Freelance",
  }, {
    id: 3,
    name: 'ctOS',
    year: 2018,
    description: '<p>Go Mékong Evasion (GME) is a travel agency that bring travelers off the beaten track and go into Mekong depths.</p><p> For this client, I realized the graphic identity, through the website and the presentation leaflet.</p><p> Since GME offers off the beaten track trips, I opted for these elements: "gritty/muddy", hand-drawing (traveler notebook), polaroid effect, maps and full size images. And I kept a touch of security to reassure the tourist. </p>',
    code: "I developped the website",
    design: "Leaflet, webdesign and so",
    software: ['AI', 'PS'],
    techno: ['mapbox', 'PHP', 'VueJS'],
    link: "https://projets.richebois.fr/citadelle/map/mobile.php",
    category: "Personal"
  }, {
    id: 4,
    name: 'Tool explorer',
    year: 2019,
    description: '<p>Go Mékong Evasion (GME) is a travel agency that bring travelers off the beaten track and go into Mekong depths.</p><p> For this client, I realized the graphic identity, through the website and the presentation leaflet.</p><p> Since GME offers off the beaten track trips, I opted for these elements: "gritty/muddy", hand-drawing (traveler notebook), polaroid effect, maps and full size images. And I kept a touch of security to reassure the tourist. </p>',
    code: "Since this is not a simple parent-children relation (which is a Tree), I opted for VisJS with its Ggraph and Network data structure - based on relations and groups rather than inheritance.",
    design: "Inspired by WestWorld UI graphic and their \"character response scenario\", I wanted to reproduce the navigation flow, with columns and left-to-right paths",
    software: ['AI'],
    techno: ['vis.js', 'VueJS'],
    link: "https://projets.richebois.fr/tool-explorer",
    category: "Personal"
  }
];

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
    projects: Projects,
    currentProject: Projects[0].id,
    isDisplayed: true
  },
  methods: {
    changeProject: function (direction) {
      this.currentProject += direction;
      if(this.currentProject < 0) this.currentProject = this.projects.length - 1;
      if(this.currentProject >= this.projects.length) this.currentProject = 0;
      let e = this.projects[this.currentProject]
      Sidebar.content.title = e.name;
      Sidebar.content.body = e.description;
      Sidebar.content.code = e.code;
      Sidebar.content.design = e.design;
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
    }
  }
});

export const Sidebar = new Vue({
  el: "#sidebar",
  data: {
    showSidebar: false,
    content: {
      title: Menu.projects[Menu.currentProject].name,
      body: Menu.projects[Menu.currentProject].description,
      code: Menu.projects[Menu.currentProject].code,
      design: Menu.projects[Menu.currentProject].design,
      speciality: Menu.projects[Menu.currentProject].design,
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
