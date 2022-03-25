import Vue from 'vue'
import Vuex from 'vuex'
import { SETTINGS } from '../constants.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {...SETTINGS}
  },
  mutations: {
    updateSettings (state, newSet) {
      // state.settings = {...newSet}
      state.settings = Object.assign({}, {...state.settings, ...newSet});
      // store.commit('updateSettings')
    }
  }
})
