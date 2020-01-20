export function testing(scene){
  //axes
  var axes = new THREE.AxesHelper(5);
  scene.add(axes);

  var dirX = new THREE.Vector3( 1, 0, 0 );
  var dirY = new THREE.Vector3( 0, 1, 0 );
  var dirZ = new THREE.Vector3( 0, 0, 1 );

  //normalize the direction vector (convert to vector of length 1)
  dirX.normalize();
  dirY.normalize();
  dirZ.normalize();
  var origin = new THREE.Vector3( 0.13, 0, 0 );
  var arrowHelperX = new THREE.ArrowHelper( dirX, origin, 1, 0xff0000 );
  var arrowHelperY = new THREE.ArrowHelper( dirY, origin, 1, 0x00ff00 );
  var arrowHelperZ = new THREE.ArrowHelper( dirZ, origin, 1, 0x0000ff );
  scene.add( arrowHelperX );
  scene.add( arrowHelperY );
  scene.add( arrowHelperZ );

  // Add light
  // let light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  // light.position.set( 0, 200, 0 );
  // scene.add( light );
  // light = new THREE.AmbientLight( 0x404040 ); // soft white light
  // scene.add( light );
}

/**
 * @author mrdoob / http://mrdoob.com/
 * @author jetienne / http://jetienne.com/
 */
/** @namespace */
export var THREEx	= THREEx || {}

/**
 * provide info on THREE.WebGLRenderer
 *
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
*/
THREEx.RendererStats	= function (){

	var msMin	= 100;
	var msMax	= 0;

	var container	= document.createElement( 'div' );
	container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

	var msDiv	= document.createElement( 'div' );
	msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#200;';
	container.appendChild( msDiv );

	var msText	= document.createElement( 'div' );
	msText.style.cssText = 'color:#f00;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	msText.innerHTML= 'WebGLRenderer';
	msDiv.appendChild( msText );

	var msTexts	= [];
	var nLines	= 9;
	for(var i = 0; i < nLines; i++){
		msTexts[i]	= document.createElement( 'div' );
		msTexts[i].style.cssText = 'color:#f00;background-color:#311;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
		msDiv.appendChild( msTexts[i] );
		msTexts[i].innerHTML= '-';
	}


	var lastTime	= Date.now();
	return {
		domElement: container,

		update: function(webGLRenderer){
			// sanity check
			console.assert(webGLRenderer instanceof THREE.WebGLRenderer)

			// refresh only 30time per second
			if( Date.now() - lastTime < 1000/30 )	return;
			lastTime	= Date.now()

			var i	= 0;
			msTexts[i++].textContent = "== Memory =====";
			msTexts[i++].textContent = "Programs: "	+ webGLRenderer.info.memory.programs;
			msTexts[i++].textContent = "Geometries: "+webGLRenderer.info.memory.geometries;
			msTexts[i++].textContent = "Textures: "	+ webGLRenderer.info.memory.textures;

			msTexts[i++].textContent = "== Render =====";
			msTexts[i++].textContent = "Calls: "	+ webGLRenderer.info.render.calls;
			msTexts[i++].textContent = "Vertices: "	+ webGLRenderer.info.render.vertices;
			msTexts[i++].textContent = "Faces: "	+ webGLRenderer.info.render.faces;
			msTexts[i++].textContent = "Points: "	+ webGLRenderer.info.render.points;
		}
	}
};

// To show 3D elements hierarchy
export function dumpObject(obj, lines = [], isLast = true, prefix = '') {
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