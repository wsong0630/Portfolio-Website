import * as THREE from 'three';

// import function and invoke inside Class below
import Size from './Utils/Size.js';
import Times from './Utils/Times.js';
import Resources from './Utils/Resources.js';
import assets from './Utils/assets.js';

import Camera from './Camera.js';
import Renderer from './Renderer.js';

import World from './World/World.js';

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

    this.times = new Times();
    this.size = new Size();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets); // pass in assets as argument, also have to pass in as constructor arg in Resources class

    // put world after everything
    this.world = new World();

    // cb function to be executed when 'resize' event for size is triggered
    this.size.on('resize', () => {
      this.resize();
    });
    // cb function to be executed when 'update' event for time is triggered
    this.times.on('update', () => {
      this.update();
    });
  }

  // update function will call 'update' & 'resize' function in camera & renderer
  // if the renderer is working, the browser should display black bg
  resize() {
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
