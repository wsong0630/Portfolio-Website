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

    this.setScrollTrigger();
    // this.setPath();
  }
  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // desktop
      // * use the arrow function to keep the context
      '(min-width: 969px)': () => {
        // setup animations and ScrollTriggers for screens 960px wide or greater...
        // These ScrollTriggers will be reverted/killed when the media query doesn't match anymore.
        console.log('desktop');
        this.room.scale.set(1, 1, 1); // set back to original scale after switching back from mobile
        // * First move timeline
        this.timelineFirstMove = new gsap.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });
        this.timelineFirstMove.to(this.room.position, {
          // animation for this.room.position.x
          x: () => {
            return -this.size.width * 0.002; // bigger-topleft
          },
          z: () => {
            return 4; //smaller-bottomleft
          },
        });

        // * Second move timeline
        this.timelineSecondMove = new gsap.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.position,
            {
              // animation for this.room.position.x
              x: () => {
                return this.size.width * 0.0025;
              },
              z: () => {
                return 5;
              },
            },
            'second' // to have same label for both movement to operate at the same time
          )
          .to(
            this.room.scale,
            {
              x: 3.5,
              y: 3.5,
              z: 3.5,
            },
            'second'
          );

        // * Third move timeline
        this.timelineThirdMove = new gsap.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        }).to(this.camera.orthographicCamera.position, {
          x: 7,
          y: 21,
          z: 8,
        });
      },
      //////////////////////////////////////////////////////////
      //mobile
      '(max-width: 968px)': () => {
        console.log('mobile');
        this.room.scale.set(0.65, 0.65, 0.65);
        // * First move timeline
        this.timelineFirstMove = new gsap.timeline({
          scrollTrigger: {
            trigger: '.first-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        }).to(this.room.scale, {
          x: 0.9,
          y: 0.9,
          z: 0.9,
        });
        // * Second move timeline
        this.timelineSecondMove = new gsap.timeline({
          scrollTrigger: {
            trigger: '.second-move',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        })
          .to(this.room.scale, {
            x: 1.7,
            y: 1.7,
            z: 1.7,
          })
          .to(this.room.position, {
            x: -4,
          });
        // * Third move timeline
        this.timelineThirdMove = new gsap.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'top top',
            end: 'bottom 5%',
            scrub: 0.7,
            // markers: true,
            invalidateOnRefresh: true,
          },
        });
      },
      // * Coordinate with component in Room.js
      all: () => {
        // ScrollTriggers created here aren't associated with a particular media query, so they persist.
        this.secondTimeline = new gsap.timeline({
          scrollTrigger: {
            trigger: '.third-move',
            start: 'center center',
            // end: 'bottom bottom',
            // scrub: 0.7,
            // invalidateOnRefresh: true,
          },
        });
        console.log(this.room.children);
        this.room.children.forEach((child) => {
          if (child.name === 'floor') {
            this.first = gsap.to(child.position, {
              x: 0.05,
              z: 1.6,
              duration: 0.5,
            });
          }
          if ((child.name === 'bed_frame') | (child.name === 'floor001')) {
            this.second = gsap.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              // ease: 'back.out(2)',
              duration: 0.5,
            });
          }
        });
        // add to timeline
        // this.secondTimeline.add(this.first);
        // this.secondTimeline.add(this.second);
      },
    });
  }
  /*
  // setPath() {
  //   console.log(this.room);
  //   this.timeline = new gsap.timeline();
  //   this.timeline.to(this.room.position, {
  //     // x: 5,
  //     x: () => {
  //       return this.size.width * 0.0045;
  //     },
  //     y: 1.6,
  //     scrollTrigger: {
  //       trigger: '.first-move', // html element to track
  //       markers: true,
  //       start: 'top top',
  //       end: 'bottom bottom',
  //       scrub: 0.7,
  //       invalidateOnRefresh: true,
  //     },
  //   });
  // }
  */

  resize() {}

  update() {}
}
