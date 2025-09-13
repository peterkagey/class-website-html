import * as THREE from "three";

export const cubeVerts = [
  new THREE.Vector3(-Math.sqrt(1 / 3), -Math.sqrt(1 / 3), -Math.sqrt(1 / 3)),
  new THREE.Vector3(Math.sqrt(1 / 3), -Math.sqrt(1 / 3), -Math.sqrt(1 / 3)),
  new THREE.Vector3(Math.sqrt(1 / 3), Math.sqrt(1 / 3), -Math.sqrt(1 / 3)),
  new THREE.Vector3(-Math.sqrt(1 / 3), Math.sqrt(1 / 3), -Math.sqrt(1 / 3)),
  new THREE.Vector3(-Math.sqrt(1 / 3), -Math.sqrt(1 / 3), Math.sqrt(1 / 3)),
  new THREE.Vector3(Math.sqrt(1 / 3), -Math.sqrt(1 / 3), Math.sqrt(1 / 3)),
  new THREE.Vector3(Math.sqrt(1 / 3), Math.sqrt(1 / 3), Math.sqrt(1 / 3)),
  new THREE.Vector3(-Math.sqrt(1 / 3), Math.sqrt(1 / 3), Math.sqrt(1 / 3))
];

export const octVerts = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, -1, 0),
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(0, 0, -1)
];

export const cubOctVerts = [
  new THREE.Vector3(Math.sqrt(1 / 2), Math.sqrt(1 / 2), 0),
  new THREE.Vector3(Math.sqrt(1 / 2), -Math.sqrt(1 / 2), 0),
  new THREE.Vector3(Math.sqrt(1 / 2), 0, Math.sqrt(1 / 2)),
  new THREE.Vector3(Math.sqrt(1 / 2), 0, -Math.sqrt(1 / 2)),
  new THREE.Vector3(0, Math.sqrt(1 / 2), Math.sqrt(1 / 2)),
  new THREE.Vector3(0, Math.sqrt(1 / 2), -Math.sqrt(1 / 2)),
  new THREE.Vector3(-Math.sqrt(1 / 2), Math.sqrt(1 / 2), 0),
  new THREE.Vector3(-Math.sqrt(1 / 2), -Math.sqrt(1 / 2), 0),
  new THREE.Vector3(-Math.sqrt(1 / 2), 0, Math.sqrt(1 / 2)),
  new THREE.Vector3(-Math.sqrt(1 / 2), 0, -Math.sqrt(1 / 2)),
  new THREE.Vector3(0, -Math.sqrt(1 / 2), Math.sqrt(1 / 2)),
  new THREE.Vector3(0, -Math.sqrt(1 / 2), -Math.sqrt(1 / 2)),
];
