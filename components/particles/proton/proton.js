/**
 * @fileoverview Proton class for use with the acid equilibrium simulation.
 * @copyright Carnegie Mellon University 2018
 * @author Meg Richards (mouse@cmu.edu)
 */

import Particle from '../particle.js';
import ParticleImg from './proton.png';

/** @module particles/proton */

/**
 * Represents a proton particle
 * @class Proton
 * @augments module:particles~Particle
 * @param {!object} sketch - Parent sketch
 * @param {number} x=0 - X position of particle
 * @param {number} y=0 - Y position of particle
 */
export default function Proton(sketch,x=0,y=0) {
    this.execute_callback("Proton","pre",this);

    Particle.call(this,sketch);
    this.createSprite(x,y);

    this.base = {};
    this.base.particle = null;

    this.execute_callback("Proton","post",this);
}
Proton.prototype = new Particle();

/**
 * Collider radius of a proton.
 * @override
 * @type {number}
 * @default 6
 */
Proton.prototype.collider_radius = 6;

/**
 * Relative path of the image for a proton.
 * @override
 * @type {string}
 * @default "./proton.png"
 */
Proton.prototype.image_path = ParticleImg;

/**
 * Maximum possible velocity of a proton.
 * @override
 * @type {number}
 * @default 3
 */
Proton.prototype.max_velocity = 3;
