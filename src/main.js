import './style.css';
import Experience from '../Experience/Experience.js';

import javascriptLogo from './javascript.svg';
import { setupCounter } from './counter.js';

const experience = new Experience(document.querySelector('.experience-canvas'));
// console.log('main.js', experience); // Should log the canvas element or null
