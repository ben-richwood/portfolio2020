export const keyboardMap = {
  // keyCode, label
  kb_default: {
    prev: ["ArrowLeft", "⟵"],
    next: ["ArrowRight", "⟶"],
    // accept: ["Space", "SPACE"],
    menu: ["Space", "SPACE"],
    esc: ["Escape", "ESC"],
    hud: ["KeyH", "H"]
  },
  kb_gamer: {
    prev: ["KeyQ", "A"],
    next: ["KeyD", "D"],
    // accept: ["e", "E"],
    menu: ["KeyE", "E"],
    esc: ["Escape", "ESC"],
    hud: ["KeyF", "F"]
  },
  kb_vim: {
    prev: ["KeyH", "H"],
    next: ["KeyL", "L"],
    // accept: ["Space", "SPACE"],
    menu: ["KeyW", "W"],
    esc: ["Escape", "ESC"],
    hud: ["Comma", ":"]
  },
}

export const CAT = [ "main", "freelance", "personal" ]

export const GPURegex = /rtx|gtx|Direct3D11|AMD\sRadeon/i;

export const selectedNavigator = {
  ["Platforn"]: navigator.platform,
  ["Vendor"]: navigator.vendor,
  ["Language"]: navigator.language,
  ["Hardware concurrency"]: navigator.hardwareConcurrency,
  ["Cookie enabled"]: navigator.cookieEnabled,
  ["doNotTrack"]: navigator.doNotTrack != null ? "DoNotTrack detected" : "DoNotTrack not enabled on your browser"
}
const date = new Date;
const hour = date.getHours();
export const SETTINGS = {
    // STATES
    t0: performance.now(),
    debug: false,
    isPaused: true,
    currentEnv: null,
    isCameraCloseEnough: true, // to display menu
    isCameraFOVUpdates: false, // rendering FOV trnasition
    FOVvalue: 70,
    zoomLevel: 1,
    isTimelineOn: true,
    isCameraTransiting: false,

    isProjectOpen: false,
    isOptionMenuOpen: false,
    isHUDOn: false,

    // CONFIG
    isConfigHigh: false,
    isDebugMode: false,
    isTWEENLoaded: false,
    antialias: false,
    precision: 'mediump',
    isShadowEnabled: false,
    isNightTime: hour > 18,
    isTimelineLoaded: false,
    isMobile: false,

    // Timeline filter options
    currFilter: "techno",
    prevFilter: null,
    isDetailOpen: false,

    analyticsOn: true,

    // OPTIONS
    isSoundOn: true,
    linksNewTab: true,
    keyboardConfig: {...keyboardMap.kb_default},
    GPU: "",

    /*
    lateInit() {
      // highPerfInit();
    }
    */
};

export const CITIES = [
  {
    label: "tignes", caption: "From 2021 to 2022"
  }, {
    label: "saigon", caption: "From 2016 to 2020"
  }, {
    label: "lyon", caption: "From 2014 to 2016"
  }, {
    label: "montreal", caption: "From 2012 to 2013"
  }, {
    label: "paris", caption: "From childhood to university"
  }
]
