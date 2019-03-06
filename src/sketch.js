import './style.css';
import '@cmu-eberly-center/p5/lib/addons/p5.dom.js';
import '@cmu-eberly-center/p5.play';
import * as p5 from '@cmu-eberly-center/p5';
import Beaker from '../components/beaker/beaker.js';
import ConjugateBase from '../components/particles/conjugate_base/conjugate_base.js';
import Proton from '../components/particles/proton/proton.js';

var sketch = function(p) {
    var numConjugateBases = 10;
    var numProtons = 10;
    var numAcids = 0;
    var beaker = null;

    var particleTableColumn = function(table,images,label,data) {
        var image_div = p.createDiv().class("particle");
        images.forEach((image) => {
            image_div.child(image);
        });
        var column = p.createDiv();
        column.
            child(image_div).
            child(p.createP(label).class("label")).
            child(data);
        table.child(column);
    }

    var particleTableUpdate = function(pNumAcids,pNumConjugateBases) {
        pNumAcids.html(numAcids);
        pNumConjugateBases.html(numConjugateBases-numAcids);
    }

    var particleTableSetup = function() {
        var table = p.createDiv().id("particle-table")

        // Acid column
        var pNumAcids = p.createP(numAcids).id("num-acids");
        particleTableColumn(table,[
            p.createImg(ConjugateBase.prototype.
                        image_path,'Conjugate Base').class("base"),
            p.createImg(Proton.prototype.
                        image_path,'Proton').class("proton")
        ],"acid",pNumAcids);

        // Comparison column
        particleTableColumn(table,[],"&lt;=&gt;");

        // Conjugate base column
        var pNumConjugateBases = p.createP(numConjugateBases).
            id("num-conjugate-bases");
        particleTableColumn(table,[
            p.createImg(ConjugateBase.
                        prototype.image_path,'Conjugate Base')
        ],"conjugate base",pNumConjugateBases);

        // Register callbacks to update particle table
        ConjugateBase.prototype.
            register_callback("release_proton","post",
                              () => {
                                  numAcids-=1;
                                  particleTableUpdate(pNumAcids,
                                                      pNumConjugateBases);
                              });
        ConjugateBase.prototype.
            register_callback("reacts_with_proton","post",
                              () => {
                                  numAcids+=1;
                                  particleTableUpdate(pNumAcids,
                                                      pNumConjugateBases);
                              });
    }

    var inputNumProtonsSetup = function() {
        var inputNumProtons = p.createInput('0').id('num-protons');
        inputNumProtons.value(numProtons);

        /** @this p5.Element */
        var inputNumProtonsEvent = function() {

            var newNumProtons = parseInt(this.value(),10);
            if (newNumProtons===newNumProtons) { // Only if not NaN
                var deltaProtons = newNumProtons - numProtons;
                if (deltaProtons > 0) {
                    beaker.addParticles(Proton,deltaProtons);
                }
                else if (deltaProtons < 0) {
                    beaker.removeParticles(Proton,Math.abs(deltaProtons));
                }
                numProtons = newNumProtons;
            }
        };
        inputNumProtons.input(inputNumProtonsEvent);
    }

    var UISetup = function() {
        particleTableSetup();
        inputNumProtonsSetup();
    }

    p.preload = function() {
        ConjugateBase.prototype.preload(p);
        Proton.prototype.preload(p);
        Beaker.prototype.preload(p);
    }

    p.setup = function() {
        p.createCanvas(500,500);
        p.background(255,255,255);

        beaker = new Beaker(p,286,278,0,40,38,75);

        UISetup();

        beaker.addParticles(ConjugateBase,numConjugateBases);
        beaker.addParticles(Proton,numProtons);
    };

    p.draw = function() {
        beaker.step();
        beaker.draw();
    };
}

var p5_sketch = new p5(sketch,'beaker');
