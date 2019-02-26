
var sketch = function(p) {
    var numConjugateBases = 10;
    var numProtons = 10;
    
    p.preload = function() {
        ConjugateBase.prototype.preload(p);
        Proton.prototype.preload(p);
        Beaker.prototype.preload(p);
    }

    p.setup = function() {
        var canvas = p.createCanvas(500,500);
        p.background(255,255,255);
        
        beaker = new Beaker(p,
                            286,278,
                            0,40,
                            38,75);

        beaker.addParticles(ConjugateBase,numConjugateBases);
        beaker.addParticles(Proton,numProtons);
    };
    
    p.draw = function() {
        beaker.step();
        beaker.draw();
    };
}
var m = new p5(sketch, 'beaker');
