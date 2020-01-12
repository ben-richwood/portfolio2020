import * as THREE from '../../build/three.module.js';
import { CSS3DObject } from '../CSS3DRenderer.js';

// Create an <picture> DOM element for the CSS3DRenderer (to display in the desktop screen )
// With next-gen img formats (webp & jp2000)
// Called in component.js
export function displayProjectImageOnScreen (screenGraphic, url) {
  const divContainer = document.createElement( 'div' );
  const picElement = document.createElement( 'picture' );
  picElement.className = 'screenGraphicPic';
  const type = ["webp", "jp2", "jpg"];
  type.forEach(function (e) {
    let sourceEl = document.createElement( 'source' );
    sourceEl.type = "image/" + e;
    sourceEl.srcset = url.substring(0, url.length - 3) + e;
    picElement.appendChild(sourceEl);
  })
  const imgEl = document.createElement( 'img' );
  imgEl.className = 'screenGraphic';
  imgEl.src = url;
  imgEl.alt = "project thumbnail";
  picElement.appendChild(imgEl);
  divContainer.appendChild(picElement);

  const screenImg = new CSS3DObject( divContainer );

  screenImg.position.set(-0.025, 1.41, .037); // position sightly above the default screen
  screenImg.scale.multiplyScalar( .002 );
  screenImg.rotation.order = 'YXZ'; // Super important to have the correct rotation
  screenImg.rotation.set(-( 2 * Math.PI/16) + Math.PI/32, Math.PI/2, 0);
  screenImg.updateMatrix();

  return screenImg;
}

// To show 3D elements hierarchy
function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}