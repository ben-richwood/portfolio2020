
<div id="details" v-show="isOpen" :class="blurred ? 'blurred' : ''">
  <div class="only-mobile" style="position:fixed;top:1rem;right:1rem;z-index:300">
    <button type="button" class="large-button left-align" name="button" @click="close" style="background-color:#222222BB;min-height:initial;padding: .2rem .5rem .45rem;">
      <svg class="returnArrow" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <use xlink:href="#return"/>
      </svg>
       <span>Back</span>
    </button>
  </div>
  <div class="details-wrapper flex f-row f-between">
    <div class="text">
      <div class="scrollbar">
        <div class="bg-block no-margin">
          <h2>{{ name }}</h2>
          <div>
            <svg-symbol v-for="(icon, key) in iconsTech" :key="key" v-bind:use="icon"></svg-symbol>
          </div>
          <div>
            <svg-symbol v-for="(icon, key) in icons" :key="key" v-bind:use="icon"></svg-symbol>
          </div>
        </div>

        <div class="flex f-between f-row extra_job-info">
          <div class="bg-block--secondary font-figure">
            {{ year }}
          </div>
          <div class="bg-block--secondary font-figure" v-show="category !== null">
            {{ category }}
          </div>
        </div>


        <div class="only-mobile" v-for="(img, i) in images.slice(0, 1)" :key="i">
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
    </div>
    <div class="images">
      <div class="only-mobile">
        <h3>Images</h3>
      </div>
        <div class="scrollbar">
        <div v-for="img in images" transition="staggered" stagger="400" :key="img.id">
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
       </div>
      </div>
    </div>
  </div>
</div>
