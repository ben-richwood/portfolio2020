<div id="optionMenu" v-show="optionsOpen">
  <div class="menuContainer hide">
    <div class="leftSubmenuColumn">
      <ul class="no-list option-menu-list">
        <li><button :class="currentSubmenu == 3 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(3)">About me</button></li>
        <li><button :class="currentSubmenu == 0 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(0)">Config</button></li>
        <li><button :class="currentSubmenu == 1 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(1)">Controls</button></li>
        <li><button :class="currentSubmenu == 2 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(2)">Graphics</button></li>
        <li><button :class="currentSubmenu == 4 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(4)">Stats</button></li>
        <li><button :class="currentSubmenu == 5 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(5)">Credit</button></li>
        <li><button :class="currentSubmenu == 6 ? 'active' : ''" class="large-button left-align" @click="changeSubmenu(6)">Privacy</button></li>
        <li><button class="large-button left-align" @click="close">
          <svg class="returnArrow" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <use xlink:href="#return"/>
          </svg>
           <span>Back</span>
        </button></li>
      </ul>
    </div>
    <div class="rightSettings scrollbar">
      <div v-if="currentSubmenu == 0" id="config">
        <h3 class="tc">Website config</h3>
        <div class="notice">
          <p class="tc">Adjust the general settings at your please</p>
        </div>
        <ul>
          <h3>External links</h3>
          <div class="inputGroup">
            <input id="radio1" name="radio" @click="changeLinkBehavior" v-model="linksNewTab" type="checkbox"/>
            <label for="radio1">{{linksNewTab ? 'Open external links in a new tab' : 'Open the external links in the current tab'}}</label>
          </div>
          <!-- <div class="inputGroup">
            <input id="radio2" @click="muteSound" name="radio" type="checkbox"/>
            <label for="radio2">Mute sound</label>
          </div> -->
        </ul>
      </div>
      <div v-if="currentSubmenu == 1" id="controls">
        <h3 class="tc">Controls</h3>
        <div class="notice"> <p class="tc">Mouse</p> </div>
        <?php echo file_get_contents("./assets/img/icons/mice.svg"); ?>
        <div class="notice"> <p class="tc">Keyboard</p> </div>
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
        <div class="flex f-start f-row">
          <div class="col-12 col-md-6">
            <div class="keyMap">
              <div class="key">{{ keyMap.option[1] }}</div>
              <div class="keyFeature">Close project details and Option menu</div>
            </div>
            <div class="keyMap">
              <div class="key">{{ keyMap.hud[1] }}</div>
              <div class="keyFeature">Display/hide <span class="abbr" title="Head-Up display">HUD</span></div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="keyMap">
              <div class="key">{{ keyMap.accept[1] }}</div>
              <div class="keyFeature">Open/close the Option menu (current menu)</div>
            </div>
          </div>
        </div>
        <?php echo file_get_contents("./assets/img/icons/keyboard.svg"); ?>
        <!-- <img src="./assets/img/icons/keyboard.svg" alt="keyboard configuration"> -->
      </div>
      <div v-else-if="currentSubmenu == 2" id="graphics">
        <h3 class="tc">Graphics</h3>
        <div class="notice">
          <p class="tc">You can switch to low performances if the animation is not smooth. To switch to high perf, please refresh the page</p>
        </div>
        <div class="inputGroup">
          <input id="debug" v-on:click="changeConfig('debug')" name="radio" type="checkbox" v-model="isDebugMode" />
          <label for="debug">Debug mode</label>
        </div>
        <div class="notice">Shows an info box that monitor code performance. You can click to parade across FPS (Frames rendered in the last second), MS (millisecond needed to render a frame) and MB (allocated memory).</div>
        <h3>Dark mode</h3>
        <div class="inputGroup">
          <input id="dark" v-on:click="darkMode()" name="radio" type="checkbox" v-model="isDarkMode" />
          <label for="dark">Dark mode {{isDarkMode ? 'enabled' : 'disabled'}}</label>
        </div>
        <div class="notice">If your system is set up to Dark mode, it may not work.</div>

        <h3>Brightness</h3>
        <div>
          <input type="range" min="20" max="100" step="5" v-on:input="updateBrightness" v-model="brightness" class="slider">
        </div>
        <div class="notice">You can adjust brightness</div>
        <!-- <div class="inputGroup">
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
        </div> -->
      </div>
      <div v-else-if="currentSubmenu == 3" id="about">
        <h3 class="tc">About me</h3>
        <h3>Contact me</h3>
        <div class="notice tl">
          <p class="mb">If you want to shoot me an email:</p>
          <div class="tl color-link" v-html="emailAddress" style="unicode-bidi:bidi-override; direction: rtl;"></div>
        </div>
        <div class="notice">
          <div class="flex f-start f-row">
            <div class="col-12">
              <h4>Links - social medias</h4>
              <p class="mb">You'll find pretty much the same content as on the website - plus few extra work and projects that didn't fit here.</p>
            </div>
            <div class="col-12 col-md-6">
              <ul>
                <li><link-to copy="LinkedIn" url="https://www.linkedin.com/in/benjaminrichebois/"></link-to></li>
                <li><link-to copy="GitHub" url="https://github.com/ben-richwood/"></link-to></li>
                <li><link-to copy="ArtStation" url="https://richwood.artstation.com/"></link-to></li>
              </ul>
            </div>
            <div class="col-12 col-md-6">
              <ul>
                <li><link-to copy="Behance" url="https://www.behance.net/ben-richwood"></link-to></li>
                <li><link-to copy="Dribbble" url="https://dribbble.com/richwood"></link-to></li>
                <li><link-to copy="SketchFab" url="https://sketchfab.com/richwood"></link-to></li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div class="tagline"><p>I'm <span class="highlight--tag">project manager</span> and <span class="highlight--tag">digital producer</span> who puts <span class="highlight--tag">code</span> and <span class="highlight--tag">design</span> into my daily work.</p></div>
          <div>
            <p>I'm Ben Richebois (<em>aka</em> Richwood). While my main job is Project Manager and Digital Producer, I use code and design capabilities to prototype ideas, lead preliminary researches and feasibilities studies (<span class="abbr" title="Proof Of Concept">POC</span>), automate and improve internal tools.</p>
            <p>I also work on freelance jobs, as developer and designer.</p>
            <p>This portfolio has been designed with a single idea in mind: to show evidence and examples of project I made for every skills I state in my portfolio.</p>
          </div>
        </div>
        <h4 class="mt-30">Some of the techno I work with daily</h4>
        <div class="flex f-start f-row">
          <?php
            $arrImg = array("js", "react", "vue", "gulp", "webpack", "bash", "git", "nodejs", "python", "sass", "bootstrap", "analytics", "photoshop", "illustrator");
            $count = count($arrImg);
            for( $i = 0; $i<$count; $i++ ) { ?>
              <svg xmlns="http://www.w3.org/2000/svg" class="techno-svg" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="#<?php echo $arrImg[$i]; ?>"/>
              </svg>
          <?php } ?>
        </div>
        <?php /*
        <div>
          <h4>PM and coding</h4>
          <p>
            I found out that many concepts in coding could be applied to project management, such as changelog, READMErgba(24,117,187,1) (documentation) or <span class="abbr" title="Version Control System">VCS</span>
          </p>
        </div>
        */ ?>
        <h3>Places where I lived</h3>
        <div class="flex f-start f-row">
          <?php
            $arrImg = array("tignes", "saigon", "lyon", "montreal", "paris");
            $count = count($arrImg);
            for( $i = 0; $i<$count; $i++ ) { ?>
              <div class="col-6 col-md-3">
                <picture>
                  <source type="image/webp" srcset="assets/img/all-projects/about/map_<?php echo $arrImg[$i]; ?>.webp">
                  <source type="image/jp2" srcset="assets/img/all-projects/about/map_<?php echo $arrImg[$i]; ?>.jp2">
                  <source type="image/jpg" srcset="assets/img/alrgba(24,117,187,1)l-projects/about/map_<?php echo $arrImg[$i]; ?>.jpg">

                  <img loading="lazy" src="assets/img/all-projects/about/map_<?php echo $arrImg[$i] ?>.jpg" alt="Map of <?php echo $arrImg[$i] ?>">
                </picture>
              </div>
            <?php }; ?>
        </div>
        <div class="">
          <h3>Other hobbies</h3>
          <h4>Urban planning</h4>
          <p>Urban planning and all kind of city stakes - such as gentrification, energy optimization and reduction, waste management, rural exodus, stream and flux etc. - are major interests for me. With the growth of AI, modelisation and simulation tools, I look with interest at the solutions of tomorrow.</p>
          <h4 class="mt-30">3D modeling and animation</h4>
          <p>I stumbled upon Blender when I was in high school and I toy with the tool ever since. I look with attention at the latest trends, tools, techniques, practices and methodologies; I keep up with rendering engines, <span class="abbr" title="Physically based rendering">PBR</span>, shaders, game engine integrations, portfolios, filming techniques (like the recent semicircular LED video wall) and the like. And only recently I started to work on Blender more seriously, trying to produce more professional-looking stuff.</p>
          <h4 class="mt-30">Storytelling in video games</h4>
          <p>I'm really keen on video games, as a medium that tells stories and carries complex narrative arcs. Unlike a movie or a novel for instance, it allows to involve users further than any other medias.</p>
          <p>It's not a coincidence if this portfolio is designed like a video game...</p>
          <?php /*
          <h4>Misc</h4>
          <p>And besides that, I travelled a lot in Vietnam, I ran 2 half marathons, I start designing a desktop...</p>
          */ ?>
        </div>
      </div>
      <div v-else-if="currentSubmenu == 4" id="stat">
        <h3 class="tc">Stats</h3>
        <div class="notice">
          <p class="tc">Some statistic about your current session</p>
          <?php /*<p class="tc"><b>Not any of these statistics are saved in any ways.</b></p> */ ?>
        </div>
        <p>Ellapsed time from beginning of the session: <b>{{ t1 }}</b></p>
        <div class="mt-30">Your <span class="abbr" title="Graphics Processing Unit - aka your graphic card">GPU</span>: {{ gpu }}</div>
        <!-- <div class="mt-30" style="white-space: pre;">{{ fullConfig | displayArr }}</div> -->
        <div class="mt-30" style="white-space: pre;" v-html="displayArr(fullConfig)"></div>
      </div>
      <div v-else-if="currentSubmenu == 5" id="credit">
        <h3 class="tc">Credits</h3>
        <!-- <div class="notice">
          <p class="tl">This portfolio is built with these technologies:</p>
        </div> -->
        <h4>Techno and stack</h4>
        <div class="flex f-start f-row">
          <div class="col-12 col-md-6">
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
          <div class="col-12 col-md-6">
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
        <h3>Refernces</h3>
        <div class="notice">
          <p class="tl">This portfolio is inspired by these references</p>
        </div>
        <ul>
          <li>Menu, options and overall layout<br>
            <ul>
              <li>Inspiration from Cyberpunk 2077, Detroit: Becoe human and The Division</li>
              <li>Intro: inspired by Stripe website, for the idea of "skills that go over compartments".</li>
              <li><link-to url="https://codepen.io/BuddyLReno/pen/boGRPO" copy="Codepen"></link-to>: material design-inspired checkboxes</li>
            </ul>
          <!-- <li>Option menu: Assassin's Creed: Black Flag</li> -->
          <li><link-to url="https://www.dreamler.com/product-features/" copy="Dreamlr"></link-to> - a visual tool for project management, with the same zoom and pan approach</li>
          <li>Timeline: it's largely inspired by the summary ending each mission in Detroit: Become Human</li>
          <li>Lots of help and code snippets from <link-to url="https://threejs.org/" copy="ThreeJS official documentation"></link-to> and <link-to url="https://threejsfundamentals.org/" copy="threejsfundamentals"></link-to></li>
          <li>For the layout and in the element animations, I got inspired by <link-to url="https://threejs.org/examples/?q=period#css3d_periodictable" copy="the excellent periodic table"></link-to> from the ThreeJS website.</li>
          <li>For the bounds, I used the <link-to url="https://threejs.org/examples/?q=molecu#css3d_molecules" copy="molecule sample from the THREEJS examples"></link-to></li>
        </ul>
        <p class="tl">The source code is accessibe on my GitHub:<br><link-to url="https://github.com/ben-richwood/" copy="Portfolio2020 on GitHub"></link-to></p>
        <h3>Stack</h3>
        <p>Here is an overview of my daily tools, for development, design and project management.</p>
        <p>I tend to switch as much as possible to <abbr class="abbr" title="Free and Open Source Software">FOSS</abbr>, and get rid of licenced applications since it's no longer possible to buy lifetime licences - and there're many great FOSS out there that seriously challenge paid software.</p>
        <ul>
          <li>Linux Debian 10</li>
        </ul>
        <div class="flex f-row f-start f-align-start">
          <div class="col-12 col-md-6">
            <h4>Dev</h4>
            <ul>
              <li>OS: Ubuntu 20.04.1 LTS with Awesome WM</li>
              <li>Terminal: zsh & oh-my-zsh (plus manpage autocompletion from fish)</li>
              <li>Atom</li>
              <li>Firefox Developer Edition</li>
              <li>
                Task runners
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
          <div class="col-12 col-md-6">
            <h4>Framework / Stack</h4>
            <ul>
              <li>
                Javascript
                <ul>
                  <li>NodeJS & NPM</li>
                  <li>VueJS</li>
                  <li>AlpineJS</li>
                  <li>ThreeJS</li>
                  <li>Mapbox</li>
                  <li>React</li>
                </ul>
              </li>
              <li>
                Ruby
                <ul>
                  <li>Ruby on Rails</li>
                </ul>
              </li>
              <li>
                Python
                <ul>
                  <li>Flask</li>
                  <li>Django (with DRF)</li>
                </ul>
              </li>
              <li>
                PHP
                <ul>
                  <li>Laravel</li>
                  <li>Twig</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex f-row f-start f-align-start">
          <div class="col-12 col-md-6">
            <h4>Design</h4>
            <ul>
              <li>Adobe Photoshop (migrating to <a class="color-link" :target="linksNewTab ? '_blank' : '_self'" href="https://affinity.serif.com/en-gb/photo/">Affinity Photo</a> and Gimp)</li>
              <li>Adobe Illustrator (migrating to <a class="color-link" :target="linksNewTab ? '_blank' : '_self'" href="https://affinity.serif.com/en-gb/designer/">Affinity Designer</a> and <a class="color-link" :target="linksNewTab ? '_blank' : '_self'" href="https://inkscape.org/">InkScape</a>)</li>
              <li>Adobe inDesign (migrating to <a class="color-link" :target="linksNewTab ? '_blank' : '_self'"  href="https://www.scribus.net/">Scribus</a>)</li>
              <li>Adobe After Effect (migrating to <a class="color-link" :target="linksNewTab ? '_blank' : '_self'"  href="https://natrongithub.github.io/">Natron</a> and Blender)</li>
              <li>Sketch</li>
              <li><a class="color-link" :target="linksNewTab ? '_blank' : '_self'"  href="https://imagemagick.org/index.php">ImageMagick</a> (want to try <a class="color-link" :target="linksNewTab ? '_blank' : '_self'"  href="http://www.graphicsmagick.org/">GraphicsMagick</a>)</li>
            </ul>
          </div>
          <div class="col-12 col-md-6">
            <h4>Project management</h4>
            <ul>
              <li>Productivity: <link-to url="https://workona.com/" copy="Workona"/></li>
              <li>Documentation and references: <link-to url="https://coda.io/" copy="Coda"></li>
              <li>Project management: <link-to url="https://www.smartsheet.com/" copy="SmartSheet"/></li>
              <li>Project management: <link-to url="https://clickup.com" copy="ClickUp"/></li>
              <li>Time tracker: <link-to url="https://clockify.me/" copy="Clockify"/></li>
              <li>Coding time tracking: <link-to url="https://wakatime.com/" copy="WakaTime"/></li>
              <li>Google Apps</li>
              <li>Thunderbird</li>
            </ul>
          </div>
        </div>
        <h4>Misc</h4>
        <ul>
          <li><a class="color-link" :target="linksNewTab ? '_blank' : '_self'"  href="https://www.blender.org/">Blender</a> (with EEVEE & Cycle render engines)</li>
        </ul>
        <?php /*
        https://uses.tech/

        https://brandonclapp.com/uses/
        https://gist.github.com/diurivj/78ca931c4b20dca1e1e13982fa9c309d
        https://stephfh.dev/uses/
        */ ?>
      </div>
      <div v-else-if="currentSubmenu == 6" id="privacy">
        <h3 class="tc">Privacy</h3>
        <div class="notice">
          <p class="tc">Privacy matters</p>
        </div>
        <div class="inputGroup">
          <input id="analyticsOn" name="radio" type="checkbox" v-model="analyticsOn" @click="optout" />
          <label for="analyticsOn">{{ analyticsOn ? 'Analytics are on' : 'Analytics are off' }}</label>
        </div>
        <div class="notice tl">
          <p class="mb">Privacy does matter to me. I hate being tracked when browsing and visiting websites.</p>
          <p class="mb">In the meantime, I would like to have some inkling about how many people visit my website. I don't want to know how long they stay, from which country they are from, or what referrer they're coming from. I wanted to go for a simple solution, crafted by hand; but honestly it's a lot of work. So yeah, I accepted to use Google Analytics</p>
          <p class="mb">If you're using <link-to url="https://en.wikipedia.org/wiki/Do_Not_Track" copy="DoNotTrack"></link-to> - which I highly recommend by the way -, it won't record any analytics or data about your visit (no matter you tick the checbox or not)</p>
          <p class="mb">The only custom "events" I'm tracking are opening the option menu (where you currently are reading) and opening a project detail panel.</p>
          <p>Finally, I use <link-to copy="IP Anonymization" url="https://developers.google.com/analytics/devguides/collection/analyticsjs/ip-anonymization"></link-to> for the Analytics</p>
        </div>
      </div>
    </div>
  </div>
</div>
