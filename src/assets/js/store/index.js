import Vue from 'vue'
import Vuex from 'vuex'
import { SETTINGS } from '../constants.js';
import { PROJECTS } from '../projects.js'
// import { SingletonTimeline } from '../timeline.js';
import { sound, getCookie, formatTutoObj, setCookie } from "../utilis.js";
import _ from 'lodash';

import Analytics from 'analytics'
// import googleAnalytics from '@analytics/google-analytics'
// import doNotTrack from 'analytics-plugin-do-not-track'

// var sortedTimeline = _.cloneDeep(PROJECTS.list).filter(e => {
// 	if (!e.hasOwnProperty("ignore") || e.ignore !== true) return e
// });


const tuto = formatTutoObj("tutoAlreadySeen")

Vue.use(Vuex)

var sortedTimeline = _.cloneDeep(PROJECTS.list).filter(e => {
	if (!e.hasOwnProperty("ignore") || e.ignore !== true) return e
});

let analytics;

// let Timeline
const project_template = {
  name: "",
  year: null,
  description: null,
  category: null,
  link: null,
  images: null,
  icons: null,
  data: null,
  iconsTech: null
}

export default new Vuex.Store({
  state: {
    settings: {...SETTINGS},
    currentFilter: "techno",
    previousFilter: null,
    isPaused: true,
    brightness: 90,
    developerMode: false,
    isMenuOpen: false,
    currentProject: null,
		currentTuto: 'pan',
		tuto,

    showLegend: false,

    // main, freelance, personal = CAT
    filtersOn: [false, false, false],
    // used as cached value for ProjectObject.applyFiler()
    allFiltersOff: true,
    // major, minor
    jobFiltersOn: [false, false],
    allJobFiltersOff: true,

    analytics: null,
  },
  getters:{
    getCurrentProject: (state) => () => {
      if (!state.currentProject) {
        return null
      } else {
        let project = {...project_template}
        let prj = PROJECTS.list.find(e => e["id"] === parseInt(state.currentProject) );
        // window.history.pushState( {} , '', `?project=${prj.name.toLowerCase().replaceAll(' ', '_')}` );
        if(!prj) return null

        if (state.settings.analyticsOn){
          // Event action - type of action
          /*
          analytics.track('click', {
            category: 'Projects', // Typically the object that was interacted with
            label: prj.name,
            value: prj.id
          });
          */
        }

        project.name = prj.name;
        // legendMenu.showLegend = false;
        project.icons = [], project.iconsTech = [], project.images = [];
        let htmlToPrint = "";
        if (prj.techno && prj.techno.list && prj.techno.list.length > 0) {
          prj.techno.list.forEach((item, i) => {
            project.iconsTech.push(`#${item.toLowerCase()}`);
          });
        }
        if (prj.software && prj.software.list && prj.software.list.length > 0) {
          prj.software.list.forEach((item, i) => {
            project.icons.push(`#${item.toLowerCase()}`);
          });
        }

        project.year = prj.year

        if (prj.category) {
          project.category = prj.category;
        }
        project.description = prj.description;

        if (prj.code) {
          htmlToPrint += `<h3>Code</h3>${prj.code}`
        }
        if (prj.design) {
          htmlToPrint += `<h3>Design</h3>${prj.design}`
        }
        if (prj.link) {
          project.link = `<div><a href="${prj.link}" ${state.settings.linksNewTab ? "target='_blank'" : ""} class="case-link" title="Link to ${prj.name}">go to the website</a></div>`
        }
        project.data = htmlToPrint

        if (prj.images && prj.images.length > 0) {
          let counter = 0;
          prj.images.forEach((item, i) => {
            let itemUrl = "";
            if (typeof item === "string"){ itemUrl = item }
            else { itemUrl = item.url }
            let newImg = {
              id: counter,
              src: item,
							slug: `assets/img/all-projects/${prj.slug}`,
							caption: "",
              screenshot: typeof item !== "string" && item.screenshot,
              srcJpg: `assets/img/all-projects/${prj.slug}/${itemUrl}.jpg`,
							fileName: itemUrl,
              large: {
                srcJpg: `assets/img/all-projects/${prj.slug}/${itemUrl}.jpg`,
                srcJp2: `assets/img/all-projects/${prj.slug}/${itemUrl}.jp2`,
                srcWebp: `assets/img/all-projects/${prj.slug}/${itemUrl}.webp`,
              },
              mobile: {
                srcJpg: `assets/img/all-projects/${prj.slug}/${itemUrl}-mobile.jpg`,
                srcJp2: `assets/img/all-projects/${prj.slug}/${itemUrl}-mobile.jp2`,
                srcWebp: `assets/img/all-projects/${prj.slug}/${itemUrl}-mobile.webp`,
              }
            }
            if (typeof item === "object"){
              newImg.caption = item.caption;
            }
            project.images.push(newImg);
            counter++;
          });
        }
        return project
      }
    },
  },

  mutations: {
    tutoWatched (state, val) {
			console.log(val)
      state.tuto = {...state.tuto, ...val};
			if (Object.values(state.tuto).every(e => e === true)) {
				setCookie("tutoAlreadySeen", true)
			}
    },
    updateSettings (state, newSet) {
      state.settings = Object.assign({}, {...state.settings, ...newSet});
    },
    setSorting (state, newFilter) {
      state.previousFilter = state.currentFilter
      state.currentFilter = newFilter
    },
    setFilter (state, filterIdx) {
      state.filtersOn.splice(filterIdx, 1, !state.filtersOn[filterIdx])
      let allFiltersOff = false
      if (state.filtersOn.every(e => e === true)){
        state.filtersOn = [false, false, false]
        allFiltersOff = true
      }
      if (state.filtersOn.every(e => e === false)) allFiltersOff = true
      state.allFiltersOff = allFiltersOff
    },
    setJobTypeFilter (state, filterIdx) {
      state.jobFiltersOn.splice(filterIdx, 1, !state.jobFiltersOn[filterIdx])
      let allFiltersOff = false
      if (state.jobFiltersOn.every(e => e === true)){
        state.jobFiltersOn = [false, false]
        allFiltersOff = true
      }
      if (state.jobFiltersOn.every(e => e === false)) allFiltersOff = true
      state.allJobFiltersOff = allFiltersOff
    },
    setPauseState (state, status) {
      state.isPaused = status
    },
    escape (state) {
      this.commit("setProject", null)
      this.commit("toggleMenu", false)
    },
    setProject (state, id) {
      // null to close
      state.currentProject = id
    },
    nextProject (state, next=true) {
			return
      if (state.currentProject === null) return
      let sign = next ? 1 : -1
      var currentProjectIndex = sortedTimeline.findIndex(e => e.id === state.currentProject )
      if (next){
				if (nextProject === -1) {
          state.currentProject = 1
          return
        } else { }
      }
    },
    toggleMenu (state, val=undefined) {
      sound.project();
      if (val !== undefined){
        state.isMenuOpen = val
      } else {
        state.isMenuOpen = !state.isMenuOpen
      }
      if (!state.analytics) return
      if (state.isMenuOpen && state.settings.analyticsOn){
        state.analytics.track('key press', {
          category: 'Options menu',
          label: 'menu opening',
          value: 1
        });
      }
    },
    toggleLegend (state) {
			sound.hud();
      state.showLegend = !state.showLegend;
    },
    setBrightness (state, newVal) {
      state.brightness = newVal;
    },
    toggleDvpMode (state, status) {
      state.developerMode = status
    },
    initiAnalytics (state) {
      state.analytics = Analytics({
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
      state.analytics.page();
      state.analytics.plugins.disable('google')
    },
    enableAnalytics(state){
      if (!state.analytics) return
      state.analytics.plugins.enable('google')
    },
    analyticsTrackProject(state, data) {
      // console.log("state.analytics", state.analytics);
      if (!state.analytics) return
      state.analytics.track('click', {
        category: 'Projects', // Typically the object that was interacted with
        label: data.name,
        value: data.id
      });
    }
  }
})
