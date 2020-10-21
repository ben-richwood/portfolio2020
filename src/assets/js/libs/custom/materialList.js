import * as THREE from '../../build/three.module.js';

export const crossMaterial = new THREE.PointsMaterial({
  size: 250,
  map: new THREE.TextureLoader().load("assets/img/cross-frame.png"),
  opacity: .6,
  blending: THREE.AdditiveBlending,
  transparent: true,
  color: 0xAAAAAA
});

export const blurredCrossMaterial = new THREE.PointsMaterial({
  size: 500,
  map: new THREE.TextureLoader().load("assets/img/blurred-cross-frame.png"),
  opacity: .5,
  blending: THREE.AdditiveBlending,
  transparent: true,
  color: 0xAAAAAA
});
