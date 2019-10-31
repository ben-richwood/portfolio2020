export const Projects = [
  {
    id: 0,
    name: 'Peafowl Consulting',
    year: 2016,
    description: '<p>Peafowl Consulting is a company which offers tests and trainings to reinforce sale teams and colleagues\' engagement.</p><p>Furthermore, Peafowl Consulting counts few side projects: Peafowl Foundation (charity project), PTalk (entrepreneur talks), Peafowl Cup (sponsored sport events) and punctual events. I draw the graphic guideline and developed the website. I also worked on the logo of the two spin-off projects Peafowl Foundation & P-Talk.</p><p>Finally, I proposed layouts for training supports and internal documents.</p>',
    software: ['AI', 'PS', 'InDD', 'Laser Cut'],
    techno: ['Bootstrap', 'PHP'],
    path: "projects/peafowl",
    img: ["homepage.png", "indesign_capture.png"]
  }, {
    id: 1,
    name: 'Eneom',
    year: 2016,
    description: '<p>Eneom is a company that sells solutions to save and optimize energy consumption for your home.</p><p> I worked on the website along with the design of the materials. </p>',
    software: ['AI', 'PS'],
    techno: ['Bootstrap', 'PHP'],
  }, {
    id: 2,
    name: 'Go Mékong Evasion',
    year: 2017,
    description: '<p>Go Mékong Evasion (GME) is a travel agency that bring travelers off the beaten track and go into Mekong depths.</p><p> For this client, I realized the graphic identity, through the website and the presentation leaflet.</p><p> Since GME offers off the beaten track trips, I opted for these elements: "gritty/muddy", hand-drawing (traveler notebook), polaroid effect, maps and full size images. And I kept a touch of security to reassure the tourist. </p>',
    software: ['AI', 'PS', 'inDD', 'hand drawing'],
    techno: ['Bootstrap', 'PHP', 'Wordpress'],
  }
];

export const LoadingPhrases = [
  "Checking your browser capabilities",
  "Warming up your system",
  "Loading librairies",
  "Preparing hardware acceleration",
  "Optimizing assets",
  "Configuring 3d scene",
  "Fetching data",
  "Downloading assets",
  "Mounting components",
  "Building up the scene",
  "Rendering 3d models",
  "Texturing the models",
  "Lighting up the scene",
  "Finetuning the experience"
];

// console.log("Projects[0]: ", Projects[0]);

export const Menu = new Vue({
  el: "#paradeAcross",
  data: {
    projects: Projects,
    currentProject: Projects[0].id
  },
  methods: {
    changeProject: function (direction) {
      this.currentProject += direction;
      if(this.currentProject < 0) this.currentProject = this.projects.length - 1;
      if(this.currentProject >= this.projects.length) this.currentProject = 0;
      Sidebar.content.title = this.projects[this.currentProject].name;
      Sidebar.content.body = this.projects[this.currentProject].description;
    },
    readMore: function () {
      Sidebar.displaySidebar = !Sidebar.displaySidebar
    }
  }
});

export const Sidebar = new Vue({
  el: "#sidebar",
  data: {
    content: {
      title: Menu.projects[Menu.currentProject].name,
      body: Menu.projects[Menu.currentProject].description
    },
    displaySidebar: false
  }
});