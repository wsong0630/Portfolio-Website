import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Room {
  constructor() {
    this.experience = new Experience();
    // use the same scene from previous
    this.scene = this.experience.scene;

    this.resources = this.experience.resources;
    this.room = this.resources.items.room; // -> item-file pairs;
    this.actualRoom = this.room.scene;
    console.log(this.actualRoom); // blender objects are under children properties

    this.setModel();

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
    });

    this.scene.add(this.actualRoom);
    // this.actualRoom.scale.set(1, 1, 1);
    this.actualRoom.rotation.y = -Math.PI / 4;
  }

  resize() {}

  update() {}
}
