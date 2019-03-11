!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["p5.beaker"]=t():e["p5.beaker"]=t()}(window,function(){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(o,i,function(t){return e[t]}.bind(null,i));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=12)}([function(e,t,r){"use strict";function o(e,t=0,r=0){this.execute_callback("Particle","pre",this),this.p=e,this.createSprite(t,r),this.cleanups={},this.execute_callback("Particle","post",this)}r.d(t,"a",function(){return o}),o.prototype.collider_offset_x=0,o.prototype.collider_offset_y=0,o.prototype.collider_radius=1,o.prototype.image_path=null,o.prototype.max_velocity=0,o.prototype.name="Particle",o.prototype.reacts_with={},o.prototype.callbacks={},o.prototype.register_callback=function(e,t,r){null==this.callbacks[e]&&(this.callbacks[e]={}),this.callbacks[e][t]=r},o.prototype.execute_callback=function(e,t,r){var o=this.callbacks[e];o&&"function"==typeof o[t]&&o[t](r)},o.prototype.preload=function(e){this.image=e.loadImage(this.image_path)},o.prototype.createSprite=function(e=0,t=0){var r=this.p;r&&(this.sprite=r.createSprite(e,t),null!=this.image&&this.sprite.addImage("default",this.image),this.sprite.setCollider("circle",this.collider_offset_x,this.collider_offset_y,this.collider_radius),this.sprite.velocity.x=this.randomVelocity(),this.sprite.velocity.y=this.randomVelocity(),this.sprite.particle=this)},o.prototype.randomVelocity=function(){return this.max_velocity-2*Math.random()*this.max_velocity},o.prototype.remove=function(){this.execute_callback("remove","pre",this);var e=this.cleanups;for(var t in Object.keys(e)){e[Object.keys(e)[t]](this)}this.sprite.remove(),delete this.sprite,this.execute_callback("remove","post",this)},o.prototype.update=function(){this.execute_callback("update","pre",this),this.execute_callback("update","post",this)}},function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return n});var o=r(0),i=r(2),a=r.n(i);function n(e,t=0,r=0){o.a.call(this,e),this.createSprite(t,r),this.proton={},this.proton.particle=null,this.proton.offset_x=10,this.proton.offset_y=-10,this.proton.restore_depth=null,this.proton.release_after_range=[0,5e3],this.proton.post_release_duration=750,this.proton.release_after=null}n.prototype=new o.a,n.prototype.collider_radius=16,n.prototype.image_path=a.a,n.prototype.max_velocity=.5,n.prototype.name="ConjugateBase",n.prototype.reacts_with={Proton:function(e,t){var r=e.particle,o=t.particle;o.base.particle||r.proton.particle||(n.prototype.execute_callback("reacts_with_proton","pre",r),r.proton.release_after=Date.now()+r.proton.release_after_range[0]+r.proton.release_after_range[1]*Math.random(),r.proton.particle=o,o.base.particle=r,r.proton.restore_depth=t.depth,t.depth=e.depth+.5,o.cleanups.ConjugateBase=function(e){var t=e.base.particle;t&&t.release_proton()},n.prototype.execute_callback("reacts_with_proton","post",r))}},n.prototype.remove=function(){this.execute_callback("remove","pre",this);var e=this.cleanups;for(var t in Object.keys(e)){e[Object.keys(e)[t]](this)}this.release_proton(),this.sprite.remove(),delete this.particle,this.execute_callback("remove","post",this)},n.prototype.update=function(){this.execute_callback("update","pre",this);var e=this.proton;if(e.release_after){var t=Date.now();if(t<e.release_after){var r=e.particle.sprite,o=this.sprite;r.position.x=o.position.x+this.proton.offset_x,r.position.y=o.position.y+this.proton.offset_y}else t<e.release_after+e.post_release_duration||this.release_proton()}this.execute_callback("update","post",this)},n.prototype.release_proton=function(){this.execute_callback("release_proton","pre",this);var e=this.proton;e.release_after&&(delete e.particle.cleanups.ConjugateBase,e.particle.sprite.depth=e.restore_depth,e.restore_depth=null,e.release_after=null,e.particle.base.particle=null,e.particle=null),this.execute_callback("release_proton","post",this)}},function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAd0QAAHdEBudPgXQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOVSURBVFiFrZbPa1xVFMe/98xLmIBGGKhdKF2U+oNkIcUyINF2nYVj3AXGlSlklY0YxK5m0240IoF0phMK/gOljQjZ2jYkkDAGwYhSdKGIRCxIkWTe/XGOm/fGO6/3zbwmc+Dw7rtc7vdzzrm/FAra+vr6WWZ+T0QuK6XOAzibOAAcAjhk5l+NMffjON5YXl7+q8i8atiAVqt1SSn1KYAagGjYeGMMtNZWa73R7XZvNBqN704EsLq6Olkul78QkQ+LgKbmnIPWOnXudru3oyj6uNFoPCkM0G63p0XkHoALRYVTExHEcexDII7jR8aYuZWVlR+z4ynb0Ww2qyLy4CTiAKCU6vOk7xUAD5eWlqoDAdrt9jQRbQKonEQ8C5FpVwBsLi4uTgUB1tbWnhORO6cVH2IVEdmo1+uTTwGMjY19CeC1USmJSLAN4ML4+PhnfQCtVutSstpHIpwK5rWZ+er8/PzFHkCyzwtvtSIAzNxrZz3RvQYAqtlsvkhEf6DAIVPErLXZLdj37/VZrfVLRERzoxJPI/fdjzzTF4nIuyQil0chDgDMDOdcz/NgvP8rpJQ60YGTNRGBtbZP3IfxgVII59w0ATgzCgBfPC8Lgf5zhP+v1FOJ+x4CCZWEmSdPtfjStOe5c25oZshae5g5qQoZM8MY0+d5ECHxpP0k0loflkql86VSCUQEoqcuyL6Is/VMRfIAQtnwvr9FxphfmPkt51wPwL9O/aM0b0E9C4TvIvJDFMfxgyiKPkjFfYC86POykAoVzYYx5n50dHR0r1wu3ySiyAcA0PuGTrO8LDwDhFVKfVPa2to6mpmZeYOZp/xJQweJL5CNJuRZiAzgnZ2dna8iANBa3yCi94mIss8pvwSDyhDKQhbCazMzXweAEgBsb2//Wa1WX2bmN/2J02/RiPNSH4C4tbu7exvwbsE4jj8ioneI6HW//tkMhNbBoAUZgHiklPoknbdPJXkwPlRKVYoChNbKAIjHzrm3O53OT0EAAFhYWKiKyCaAir8L/K04KAv+fs8APBaR2b29vT1fL/gMq9frU0qpuwBeDWVgWBkCWfiZmef8yAcCAECtVnt+YmLicxG5CoAGAQzYsuycax8fHy8fHBz8G9IZ+hCt1WoXlVLXAMwlz6ihZXDOWWvtXWvt9f39/e8HzV/4JTw7O3tGRGrOuSsiMg3gHDO/kAD8Y639XUQOmPlba+3XnU7n7yLz/gfK4r22wg7QwAAAAABJRU5ErkJggg=="},,,,,,function(e,t){e.exports="data:image/png;base64,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"},,,,function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return n});var o=r(1),i=r(8),a=r.n(i);function n(e,t=0,r=0){o.default.call(this,e),this.createSprite(t,r),this.proton.release_after_range=[5e3,1e4]}n.prototype=new o.default,n.prototype.image_path=a.a,n.prototype.name="StrongConjugateBase"}])});