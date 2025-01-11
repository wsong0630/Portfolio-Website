import * as THREE from 'three';
import Experience from './Experience.js';

export default class Camera {
  constructor() {
    // get size, scene from experience
    this.experience = new Experience();
    this.size = this.experience.size;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    // set up two cameras
    this.createPerspectiveCamera();
    this.createOrthographicCamera();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.size.aspectRatio,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);

    // set our camera position
    this.perspectiveCamera.position.z = 5; // bigger value - farther away
  }

  createOrthographicCamera() {
    // camera frustum plane
    this.frustum = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(
      // frustum's width should account for both the aspectRatio (to fit the screen shape) and frustum (to control the zoom)
      // frustum is centered around the origin (0,0), so you divide by 2 to get symmetric boundaries
      (-this.size.aspectRatio * this.size.frustum) / 2, // ? frustum need to be also in Size.js?
      (this.size.aspectRatio * this.size.frustum) / 2,
      this.size.frustum / 2,
      -this.size.frustum / 2,
      -100,
      100
    );
    this.scene.add(this.orthographicCamera);
  }

  resize() {
    // updating perspective camera
    this.perspectiveCamera.aspectRatio = this.size.aspectRatio;
    this.perspectiveCamera.updateProjectionMatrix();

    // updating orthographic camera
    this.orthographicCamera.left = (-this.size.aspectRatio * this.size.frustum) / 2;
    this.orthographicCamera.right = (this.size.aspectRatio * this.size.frustum) / 2;
    this.orthographicCamera.top = this.size.frustum / 2;
    this.orthographicCamera.bottom = -this.size.frustum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    
  }
}
