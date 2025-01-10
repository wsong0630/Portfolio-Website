import * as THREE from 'three';

// Utilities functions:
import Size from './Utils/Size.js'

import Camera from './Camera.js';

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this; // set it back to static instance for next action
    this.canvas = canvas; // reference to canvas
    // creating a scene
    this.scene = new THREE.Scene();
    
    this.size = new Size();
    this.camera = new Camera();
  }
}
