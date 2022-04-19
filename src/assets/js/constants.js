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
