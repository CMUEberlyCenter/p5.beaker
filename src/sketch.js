import './style.css';
import '@cmu-eberly-center/p5/lib/addons/p5.dom.js';
import '@cmu-eberly-center/p5.play';
import * as p5 from '@cmu-eberly-center/p5';
import Beaker from '../components/beaker/beaker.js';
import ConjugateBase from '../components/particles/conjugate_base/conjugate_base.js';
import Proton from '../components/particles/proton/proton.js';

var sketch = function(p) {
    var numInitialProtons = 10;
    var numConjugateBases = 10;
    var numProtons = 0;
    var numAcids = 0;
    var beaker = null;

    var particleTableUpdate = function(pNumAcids,pNumConjugateBases) {
        pNumAcids.html(numAcids);
        pNumConjugateBases.html(numConjugateBases-numAcids);
    }
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
    var particleTableSetup = function(pNumAcids,pNumConjugateBases) {
        var table = p.createDiv().id("particle-table")

        // Acid column
        particleTableColumn(table,[
            p.createImg(ConjugateBase.prototype.
                        image_path,'Conjugate Base').class("base"),
            p.createImg(Proton.prototype.
                        image_path,'Proton').class("proton")
        ],"acid",pNumAcids);

        // Comparison column
        particleTableColumn(table,[],"&lt;=&gt;");

        // Conjugate base column
        particleTableColumn(table,[
            p.createImg(ConjugateBase.
                        prototype.image_path,'Conjugate Base')
        ],"conjugate base",pNumConjugateBases);
    };

    var updateNumProtons = function(newNumProtons) {
        var deltaProtons = newNumProtons - numProtons;
        if (deltaProtons > 0) {
            beaker.addParticles(Proton,deltaProtons);
        }
        else if (deltaProtons < 0) {
            beaker.removeParticles(Proton,Math.abs(deltaProtons));
        }
    };

    var inputNumProtonsSetup = function(sliderNumProtons) {
        /** @this p5.Element */
        var inputNumProtonsEvent = function() {
            var newNumProtons = parseInt(this.value(),10);
            if (newNumProtons===newNumProtons) { // Only if not NaN
                updateNumProtons(newNumProtons);
            }
        };
        sliderNumProtons.changed(inputNumProtonsEvent);
    }
    var inputPHUpdate = function(inputPH) {
        var pH = -7.0*(parseFloat(numProtons-numAcids)-64.0)/32.0;
        inputPH.value(Number((pH).toFixed(2)));
    }
    var inputPHSetup = function(inputPH) {
        /** @this p5.Element */
        var inputPHEvent = function() {
            var newPH = parseFloat(this.value());
            if (newPH===newPH) { // Only if not NaN
                var newNumProtons =
                    parseInt((32.0/-7.0)*newPH+64.0+numAcids,10);
                updateNumProtons(newNumProtons);
            }
        };
        inputPH.input(inputPHEvent);
        inputPHUpdate(inputPH);
    }

    var UISetup = function() {
        p.createP('H(pH)').id("hph-label");
        p.createP('high').id("high-label");
        p.createP('low').id("low-label");

        var pNumConjugateBases = p.createP(numConjugateBases).
            id("num-conjugate-bases");
        var pNumAcids = p.createP(numAcids).id("num-acids");
        particleTableSetup(pNumAcids,pNumConjugateBases);

        var sliderNumProtons = p.createSlider(0,64,numInitialProtons).
            id('num-protons');
        inputNumProtonsSetup(sliderNumProtons);

        var inputPH = p.createInput('0').id('ph');
        inputPHSetup(inputPH);

        // Register callbacks to update UI
        Proton.prototype.
            register_callback("Proton","post",
                              () => {
                                  numProtons+=1;
                                  inputPHUpdate(inputPH);
                                  sliderNumProtons.value(numProtons);
                              });
        Proton.prototype.
            register_callback("remove","post",
                              () => {
                                  numProtons-=1;
                                  inputPHUpdate(inputPH);
                                  sliderNumProtons.value(numProtons);
                              });

        ConjugateBase.prototype.
            register_callback("release_proton","pre",
                              () => {
                                  numAcids-=1;
                                  particleTableUpdate(pNumAcids,
                                                      pNumConjugateBases);
                                  inputPHUpdate(inputPH);
                              });
        ConjugateBase.prototype.
            register_callback("reacts_with_proton","post",
                              () => {
                                  numAcids+=1;
                                  particleTableUpdate(pNumAcids,
                                                      pNumConjugateBases);
                                  inputPHUpdate(inputPH);
                              });
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
        beaker.addParticles(Proton,10);
    };

    p.draw = function() {
        beaker.step();
        beaker.draw();
    };
}

var p5_sketch = new p5(sketch,'beaker');
