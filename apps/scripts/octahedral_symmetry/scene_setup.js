import * as THREE from "three";

export const scene = new THREE.Scene();
export const renderer = new THREE.WebGLRenderer();

export const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const redLight = new THREE.DirectionalLight(0xffff00, 1, 100);
redLight.position.set(5, 0, 0);
camera.add(redLight);

const greenLight = new THREE.DirectionalLight(0x00ffff, 1, 100);
greenLight.position.set(0, 5, 0);
camera.add(greenLight);

const blueLight = new THREE.DirectionalLight(0xff00ff, 1, 100);
blueLight.position.set(0, 0, 5);
camera.add(blueLight);
scene.add(camera)
