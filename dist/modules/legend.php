<div id="legend">
  <div class="legend" v-show="showLegend">
    <h3 style="margin-top:.3rem;">Legend</h3>
    <!-- <div class="legend-row">
      <div class="qub main"> </div>
      <div class="text">Main thread</div>
    </div>
    <div class="legend-row">
      <div class="qub work"> </div>
      <div class="text">Work</div>
    </div>
    <div class="legend-row">
      <div class="qub freelance"> </div>
      <div class="text">Freelance</div>
    </div>
    <div class="legend-row">
      <div class="qub study"> </div>
      <div class="text">Study</div>
    </div> -->
    <div class="">
      <button @click="techno">Techno</button>
    </div>
    <div class="">
      <button @click="software">Software</button>
    </div>
    <div class="">
      <button @click="timeline">Timeline</button>
    </div>
    <div class="">
      <button @click="all">All</button>
    </div>
  </div>

  <div class="key-legend" v-if="showLegendForDetail">
    <div class="key-block">
      <div class="key" style="padding-right:6rem;">{{ keyMap.accept[1] }}</div>
      <label for="">Close detail</label>
    </div>
  </div>
  <div class="key-legend" v-else>
    <div class="key-block">
      <div class="key" style="padding-right:6rem;">{{ keyMap.accept[1] }}</div>
      <label for="">Show/hide legend</label>
    </div>
    <div class="key-block">
      <div class="key">{{keyMap.option[1]}}</div>
      <label for="">menu</label>
    </div>
    <div class="key-block">
      <div class="key">C</div>
      <label for="">Console</label>
    </div>
    <div class="key-block">
      <div class="key">up</div>
      <label for="">Nav</label>
    </div>
  </div>


</div>