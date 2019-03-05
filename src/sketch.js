import * as p5 from '@cmu-eberly-center/p5';
import '@cmu-eberly-center/p5/lib/addons/p5.dom.js';
import '@cmu-eberly-center/p5.play';
import Proton from '../components/particles/proton/proton.js';
import ConjugateBase from '../components/particles/conjugate_base/conjugate_base.js';
import Beaker from '../components/beaker/beaker.js';
import './style.css';

var sketch = function(p) {
    var numConjugateBases = 10;
    var numProtons = 10;
    var numAcids = 0;

    var inputNumProtons;
    var sliderNumProtons;
    var pNumAcids;
    var pNumConjugateBases;

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

        ConjugateBase.prototype.register_callback("release_proton","post",
                                                  function(baseParticle) {
                                                      numAcids--;
                                                      particleTableUpdate();
                                                  });
        ConjugateBase.prototype.register_callback("reacts_with_proton","post",
                                                  function(baseParticle) {
                                                      numAcids++;
                                                      particleTableUpdate();
                                                  });
        beaker.addParticles(ConjugateBase,numConjugateBases);
        beaker.addParticles(Proton,numProtons);
        UISetup();
    };

    p.draw = function() {
        beaker.step();
        beaker.draw();
    };

    function UISetup() {
        inputNumProtonsSetup();
        particleTableSetup();
    }

    function inputNumProtonsSetup() {
        inputNumProtons = p.createInput('0').id('num-protons');
        inputNumProtons.value(numProtons);
        inputNumProtons.input(function() {
            var newNumProtons = parseInt(this.value());
            if( newNumProtons===newNumProtons ) { // only if not NaN
                var deltaProtons = newNumProtons - numProtons;
                if( deltaProtons > 0 ) {
                    beaker.addParticles(Proton,deltaProtons);
                }
                else if( deltaProtons < 0 ) {
                    beaker.removeParticles(Proton,Math.abs(deltaProtons));
                }
                numProtons = newNumProtons;
            }
        });
    }
    function particleTableSetup() {
        var base_img = p.createImg(ConjugateBase.prototype.image_path,
                                   'Conjugate Base').class("base");
        var proton_img = p.createImg(Proton.prototype.image_path,
                                     'Proton').class("proton");
        var acid_div = p.createDiv().child(base_img).child(proton_img);
        pNumAcids = p.createP(numAcids).id("num-acids");
        var acid = p.createDiv().
            child(p.createDiv().class("particle").child(acid_div)).
            child(p.createP('acid').class("label")).
            child(pNumAcids);
        var comparison = p.createDiv().
            child(p.createDiv().class("particle")).
            child(p.createP('<=>').class("label"));
        base_img = p.createImg(ConjugateBase.prototype.image_path,
                               'Conjugate Base');
        pNumConjugateBases = p.createP(numConjugateBases).
                  id("num-conjugate-bases");
        var bases = p.createDiv().
            child(p.createDiv().class("particle").child(base_img)).
            child(p.createP('conjugate base').class("label")).
            child(pNumConjugateBases);

        p.createDiv().id("particle-table").
            child(acid).
            child(comparison).
            child(bases);
    }
    function particleTableUpdate() {
        pNumAcids.html(numAcids);
        pNumConjugateBases.html(numConjugateBases-numAcids);
    }
}
var m = new p5(sketch, 'beaker');
