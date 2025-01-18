// * EventEmitter is our node modules, we indicated the path
import EventEmitter from 'events';

export default class Times extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now(); // method returns the number of milliseconds elapsed
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16; // the time between each frame

    this.update();
  }
  update() {
    // update current time
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime; // update with previous matched on each window animation frame
    this.elapsed = this.current - this.start; // use for how many secs animation started after three.js scene setup
    // console.log(this.delta);
    this.emit('update'); // 'update' is event name

    // ? we only request frame in Times class -> npm-events
    window.requestAnimationFrame(this.update.bind(this));

    // window.requestAnimationFrame(() => this.update); // keep it in the same context
  }
}
