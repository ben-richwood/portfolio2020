<template lang="html">
  <figure>
    <picture>
      <source type="image/webp" :srcset="`${slug}${src}.webp`">
      <source type="image/jp2" :srcset="`${slug}${src}.jp2`">
      <source type="image/jpg" :srcset="`${slug}${src}.jpg`">

      <img loading="lazy" :src="`${slug}${src}.jpg`" :alt="alt">
      <figcaption class="tc" v-if="caption !== ''">{{ caption }}</figcaption>
    </picture>
  </figure>
</template>

<script>
	export default {
		props: {
			src: {type: String, required: true},
			slug: {type: String, required: true},
			alt: {type: String, default: ""},
			caption: {type: String, default: ""},
		},
	}
</script>

<style lang="scss">
  figcaption{
    font-style: italic;
    font-size: 0.8rem;
    opacity: .75;
  }
</style>
