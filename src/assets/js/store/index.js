import Vue from 'vue'
import Vuex from 'vuex'
import { SETTINGS } from '../constants.js';
import { PROJECTS } from '../projects.js'
import { SingletonTimeline } from '../timeline.js';
import { sound } from "../utilis.js";

import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import doNotTrack from 'analytics-plugin-do-not-track'

Vue.use(Vuex)

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
            project.images.push(newImg);
            counter++;
          });
        }
        console.log("project");
        return project
      }
    }
  },

  mutations: {
    updateSettings (state, newSet) {
      state.settings = Object.assign({}, {...state.settings, ...newSet});
    },
    setFilter (state, newFilter) {
      state.previousFilter = state.currentFilter
      state.currentFilter = newFilter
    },
    setPauseState (state, status) {
      state.isPaused = status
    },
    setProject (state, id) {
      // null to close
      state.currentProject = id
      console.log("state.currentProject", state.currentProject);
    },
    toggleMenu (state) {
      sound.project();
      state.isMenuOpen = !state.isMenuOpen
      if (!state.analytics) return
      if (state.isMenuOpen && state.settings.analyticsOn){
        state.analytics.track('key press', {
          category: 'Options menu',
          label: 'menu opening',
          value: 1
        });
      }
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
      console.log("state.analytics", state.analytics);
      if (!state.analytics) return
      state.analytics.track('click', {
        category: 'Projects', // Typically the object that was interacted with
        label: data.name,
        value: data.id
      });
    }
  }
})
