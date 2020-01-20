# Portfolio Ben - 2020

## Stack

- Based on three.js r62 - released on 22 Oct 2013.
- VueJS v2.6.11
- Webpack 4.41.2

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


### Hight Perf
- ocean bg
- more servers
- camera - wiggle mouvments
- Better lighting?
- TweenMax animation? -> import + promise

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