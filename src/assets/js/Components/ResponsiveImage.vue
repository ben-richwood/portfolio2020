<template lang="html">
  <picture>
    <source type="image/webp" :srcset="`${slug}${src}.webp`">
    <source type="image/jp2" :srcset="`${slug}${src}.jp2`">
    <source type="image/jpg" :srcset="`${slug}${src}.jpg`">

    <img loading="lazy" :src="`${slug}${src}.jpg`" :alt="alt">
  </picture>
</template>

<script>
	export default {
		props: {
			src: {type: String, required: true},
			slug: {type: String, required: true},
			alt: {type: String, default: ""},
		},
	}
</script>
