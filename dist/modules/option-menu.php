<div id="optionMenu" v-show="optionsOpen">
  <div class="menuContainer hide">
    <div class="leftSubmenuColumn">
      <ul class="no-list option-menu-list">
        <li><button :class="currentSubmenu == 0 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(0)">Config</button></li>
        <li><button :class="currentSubmenu == 1 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(1)">Controls</button></li>
        <li><button :class="currentSubmenu == 2 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(2)">Graphics</button></li>
        <!-- <li><button :class="currentSubmenu == 3 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(3)">Stats</button></li> -->
        <li><button :class="currentSubmenu == 4 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(4)">Credit</button></li>
        <!-- <li><button :class="currentSubmenu == 5 ? 'active' : ''" class="large-button left-align" @click="timeline">{{ canvasMenuLabel }}</button></li> -->
        <li><button class="large-button left-align" @click="close">
          <!-- <img class="returnArrow" src="./assets/img/icons/return.svg" alt="back"> Back -->
          <svg class="returnArrow" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <use xlink:href="#return"/>
          </svg>
           <span>Back</span>
        </button></li>
      </ul>
    </div>
    <div class="rightSettings scrollbar">
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
        <div class="flex f-start row">
          <div class="">
            <div class="keyMap">
              <div class="key">{{ keyMap.option[1] }}</div>
              <div class="keyFeature">Open/close option menu</div>
            </div>
            <div class="keyMap">
              <div class="key">{{ keyMap.prev[1] }}</div>
              <div class="keyFeature">Previous project</div>
            </div>
          </div>
          <div style="margin-left: 5vw;">
            <div class="keyMap">
              <div class="key">{{ keyMap.next[1] }}</div>
              <div class="keyFeature">Next project</div>
            </div>
            <div class="keyMap">
              <div class="key">{{ keyMap.accept[1] }}</div>
              <div class="keyFeature">open project details</div>
            </div>
          </div>
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
        <div class="flex f-start f-row">
          <div>
            <ul>
              <li><svg class="returnArrow" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#three"/>
              </svg> ThreeJS</li>
              <li><svg class="returnArrow" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#vue"/>
              </svg>
              VueJs</li>
            </ul>
          </div>
          <div>
            <ul>
              <li><svg class="returnArrow" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#sass"/>
              </svg>
              SASS</li>
              <li><svg class="returnArrow" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#webpack"/>
              </svg>
              Webpack 4</li>
            </ul>
          </div>
        </div>
        <p class="tc">This portfolio is inspired by these references</p>
        <ul>
          <li>Menu, options and overall layout<br>
            <ul>
              <li>A mix of Cyberpunk 2077 & Assassin's Creed: Black Flag </li>
              <li><a href="https://codepen.io/BuddyLReno/pen/boGRPO" title="Pen from Buddy Reno">Codepen</a>: material design-inspired checkboxes</li>
            </ul>
          <li>Option menu: Assassin's Creed: Black Flag</li>
          <?php /*
          <li>"Design" environment: Deus Ex (Human Revolution & Mankind Divided), plus the Humming bird cafe in HCMC, Vietnam.</li> */ ?>
          <li>Timeline: it's largely inspired by the summary ending each mission in Detroit: Become Human</li>
          <li>Lots of help and code snippets from <a href="https://threejs.org/" target="_blank" title="link to ThreeJS official documentation">ThreeJS official documentation</a> and <a href="https://threejsfundamentals.org/" target="_blank" title="link to threejsfundamentals">threejsfundamentals</a> </li>
          <li>For the layout and in the element animations, I got inspired by <a href="https://threejs.org/examples/?q=period#css3d_periodictable" title="ThreeJS example - molecules">the excellent periodic table</a> from the ThreeJS website.</li>
          <li>For the bounds, I used the <a href="https://threejs.org/examples/?q=molecu#css3d_molecules" title="ThreeJS example - molecules">molecule sample from the THREEJS examples</a></li>
        </ul>
        <p class="tl">The source code is accessibe on my GitHub:<br><a href="https://github.com/ben-richwood/">Portfolio2020</a></p>
        <h3>Stack</h3>
        <p>Here is an overview of my daily tools, for development, design and project management.</p>
        <p>I tend to switch as much as possible to <abbr class="abbr" title="Free and Open Source Software">FOSS</abbr>, and get rid of licenced applications.</p>
        <ul>
          <li>Linux Debian 10</li>
        </ul>
        <div class="flex f-row f-between f-align-start">
          <div class="">
            <h4>Dev</h4>
            <ul>
              <li>Atom</li>
              <li>Firefox Developer Edition</li>
              <li><a href="https://meldmerge.org/">Meld</a> (for merge diff)</li>
              <li>
                Task runner
                <ul>
                  <li>Python scripts</li>
                  <li>Gulp</li>
                  <li>Webpack</li>
                  <li>Parcel</li>
                </ul>
              </li>
            </ul>
            <h4>Services</h4>
            <ul>
              <li>Heroku</li>
              <li>GitLab</li>
            </ul>
          </div>
          <div>
            <h4>Framework / Stack</h4>
            <ul>
              <li>
                javascript
                <ul>
                  <li>NodeJS & NPM</li>
                  <li>VueJS</li>
                  <li>React</li>
                  <li>ThreeJS</li>
                </ul>
              </li>
              <li>
                Ruby
                <ul>
                  <li>Ruby on Rails</li>
                  <li>ActiveAdmin</li>
                </ul>
              </li>
              <li>
                Python
                <ul>
                  <li>Flask</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex f-row f-between f-align-start">
          <div class="">
            <h4>Design</h4>
            <ul>
              <li>Adobe Photoshop (want to migrate to Gimp)</li>
              <li>Adobe Illustrator (want to migrate to <a href="https://inkscape.org/">InkScape</a>)</li>
              <li>Adobe inDesign (want to try <a href="https://www.scribus.net/">Scribus</a>)</li>
              <li>Adobe After Effect</li>
              <li>Sketch</li>
              <li><a href="https://imagemagick.org/index.php">ImageMagick</a> (want to try <a href="http://www.graphicsmagick.org/">GraphicsMagick</a>)</li>
            </ul>
          </div>
          <div>
            <h4>Project management</h4>
            <ul>
              <li>Thunderbird</li>
              <li><a href="https://clockify.me/">Clockify</a></li>
              <li><a href="https://wakatime.com/">WakaTime</a></li>
              <li>Google Apps</li>
            </ul>
          </div>
        </div>
        <h4>Misc</h4>
        <ul>
          <li><a href="https://www.blender.org/">Blender</a> (with EEVEE & Cycle render engines)</li>
        </ul>
        <?php /*
        https://uses.tech/

        https://brandonclapp.com/uses/
        https://gist.github.com/diurivj/78ca931c4b20dca1e1e13982fa9c309d
        https://stephfh.dev/uses/
        */ ?>
      </div>
    </div>
  </div>
</div>