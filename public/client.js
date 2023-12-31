import * as THREE from '/build/three.module.js';
import Stats from './jsm/libs/stats.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
console.log(THREE);
console.log(OrbitControls);

const canvas = document.querySelector('.web-gl');

// showing fps
const stats = new Stats();
document.body.appendChild(stats.domElement);

// Scene Setup
const scene = new THREE.Scene();
console.log(scene);

// Camera Setup
const fov = 45;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 25);
scene.add(camera);
console.log(camera);

// Render Setup
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor = (0x000000, 0.0);
console.log(renderer);

// Adding orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance=10;
controls.maxDistance=50;
//cube
let loader= new THREE.TextureLoader();
let textureArray=[];


let frontTexture=loader.load('./model/distant_sunset/front.jpg');
let backTexture=loader.load('./model/distant_sunset/back.jpg');
let topTexture=loader.load('./model/distant_sunset/top.jpg');
let bottomTexture=loader.load('./model/distant_sunset/bottom.jpg');
let rightTexture=loader.load('./model/distant_sunset/right.jpg');
let leftTexture=loader.load('./model/distant_sunset/left.jpg');

textureArray.push(new THREE.MeshBasicMaterial({map:frontTexture}));
textureArray.push(new THREE.MeshBasicMaterial({map:backTexture}));
textureArray.push(new THREE.MeshBasicMaterial({map:topTexture}));
textureArray.push(new THREE.MeshBasicMaterial({map:bottomTexture}));
textureArray.push(new THREE.MeshBasicMaterial({map:leftTexture}));
textureArray.push(new THREE.MeshBasicMaterial({map:rightTexture}));

for(let i=0;i<textureArray.length;i++){
    textureArray[i].side=THREE.BackSide;
}

const cubeGeometry=new THREE.BoxGeometry(100,100,100);
const skyBox=new THREE.Mesh(cubeGeometry,textureArray);
scene.add(skyBox);

// // making sphere
// const geometry = new THREE.SphereGeometry(5, 10, 10);
// const material = new THREE.MeshBasicMaterial({
//     color: 0xE6345E,
//     wireframe: true
// });
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

// // making inner sphere
// const innerGeometry = new THREE.SphereGeometry(3, 20, 20);
// const innerMaterial = new THREE.MeshBasicMaterial({
//     color: 0xE6DD67,
//     wireframe: true
// });
// const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
// scene.add(innerSphere);

// render function to render the scene
const render = ()=>{
    renderer.render(scene, camera);
}

// Recursion function for animation
const animate = ()=>{
    requestAnimationFrame(animate);
    // animating sphere
    // sphere.rotation.y += 0.005;
    // innerSphere.rotation.y -= 0.01
    render();
    stats.update();
}
animate();

// Resizing window to make responsive
const windowResize = ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

window.addEventListener('resize', windowResize, false);