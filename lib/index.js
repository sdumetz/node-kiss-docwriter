'use strict';
import Engine from "./Engine.js"
import StyleSet from "./StyleSet.js"

function Kiss(datasrc,opts){
  this.styleset = new StyleSet(opts);
  this.engine = new Engine(this.styleset,datasrc);
}

module.exports = Kiss;
