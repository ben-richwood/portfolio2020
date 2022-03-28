<template lang="html">
  <a class="color-link" :target="linksNewTab" :href="url">{{ copy }}</a>
</template>

<script>
	export default {
    props: {
      url: {type: String, required: true},
      copy: {type: String, required: true},
    },
	  computed: {
	    linksNewTab() {
	      return this.$store.state.settings.linksNewTab ? '_blank' : '_self'
	    }
	  },
	}
</script>
