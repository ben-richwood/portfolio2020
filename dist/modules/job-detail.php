<div id="details" v-show="isOpen">
  <div class="details-wrapper">
    <div class="text">
      <div class="bg-block">
        <h2>{{ name }}</h2>
        <div class="techno-item-container" v-html="icons"></div>
        <div v-html="data"></div>
      </div>
    </div>
    <div class="images">
      <div v-for="img in images" :key="img.id">
        <picture>
          <source type="image/webp" :srcset="img.srcWebp">
          <source type="image/jp2" :srcset="img.srcJp2">
          <source type="image/jpg" :srcset="img.srcJpg">
          <img :src="img.srcJpg" alt="img">
        </picture>
     </div>`
    </div>
  </div>
</div>