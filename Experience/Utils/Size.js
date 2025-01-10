export default class Size {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRatio = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2); // limit the rendering quality no higher than 2

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspectRatio = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    });
  }
}
