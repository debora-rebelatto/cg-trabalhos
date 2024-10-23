import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Criando a cena do Three.js
let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Adiciona OrbitControls para controlar a câmera com o mouse
const controls = new OrbitControls(camera, renderer.domElement)

// Objeto exemplo (esfera)
let geometry = new THREE.SphereGeometry(1, 32, 32)
let material = new THREE.MeshStandardMaterial({ color: 0xffffff }) // Começa com MeshStandardMaterial para suportar iluminação
let mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Adiciona uma luz ambiente
const ambientLight = new THREE.AmbientLight(0x404040) // soft white light
scene.add(ambientLight)

// Adiciona uma luz direcional
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
scene.add(directionalLight)

camera.position.z = 5

// Função de renderização
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()

// Criação do menu com opções de mapeamento e texturas
const menu = document.getElementById('menu')

// Função para criar selects e adicionar eventos
function createSelect(options, id, label) {
  const container = document.createElement('div')
  const labelElement = document.createElement('label')
  labelElement.textContent = label
  container.appendChild(labelElement)

  const select = document.createElement('select')
  select.id = id

  options.forEach((option) => {
    const opt = document.createElement('option')
    opt.value = option.value
    opt.textContent = option.label
    select.appendChild(opt)
  })

  container.appendChild(select)
  menu.appendChild(container)
}

// Opções de mapeamento
const mappingOptions = [
  { label: 'Plano', value: 'plane' },
  { label: 'Cúbico', value: 'cube' },
  { label: 'Esférico', value: 'spherical' },
  { label: 'Cilíndrico', value: 'cylindrical' },
]

// Opções de texturas
const textureOptions = [
  { label: 'Difusa', value: 'diffuse' },
  { label: 'Especularidade', value: 'specular' },
  { label: 'Bump Mapping', value: 'bump' },
  { label: 'Normal Mapping', value: 'normal' },
  { label: 'Displacement Mapping', value: 'displacement' },
  { label: 'Ambient Occlusion', value: 'ao' },
]

// Opções de iluminação
const lightingOptions = [
  { label: 'Ambiente', value: 'ambient' },
  { label: 'Direcional', value: 'directional' },
  { label: 'Point', value: 'point' },
  { label: 'Spot', value: 'spot' },
]

// Criando selects
createSelect(mappingOptions, 'mapping', 'Mapeamento:')
createSelect(textureOptions, 'textures', 'Texturas:')
createSelect(lightingOptions, 'lighting', 'Iluminação:')

// Eventos de mudança de mapeamento
document.getElementById('mapping').addEventListener('change', function () {
  const selectedMapping = this.value
  updateMapping(selectedMapping)
})

// Eventos de mudança de texturas
document.getElementById('textures').addEventListener('change', function () {
  const selectedTexture = this.value
  updateTexture(selectedTexture)
})

// Eventos de mudança de iluminação
document.getElementById('lighting').addEventListener('change', function () {
  const selectedLighting = this.value
  updateLighting(selectedLighting)
})

// Função para atualizar o mapeamento
function updateMapping(mapping) {
  console.log('Mapeamento selecionado:', mapping)

  switch (mapping) {
    case 'plane':
      geometry = new THREE.PlaneGeometry(2, 2)
      break
    case 'cube':
      geometry = new THREE.BoxGeometry(1, 1, 1)
      break
    case 'spherical':
      geometry = new THREE.SphereGeometry(1, 32, 32)
      break
    case 'cylindrical':
      geometry = new THREE.CylinderGeometry(1, 1, 2, 32)
      break
  }
  mesh.geometry.dispose() // Limpa a geometria antiga
  mesh.geometry = geometry // Aplica a nova geometria
}

// Função para atualizar a textura
function updateTexture(texture) {
  console.log('Textura selecionada:', texture)
  // Remove as texturas anteriores, se existirem
  mesh.material.map = null
  mesh.material.specularMap = null
  mesh.material.bumpMap = null
  mesh.material.normalMap = null
  mesh.material.displacementMap = null
  mesh.material.aoMap = null

  // Cria um novo material para evitar problemas com materiais antigos
  material = new THREE.MeshStandardMaterial({ color: 0xffffff })

  switch (texture) {
    case 'diffuse':
      material.map = new THREE.TextureLoader().load('diffuse.jpg') // Substitua 'diffuse.jpg' pelo caminho da sua textura difusa
      break
    case 'specular':
      material.specularMap = new THREE.TextureLoader().load('specular.jpg') // Substitua 'specular.jpg' pelo caminho da sua textura especular
      break
    case 'bump':
      material.bumpMap = new THREE.TextureLoader().load('bump.jpg') // Substitua 'bump.jpg' pelo caminho da sua textura de bump
      break
    case 'normal':
      material.normalMap = new THREE.TextureLoader().load('normal.jpg') // Substitua 'normal.jpg' pelo caminho da sua textura normal
      break
    case 'displacement':
      material.displacementMap = new THREE.TextureLoader().load('displacement.jpg') // Substitua 'displacement.jpg' pelo caminho da sua textura de displacement
      break
    case 'ao':
      material.aoMap = new THREE.TextureLoader().load('ao.jpg') // Substitua 'ao.jpg' pelo caminho da sua textura de ambient occlusion
      break
  }

  mesh.material.dispose() // Limpa o material antigo
  mesh.material = material // Aplica o novo material
}

// Função para atualizar a iluminação
function updateLighting(lighting) {
  console.log('Iluminação selecionada:', lighting)
  // Remove todas as luzes da cena
  scene.remove(ambientLight)
  scene.remove(directionalLight)

  switch (lighting) {
    case 'ambient':
      scene.add(ambientLight)
      break
    case 'directional':
      scene.add(directionalLight)
      break
    case 'point':
      const pointLight = new THREE.PointLight(0xffffff, 1, 100)
      pointLight.position.set(5, 5, 5)
      scene.add(pointLight)
      break
    case 'spot':
      const spotLight = new THREE.SpotLight(0xffffff)
      spotLight.position.set(5, 5, 5)
      scene.add(spotLight)
      break
  }
}
