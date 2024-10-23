import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

// Função que lida com eventos de teclado
function onKeyDown(event) {
    switch ( event.code ) {
      case 'KeyW': moveForward = true; break;
      case 'KeyS': moveBackward = true; break;
      case 'KeyA': moveLeft = true; break;
      case 'KeyD': moveRight = true; break;
    }
}

function onKeyUp(event) {
  switch ( event.code ) {
      case 'KeyW': moveForward = false; break;
      case 'KeyS': moveBackward = false; break;
      case 'KeyA': moveLeft = false; break;
      case 'KeyD': moveRight = false; break;
  }
}

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );

// Função que lida com eventos de mouse
function onMouseDown( event ) {
    const mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObject( cube );

    if ( intersects.length > 0 ) {
        const randomColor = Math.random() * 0xffffff;
        cube.material.color.setHex( randomColor );
    }
}

window.addEventListener( 'mousedown', onMouseDown );

function animate() {
  requestAnimationFrame( animate );

  const moveSpeed = 0.1;
  if ( moveForward ) cube.position.z -= moveSpeed;
  if ( moveBackward ) cube.position.z += moveSpeed;
  if ( moveLeft ) cube.position.x -= moveSpeed;
  if ( moveRight ) cube.position.x += moveSpeed;

  // Rotação contínua
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
}

animate();