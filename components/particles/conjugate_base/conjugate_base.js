/**
 * @fileoverview Conjugate Base class for use with the acid equilibrium
 *               simulation.
 * @copyright Carnegie Mellon University 2018
 * @author Meg Richards (mouse@cmu.edu)
 */

import Particle from '../particle.js';
import ParticleImg from './conjugate_base.png';

/**
 * A conjugate base particle.
 * @class
 * @augments Particle
 * @param {!object} sketch - Parent p5 sketch.
 * @param {number} x=0 - X position of particle.
 * @param {number} y=0 - Y position of particle.
 */
export default function ConjugateBase(sketch,x=0,y=0) {
    Particle.call(this,sketch);
    this.createSprite(x,y);

    /**
     * Hash defining a conjugate base's relationship with a proton.
     * @type {object}
     * @property {object} particle - The proton particle, if any, joined to the
     *   conjugate base particle.
     * @property {number} offset_x - X position for the proton from the center
     *   of the conjugate base particle.
     * @property {number} offset_y - Y position for the proton from the center
     *   of the conjugate base particle.
     * @property {number} restore_depth - Original depth/drawing order for
     *   proton. Will be restored after separation.
     * @property {number[]} release_after_range - An array of two numbers, used
     *   as max & min of a random duration in milliseconds for a proton to be
     *   joined.
     * @property {number} post_release_duration - The amount of time in
     *   milliseconds a previously joined proton & conjugate base will be unable
     *   to rejoin with other particles after separation.
     * @property {number} release_after - A time in milliseconds, after which a
     *   proton should be released. A non-null release_after indicates a joined or
     *   recently separated (undergoing post_release_duration) pair of conjugate
     *   base and proton.
     */
    this.proton = {};
    this.proton.particle = null;
    this.proton.offset_x = 10;
    this.proton.offset_y = -10;
    this.proton.restore_depth = null; //TODO
    this.proton.release_after_range = [0,5000];
    this.proton.post_release_duration = 750;
    this.proton.release_after = null;
}
ConjugateBase.prototype = new Particle();

/**
 * Collider radius of a conjugate base.
 * @override
 * @type {number}
 * @default 16
 */
ConjugateBase.prototype.collider_radius = 16;

/**
 * Relative path of the image for a conjugate base.
 * @override
 * @type {string}
 * @default "./conjugate_base.png"
 */
ConjugateBase.prototype.image_path = ParticleImg;

/**
 * Maximum possible velocity of a conjugate base.
 * @override
 * @type {number}
 * @default .5
 */
ConjugateBase.prototype.max_velocity = .5;

/** @inheritdoc */
ConjugateBase.prototype.reacts_with = {
    "Proton": function(baseSprite,protonSprite) {
        var baseParticle = baseSprite.particle;
        var protonParticle = protonSprite.particle;
        if( !protonParticle.base.particle &&
            !baseParticle.proton.particle ) {
            // Allow base to capture the proton; set random release time
            baseParticle.proton.release_after = Date.now() +
                baseParticle.proton.release_after_range[0] +
                baseParticle.proton.release_after_range[1] * Math.random();
            // Create references between joined particles
            baseParticle.proton.particle = protonParticle;
            protonParticle.base.particle = baseParticle;
            // Preserve original proton drawing order and place just above base
            baseParticle.proton.restore_depth = protonSprite.depth;
            protonSprite.depth = baseSprite.depth+.5;
        }
    },
};

/** @inheritdoc */
ConjugateBase.prototype.update = function() {
    var proton = this.proton;
    if( proton.release_after ) {
        var now = Date.now();
        if( now < proton.release_after ) {
            // Not yet released; update proton location
            var protonSprite = proton.particle.sprite;
            var baseSprite = this.sprite;
            protonSprite.position.x = baseSprite.position.x + this.proton.offset_x;
            protonSprite.position.y = baseSprite.position.y + this.proton.offset_y;
        }
        else if( now < (proton.release_after + proton.post_release_duration) ) {
            // Released; do not update proton location to allow separation
        }
        else {
            // Restore proton's drawing order
            proton.particle.sprite.depth = proton.restore_depth;
            proton.restore_depth = null;
            // Release complete; allow particles to join
            proton.release_after = null;
            proton.particle.base.particle = null;
            proton.particle = null;
        }
    }
};
