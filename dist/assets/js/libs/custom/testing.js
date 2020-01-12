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