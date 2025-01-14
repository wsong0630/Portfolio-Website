import * as THREE from 'three';
import Experience from './Experience.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
    this.setOrbitControls();
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
    this.perspectiveCamera.position.x = 10;
    this.perspectiveCamera.position.y = 20;
    this.perspectiveCamera.position.z = 10; // bigger value - farther away
  }

  createOrthographicCamera() {
    const zoomFactor = 1.5; // Adjust the factor for more or less zoom
    this.size.frustum *= zoomFactor;
    this.orthographicCamera = new THREE.OrthographicCamera(
      // frustum's width should account for both the aspectRatio (to fit the screen shape) and frustum (to control the zoom)
      // frustum is centered around the origin (0,0), so you divide by 2 to get symmetric boundaries
      (-this.size.aspectRatio * this.size.frustum) / 2,
      (this.size.aspectRatio * this.size.frustum) / 2,
      this.size.frustum / 2,
      -this.size.frustum / 2,
      1,
      50
    );
    this.orthographicCamera.position.set(10, 10, 10);
    this.orthographicCamera.rotation.x = Math.PI /6;
    this.orthographicCamera.lookAt(0, 4, 0); // Look at the model's center

    this.scene.add(this.orthographicCamera);

    // * CAMERA HELPER - orth camera
    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    // * GRID HELPER
    // const size = 10;
    // const divisions = 10;
    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // * AXES HELPER
    // const axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    // disable zoom in and out as triggering wheel event
    this.controls.enableZoom = false;
  }

  resize() {
    // updating perspective camera
    this.perspectiveCamera.aspectRatio = this.size.aspectRatio;
    this.perspectiveCamera.updateProjectionMatrix();

    // updating orthographic camera
    this.orthographicCamera.left =
      (-this.size.aspectRatio * this.size.frustum) / 2;
    this.orthographicCamera.right =
      (this.size.aspectRatio * this.size.frustum) / 2;
    this.orthographicCamera.top = this.size.frustum / 2;
    this.orthographicCamera.bottom = -this.size.frustum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    // console.log(this.perspectiveCamera.position)
    this.controls.update();

    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
