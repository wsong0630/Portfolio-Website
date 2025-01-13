import * as THREE from 'three';

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
    this.loader.DRACOLoader.setDecoderPath('/draco/');
    this.loader.GLTFLoader.setDRACOLoader(this.loader.DRACOLoader);
  }

  startLoading() {
    for (const asset of this.assets) {
        if (asset.type === 'glbModel') {
            // loader function
            this.loader.GLTFLoader.load(asset.path, (file) => {
                this.singleAssetLoaded(asset, file);
            })
        } else if (asset.type === 'mp4') {
            this.screen = {}; // -> html
            this.screenTexture = {}; // -> three.js config

            // SCREEN div element: create the html element
            this.screen[asset.name] = document.createElement('video'); // 'video' is standard html element
            this.screen[asset.name].src = asset.path;
            this.screen[asset.name].muted = true;
            this.screen[asset.name].playInline = true;
            this.screen[asset.name].autoplay = true;
            this.screen[asset.name].loop = true;
            this.screen[asset.name].play(); // !!!!!!!!!!!!!!

            // SCREEN TEXTURE
            this.screenTexture[asset.name] = new THREE.VideoTexture( this.screen[asset.name] ); // ? select correct div element
            this.screenTexture[asset.name].flipY = true;
            this.screenTexture[asset.name].minFilter = THREE.NearestFilter;
            this.screenTexture[asset.name].magFilter = THREE.NearestFilter;
            this.screenTexture[asset.name].generateMipMaps = false;
            this.screenTexture[asset.name].encoding = THREE.sRGBEncoding;

            this.singleAssetLoaded(asset, this.screenTexture[asset.name]); 
        }
    }
  }
  singleAssetLoaded(asset, file) {
    // key-value pair
    this.items[asset.name] = file;
    this.loaded++;

    // check if all assets are loaded
    if (this.loaded === this.queue) {
         this.emit('ready');
    }
  }
}
