import * as THREE from 'three';
import Experience from './Experience.js';

export default class Renderer {
  constructor() {
    // get size, scene from experience
    this.experience = new Experience();
    this.size = this.experience.size;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    // console.log(this.camera, this.camera.perspectiveCamera);
    this.setRenderer();
  }
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas, // specify the <canvas> element in HTML where renderer occurs
      antialias: true, // smoothens jagged edges
    });

    this.renderer.useLegacyLights = false; // enable physically accurate lighting
    this.renderer.outputColorSpace = THREE.SRGBColorSpace; // set output encoding to sRGB for proper color rendering
    this.renderer.toneMapping = THREE.CineonToneMapping; // configure tone mapping and exposure
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true; // enable shadows and set shadow map type
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.setSize(this.size.width, this.size.height); // set renderer size and pixel ratio
    this.renderer.setPixelRatio(Math.min(this.size.pixelRatio, 2)); // cap pixel ratio for performance

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    this.renderer.physicallyCorrectLights = true; // (deprecated)
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setPixelRatio(this.size.pixelRatio);
    */
  }

  resize() {
    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setPixelRatio(Math.min(this.size.pixelRatio, 2));
  }

  // renderer function
  update() {
    // set the main viewport before render
    this.renderer.setViewport(0, 0, this.size.width, this.size.height);
    this.renderer.render(this.scene, this.camera.orthographicCamera);

    // multi viewport
    this.renderer.setScissorTest(true);
    this.renderer.setViewport(
      this.size.width - this.size.width / 3,
      this.size.height - this.size.height / 3,
      this.size.width / 3,
      this.size.height / 3
    );
    this.renderer.setScissor(
      this.size.width - this.size.width / 3,
      this.size.height - this.size.height / 3,
      this.size.width / 3,
      this.size.height / 3
    );
    // this.renderer.render(this.scene, this.camera.perspectiveCamera);
    this.renderer.setScissorTest(false);
  }
}
