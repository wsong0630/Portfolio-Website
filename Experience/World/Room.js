import * as THREE from 'three';
import gsap from 'gsap';
import Experience from '../Experience.js';

export default class Room {
  constructor() {
    this.experience = new Experience();
    // use the same scene from previous
    this.scene = this.experience.scene;

    this.resources = this.experience.resources;
    this.time = this.experience.times;
    this.room = this.resources.items.room; // -> item-file pairs;
    this.actualRoom = this.room.scene;
    // console.log(this.actualRoom); // blender objects are under children properties

    // LINEAR INTERPOLATION
    this.linear = {
      current: 0, // start
      target: 0, // end
      ease: 0.1, // progress value: smoothness
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // this.scene.add(cube);
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      // deal with mesh
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
      // deal with group
      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          if (groupChild instanceof THREE.Mesh) {
            groupChild.castShadow = true;
            groupChild.receiveShadow = true;
          }
        });
      }
      // find my screen
      if (child.name === 'Screen') {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
        //     child.material = new THREE.MeshPhysicalMaterial; // * -> default assets material
        //     child.material.roughness = 0;
        //     child.material.color.set(0x30652f);
        //     child.material.ior = 3;
        //     child.material.transmission = 1;
        //     child.material.opacity = 1;
      }

      // * MODEL INTRO ANIMATION - all function
      // pop-up animation
      if (child.name === 'floor') {
        console.log(child)
        // child.position.x = -2.5;
        child.position.z = -2.5;
      }

      // scale-up animation
      if (child.name === 'bed_frame' | child.name === 'floor001') {
        child.scale.set(0,0,0)
      }
    });

    this.scene.add(this.actualRoom);
    // this.actualRoom.scale.set(1, 1, 1);
    this.actualRoom.rotation.y = -Math.PI / 4;
  }

  setAnimation() {}

  // * ROTATE THE ROOM WITH CURSOR MOVING LEFT TO RIGHT
  onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth; // 0 to 1
      // console.log(e.clientX, this.rotation);
      this.linear.target = this.rotation * 0.5; // decrease multiplied number to get less rotatable angle
    });
  }

  resize() {}

  update() {
    this.linear.current = gsap.utils.interpolate(
      this.linear.current,
      this.linear.target,
      this.linear.ease
    );
    this.actualRoom.rotation.y = this.linear.current;
  }
}
