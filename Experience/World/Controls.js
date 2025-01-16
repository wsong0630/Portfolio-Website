import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';

import Experience from '../Experience.js';

export default class Controls {
  constructor() {
    this.experience = new Experience();
    // use the same scene from previous
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.size = this.experience.size;
    this.time = this.experience.times;
    this.room = this.experience.world.room.actualRoom;
    this.camera = this.experience.camera;

    gsap.registerPlugin(ScrollTrigger);

    this.setPath();
  }
  setPath() {
    console.log(this.room);
    this.timeline = new gsap.timeline();
    this.timeline.to(this.room.position, {
      // x: 5,
      x: () => {
        return this.size.width * 0.0045;
      },
      y: 1.6,
      scrollTrigger: {
        trigger: '.first-move', // html element to track
        markers: true,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    });
  }

  resize() {}

  update() {}
}
