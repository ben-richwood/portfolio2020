# Portfolio Ben - 2020

**v 1.1.0**

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

### Tools & stack

- Webpack
- let user chooses high or low performances, with recommendations
- Vue
- check `saveData` config, and let user choose whether if wants to load the bundle or not
- XHR and lazy loading
- reduce draw calls
- one canvas, 2 scene
- reduce amount of materials

---

## Usage

* SASS: `npm run watch`
* SASS  --style=compressed: `npm run sass`


* JS bundle + watch: `npm run dev`
* bundle for prod: `npm run prod`

---

## Notes

I use a custom version of `OrbitControls`.

---

## Animations

Mix between CSS3, ThreeJS, Vue and Tween.js

---

## Performances

### First Meaningful Paint

At first, it might look weird to see inline style CSS, and a mix of PHP and Vue components. PHP and `<style>` tags are used to show first content immediately to user, without waiting for assets to load (css, fonts, JS bundle).

Furthermore, the bundle is called with `var script = document.createElement('script');`. The reason is to let user decide whether they want to load the bundle if they have enabled the `saveData` setting.

### Canvas

Difficulty was to balances many performance concerns:
- file size (JS, models, textures)
- geometry (number of vertices)
- memory usage and prevent memory leak (especially because of texture sizes)
- canvas performances (limit number of draw calls)


#### CSS report

Full CSS report on [CSS Stat](https://cssstats.com/stats?url=https%3A%2F%2Frichebois.fr%2F)

Report summary from 10/05/2022

* **File size**: 55KB
* **Gzipped file size**: 12KB

|Rules|Selectors|Declarations|Properties|
|:--|:--|:--|:--|
|500|625|1,595|133|

|ID|Class|Pseudo Class|Pseudo Element|
|:--|:--|:--|:--|
| 106| 470| 58| 53|

Clearly, there is room for improvement. I need to tackle that later on.


### Monitoring

- [THREEX.rendererstats](https://github.com/jeromeetienne/threex.rendererstats)
- Chrome DevTool
  - performance panel
  - Rendering tab: FPS meter

Draw calls
