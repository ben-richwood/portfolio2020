<div id="optionMenu" v-show="optionsOpen">
  <div class="menuContainer">
    <div class="leftSubmenuColumn">
      <ul>
        <li><button :class="currentSubmenu == 0 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(0)">Config</button></li>
        <li><button :class="currentSubmenu == 1 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(1)">Controls</button></li>
        <li><button :class="currentSubmenu == 2 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(2)">Graphics</button></li>
        <li><button :class="currentSubmenu == 3 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(3)">Stats</button></li>
        <li><button :class="currentSubmenu == 4 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(4)">Credit</button></li>
        <!-- <li><button :class="currentSubmenu == 5 ? 'active' : ''" class="large-button left-align" @click="timeline">{{ canvasMenuLabel }}</button></li> -->
        <li><button class="large-button left-align" @click="close"><img class="returnArrow" src="./assets/img/icons/return.svg" alt="back"> Back</button></li>
      </ul>
    </div>
    <div class="rightSettings">
      <div v-if="currentSubmenu == 0" id="config">
        <h3 class="tc">Config</h3>
        <div class="notice">
          <p class="tc">Adjust the general settings at your please</p>
        </div>
        <ul>
          <div class="inputGroup">
            <input id="radio1" name="radio" @click="changeLinkBehavior" v-model="linksNewTab" type="checkbox"/>
            <label for="radio1">Open all links in a new tab</label>
          </div>
          <div class="inputGroup">
            <input id="radio2" @click="muteSound" name="radio" type="checkbox"/>
            <label for="radio2">Mute sound</label>
          </div>
        </ul>
      </div>
      <div v-else-if="currentSubmenu == 1" id="controls">
        <h3 class="tc">Controls</h3>
        <div class="notice">
          <p class="tc">Change the controls</p>
        </div>
        <div class="inputGroup">
          <input id="kb_default" v-on:click="changeKbConfig('kb_default')" value="kb_default" name="radio" type="radio" v-model="kb_config"/>
          <label for="kb_default">Default</label>
        </div>
        <div class="inputGroup">
          <input id="kb_gamer" v-on:click="changeKbConfig('kb_gamer')" value="kb_gamer" name="radio" type="radio" v-model="kb_config"/>
          <label for="kb_gamer">Gamer</label>
        </div>
        <div class="inputGroup">
          <input id="kb_vim" v-on:click="changeKbConfig('kb_vim')" value="kb_vim" name="radio" type="radio" v-model="kb_config" />
          <label for="kb_vim">vim</label>
        </div>
        <?php echo file_get_contents("./assets/img/icons/keyboard.svg"); ?>
        <div class="keyMap">
          <div class="key">{{ keyMap.option[1] }}</div>
          <div class="keyFeature">Open/close option menu</div>
        </div>
        <div class="keyMap">
          <div class="key">{{ keyMap.prev[1] }}</div>
          <div class="keyFeature">Previous project</div>
        </div>
        <div class="keyMap">
          <div class="key">{{ keyMap.next[1] }}</div>
          <div class="keyFeature">Next project</div>
        </div>
        <div class="keyMap">
          <div class="key">{{ keyMap.accept[1] }}</div>
          <div class="keyFeature">open project details</div>
        </div>
        <!-- <img src="./assets/img/icons/keyboard.svg" alt="keyboard configuration"> -->
      </div>
      <div v-else-if="currentSubmenu == 2" id="graphics">
        <h3 class="tc">Graphics</h3>
        <div class="notice">
          <p class="tc">You can switch to low performances if the animation is not smooth. To switch to high perf, please refresh the page</p>
        </div>
        <ul>
          <li>Switch to Low Resolution</li>
          <div class="inputGroup">
            <input id="antialias" v-on:click="changeConfig('antialias')" name="radio" type="checkbox" v-model="antialias" />
            <label for="antialias">Antialias</label>
          </div>
          <div class="inputGroup">
            <input id="precision" v-on:click="changeConfig('precision')" name="radio" type="checkbox" v-model="precision" />
            <label for="precision">Enhanced shader precision</label>
          </div>
          <div class="inputGroup">
            <input id="isShadowEnabled" v-on:click="toggleShadows()" name="radio" type="checkbox" v-model="isShadowEnabled" />
            <label for="isShadowEnabled">Turn on/off shadows</label>
          </div>
        </ul>
      </div>
      <div v-else-if="currentSubmenu == 3" id="stat">
        <h3 class="tc">Stats</h3>
        <div class="notice">
          <p class="tc">Some statistic about your current session</p>
          <p class="tc"><b>Not any of these statistics are saved in any ways.</b></p>
        </div>
        <p>Ellapsed time from beginning of the session: {{ t1 }}</p>
        <p>Your GPU: {{ gpu }}</p>
        <p style="white-space: pre;">{{ fullConfig | displayArr }}</p>
      </div>
      <div v-else-if="currentSubmenu == 4" id="credit">
        <h3 class="tc">Credits</h3>
        <div class="notice">
          <p class="tc">This portfolio is built on these technologies:</p>
        </div>
        <ul>
          <li>ThreeJS</li>
          <li>VueJs</li>
          <li>SASS</li>
          <li>Webpack - not fully implemented yet</li>
          <li>GPU.js - not fully implemented yet</li>
          <li>Draco - not fully implemented yet</li>
        </ul>
        <p class="tc">This portfolio is inspired by these references</p>
        <ul>
          <li>Menu, options and overall layout<br>
            <ul>
              <li>A mix of Cyberpunk 2077 & Assassin's Creed: Black Flag </li>
              <li><a href="https://codepen.io/BuddyLReno/pen/boGRPO" title="Pen from Buddy Reno">Codepen</a>: material design-inspired checkboxes</li>
            </ul>
          <li>"Coding" environment: Assassin's Creed: Black Flag</li>
          <li>"Design" environment: Deus Ex (Human Revolution & Mankind Divided), plus the Humming bird cafe in HCMC, Vietnam.</li>
          <li>Timeline: it's largely inspired by the summary ending each mission in Detroit: Become Human</li>
          <li>Lots of help and code snippets from <a href="https://threejs.org/" target="_blank" title="link to ThreeJS official documentation">ThreeJS official documentation</a> and <a href="https://threejsfundamentals.org/" target="_blank" title="link to threejsfundamentals">threejsfundamentals</a> </li>
        </ul>
        <p class="tl">The source code is accessibe on my GitHub:<br><a href="https://github.com/ben-richwood/">Portfolio2020</a></p>
      </div>
    </div>
  </div>
</div>