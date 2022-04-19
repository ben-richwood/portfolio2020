<template lang="html">
  <div :class="{'full-width': mobile}">
    <h3 v-if="!mobile" style="margin-top:.3rem;" class="user-select-none">Filtering</h3>
    <div class="flex f-column f-between f-align-start">
      <div class="major legend-item user-select-none">Major projects</div>
      <div class="minor legend-item user-select-none">Minor projects</div>
    </div>
    <div class="flex f-column f-between f-align-start mt-10">
      <div class="legend-icon important-button" @click="applyFilter(0)" :class="{'active': $store.state.filtersOn[0]}">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img"><path d="M44.667,157h111v12h-123V45h12V157z M166.667,34v114h-113V34H166.667z M144.568,90L112.81,51H77.766l31.759,39l-31.759,39
          h35.044L144.568,90z"/>
        </svg>
        <label class="user-select-none" for="">Main job</label>
      </div>
      <div class="legend-icon important-button" @click="applyFilter(1)" :class="{'active': $store.state.filtersOn[1]}" >
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img">
          <path d="M12.507,90.288c-5.826-5.658-5.464-11.451,0-15.879l79.419-45.681c5.666-4.056,10.39-4.056,15.878,0l79.42,45.681 c6.358,5.482,5.642,11.275,0,15.879l-79.42,45.685c-4.615,3.306-10.213,3.723-15.878,0L12.507,90.288z M9.238,116.211 c0,4.423-0.894,7.734,3.269,11.784l79.419,45.68c5.666,3.724,11.263,3.306,15.878,0l79.42-45.68 c4.277-3.479,3.383-6.897,3.383-11.874v-3.213l-81.822,46.014c-5.195,3.638-11.509,4.1-17.868,0L9.238,112.998V116.211z"/></svg>
        <label class="user-select-none" for="">Freelance<br/> contract</label>
      </div>
      <div class="legend-icon important-button" @click="applyFilter(2)" :class="{'active': $store.state.filtersOn[2]}">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img"><path d="M35.897,33.829v120.673c0,6.107,4.955,11.054,11.063,11.054h83.228c6.112,0,11.068-4.946,11.068-11.054V134.92 l27.778-19.138c5.912-4.275,11.067-7.413,11.067-13.521V53.917c0-6.1-4.955-11.055-11.067-11.055h-27.778v-9.033l-60.747,0v44.228 h4.439l7.511,9.85v26.024l0,0H57.261V87.907l7.503-9.849h4.444V33.83L35.897,33.829z M163.749,96.972l-22.492,18.003V94.44V59.207 h22.492V96.972z"/></svg>
        </svg>
        <label calss="user-select-none" for="">Personal <br/>project</label>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      mobile: {type: Boolean, default: false},
    },
    data(){
      return{ }
    },
    computed: {
      selectedFilter() {
        return this.$store.state.currentFilter;
      },
    },
    methods: {
      applyFilter(key){
        this.$store.commit('setFilter', key)
        this.$emit("applyFilter")
      },
    }
  }
</script>

<style lang="scss" scoped>
  .full-width{
    width: 100vh;
    max-width: 100vh;
    flex-basis: 100%;
  }
</style>
