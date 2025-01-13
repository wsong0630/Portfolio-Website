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

    this.progress = 0;
    this.dummyCurve = new THREE.Vector3(0, 0, 0);

    // LINEAR INTERPOLATION
    this.linear = {
      current: 0, // start
      target: 0, // end
      ease: 0.1, // progress value: smoothness
    };
    this.position = new THREE.Vector3(0, 0, 0);
    this.look = new THREE.Vector3(0, 0, 0);

    this.directionalVector = new THREE.Vector3(0, 0, 0);
    this.staticVector = new THREE.Vector3(0, 1, 0); // change the y to -1, camera looks toward outside
    this.crossVector = new THREE.Vector3(0, 0, 0);

    this.setPath();
    this.onWheel();
  }

  setPath() {
    //Create a closed wavey loop
    this.curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-5, 2, 0),
        new THREE.Vector3(0, 2, -5),
        new THREE.Vector3(5, 2, 0),
        new THREE.Vector3(0, 2, 5),
      ],
      true // closed
    );
    // console.log(this.dummyCurve);
    this.curve.getPointAt(this.progress, this.dummyCurve);
    // ? 'this.curve' is object; 'this.dummyCurve' is current location on crv path
    this.camera.orthographicCamera.position.copy(this.dummyCurve);

    // PATH HELPER
    const points = this.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    this.scene.add(curveObject);
  }

  onWheel() {
    // create 'wheel' event listener
    window.addEventListener('wheel', (e) => {
      // console.log(e);
      // ? deltaY: how much scrolling occurred in the vertical direction by scrolling up & dn
      if (e.deltaY > 0) {
        this.linear.target += 0.01;
      } else {
        this.linear.target -= 0.01;
      }

      // * without use of Linear Interpolation -> choppy movement
      /* 
      // if (e.deltaY > 0) {
      //   this.progress += 0.01;
      // } else {
      //   this.progress -= 0.01;
      //   if (this.progress < 0) {
      //     this.progress = 1;
      //   }
      // }
      */
    });
  }

  resize() {}

  update() {
    this.linear.current = gsap.utils.interpolate(
      this.linear.current,
      this.linear.target,
      this.linear.ease
    );
    this.curve.getPointAt(this.linear.current % 1, this.position);
    this.camera.orthographicCamera.position.copy(this.position);

    this.directionalVector.subVectors(
      this.curve.getPointAt((this.linear.current % 1) + 0.000001),
      this.position
    );
    this.directionalVector.normalize();
    this.crossVector.crossVectors(this.directionalVector, this.staticVector);
    this.crossVector.multiplyScalar(10000); // more perpendicular by increasing length of vector
    this.camera.orthographicCamera.lookAt(this.crossVector);
    // this.linear.target += 0.001; // auto movement

    // * Linear Interpolation -> smoother path
    /*
    // clamping the value, wont out of bound of path
    // this.linear.current = gsap.utils.clamp(0, 1, this.linear.current);
    // this.linear.target = gsap.utils.clamp(0, 1, this.linear.target);
    // this.look = gsap.utils.clamp(0.0001, 1, this.look);

    // this.curve.getPointAt(this.linear.current, this.position);
    // this.curve.getPointAt(this.linear.current + 0.0001, this.look);
    record last camera position
    // this.camera.orthographicCamera.position.copy(this.position);
    lookAt Method: camera tangent to path
    // this.camera.orthographicCamera.lookAt(this.look);
    */

    // * without use of Linear Interpolation -> choppy movement
    /*
    // this.curve.getPointAt(this.progress % 1, this.dummyCurve);
    // this.progress += 0.01;

    // this.progress -= 0.01;
    // if (this.progress < 0) {
    //   this.progress = 1;
    // }
    // this.camera.orthographicCamera.position.copy(this.dummyCurve);
    */
  }
}
