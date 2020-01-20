import * as THREE from '../../build/three.module.js';

// camera's target
export const boxMat = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

// computer material
/*
const imgLoader = new THREE.TextureLoader();
export const screenTex = [
  imgLoader.load('assets/img/textures/barry-room.gif')
];
export const planeMat = new THREE.MeshBasicMaterial({
  map: screenTex,
  side: THREE.DoubleSide,
});
*/

const sparks = new THREE.TextureLoader().load("assets/img/spark1.png");
export const  starsMaterial = new THREE.PointsMaterial({
  size: .04,
  map: sparks,
  blending: THREE.AdditiveBlending,
  transparent: true,
  color: 0xf2f2f2
});


export const  largeStarsMaterial = new THREE.PointsMaterial({
  size: 2,
  map: sparks,
  opacity: .2,
  blending: THREE.AdditiveBlending,
  transparent: true,
  color: 0xf2f2f2
});

export const oceanMaterial = new THREE.PointsMaterial({
  size: .12,
  map: sparks,
  blending: THREE.AdditiveBlending,
  transparent: true,
  color: 0xf2f2f2
});

export const serverMat = new THREE.LineBasicMaterial( { color: 0x999999 } )

export const curveMat = new THREE.LineBasicMaterial( {
  color : 0x00ff00,
  linewidth: 30
} );

export const materialPlane = new THREE.MeshBasicMaterial( {
  color: 0x11517F,
  side: THREE.DoubleSide,
  blending: THREE.NoBlending
});

export const crossMaterial = new THREE.PointsMaterial({
  size: 150,
  map: new THREE.TextureLoader().load("assets/img/cross-frame.png"),
  opacity: .4,
  blending: THREE.AdditiveBlending,
  transparent: true,
  color: 0x888888
});
