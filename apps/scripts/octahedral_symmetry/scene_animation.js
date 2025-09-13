import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { scene, renderer, camera } from './scene_setup.js';
import { cubeVerts, octVerts, cubOctVerts } from './vertices.js';
import { slider } from './triangle_control.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import * as THREE from "three";

const controls = new OrbitControls(camera, renderer.domElement);
let lastMesh = new THREE.Mesh(new THREE.BufferGeometry());
export function animate() {
  requestAnimationFrame(animate);
  controls.update();

  const scaledOctVerts = octVerts.map(v => v.clone().multiplyScalar(slider['C']));
  const scaledCubeVerts = cubeVerts.map(v => v.clone().multiplyScalar(slider['B']));
  const scaledCubOctVerts = cubOctVerts.map(v => v.clone().multiplyScalar(slider['A']));

  const points = [
    ...scaledOctVerts,
    ...scaledCubeVerts,
    ...scaledCubOctVerts
  ];
  const geometry = new ConvexGeometry(points);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  scene.remove(lastMesh);
  lastMesh.geometry.dispose();
  lastMesh.material.dispose();

  lastMesh = new THREE.Mesh(geometry, material);
  scene.add(lastMesh);

  renderer.render(scene, camera);
}
