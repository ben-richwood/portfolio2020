<div id="details" v-show="isOpen" :class="blurred ? 'blurred' : ''">
  <div class="details-wrapper">
    <div class="text">
      <div class="bg-block no-margin">
        <h2>{{ name }}</h2>
        <svg-symbol v-for="icon in icons"  v-bind:use="icon"></svg-symbol>
      </div>

      <div class="flex-row">
        <div class="bg-block--secondary font-figure">
          {{ year }}
        </div>
        <div class="bg-block--secondary font-figure">
          {{ year }}
        </div>
      </div>


      <div class="only-mobile" v-for="img in images.slice(0, 1)">
        <picture>

            <source type="image/webp" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcWebp">
            <source type="image/jp2" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcJp2">
            <source type="image/jpg" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcJpg">

            <source type="image/webp" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcWebp">
            <source type="image/jp2" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcJp2">
            <source type="image/jpg" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcJpg">

          <img :src="img.srcJpg" alt="img">
        </picture>
      </div>

      <div class="bg-block" v-show="description !== ''" v-html="description"></div>
      <div class="bg-block" v-show="data !== ''" v-html="data"></div>
      <div v-html="link"></div>
    </div>
    <div class="images">
      <div v-for="img in images" :key="img.id">
        <div class="caption tc" v-show="img.caption">
          {{ img.caption }}
        </div>
        <picture>
          <!-- <source type="image/webp" media="(min-width: 1400px)" :srcset="img.srcWebp">
          <source type="image/jp2" :srcset="img.srcJp2">
          <source type="image/jpg" :srcset="img.srcJpg"> -->

            <source type="image/webp" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcWebp">
            <source type="image/jp2" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcJp2">
            <source type="image/jpg" media="(min-width: 800px) and (orientation: landscape)" :srcset="img.large.srcJpg">

            <source type="image/webp" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcWebp">
            <source type="image/jp2" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcJp2">
            <source type="image/jpg" media="(max-width: 800px) and (orientation: portrait)" :srcset="img.mobile.srcJpg">

          <img :src="img.srcJpg" alt="img">
        </picture>

     </div>`
    </div>
  </div>
</div>