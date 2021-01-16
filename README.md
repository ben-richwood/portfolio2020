# Portfolio Ben - 2020

## Abstract

This website rests on ThreeJS for the 3d space (actually using CSS3DRenderer, not Primitive objects) and VueJS.

For the animations, TweenMax (GSAP) takes care of translating elments when changing the filters. And lots of CSS3 animations to keep it lightweight.

### Performance oriented

Since my website is heavy and requires many JS librairies, I spent lot of time optimizing in order to reduce download time and latency. During my tests, it was hitting 60 frames per seconds.

I used [SVGstore](https://css-tricks.com/svg-symbol-good-choice-icons/) to concat all SVG as one big file (≈34 SVG for 71KB), allowing then to display them with &lt;symbol&gt; elements and reducing dozens of HTTP requests

**Webpack** is used resolve <code>import</code> and <code>requires</code>, plus to minify and \"Tree shaking\" (for dead-code elimination).

I set up an image pipeline with Gulp to convert images to JP2000 and Webp (next-gen compression formats), and serving different sizes depending on user's screen size.

**Lazy-loading** for images - they load only when opening a project

**JS critical path**: the main JS scripts are bundled; but there's also a smaller script directly embedded in the HTML file for animating small parts while the main script is still loading.

**CSS critical** path to display relevant and readable content as soon as the first bits load - without waiting for all the assets to load.

**Performance Audit**: I ran many performance tests, with the Chrome DevTool (CSS and JS Coverage), [Lighthouse](https://developers.google.com/web/tools/lighthouse/), [Stat.js](https://github.com/mrdoob/stats.js) and many other tools.

Caching (Cache control and gzip compression) to reduce new reloads.

## Design

I wanted my portfolio as a video games; so I naturally takes many elements from screen graphics and video games UI.


## Stack


```sh
"dependencies": {
  "@analytics/google-analytics": "^0.4.0",
  "analytics": "^0.5.5",
  "analytics-plugin-do-not-track": "^0.1.3",
  "TWEEN.js", // as import, not package
  "path": "^0.12.7",
  "three-js" // as import, not package. Based on three.js r62 - released on 22 Oct 2013
  "vue": "^2.6.11"
},
"devDependencies": {
  "gulp": "^4.0.2",
  "gulp-copy": "^4.0.1",
  "gulp-image-resize": "^0.13.1",
  "gulp-imagemin": "^7.1.0",
  "gulp-inject": "^5.0.5",
  "gulp-newer": "^1.4.0",
  "gulp-rename": "^2.0.0",
  "gulp-sass": "^4.1.0",
  "gulp-svgmin": "^2.2.0",
  "gulp-svgstore": "^7.0.1",
  "gulp-webp": "^4.0.1",
  "node-sass": "^4.14.1",
  "nodemon": "^1.19.4",
  "uglifyjs-webpack-plugin": "^2.2.0",
  "webpack": "^4.41.5",
  "webpack-cli": "^3.3.10"
}
```

---

## Usage

SASS: `npm run watch`

JS bundle: `npm run dev`

---

## Notes

ThreeJS is not loaded using NPM; I load the libs manually (via import module though).

---

## Animations

Mix between CSS3, ThreeJS, Vue and TweenMax

---

## All about performances

Difficulty was to balances many performance concerns:
- file size (JS, models, textures)
- geometry (number of vertices)
- memory usage and prevent memory leak (especially because of texture sizes)
- canvas performances (limit number of draw calls)

### Tools & stack

- Webpack
- let user chooses high or low performances, with recommendations
- 3D format: glb, with low texture
- Blender flow (+texture atlas)
- Vue
- XHR and lazy loading
- tps percu (rather than time spent): hints and tuto (cf parc asterix)
- reduce draw calls
- one canvas, 2 scene
- instanciate & bufferGeometry
- reduce amount of materials
- prevent post processing


#### CSS report

Full CSS report on [CSS Stat](https://cssstats.com/stats?url=https%3A%2F%2Frichebois.fr%2F)

Report summary from 16/01/2021

|Rules|Selectors|Declarations|Properties|
|:--|:--|:--|:--|
|457|584|1,636|138|

|ID|Class|Pseudo Class|Pseudo Element|
|:--|:--|:--|:--|
| 92| 430| 41| 57|



### 3D assets optimisation

The 3D scene and all the 3D assets are built with Blender. I used few tricks to reduce the scene and keep good performances

- Using RGB channels to merge roughness & metalness maps into one image
- Reducing image textures - cause an overload on memory usage. Using Atlas images as much as possible

### Monitoring

- [THREEX.rendererstats](https://github.com/jeromeetienne/threex.rendererstats)
- Chrome DevTool
  - performance panel
  - Rendering tab: FPS meter

Draw calls
