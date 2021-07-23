import * as THREE from '../../build/three.module.js';
import { CSS3DObject } from '../CSS3DRenderer.js';

export const logStyle = "background-color:cyan;color:black;"; // for console.log

export function mobilecheck () {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

export function msieversion() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  // If Internet Explorer, return version number
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      // alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
      console.warn("%cIE browser detected ", parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))), logStyle);
      return true;
  } else  {
    // If another browser, return 0
      console.log("%cno IE", logStyle);
      return false;
  }
}

// DEBOUNCE helper
////////////////////////////////////////////////////////////////
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
/* Usage:
var myEfficientFn = debounce(function() {
	// All the taxing stuff you do
}, 250); // <- time in ms
window.addEventListener('resize', myEfficientFn);
*/

// Create an <picture> DOM element for the CSS3DRenderer (to display in the desktop screen )
// With next-gen img formats (webp & jp2000)
// Called in component.js
export function displayProjectImageOnScreen (screenGraphic, url, domEl) {
  const type = ["webp", "jp2", "jpg"];
  const oldFrame = domEl.querySelectorAll('.frameContainer');
  console.log(domEl, oldFrame);
  if (oldFrame.length > 0) {
    let picElement = oldFrame[0].firstChild;
    // const sourceEl = picElement.getElementsByTagName('source');
    const sourceEl = picElement.childNodes;
    let counterType = 0;
    sourceEl.forEach(function (e) {
      if (e.className === "screenGraphicPic"){
        e.src = url;
      } else {
        e.srcset = url.substring(0, url.length - 3) + type[counterType];
      }
      counterType++;
    });
    // picElement = oldFrame.getElementsByTagName('image')[0].src = url;
    return null
  } else {
    const divContainer = document.createElement( 'div' );
    divContainer.className = "divContainer";
    const divSubContainer = document.createElement( 'div' );
    divSubContainer.className = "frameContainer";

    const picElement = document.createElement( 'picture' );
    // picElement.className = 'screenGraphicPic';
    type.forEach(function (e) {
      let sourceEl = document.createElement( 'source' );
      sourceEl.type = "image/" + e;
      sourceEl.srcset = url.substring(0, url.length - 3) + e;
      picElement.appendChild(sourceEl);
    })
    const imgEl = document.createElement( 'img' );
    imgEl.className = 'screenGraphicPic';
    imgEl.src = url;
    imgEl.alt = "project thumbnail";
    picElement.appendChild(imgEl);
    divSubContainer.appendChild(picElement);
    divContainer.appendChild(divSubContainer);

    const screenImg = new CSS3DObject( divContainer );

    screenImg.position.set(-0.025, 1.45, .037); // position sightly above the default screen
    screenImg.scale.multiplyScalar( .0021 );
    screenImg.rotation.order = 'YXZ'; // Super important to have the correct rotation
    screenImg.rotation.set(-( 2 * Math.PI/16) + Math.PI/32, Math.PI/2, 0);
    screenImg.updateMatrix();

    return screenImg;
  }
}

export function dayLight (s) {
  let hemiLight, hemiLightHelper, dirLight, dirLightHeper;
  let allLights = []
  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemiLight.position.set( 0, 2.5, 0 );
  allLights.push(hemiLight);
  // scene.add( hemiLight );
  if(s.isDebugMode){
    hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 1 );
    allLights.push(hemiLightHelper);
  }

  // hemiLightCode = new THREE.DirectionalLight( 0xffffff, 1 );
  // hemiLightCode.color.setHSL( 0.6, 1, 0.6 );
  // hemiLightCode.position.set( 4, 2, 0 );
  // hemiLightCode.position.multiplyScalar( 3 );
  // scene.add( hemiLightCode );
  //
  // geometry = new THREE.BoxGeometry( 2,2,2);
  // var boxLight = new THREE.Mesh( geometry, MAT.boxMat );
  // boxLight.position.set(12, 3, 0)
  // scene.add( boxLight );
  // // boxLight.visible = false;
  // hemiLightCode.target = boxLight;
  //
  // hemiLightCodeHelper = new THREE.DirectionalLightHelper( hemiLightCode, 1 );
  // scene.add( hemiLightCodeHelper );



  dirLight = new THREE.DirectionalLight( 0xffffff, .6 ); // color, intensity
  dirLight.color.setHSL( 0.1, 1, 0.95 );
  dirLight.position.set( 1.2, 1.3, 1.7 );
  dirLight.position.multiplyScalar( 3 );
  allLights.push( dirLight );
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;

  dirLight.shadowDarkness = 0.1;
  dirLight.shadowCameraVisible = true;
  var d = 2;
  dirLight.shadow.camera.left = - d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = - d;
  dirLight.shadow.camera.far = 35;
  dirLight.shadow.bias = - 0.0001;
  allLights.push(dirLight);
  if(s.isDebugMode){
    dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 1 );
    allLights.push(dirLightHeper);
  }

  // return [hemiLight, hemiLightHelper, dirLight, dirLightHeper]
  return allLights;

// ground
/*
groundMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
groundMesh.rotation.x = - Math.PI / 2;
groundMesh.receiveShadow = false;
scene.add( groundMesh );
*/
}

export function nightLight (s) {
  let allLights = []
  let light1 = new THREE.PointLight( 0xffffaa, .2, 10 ); // color, intensity, distance, decay
  light1.position.set( -6.2, 1.3, -3.3 );
  allLights.push(light1);

  light1 = new THREE.PointLight( 0xffffdd, .2, 16 );
  light1.position.set( 2, 2.5, -3.3 );
  allLights.push(light1);

if(s.isDebugMode){
  var sphereSize = 1;
  var pointLightHelper = new THREE.PointLightHelper( light1, sphereSize );
  allLights.push(pointLightHelper);
}

	// scene.add( light1 );
  return allLights
  // return dayLight ();
}

  /////////////////////////////////////////////////////////////////////////
 //	            	 Calculate distance between 2 ojbects                 //
/////////////////////////////////////////////////////////////////////////
// Used in OrbisControl to get the distance between the camera & the target
export function distanceVector( v1, v2 ) {
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;
    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}