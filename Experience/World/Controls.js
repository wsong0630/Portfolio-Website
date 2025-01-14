import * as THREE from 'three';
import gsap from 'gsap';

import Experience from '../Experience.js';

export default class Controls {
  constructor() {
    this.experience = new Experience();
    // use the same scene from previous
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.times;
    this.camera = this.experience.camera;
  }

  resize() {}

  update() {
    
  }
}
