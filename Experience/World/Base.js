import * as THREE from 'three';
import Experience from '../Experience.js';
import gsap from 'gsap';

export default class Base {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setBase();
  }
  setBase() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    // ! do not use MeshBasicMaterial which could not produce light effects
    this.material = new THREE.MeshStandardMaterial({
      color: 0xf0fee0,
      //   side: THREE.BackSide, // or THREE.DoubleSide
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }

  resize() {}

  update() {}
}
