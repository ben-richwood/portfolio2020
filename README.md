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
