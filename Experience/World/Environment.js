// * Lighting and environment
import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    // use the same scene from previous
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.setSunlight();
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 30;
    this.sunLight.shadow.mapSize.set(2048, 2048); // quality
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(5, 5, 8, 0);

    // * CAMERA HELPER - sunlight
    // this.scene.add(new THREE.CameraHelper(this.sunLight.shadow.camera));

    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight('#ffffff', 1);
    this.scene.add(this.ambientLight);
  }

  resize() {}

  update() {}
}
