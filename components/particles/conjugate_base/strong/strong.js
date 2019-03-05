/**
 * @fileoverview Strong Conjugate Base class for use with the acid
 *               equilibrium simulation.
 * @copyright Carnegie Mellon University 2019
 * @author Zach Mineroff (zmineroff@cmu.edu)
 */

import ConjugateBase from '../conjugate_base.js';
import ParticleImg from './strong.png';

/** @module particles/conjugate_base/conjugate_base_strong */

/**
 * A strong conjugate base particle.
 * @class StrongConjugateBase
 * @augments module:conjugate_base~ConjugateBase
 * @param {!object} sketch - Parent p5 sketch.
 * @param {number} x=0 - X position of particle.
 * @param {number} y=0 - Y position of particle.
 */
export default function StrongConjugateBase(sketch,x=0,y=0) {
    ConjugateBase.call(this,sketch);
    this.createSprite(x,y);

    this.proton.release_after_range = [5000,10000];
}
StrongConjugateBase.prototype = new ConjugateBase();


/**
 * Relative path of the image for a strong conjugate base.
 * @override
 * @type {string}
 * @default "./strong.png"
 */
StrongConjugateBase.prototype.image_path = ParticleImg;