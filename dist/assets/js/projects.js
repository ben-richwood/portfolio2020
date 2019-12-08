import { settings, objectScene, scene, renderer, playAnimation, pauseAnimation } from './main.js'
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
    path: "projects/peafowl",
    img: ["homepage.png", "indesign_capture.png"]
  }, {
    id: 1,
    name: 'Eneom',
    year: 2016,
    description: '<p>Eneom is a company that sells solutions to save and optimize energy consumption for your home.</p><p> I worked on the website along with the design of the materials. </p>',
    code: "",
    design: "",
    software: ['AI', 'PS'],
    techno: ['Bootstrap', 'PHP'],
  }, {
    id: 2,
    name: 'Go Mékong Evasion',
    year: 2017,
    description: '<p>Go Mékong Evasion (GME) is a travel agency that bring travelers off the beaten track and go into Mekong depths.</p><p> For this client, I realized the graphic identity, through the website and the presentation leaflet.</p><p> Since GME offers off the beaten track trips, I opted for these elements: "gritty/muddy", hand-drawing (traveler notebook), polaroid effect, maps and full size images. And I kept a touch of security to reassure the tourist. </p>',
    code: "I developped the website",
    design: "Leaflet, webdesign and so",
    software: ['AI', 'PS', 'inDD', 'hand drawing'],
    techno: ['Bootstrap', 'PHP', 'Wordpress'],
  }, {
    id: 3,
    name: 'ctOS',
    year: 2018,
    description: '<p>Go Mékong Evasion (GME) is a travel agency that bring travelers off the beaten track and go into Mekong depths.</p><p> For this client, I realized the graphic identity, through the website and the presentation leaflet.</p><p> Since GME offers off the beaten track trips, I opted for these elements: "gritty/muddy", hand-drawing (traveler notebook), polaroid effect, maps and full size images. And I kept a touch of security to reassure the tourist. </p>',
    code: "I developped the website",
    design: "Leaflet, webdesign and so",
    software: ['AI', 'PS'],
    techno: ['mapbox', 'PHP', 'VueJS'],
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

let selectPerf = true

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
      Popup.isIntroOff = true;
      selectPerf = false;
      settings.isPaused = false;
      playAnimation();
      // navigateProjects();
    }
  }
});

export const Menu = new Vue({
  el: "#paradeAcross",
  data: {
    projects: Projects,
    currentProject: Projects[0].id,
    isOff: false
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
    readMore: function () {
      Sidebar.displaySidebar = !Sidebar.displaySidebar
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
      console.log("Triggered");
      if(sign >= 0){
        this.content.speciality = this.content.design;
        this.content.specTitle = "Design part";
        this.classAttribute = "design";
      } else {
        this.content.speciality = this.content.code;
        this.content.specTitle = "Coding part";
        this.classAttribute = "code";
      }
    }
  }
});

let phraseCounter = 0
var intervalListener = self.setInterval(changeLoadingText, 5000);

function changeLoadingText() {
  Popup.loadingText = LoadingPhrases[phraseCounter] + "...";
  phraseCounter++;
  if (phraseCounter >= LoadingPhrases.length) phraseCounter = 0;
}

document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  if (selectPerf) {
    if (keyName === 'ArrowLeft') {
      console.log("left");
      console.log(Popup.$refs.highPerf);
      Popup.$refs.highPerf.focus();
    } else if (keyName === 'ArrowRight') {
      console.log("right");
      Popup.$refs.lowPerf.focus();
    } else {}
  } else {
    if (settings.isCameraCloseEnough) {
      if (keyName === 'ArrowLeft') {
        Menu.changeProject(-1)
      } else if (keyName === 'ArrowRight') {
        Menu.changeProject(1)
      } else {}
    } else {
      return
    }
  }
}, false);
