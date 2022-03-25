<div id="legend">
  <div class="legend" v-show="showLegend" :class="HUDoff ? 'smaller' : ''">
    <h3 style="margin-top:.3rem;">Filtering</h3>
    <div class="flex f-row f-start">
      <div class="col-12" style="padding-left:0;">
        <button v-for="([key, value], idx) in Object.entries(filterItems)" :key="key" @click="applyFilter(key)" class="filter-item" :class="selectedFilter === key ? 'selected' : ''">
          <span>{{ value.name }}</span>
        </button>
      </div>

    </div>
  </div>

  <div class="key-legend only-desktop" v-if="showLegendForDetail">
    <div class="key-block openMenu" @click="close">
      <div class="key">{{ keyMap.option[1] }}</div>
      <label for="">Close detail</label>
    </div>
  </div>
  <div class="key-legend only-desktop" v-else>
    <div class="HUD-legend initially-reduced" :class="HUDoff ? 'hideHUD' : ''">
      <div class="flex f-row f-between">
        <div class="legend-icon" style="align-items: flex-start;">
          <div class="major legend-item">Major projects</div>
          <div class="minor legend-item">Minor projects</div>
        </div>
        <div class="legend-icon">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img"><path fill="#FFF" d="M44.667,157h111v12h-123V45h12V157z M166.667,34v114h-113V34H166.667z M144.568,90L112.81,51H77.766l31.759,39l-31.759,39
            h35.044L144.568,90z"/>
          </svg>
          <label for="">Main job</label>
        </div>
        <div class="legend-icon">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img">
            <path fill="#FFF" d="M12.507,90.288c-5.826-5.658-5.464-11.451,0-15.879l79.419-45.681c5.666-4.056,10.39-4.056,15.878,0l79.42,45.681 c6.358,5.482,5.642,11.275,0,15.879l-79.42,45.685c-4.615,3.306-10.213,3.723-15.878,0L12.507,90.288z M9.238,116.211 c0,4.423-0.894,7.734,3.269,11.784l79.419,45.68c5.666,3.724,11.263,3.306,15.878,0l79.42-45.68 c4.277-3.479,3.383-6.897,3.383-11.874v-3.213l-81.822,46.014c-5.195,3.638-11.509,4.1-17.868,0L9.238,112.998V116.211z"/></svg>
          <label for="">Freelance<br/> contract</label>
        </div>
        <div class="legend-icon">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet" role="img"><path fill="#FFF" d="M35.897,33.829v120.673c0,6.107,4.955,11.054,11.063,11.054h83.228c6.112,0,11.068-4.946,11.068-11.054V134.92 l27.778-19.138c5.912-4.275,11.067-7.413,11.067-13.521V53.917c0-6.1-4.955-11.055-11.067-11.055h-27.778v-9.033l-60.747,0v44.228 h4.439l7.511,9.85v26.024l0,0H57.261V87.907l7.503-9.849h4.444V33.83L35.897,33.829z M163.749,96.972l-22.492,18.003V94.44V59.207 h22.492V96.972z"/></svg>
          </svg>
          <label for="">Personal <br/>project</label>
        </div>
      </div>
    </div>
    <div class="key-blocks initially-reduced" :class="HUDoff ? 'smaller' : ''">
      <div class="key-block" @click="menu">
        <div class="key" style="padding-right:4.5rem;">{{ keyMap.accept[1] }}</div>
        <label for="">Open menu</label>
      </div>
      <div class="key-block" @click="HUD">
        <div class="key">{{ keyMap.hud[1] }}</div>
        <label for="">{{ HUDoff ? 'Display HUD' : 'Minimize HUD'}}</label>
      </div>
      <!-- <div class="key-block">
        <div class="key">{{keyMap.option[1]}}</div>
        <label for="">menu</label>
      </div> -->
      <!-- <div class="key-block">
        <div class="key">C</div>
        <label for="">Console</label>
      </div> -->
    </div>
  </div>
</div>
<div id="scale" class="only-desktop">
  <div class="marker" id="scaleMarker"></div>
  <!-- <button @click="resetCamera" class="reset-camera" type="button" name="button" title="Reset the camera">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 1800 200 200" preserveAspectRatio="xMinYMin meet">
    <title>Camera</title>
    <path fill="#11517F" d="M120.758,1851.507c6.511,0,11.789,5.278,11.789,11.789v27.705l17.684-10.159l35.466-20.395v79.105l-35.485-20.415
      l-17.684-10.159v27.705c0,6.512-5.278,11.789-11.789,11.789h-96.16c-6.511,0-11.79-5.277-11.79-11.789v-73.388
      c0-6.511,5.278-11.789,11.79-11.789H120.758 M120.758,1839.718h-96.18c-13.022,0-23.579,10.556-23.579,23.578v73.407
      c0,13.022,10.556,23.579,23.579,23.579h96.18c13.022,0,23.579-10.557,23.579-23.579v-7.328l39.514,22.713
      c1.817,1.123,3.896,1.753,6.032,1.828c4.48,0,7.584-3.576,7.584-9.727v-88.419c0-6.149-3.104-9.726-7.584-9.726
      c-2.135,0.074-4.214,0.703-6.032,1.827l-39.514,22.753v-7.329C144.337,1850.273,133.78,1839.718,120.758,1839.718L120.758,1839.718z
      "/>
    </svg>
  </button> -->
</div>
