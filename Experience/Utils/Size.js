import EventEmitter from "events";

export default class Size extends EventEmitter{
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRatio = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2); // limit the rendering quality no higher than 2
    // camera frustum plane
    this.frustum = 5;

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspectRatio = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      // trigger  resize event
      this.emit('resize');
    });
  }
}
