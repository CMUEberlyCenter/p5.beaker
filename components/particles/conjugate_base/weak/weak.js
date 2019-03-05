/**
 * @fileoverview Weak Conjugate Base class for use with the acid equilibrium
 *               simulation.
 * @copyright Carnegie Mellon University 2019
 * @author Meg Richards (mouse@cmu.edu)
 */

import ConjugateBase from '../conjugate_base.js';
import ParticleImg from './weak.png';

/** @module particles/conjugate_base/conjugate_base_weak */

/**
 * A weak conjugate base particle.
 * @class WeakConjugateBase
 * @augments module:particles~ConjugateBase
 * @param {!object} sketch - Parent p5 sketch.
 * @param {number} x=0 - X position of particle.
 * @param {number} y=0 - Y position of particle.
 */
export default function WeakConjugateBase(sketch,x=0,y=0) {
    ConjugateBase.call(this,sketch);
    this.createSprite(x,y);
    this.proton.release_after_range = [0,2000];
}
WeakConjugateBase.prototype = new ConjugateBase();

/**
 * Relative path of the image for a weak conjugate base.
 * @override
 * @type {string}
 * @default "./weak.png"
 */
WeakConjugateBase.prototype.image_path = ParticleImg;

