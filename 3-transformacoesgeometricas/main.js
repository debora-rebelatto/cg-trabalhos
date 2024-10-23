import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xb6b6b6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0x9d9d9d, 0.5)
scene.add(directionalLight)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshStandardMaterial({ color: 0xff8700 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

let animateTranslation = true
let animateScale = false
let animateRotation = false
let scaleDirection = 1
let translationDirection = new THREE.Vector3(1, 1, 1) 

const screenBounds = {
  left: -2.5,
  right: 2.5,
  top: 2,
  bottom: -2,
}

function animate() {
  requestAnimationFrame(animate)

  if (animateTranslation) {
    cube.position.x += 0.01 * translationDirection.x
    cube.position.y += 0.01 * translationDirection.y
    cube.position.z += 0.01 * translationDirection.z

    if (cube.position.x >= screenBounds.right || cube.position.x <= screenBounds.left) {
      translationDirection.x *= -1
    }
    if (cube.position.y >= screenBounds.top || cube.position.y <= screenBounds.bottom) {
      translationDirection.y *= -1
    }
  }

  if (animateScale) {
    const scaleIncrement = 0.01 * scaleDirection
    cube.scale.x += scaleIncrement
    cube.scale.y += scaleIncrement
    cube.scale.z += scaleIncrement

    if (cube.scale.x >= 2) {
      scaleDirection = -1
    } else if (cube.scale.x <= 1) {
      scaleDirection = 1
    }
  }

  if (animateRotation) {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01
  }

  renderer.render(scene, camera)
}

animate()

const menu = document.createElement('div')
menu.style.position = 'absolute'
menu.style.top = '10px'
menu.style.left = '10px'
document.body.appendChild(menu)

const translationButton = document.createElement('button')
translationButton.innerText = 'Translação'
translationButton.addEventListener('click', () => {
  animateTranslation = !animateTranslation
  animateScale = false
  animateRotation = false
  resetCube()
})
menu.appendChild(translationButton)

const scaleButton = document.createElement('button')
scaleButton.innerText = 'Escalonamento'
scaleButton.addEventListener('click', () => {
  animateScale = !animateScale
  animateTranslation = false
  animateRotation = false
  resetCube()
})
menu.appendChild(scaleButton)

const rotationButton = document.createElement('button')
rotationButton.innerText = 'Rotação'
rotationButton.addEventListener('click', () => {
  animateRotation = !animateRotation
  animateTranslation = false
  animateScale = false
  resetCube()
})
menu.appendChild(rotationButton)

const allButton = document.createElement('button')
allButton.innerText = 'Todas'
allButton.addEventListener('click', () => {
  animateTranslation = !animateTranslation
  animateScale = !animateScale
  animateRotation = !animateRotation
  resetCube()
})
menu.appendChild(allButton)

function resetCube() {
  cube.position.set(0, 0, 0)
  cube.scale.set(1, 1, 1)
  cube.rotation.set(0, 0, 0)
  scaleDirection = 1

  translationDirection.set(
    Math.random() < 0.5 ? 1 : -1,
    Math.random() < 0.5 ? 1 : -1,
    Math.random() < 0.5 ? 1 : -1
  )
}