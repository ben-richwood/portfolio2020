<template lang="html">
  <div :class="{'full-width': mobile}">
    <h3 v-if="!mobile" style="margin-top:.3rem;" class="user-select-none">Sorting</h3>
    <div class="flex f-row f-start">
      <div class="col-12" style="padding-left:0;">
        <button v-for="([key, value], idx) in Object.entries(filterItems)" :key="key" @click="applySorting(key)" class="filter-item" :class="selectedFilter === key ? 'selected' : ''">
          <span class="user-select-none">{{ value.name }}</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script>
  const filters = {
    techno: {name: "techno", id:"techno"},
    software: {name: "software", id:"software"},
    timeline: {name: "timeline", id:"timeline"},
    all: {name: "grid", id:"all"}
  }
  export default {
    props: {
      mobile: {type: Boolean, default: false},
    },
    data(){
      return{
        filterItems: filters,
      }
    },
    computed: {
      selectedFilter() {
        return this.$store.state.currentFilter;
      },
    },
    methods: {
      applySorting: function(key){
        this.$store.commit('setSorting', key)
        this.$emit("applySorting")
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
