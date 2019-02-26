/**
 * @fileoverview Beaker class for use with the acid equilibrium simulation.
 *   Acts as a particle container and manages particle groups.
 * @copyright Carnegie Mellon University 2018
 * @author mouse@cmu.edu (Meg Richards)
 */

/**
 * A beaker/particle container.
 * @class
 * @tutorial beaker-tutorial
 * @param {!object} sketch - Parent p5 sketch.
 * @param {number} [solution_width=100] - Width of area bounding particles.
 * @param {number} [solution_height=100] - Height of area bounding particles.
 * @param {number} [x=0] - X position of beaker.
 * @param {number} [y=0] - Y position of beaker.
 * @param {number} [solution_x=x] - X offset of area bounding particles.
 * @param {number} [solution_y=y]- Y offset of area bounding particles.
 */
function Beaker(sketch,
                solution_width=100,solution_height=100,
                x=0,y=0,
                solution_x=null,solution_y=null) {
    /**
     * The parent p5 sketch containing the particle.
     * @type {object}
     */
    this.p = sketch;

    /**
     * The X position of beaker.
     * @type {number}
     */
    this.x = x;

    /**
     * The Y position of beaker.
     * @type {number}
     */
    this.y = y;

    /**
     * The X offset for the beaker foreground image (e.g. its markings).
     * @type {number}
     * @default this.x+250
     */
    this.fg_x = x+250;

    /**
     * The Y offset for the beaker foreground image (e.g. its markings).
     * @type {number}
     * @default this.x+30
     */
    this.fg_y = y+30;

    /**
     * Group of all sprites of all particles within beaker.
     * @type {object}
     */
     this.all_particle_sprites = new this.p.Group();

    /**
     * Hash defining the position of the solution/liquid within the beaker.
     * @type {object}
     * @property {number} x - X offset of area bounding particles.
     * @property {number} y - Y offset of area bounding particles.
     * @property {number} width - Width of area bounding particles.
     * @property {number} height - Height of area bounding particles.
     * @property {number} max_x - X offset + width of area bounding particles.
     * @property {number} max_y - Y offset + height of area bounding particles.
     */
    this.solution = {};
    this.solution.x = solution_x === null ? x : solution_x;
    this.solution.y = solution_y === null ? y : solution_y;
    this.solution.width = solution_width;
    this.solution.height = solution_height;
    this.solution.max_x = this.solution.x + this.solution.width;
    this.solution.max_y = this.solution.y + this.solution.height;
}

/**
 * Relative path of the image for the beaker background.
 * @type {string}
 * @default "assets/beaker.png"
 */
Beaker.prototype.bg_image_path = 'assets/beaker.png';

/**
 * Relative path of the image for the beaker foreground.
 * @type {string}
 * @default "assets/beakerMarkings.png"
 */
Beaker.prototype.fg_image_path = 'assets/beakerMarkings.png';

/**
 * Reference to one particle type within a beaker.
 * @typedef ParticleHash
 * @property {object} sprites - The sprite group for that type of particle.
 */

/**
 * Hash of particles within the beaker referenced by type.
 * @type {?object.<string,ParticleHash>}
 * @example
 * var beaker = new Beaker(p);
 * ...
 * var proton_sprite_group = beaker.particles["Proton"].sprites;
 */
Beaker.prototype.particles = {}; // initialized indirectly via addParticles()

/**
 * Perform any actions required before the beaker can be used.
 * @function preload
 * @static
 * @memberof Beaker
 * @param {object} p - Parent p5 sketch.
 */
Beaker.prototype.preload = function(p) {
    this.background = p.loadImage(this.bg_image_path);
    this.foreground = p.loadImage(this.fg_image_path);
};

/**
 * Draw the beaker & particles within it.
 * Particles are drawn in reverse order to when they were added.
 */
Beaker.prototype.draw = function() {
    var p = this.p;
    // Draw beaker background
    p.image(this.background, this.x, this.y);
    // Draw particles
    p5.prototype.drawSprites(this.all_particle_sprites);
    // Draw beaker foreground markings
    p.image(this.foreground, this.fg_x, this.fg_y);
};

/**
 * An X & Y Coordinate.
 * @typedef PointHash
 * @property {number} x - The X coordinate.
 * @property {number} y - The Y coordinate.
 * @example
 * {
 *   "x": 3,
 *   "y": 7
 * }
 */

/**
 * Get a random location within the beaker able to accomodate a particle.
 * @param {number} particle_radius - The radius of the particle to be placed
 * with randomPoint().
 * @return {?PointHash} A random point within the beaker or null if the
 *   particle will not fit.
 */
Beaker.prototype.randomPoint = function(particle_radius) {
    if( particle_radius*2 >= this.solution.width ||
        particle_radius*2 >= this.solution.height )
        return null;
    var min_x = this.solution.x + particle_radius;
    var min_y = this.solution.y + particle_radius;
    // Width & height values are reduced by 1 particle radius on each side
    var max_width = this.solution.width - 2*particle_radius;
    var max_height = this.solution.height - 2*particle_radius;
    var x = min_x + Math.random()*max_width;
    var y = min_y + Math.random()*max_height;
    return {"x":x,"y":y};
};

/**
 * Add some number of one type of particle to the beaker.
 * @param {!object} particle_class - The class of particle to add.
 * @param {number} quantity - Number of particles to add.
 */
Beaker.prototype.addParticles = function(particle_class,quantity) {
    var p = this.p;
    var particle_name = particle_class.name;
    this.initParticleGroup(particle_name);
    for (var i = 0; i < quantity; i++) {
        var particle_radius = particle_class.prototype.collider_radius;
        var location = this.randomPoint(particle_radius);
        if( location ) {
            var particle = new particle_class(p,
                                              location["x"],
                                              location["y"]);
            this.addParticle(particle_name, particle);
        }
    }
};

/**
 * Add the particle to the beaker.
 * @private
 * @param {number} quantity - Number of particles to add.
 */
Beaker.prototype.addParticle = function(particle_key, particle) {
    this.particles[particle_key].sprites.add(particle.sprite);
    this.all_particle_sprites.add(particle.sprite);
    //this.particles[particle_key].particles.push(particle);
};

Beaker.prototype.initParticleGroup = function(particle_class) {
    var p = this.p;
    if( !this.particles[particle_class] ) {
        this.particles[particle_class] = {};
        this.particles[particle_class].sprites = new p.Group();
    }
};


Beaker.prototype.step = function() {
    this.update_particles();
};

Beaker.prototype.update_particles = function() {
    // Bounds of beaker solution
    var min_x = this.solution.x;
    var max_x = this.solution.max_x;
    var min_y = this.solution.y;
    var max_y = this.solution.max_y;

    var sprites = this.all_particle_sprites;

    for( var j = 0; j<sprites.length; j++ ){
        var sprite = sprites[j];
        var particle = sprite.particle;

        this.sprite_boundary_update(sprite,min_x,min_y,max_x,max_y);

        this.sprite_resolve_collisions(sprite,particle.reacts_with);

        particle.update();
    }
};

Beaker.prototype.sprite_boundary_update = function(sprite,min_x,min_y,max_x,max_y) {
    if( sprite.overlapPoint(min_x,sprite.position.y) ) {
        sprite.velocity.x = Math.abs(sprite.velocity.x);
    }
    else if( sprite.overlapPoint(max_x,sprite.position.y) ) {
        sprite.velocity.x = -Math.abs(sprite.velocity.x);
    }
    if( sprite.overlapPoint(sprite.position.x,min_y) ) {
        sprite.velocity.y = Math.abs(sprite.velocity.y);
    }
    else if( sprite.overlapPoint(sprite.position.x,max_y) ) {
        sprite.velocity.y = -Math.abs(sprite.velocity.y);
    }
}

Beaker.prototype.sprite_resolve_collisions = function(sprite,reacts_with) {
    var beaker_particles = this.particles;
    for( var i in Object.keys(reacts_with) ) {
        var target_key = Object.keys(reacts_with)[i]; // e.g.: "Proton"
        var target_group = beaker_particles[target_key].sprites;
        sprite.overlap(target_group,reacts_with[target_key]);
    }
};
