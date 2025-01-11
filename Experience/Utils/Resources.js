import EventEmitter from 'events';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import Experience from '../Experience';

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;

    // declare an object to hold all loaded items and emit to other classes
    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoader();
    this.startLoading();
  }
  setLoader() {
    this.loader = {};
    this.loader.GLTFLoader = new GLTFLoader();
    this.loader.DRACOLoader = new DRACOLoader();

    // we use draco compression to export blender model
    this.loader.DRACOLoader.setDecoderPath('/draco');
    this.loader.GLTFLoader.setDracoLoader(this.loader.DRACOLoader);
  }
  startLoading() {}
}
