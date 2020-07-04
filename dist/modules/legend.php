<div id="legend">
  <div class="legend" v-show="showLegend">
    <h3 style="margin-top:.3rem;">Project filtering</h3>
    <div class="row-legend">
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
      <div class="column-legend">
        <button @click="techno" class="filter-item" :class="selectedFilter === 'techno' ? 'selected' : ''">
          <span>Code</span>
        </button>
        <button @click="software" class="filter-item" :class="selectedFilter === 'software' ? 'selected' : ''">
          <span>Design</span>
        </button>
          <!-- <div @click="timeline" class="filter-item" :class="selectedFilter ? 'selected' : ''">
          <button>Timeline</button>
        </div> -->
        <button @click="all" class="filter-item" :class="selectedFilter === 'all' ? 'selected' : ''">
          <span>All</span>
        </button>
      </div>
      <div class="column-legend">
        <div class="major"> Major projects </div>
        <div class="minor"> Minor projects </div>
      </div>
      <div class="column-legend">
        <button @click="resetCamera" class="reset-camera" type="button" name="button">
          <svg class="" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <use xlink:href="#camera"/>
          </svg>
          <span>Reset camera</span></button>
      </div>
    </div>
  </div>

  <div class="key-legend" v-if="showLegendForDetail">
    <div class="key-block openMenu">
      <div class="key">{{ keyMap.option[1] }}</div>
      <label for="">Close detail</label>
    </div>
  </div>
  <div class="key-legend" v-else>
    <div class="key-block">
      <div class="key" style="padding-right:4.5rem;">{{ keyMap.accept[1] }}</div>
      <label for="">Open/close menu</label>
    </div>
    <!-- <div class="key-block">
      <div class="key">{{keyMap.option[1]}}</div>
      <label for="">menu</label>
    </div> -->
    <!-- <div class="key-block">
      <div class="key">C</div>
      <label for="">Console</label>
    </div> -->
    <div class="key-block">
      <div class="key">up</div>
      <label for="">Nav</label>
    </div>
  </div>
</div>